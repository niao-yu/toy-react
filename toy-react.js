
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
}

// 自定义组件需要继承的类
export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
    this._root = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  get root() {
    if (!this._root) this._root = this.render().root
    return this._root
  }
}

export function render(component, element) {
  element.appendChild(component.root)
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