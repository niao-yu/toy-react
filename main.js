import { creatElement, Component, render } from './toy-react'

class MyComponent extends Component {
  constructor() {
    super()
    this.state = {
      a: 1,
      b: 1,
    }
    // setInterval(() => {
    //   this.setState({a: this.state.a + 1})
    // }, 1000);
  }
  render() {
    return <div class="MyComponentClass">
      <h1>MyComponentClass</h1>
      {this.children}
      <div>点我</div>
      <div>{this.state.a.toString()}</div>
      <div>{this.state.b.toString()}</div>
    </div>
  }
}

render(<MyComponent/>, document.querySelector('body')
)