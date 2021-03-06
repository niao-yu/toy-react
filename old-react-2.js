const RENDER_TO_HTML = 'render to html'

// 自定义组件需要继承的类
export class Component {
  constructor() {
    this.children = []
    this.props = {}
    this.state = {}
    this._vdom = null
    this._range = null
  }

  // 获取虚拟dom
  get vdom() {
    this._vdom = this.render().vdom
    return this._vdom
  }

  // 渲染页面
  [RENDER_TO_HTML](range) {
    this._range = range
    this.vdom[RENDER_TO_HTML](range)
  }

  setAttribute(name, value) {
    this.props[name] = value
  }

  appendChild(child) {
    this.children.push(child)
  }

  // 更新, 需要判断新旧vdom
  update() {

    let oldVdom = this._vdom
    let newVdom = this.vdom

    // 判断是否需要更新dom
    let isSameNode = () => {

    }

    if (!isSameNode(oldVdom, newVdom)) return this[RENDER_TO_HTML](this._range)

    if (this.vchildren) {
      this.vchildren.forEach(vchild => {
        vchild.update()
      })
    }
  }

  setState(newState) {

    if (!this.state) this.state = newState
    else merge(this.state, newState)

    this.update()

    function merge(oldObj, newObj) {
      if (typeof(newObj) !== 'object' || newObj === null) return
      for (let key in newObj) {
        if (typeof(newObj[key]) !== typeof(oldObj[key])) oldObj[k] = newObj[key]
        else if (typeof(newObj[key]) === 'object') {
          if (newObj[key] === null || oldObj[key] === null) oldObj[key] = newObj[key]
          else if (Array.isArray(newObj[key])) oldObj[key] = newObj[key]
          else merge(oldObj[k], newObj[key])
        } else if (oldObj[key] !== newObj[key]) oldObj[key] = newObj[key]
      }
    }
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super(type)
    this.type = type
    this.vchildren = []
  }

  // 获取虚拟dom
  get vdom() {
    this.vchildren = this.children.map(v => v.vdom)
    return this
  }

  // 渲染页面
  [RENDER_TO_HTML](range) {

    let vdom = this.vdom
    let node = document.createElement(vdom.type)

    // 1. 处理 props 添加属性
    const props = vdom.props
    for (let name in props) {
      if (name.match(/^on([\s\S]*)$/)) {
        let handleName = (RegExp.$1 || '').toLowerCase()
        if (handleName) node.addEventListener(handleName, props[name])
        continue
      }
      if (name === 'className') name = 'class'

      node.setAttribute(name, props[name])
    }

    // 2. 遍历添加 children 渲染子元素
    const children = vdom.children
    if (children && Array.isArray(children)) {
      for (let child of children) {
        if (child) {
          let childRange = document.createRange()
          childRange.setStart(node, node.childNodes.length)
          childRange.setStart(node, node.childNodes.length)
          child[RENDER_TO_HTML](childRange)
        }
      }
    }

    // 3. 渲染
    replaceContennt(range, node)
  }
}

class TextWrapper extends Component {
  constructor(content) {
    super(content)
    this.type = '#text'
    this.content = content
  }

  // 获取虚拟dom
  get vdom() {
    return this
  }

  // 渲染页面
  [RENDER_TO_HTML](range) {
    let node = document.createTextNode(this.content)
    replaceContennt(range, node)
  }

}

// 渲染node到range
function replaceContennt(range, node) {

  range.insertNode(node)
  range.setStartAfter(node)
  range.deleteContents()

  range.setStartBefore(node)
  range.setEndAfter(node)
}

// 创建一个虚拟dom
export function createElement(type, attributes, ...children) {
  let element = null

  // 是普通正常的标签
  if (typeof(type) === 'string') {
    element = new ElementWrapper(type)
  } else { // 是用户自定义组件
    element = new type
  }

  // 保存属性
  if (attributes) {
    for (let name in attributes) {
      element.setAttribute(name, attributes[name])
    }
  }

  // 保存 children
  // children 中的每一项,正常应该是 1. 一个个对象(属性) 2. 字符串(内部文字) 3. 数组(打包传过来的子dom们)
  if (children && Array.isArray(children)) {
    let saveChildren = (children) => {
      for (let child of children) {
        if (child === undefined || child === null) continue
        // 数组,是 3
        if (Array.isArray(child)) saveChildren(child)
        else {
          // 字符串,是 2
          if (typeof(child) === 'string') child = new TextWrapper(child)
          // 1
          element.appendChild(child)
        }
      }
    }
    saveChildren(children)
  }

  return element
}

export function Render(component, element) {
  let range = document.createRange()
  range.setStart(element, 0)
  range.setStart(element, element.childNodes.length)
  component[RENDER_TO_HTML](range)
}