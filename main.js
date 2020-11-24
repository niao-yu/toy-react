import { creatElement, Component, render } from './toy-react'

class MyComponent extends Component {
  render() {
    return <div class="MyComponentClass">
      <h1>MyComponentClass</h1>
      {this.children}
    </div>
  }
}

render(
  <div class="div">
    第一个字
    <MyComponent>
      <div class="a" id="b">好的吧</div>
      <div></div>
      <div></div>
      文字
    </MyComponent>
  </div>,
  document.querySelector('body')
)