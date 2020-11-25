const RENDER_TO_HTML = 'render to html'

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      let event = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
      this.root.addEventListener(event, value)
    } else {
      if (name === 'className') {
        this.root.setAttribute('class', value)
      } else {
        this.root.setAttribute(name, value)
      }
    }
  }
  appendChild(component) {
    let range = document.createRange()
    range.setStart(this.root, this.root.childNodes.length)
    range.setEnd(this.root, this.root.childNodes.length)
    component[RENDER_TO_HTML](range)
  }
  [RENDER_TO_HTML](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  [RENDER_TO_HTML](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

// 自定义组件需要继承的类
export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._root = null
    this._range = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  [RENDER_TO_HTML](range) {
    this._range = range
    this.render()[RENDER_TO_HTML](this._range)
  }
  // 重新渲染
  rerender() {
    let oldRange = this._range
    let newRange = document.createRange()
    newRange.setStart(oldRange.startContainer, oldRange.startOffset)
    newRange.setEnd(oldRange.startContainer, oldRange.startOffset)
    this[RENDER_TO_HTML](newRange)

    oldRange.setStart(newRange.endContainer, newRange.endOffset)
    oldRange.deleteContents()
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
    this.rerender()
  }
}

export function creatElement(type, attributes, ...children) {
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
  // element.appendChild(component.root)
}