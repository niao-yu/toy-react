/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _toy_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toy-react */ \"./toy-react.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n // class Square extends Component {\n//   render() {\n//     return (\n//       <button className=\"square\" onClick={this.props.onClick}>\n//         {this.props.value}\n//       </button>\n//     );\n//   }\n// }\n// class Board extends Component {\n//   renderSquare(i) {\n//     return (\n//       <Square\n//         value={this.props.squares[i]}\n//         onClick={() => this.props.onClick(i)}\n//       />\n//     );\n//   }\n//   render() {\n//     return (\n//       <div>\n//         <div className=\"board-row\">\n//           {this.renderSquare(0)}\n//           {this.renderSquare(1)}\n//           {this.renderSquare(2)}\n//         </div>\n//         <div className=\"board-row\">\n//           {this.renderSquare(3)}\n//           {this.renderSquare(4)}\n//           {this.renderSquare(5)}\n//         </div>\n//         <div className=\"board-row\">\n//           {this.renderSquare(6)}\n//           {this.renderSquare(7)}\n//           {this.renderSquare(8)}\n//         </div>\n//       </div>\n//     );\n//   }\n// }\n// class Game extends Component {\n//   constructor(props) {\n//     super(props);\n//     this.state = {\n//       history: [\n//         {\n//           squares: Array(9).fill(null)\n//         }\n//       ],\n//       stepNumber: 0,\n//       xIsNext: true\n//     };\n//   }\n//   handleClick(i) {\n//     const history = this.state.history.slice(0, this.state.stepNumber + 1);\n//     const current = history[history.length - 1];\n//     const squares = current.squares.slice();\n//     if (calculateWinner(squares) || squares[i]) {\n//       return;\n//     }\n//     squares[i] = this.state.xIsNext ? \"X\" : \"O\";\n//     this.setState({\n//       history: history.concat([\n//         {\n//           squares: squares\n//         }\n//       ]),\n//       stepNumber: history.length,\n//       xIsNext: !this.state.xIsNext\n//     });\n//   }\n//   jumpTo(step) {\n//     this.setState({\n//       stepNumber: step,\n//       xIsNext: (step % 2) === 0\n//     });\n//   }\n//   render() {\n//     const history = this.state.history;\n//     const current = history[this.state.stepNumber];\n//     console.log(history, current)\n//     const winner = calculateWinner(current.squares);\n//     const moves = history.map((step, move) => {\n//       const desc = move ?\n//         'Go to move #' + move :\n//         'Go to game start';\n//       return (\n//         <li key={move}>\n//           <button onClick={() => this.jumpTo(move)}>{desc}</button>\n//         </li>\n//       );\n//     });\n//     let status;\n//     if (winner) {\n//       status = \"Winner: \" + winner;\n//     } else {\n//       status = \"Next player: \" + (this.state.xIsNext ? \"X\" : \"O\");\n//     }\n//     return (\n//       <div className=\"game\">\n//         <div className=\"game-board\">\n//           <Board\n//             squares={current.squares}\n//             onClick={i => this.handleClick(i)}\n//           />\n//         </div>\n//         <div className=\"game-info\">\n//           <div>{status}</div>\n//           <ol>{moves}</ol>\n//         </div>\n//       </div>\n//     );\n//   }\n// }\n// // ========================================\n// function calculateWinner(squares) {\n//   const lines = [\n//     [0, 1, 2],\n//     [3, 4, 5],\n//     [6, 7, 8],\n//     [0, 3, 6],\n//     [1, 4, 7],\n//     [2, 5, 8],\n//     [0, 4, 8],\n//     [2, 4, 6]\n//   ];\n//   for (let i = 0; i < lines.length; i++) {\n//     const [a, b, c] = lines[i];\n//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {\n//       return squares[a];\n//     }\n//   }\n//   return null;\n// }\n// render(<Game />, document.querySelector('body'))\n// console.log((<Game/>).vDom)\n\nvar MyCom = /*#__PURE__*/function (_Component) {\n  _inherits(MyCom, _Component);\n\n  var _super = _createSuper(MyCom);\n\n  function MyCom() {\n    _classCallCheck(this, MyCom);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(MyCom, [{\n    key: \"render\",\n    value: function render() {\n      return (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n        onClick: function onClick() {\n          return console.log(222);\n        },\n        \"class\": \"abc\"\n      }, \"\\u4E00\\u4E2A\\u5B57\", (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null, \"\\u54C8\\u54C8\"), (0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h2\", null, \"h2\\u6807\\u9898\"));\n    }\n  }]);\n\n  return MyCom;\n}(_toy_react__WEBPACK_IMPORTED_MODULE_0__.Component);\n\n(0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.Render)((0,_toy_react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyCom, null), document.querySelector('body'));\n\n//# sourceURL=webpack://toy-react/./main.js?");

/***/ }),

/***/ "./toy-react.js":
/*!**********************!*\
  !*** ./toy-react.js ***!
  \**********************/
/*! namespace exports */
/*! export Component [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Render [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => /* binding */ Component,\n/* harmony export */   \"createElement\": () => /* binding */ createElement,\n/* harmony export */   \"Render\": () => /* binding */ Render\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar RENDER_TO_HTML = 'render to html'; // 自定义组件需要继承的类\n\nvar Component = /*#__PURE__*/function () {\n  function Component() {\n    _classCallCheck(this, Component);\n\n    this.children = [];\n    this.props = {};\n    this.state = {};\n  } // 获取虚拟dom\n\n\n  _createClass(Component, [{\n    key: RENDER_TO_HTML,\n    // 渲染页面\n    value: function value(range) {\n      this.vdom[RENDER_TO_HTML](range);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.props[name] = value;\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"vdom\",\n    get: function get() {\n      return this.render().vdom;\n    }\n  }]);\n\n  return Component;\n}();\n\nvar ElementWrapper = /*#__PURE__*/function (_Component) {\n  _inherits(ElementWrapper, _Component);\n\n  var _super = _createSuper(ElementWrapper);\n\n  function ElementWrapper(type) {\n    var _this;\n\n    _classCallCheck(this, ElementWrapper);\n\n    _this = _super.call(this, type);\n    _this.type = type;\n    return _this;\n  } // 获取虚拟dom\n\n\n  _createClass(ElementWrapper, [{\n    key: RENDER_TO_HTML,\n    // 渲染页面\n    value: function value(range) {\n      var vdom = this.vdom;\n      var node = document.createElement(vdom.type); // 1. 处理 props 添加属性\n\n      var props = vdom.props;\n\n      for (var name in props) {\n        if (name.match(/^on([\\s\\S]*)$/)) {\n          var handleName = (RegExp.$1 || '').toLowerCase();\n          if (handleName) node.addEventListener(handleName, props[name]);\n          continue;\n        }\n\n        if (name === 'className') name = 'class';\n        node.setAttribute(name, props[name]);\n      } // 2. 遍历添加 children 渲染子元素\n\n\n      var children = vdom.children;\n\n      if (children && Array.isArray(children)) {\n        var _iterator = _createForOfIteratorHelper(children),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var child = _step.value;\n\n            if (child) {\n              var childRange = document.createRange();\n              childRange.setStart(node, node.childNodes.length);\n              childRange.setStart(node, node.childNodes.length);\n              child[RENDER_TO_HTML](childRange);\n            }\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n      } // 3. 渲染\n\n\n      replaceContennt(range, node);\n    }\n  }, {\n    key: \"vdom\",\n    get: function get() {\n      return this;\n    }\n  }]);\n\n  return ElementWrapper;\n}(Component);\n\nvar TextWrapper = /*#__PURE__*/function (_Component2) {\n  _inherits(TextWrapper, _Component2);\n\n  var _super2 = _createSuper(TextWrapper);\n\n  function TextWrapper(content) {\n    var _this2;\n\n    _classCallCheck(this, TextWrapper);\n\n    _this2 = _super2.call(this, content);\n    _this2.type = '#text';\n    _this2.content = content;\n    return _this2;\n  } // 获取虚拟dom\n\n\n  _createClass(TextWrapper, [{\n    key: RENDER_TO_HTML,\n    // 渲染页面\n    value: function value(range) {\n      var node = document.createTextNode(this.content);\n      replaceContennt(range, node);\n    }\n  }, {\n    key: \"vdom\",\n    get: function get() {\n      return this;\n    }\n  }]);\n\n  return TextWrapper;\n}(Component); // 渲染node到range\n\n\nfunction replaceContennt(range, node) {\n  range.insertNode(node);\n  range.setStartAfter(node);\n  range.deleteContents();\n  range.setStartBefore(node);\n  range.setEndAfter(node);\n} // 创建一个虚拟dom\n\n\nfunction createElement(type, attributes) {\n  var element = null; // 是普通正常的标签\n\n  if (typeof type === 'string') {\n    element = new ElementWrapper(type);\n  } else {\n    // 是用户自定义组件\n    element = new type();\n  } // 保存属性\n\n\n  if (attributes) {\n    for (var name in attributes) {\n      element.setAttribute(name, attributes[name]);\n    }\n  } // 保存 children\n  // children 中的每一项,正常应该是 1. 一个个对象(属性) 2. 字符串(内部文字) 3. 数组(打包传过来的子dom们)\n\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  if (children && Array.isArray(children)) {\n    var saveChildren = function saveChildren(children) {\n      var _iterator2 = _createForOfIteratorHelper(children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          if (child === undefined || child === null) continue; // 数组,是 3\n\n          if (Array.isArray(child)) saveChildren(child);else {\n            // 字符串,是 2\n            if (typeof child === 'string') child = new TextWrapper(child); // 1\n\n            element.appendChild(child);\n          }\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    };\n\n    saveChildren(children);\n  }\n\n  return element;\n}\nfunction Render(component, element) {\n  var range = document.createRange();\n  range.setStart(element, 0);\n  range.setStart(element, element.childNodes.length);\n  component[RENDER_TO_HTML](range);\n}\n\n//# sourceURL=webpack://toy-react/./toy-react.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;