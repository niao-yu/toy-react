const RENDER_TO_HTML = 'render to html'

// 自定义组件需要继承的类
export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = [] // 记录了所有的children-node情况,渲染时去遍历渲染
    this._root = null // 记录,用于渲染时diff对比
    this._range = null // 记录,用于渲染时diff对比
  }
  get vDom() {
    return this.render().vDom
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  // 如果执行了这个,那么当前的标签是自定义标签,需要去执行render()返回的真实node的这个方法
  [RENDER_TO_HTML](range) {
    this._vDom = this.vDom
    this._range = range
    this._vDom[RENDER_TO_HTML](this._range)
  }
  // // 重新渲染
  // rerender() {
  //   let oldRange = this._range
  //   let newRange = document.createRange()
  //   newRange.setStart(oldRange.startContainer, oldRange.startOffset)
  //   newRange.setEnd(oldRange.startContainer, oldRange.startOffset)
  //   this[RENDER_TO_HTML](newRange)

  //   oldRange.setStart(newRange.endContainer, newRange.endOffset)
  //   oldRange.deleteContents()
  // }

  // 更新当前自定义组件,只自定义组件需  要,内部所有的子的真实标签node不会用这个方法
  update() {
    // 对比两个虚拟node是否一致,一致的话就不需要更新
    let isSameNode = (oldNode, newNode) => {
      // 类型不一样
      if (oldNode.type !== newNode.type) return false

      // props的数量不一致
      if (Object.keys(oldNode.props).length !== Object.keys(newNode.props).length) return false

      // props的值有不一样的
      for (let name in oldNode.props) {
        if (newNode.props[name] !== oldNode.props[name]) {
          return false
        }
      }

      // 新node是文本节点
      if (newNode.type === '#text' && newNode.content !== oldNode.content) return false
      console.log(oldNode, newNode)

      return true
    }

    // 对比并更新两个虚拟dom
    let update = (oldVDom, newVDom) => {
      // 如果两个虚拟dom不一致,直接整个去更新
      if (!isSameNode(oldVDom, newVDom)) {
        newVDom[RENDER_TO_HTML](oldVDom._range)
        return
      }

      // 记录旧dom内部的尾节点的range
      let tailRange = oldVDom.vChildren[oldVDom.vChildren.length - 1]._range

      // 两个dom是一样的,去判断他们的子级dom是否还一致
      for (let i; i < newVDom.vChildren.length; i++) {
        let newChild = newVDom.vChildren[i]
        let oldChild = oldVDom.vChildren[i]

        // 对比更新
        if (i < oldVDom.vChildren.length) {
          update(oldChild, newChild)
        } else {
          // 旧dom的child多的部分
          let range = document.createRange()
          range.setStart(tailRange.endContaier, tailRange.endOffset)
          range.setEnd(tailRange.endContaier, tailRange.endOffset)
          newChild[RENDER_TO_HTML](range)
          tailRange = range
        }
      }
    }

    let vDom = this.vDom // 获取新的虚拟dom
    update(this._vDom, vDom) // 去和旧的虚拟dom对比,并更新
    this._vDom = vDom // 更新vDom
  }
  setState(newState) {
    if (this.state === null || typeof(this.state) !== 'object') {
      this.state = newState
      this.rerender()
      return
    }
    let merge = (oldState, newState) => {
      for (let p in newState) {
        if (oldState[p] === null || typeof(oldState[p]) !== 'object') {
          oldState[p] = newState[p]
        } else merge(oldState[p], newState[p])
      }
    }
    merge(this.state, newState)
    this.update()
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super(type)
    this.type = type // 只真实node需要
  }
  get vDom() {
    this.vChildren = this.children.map(v => v.vDom)
    return this
  }
  [RENDER_TO_HTML](range) {
    // 更新 range
    this._range = range

    // 生成新root
    let root = document.createElement(this.type)
    // 设置 props (setAttribute)
    for (let name in this.props) {
      let value = this.props[name]
      if (name.match(/^on([\s\S]+)$/)) {
        let event = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
        root.addEventListener(event, value)
      } else {
        if (name === 'className') {
          root.setAttribute('class', value)
        } else {
          root.setAttribute(name, value)
        }
      }
    }

    // 当前dom的root组装完毕,开始整理它的子dom

    if (!this.vChildren) this.vChildren = this.children.map(child => child.vDom)

    for (let child of this.vChildren) {
      let childRange = document.createRange()
      childRange.setStart(root, root.childNodes.length)
      childRange.setEnd(root, root.childNodes.length)
      child[RENDER_TO_HTML](childRange)
    }

    // 渲染node
    replaceContennt(range, root)
  }
}

class TextWrapper extends Component {
  constructor(content) {
    super(content)
    this.type = '#text' // 只真实node需要
    this.content = content // 只text节点需要
  }
  get vDom() {
    return this
  }
  [RENDER_TO_HTML](range) {
    this._range = range
    let root = document.createTextNode(this.content)
    // 渲染node
    replaceContennt(this._range, root)
  }
}

// 渲染node到range
function replaceContennt(range, node) {

  console.log(node)
  range.insertNode(node)
  range.setStartAfter(node)
  range.deleteContents()

  range.setStartBefore(node)
  range.setEndAfter(node)
}

export function createElement(type, attributes, ...children) {
  let e;
  if (typeof type === 'string') { // 是常规标签
    e = new ElementWrapper(type)
  } else { // 是用户自定义组件
    e = new type;
  }
  for (let p in attributes) {
    e.setAttribute(p, attributes[p])
  }
  let insertChildren = children => {
    for (let child of children) {
      if (child === null) continue
      if (typeof child === 'string') child = new TextWrapper(child)
      
      if (typeof(child) === 'object' && (child instanceof Array)) {
        insertChildren(child)
      } else e.appendChild(child)
    }
  }
  insertChildren(children)
  return e
}

export function render(component, element) {
  let range = document.createRange()
  range.setStart(element, 0)
  range.setEnd(element, element.childNodes.length)
  range.deleteContents()
  component[RENDER_TO_HTML](range)
}