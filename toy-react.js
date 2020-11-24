
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
    console.log('type', type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    console.log(component)
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
  get root() {
    console.log('获取root')
    return {}
  }
}

export function creatElement(type, attributes, ...children) {
  let element;
  if (typeof type === 'string') { // 是常规标签
    element = new ElementWrapper(type)
  } else { // 是用户自定义组件
    element = new type;
  }
  for (let val in attributes) {
    console.log(val)
    element.setAttribute(val, attributes[val])
  }
  console.log(2, children)
  children.forEach(val => {
    console.log(1, val)
    let child
    if (typeof val === 'string') {
      child = new TextWrapper(val)
    }
    element.appendChild(child)
  })

  return element

  console.log(type, attributes, children)
}