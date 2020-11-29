const RENDER_TO_HTML = 'render to html'

// 自定义组件需要继承的类
export class Component {
  constructor() {
    this.children = []
    this.props = {}
    this.state = {}
    this._vdom = null // 缓存上一次虚拟dom,用来和新的作对比
    this._range = null // 缓存更新位置
  }

  // 获取虚拟dom
  get vdom() {
    return this.render().vdom
  }

  // 渲染页面
  [RENDER_TO_HTML](range) {
    this._range = range
    this._vdom = this.vdom
    this._vdom[RENDER_TO_HTML](this._range)
  }

  setAttribute(name, value) {
    this.props[name] = value
  }

  appendChild(child) {
    this.children.push(child)
  }

  // 修改了 state,需要触发更新
  setState(newState) {
    if (newState) {
      let oldState = this.state
      
      // 对比和合并
      let contrastState = (_oldState, _newState) => {
        let keys = Object.keys(_newState)
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i]
          let typeNew = typeof(_newState[key]), typeOld = typeof(_oldState[key])
          if (_newState[key] === null || _oldState[key] === null) {
            _oldState[key] = _newState[key]
          } else if (typeNew === 'object' && typeOld === 'object') {
            contrastState(_oldState[key], _newState[key])
          } else if (_oldState[key] !== _newState[key]) {
            _oldState[key] = _newState[key]
          }
        }
      }
      // 去对比合并
      contrastState(oldState, newState)
    }
    
    console.log(this.state)

    this.update() // 去更新
  }

  // 更新, 需要判断新旧vdom
  update() {

    // 两个dom是一样的?
    let isSameNode = (oldDom, newDom) => {
      // 1. 判断 props 是否有更新
      // dom类型不一样了 标签还是文字
      if (oldDom.type !== newDom.type) return false;
      // props 数量不一致了
      if (Object.keys(oldDom.props).length > Object.keys(newDom.props).length) return false;
      // props 内部值不一样了
      for (let name in newDom.props) {
        if (newDom.props[name] !== oldDom.props[name]) return false;
      }
      // 是文本时,文本不一样了
      if (newDom.type === "#text") {
        if (newDom.content !== oldDom.content) return false;
      }

      // 最终返回
      return true
    }
    
    // 判断和更新,用于循环遍历
    let _update = (oldDom, newDom) => {
      
      // 不一样了,直接更新
      if (!isSameNode(oldDom, newDom)) {
        this[RENDER_TO_HTML](oldDom._range)
        console.log(111, oldDom, newDom)
        return
      }

      newDom._range = oldDom._range;
  
      let newChildren = newDom.vchildren;
      let oldChildren = oldDom.vchildren;

      if (!newChildren || !newChildren.length) return;

      let tailRange = oldChildren[oldChildren.length - 1]._range;

      for (let i = 0; i < newChildren.length; i++) {
        let newChild = newChildren[i];
        let oldChild = oldChildren[i];
        console.log(newChild.type)
        if (i < oldChildren.length) {
          _update(oldChild, newChild);
        } else {
          let range = document.createRange();
          range.setStart(tailRange.endContainer, tailRange.endOffset);
          range.setEnd(tailRange.endContainer, tailRange.endOffset);
          newChild[RENDER_TO_DOM](range);
          tailRange = range;
        }
      }
    }

    // 判断更新
    // let oldVdom = this._vdom
    // let newVdom = this.vdom // this._vdom 也更新了

    let vdom = this.vdom;
    _update(this._vdom, vdom);
    this._vdom = vdom;
    // _update(oldVdom, newVdom)
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super(type)
    this.type = type
  }

  // 获取虚拟dom
  get vdom() {
    this.vchildren = this.children.map((child) => child.vdom);
    return this
  }

  // 渲染页面
  [RENDER_TO_HTML](range) {
    this._range = range
    
    console.log(22, range)
    
    let node = document.createElement(this.type)

    // 1. 处理 props 添加属性
    const props = this.props
    for (let name in props) {
      if (name.match(/^on([\s\S]*)$/)) {
        let handleName = (RegExp.$1 || '').toLowerCase()
        if (handleName) node.addEventListener(handleName, props[name])
        continue
      }
      if (name === 'className') {
        node.setAttribute('class', props[name])
      } else node.setAttribute(name, props[name])
    }

    // 2. 遍历添加 children 渲染子元素
    const children = this.children
    if (children && Array.isArray(children)) {
      for (let child of children) {
        if (child) {
          let childRange = document.createRange()
          childRange.setStart(node, node.childNodes.length)
          childRange.setStart(node, node.childNodes.length)
          console.log('childRange', childRange)
          child[RENDER_TO_HTML](childRange)
        }
      }
    }
    console.log(2, range)

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
    this._range = range
    let node = document.createTextNode(this.content)
    console.log(1, range)
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
    element = new type()
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
          if (typeof(child) !== 'object') child = new TextWrapper(child)
          // 1
          element.appendChild(child)
        }
      }
    }
    saveChildren(children)
  }

  return element
}

export function render(component, element) {
  let range = document.createRange()
  range.setStart(element, 0)
  range.setStart(element, element.childNodes.length)
  component[RENDER_TO_HTML](range)
}