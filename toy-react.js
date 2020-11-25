const RENDER_TO_HTML = 'render to html'

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
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
      if (oldState === null || typeof(oldState) !== 'object') {
        oldState = newState
      } else {
        for (let p in newState) {
          if (newState[p] !== null && typeof(newState[p]) === 'object') {
            merge(oldState[p], newState[p])
          } else if (oldState[p] !== newState[p]) {
            oldState[p] = newState[p]
          }
        }
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
      if (typeof child === 'string') {
        child = new TextWrapper(child)
        e.appendChild(child)
      } else if (Array.isArray(child)) {
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