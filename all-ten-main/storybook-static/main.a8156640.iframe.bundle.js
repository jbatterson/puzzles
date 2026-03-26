(self.webpackChunkall_ten = self.webpackChunkall_ten || []).push([
	[179],
	{
		"./.storybook/preview.js-generated-config-entry.js": (
			__unused_webpack_module,
			__unused_webpack___webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			var preview_namespaceObject = {};
			__webpack_require__.r(preview_namespaceObject),
				__webpack_require__.d(preview_namespaceObject, {
					parameters: () => parameters,
				});
			__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.filter.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.for-each.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.for-each.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.get-own-property-descriptors.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.define-properties.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.define-property.js"
				);
			var ClientApi = __webpack_require__(
					"./node_modules/@storybook/client-api/dist/esm/ClientApi.js"
				),
				esm = __webpack_require__(
					"./node_modules/@storybook/client-logger/dist/esm/index.js"
				),
				parameters = {actions: {argTypesRegex: "^on[A-Z].*"}};
			function ownKeys(object, enumerableOnly) {
				var keys = Object.keys(object);
				if (Object.getOwnPropertySymbols) {
					var symbols = Object.getOwnPropertySymbols(object);
					enumerableOnly &&
						(symbols = symbols.filter(function (sym) {
							return Object.getOwnPropertyDescriptor(object, sym).enumerable;
						})),
						keys.push.apply(keys, symbols);
				}
				return keys;
			}
			function _defineProperty(obj, key, value) {
				return (
					key in obj
						? Object.defineProperty(obj, key, {
								value,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (obj[key] = value),
					obj
				);
			}
			Object.keys(preview_namespaceObject).forEach(function (key) {
				var value = preview_namespaceObject[key];
				switch (key) {
					case "args":
					case "argTypes":
						return esm.kg.warn(
							"Invalid args/argTypes in config, ignoring.",
							JSON.stringify(value)
						);
					case "decorators":
						return value.forEach(function (decorator) {
							return (0, ClientApi.$9)(decorator, !1);
						});
					case "loaders":
						return value.forEach(function (loader) {
							return (0, ClientApi.HZ)(loader, !1);
						});
					case "parameters":
						return (0, ClientApi.h1)(
							(function _objectSpread(target) {
								for (var i = 1; i < arguments.length; i++) {
									var source = null != arguments[i] ? arguments[i] : {};
									i % 2
										? ownKeys(Object(source), !0).forEach(function (key) {
												_defineProperty(target, key, source[key]);
										  })
										: Object.getOwnPropertyDescriptors
										? Object.defineProperties(
												target,
												Object.getOwnPropertyDescriptors(source)
										  )
										: ownKeys(Object(source)).forEach(function (key) {
												Object.defineProperty(
													target,
													key,
													Object.getOwnPropertyDescriptor(source, key)
												);
										  });
								}
								return target;
							})({}, value),
							!1
						);
					case "argTypesEnhancers":
						return value.forEach(function (enhancer) {
							return (0, ClientApi.My)(enhancer);
						});
					case "argsEnhancers":
						return value.forEach(function (enhancer) {
							return (0, ClientApi._C)(enhancer);
						});
					case "render":
						return (0, ClientApi.$P)(value);
					case "globals":
					case "globalTypes":
						var v = {};
						return (v[key] = value), (0, ClientApi.h1)(v, !1);
					case "__namedExportsOrder":
					case "decorateStory":
					case "renderToDOM":
						return null;
					default:
						return console.log(key + " was not supported :( !");
				}
			});
		},
		"./generated-stories-entry.js": (
			module,
			__unused_webpack_exports,
			__webpack_require__
		) => {
			"use strict";
			(module = __webpack_require__.nmd(module)),
				(0,
				__webpack_require__(
					"./node_modules/@storybook/react/dist/esm/client/index.js"
				).configure)(
					[
						__webpack_require__(
							"./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$"
						),
						__webpack_require__(
							"./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$"
						),
					],
					module,
					!1
				);
		},
		"./src/view/AnimationPOC.stories.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Main: () => Main,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.is-array.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js");
			var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
					"./node_modules/react/index.js"
				),
				_stitches_config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				);
			function _slicedToArray(arr, i) {
				return (
					(function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function _iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function _unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return _arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function _nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function rectToStyle(r) {
				return {left: r[0], top: r[1], width: r[2], height: r[3]};
			}
			function randRange(min, max) {
				return min + Math.floor((max - min) * Math.random());
			}
			var GrayBox = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)(
					"div",
					{
						position: "relative",
						display: "inline-block",
						width: 300,
						height: 300,
						margin: 20,
						background: "#EEE",
					}
				),
				ColoredBox = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)(
					"div",
					{
						position: "absolute",
						border: "black solid 2px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						variants: {
							color: {red: {borderColor: "red"}, blue: {borderColor: "blue"}},
						},
					}
				),
				SmallDot = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)(
					"div",
					{width: 10, height: 10, borderRadius: 5, background: "black"}
				),
				BigDot = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)("div", {
					width: 100,
					height: 100,
					minWidth: 100,
					minHeight: 100,
					borderRadius: 50,
					background: "purple",
					zIndex: 1,
				}),
				CenterStackContainer = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)("div", {
					position: "relative",
					width: "100%",
					height: "100%",
				}),
				CenterLayer = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)(
					"div",
					{
						position: "absolute",
						left: 0,
						top: 0,
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}
				),
				CenterStack = function CenterStack(props) {
					var items = react__WEBPACK_IMPORTED_MODULE_13__.Children.map(
						props.children,
						function (el, i) {
							return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
								CenterLayer,
								{children: el},
								i
							);
						}
					);
					return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
						CenterStackContainer,
						{children: items}
					);
				};
			CenterStack.displayName = "CenterStack";
			var Main = function Main() {
				var _useState2 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_13__.useState)([5, 5, 100, 100]),
						2
					),
					r1 = _useState2[0],
					setR1 = _useState2[1],
					_useState4 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_13__.useState)([5, 5, 100, 100]),
						2
					),
					r2 = _useState4[0],
					setR2 = _useState4[1],
					_useState6 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_13__.useState)(!1),
						2
					),
					flipColors = _useState6[0],
					setFlipColors = _useState6[1],
					_useState8 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_13__.useState)(1),
						2
					),
					dotPos = _useState8[0],
					setDotPos = _useState8[1],
					_useState10 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_13__.useState)(!1),
						2
					),
					animating = _useState10[0],
					setAnimating = _useState10[1],
					dot1 = (0, react__WEBPACK_IMPORTED_MODULE_13__.useRef)(null),
					dot2 = (0, react__WEBPACK_IMPORTED_MODULE_13__.useRef)(null),
					moveAnim = (0, react__WEBPACK_IMPORTED_MODULE_13__.useRef)(null);
				var color1 = flipColors ? "blue" : "red",
					color2 = flipColors ? "red" : "blue",
					bigDotStyle =
						animating && moveAnim.current
							? {animation: moveAnim.current + " 2000ms"}
							: {},
					bigDot = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
						BigDot,
						{style: bigDotStyle}
					);
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(
					"div",
					{
						children: [
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
								GrayBox,
								{
									children: (0,
									react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
										ColoredBox,
										{
											color: color1,
											style: rectToStyle(r1),
											children: (0,
											react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(
												CenterStack,
												{
													children: [
														(0,
														react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
															SmallDot,
															{ref: dot1}
														),
														1 === dotPos ? bigDot : null,
													],
												}
											),
										}
									),
								}
							),
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
								GrayBox,
								{
									children: (0,
									react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
										ColoredBox,
										{
											color: color2,
											style: rectToStyle(r2),
											children: (0,
											react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(
												CenterStack,
												{
													children: [
														(0,
														react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
															SmallDot,
															{ref: dot2}
														),
														2 === dotPos ? bigDot : null,
													],
												}
											),
										}
									),
								}
							),
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
								children: [
									(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
										"button",
										{
											onClick: function onRandomize() {
												var w1 = randRange(50, 150),
													h1 = randRange(50, 150),
													w2 = randRange(50, 150),
													h2 = randRange(50, 150),
													x1 = randRange(0, 300 - w1),
													y1 = randRange(0, 300 - h1),
													x2 = randRange(0, 300 - w2),
													y2 = randRange(0, 300 - h2);
												setR1([x1, y1, w1, h1]),
													setR2([x2, y2, w2, h2]),
													setAnimating(!1);
											},
											children: "Randomize",
										}
									),
									(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
										"button",
										{
											onClick: function onStartAnimation() {
												var dot1El = dot1.current,
													dot2El = dot2.current;
												if (dot1El && dot2El) {
													var elRect1 = dot1El.getBoundingClientRect(),
														elRect2 = dot2El.getBoundingClientRect(),
														elRectFrom = 1 === dotPos ? elRect1 : elRect2,
														elRectTo = 1 === dotPos ? elRect2 : elRect1,
														dx =
															elRectFrom.left +
															elRectFrom.width / 2 -
															elRectTo.left -
															elRectTo.width / 2,
														dy =
															elRectFrom.top +
															elRectFrom.height / 2 -
															elRectTo.top -
															elRectTo.height / 2;
													(moveAnim.current = (0,
													_stitches_config__WEBPACK_IMPORTED_MODULE_14__.F4)({
														"0%": {
															transform:
																"translate(" + dx + "px, " + dy + "px)",
														},
														"100%": {transform: "translate(0)"},
													})),
														setDotPos(1 === dotPos ? 2 : 1),
														setAnimating(!0);
												}
											},
											children: "Start",
										}
									),
									(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
										"button",
										{
											onClick: function onStopAnimation() {
												setAnimating(!1);
											},
											children: "Stop",
										}
									),
									(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
										"button",
										{
											onClick: function onFlipColors() {
												setFlipColors(!flipColors);
											},
											children: "Flip Colors",
										}
									),
								],
							}),
						],
					}
				);
			};
			Main.displayName = "Main";
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: "Pages/AnimationProofOfConcept",
			};
			Main.parameters = Object.assign(
				{
					storySource: {
						source:
							'() => {\n\tconst [r1, setR1] = useState<Rect>([5, 5, 100, 100]);\n\tconst [r2, setR2] = useState<Rect>([5, 5, 100, 100]);\n\tconst [flipColors, setFlipColors] = useState<boolean>(false);\n\tconst [dotPos, setDotPos] = useState<1 | 2>(1);\n\tconst [animating, setAnimating] = useState<boolean>(false);\n\n\tconst dot1 = useRef<HTMLDivElement>(null);\n\tconst dot2 = useRef<HTMLDivElement>(null);\n\tconst moveAnim = useRef<any>(null);\n\n\tfunction onRandomize() {\n\t\tconst w1 = randRange(50, 150);\n\t\tconst h1 = randRange(50, 150);\n\t\tconst w2 = randRange(50, 150);\n\t\tconst h2 = randRange(50, 150);\n\t\tconst x1 = randRange(0, 300 - w1);\n\t\tconst y1 = randRange(0, 300 - h1);\n\t\tconst x2 = randRange(0, 300 - w2);\n\t\tconst y2 = randRange(0, 300 - h2);\n\t\tsetR1([x1, y1, w1, h1]);\n\t\tsetR2([x2, y2, w2, h2]);\n\t\tsetAnimating(false);\n\t}\n\n\tfunction onFlipColors() {\n\t\tsetFlipColors(!flipColors);\n\t}\n\n\tfunction onStartAnimation() {\n\t\tconst dot1El = dot1.current;\n\t\tconst dot2El = dot2.current;\n\t\tif (!dot1El || !dot2El) {\n\t\t\treturn;\n\t\t}\n\t\tconst elRect1 = dot1El.getBoundingClientRect();\n\t\tconst elRect2 = dot2El.getBoundingClientRect();\n\t\tconst elRectFrom = dotPos === 1 ? elRect1 : elRect2;\n\t\tconst elRectTo = dotPos === 1 ? elRect2 : elRect1;\n\t\tconst dx =\n\t\t\telRectFrom.left +\n\t\t\telRectFrom.width / 2 -\n\t\t\telRectTo.left -\n\t\t\telRectTo.width / 2;\n\t\tconst dy =\n\t\t\telRectFrom.top +\n\t\t\telRectFrom.height / 2 -\n\t\t\telRectTo.top -\n\t\t\telRectTo.height / 2;\n\t\tmoveAnim.current = keyframes({\n\t\t\t"0%": {\n\t\t\t\ttransform: `translate(${dx}px, ${dy}px)`,\n\t\t\t},\n\t\t\t"100%": {\n\t\t\t\ttransform: "translate(0)",\n\t\t\t},\n\t\t});\n\t\tsetDotPos(dotPos === 1 ? 2 : 1);\n\t\tsetAnimating(true);\n\t}\n\n\tfunction onStopAnimation() {\n\t\tsetAnimating(false);\n\t}\n\n\tconst color1 = flipColors ? "blue" : "red";\n\tconst color2 = flipColors ? "red" : "blue";\n\n\tconst bigDotStyle =\n\t\tanimating && moveAnim.current\n\t\t\t? {animation: `${moveAnim.current} 2000ms`}\n\t\t\t: {};\n\tconst bigDot = <BigDot style={bigDotStyle} />;\n\treturn (\n\t\t<div>\n\t\t\t<GrayBox>\n\t\t\t\t<ColoredBox color={color1} style={rectToStyle(r1)}>\n\t\t\t\t\t<CenterStack>\n\t\t\t\t\t\t<SmallDot ref={dot1} />\n\t\t\t\t\t\t{dotPos === 1 ? bigDot : null}\n\t\t\t\t\t</CenterStack>\n\t\t\t\t</ColoredBox>\n\t\t\t</GrayBox>\n\t\t\t<GrayBox>\n\t\t\t\t<ColoredBox color={color2} style={rectToStyle(r2)}>\n\t\t\t\t\t<CenterStack>\n\t\t\t\t\t\t<SmallDot ref={dot2} />\n\t\t\t\t\t\t{dotPos === 2 ? bigDot : null}\n\t\t\t\t\t</CenterStack>\n\t\t\t\t</ColoredBox>\n\t\t\t</GrayBox>\n\t\t\t<div>\n\t\t\t\t<button onClick={onRandomize}>Randomize</button>\n\t\t\t\t<button onClick={onStartAnimation}>Start</button>\n\t\t\t\t<button onClick={onStopAnimation}>Stop</button>\n\t\t\t\t<button onClick={onFlipColors}>Flip Colors</button>\n\t\t\t</div>\n\t\t</div>\n\t);\n}',
					},
				},
				Main.parameters
			);
		},
		"./src/view/ButtonGrid.stories.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Main: () => Main,
					EqualsDisabled: () => EqualsDisabled,
					Current: () => Current,
					Interm: () => Interm,
					IntermCurrent: () => IntermCurrent,
					IntermTwice: () => IntermTwice,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),
				__webpack_require__("./node_modules/react/index.js");
			var _expr_Line__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__("./src/expr/Line.ts"),
				_ButtonGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					"./src/view/ButtonGrid.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				Main = function Main(_ref) {
					var onInsertElement = _ref.onInsertElement,
						onEquals = _ref.onEquals,
						onReset = _ref.onReset,
						onBackspace = _ref.onBackspace,
						state = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_2__.Hw)(
							[8, 8, 3, 3],
							""
						);
					return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(
						"div",
						{
							children: [
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
									children: "Initial",
								}),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ButtonGrid__WEBPACK_IMPORTED_MODULE_3__.Z,
									{
										state,
										equalsEnabled: !0,
										onInsertElement,
										onEquals,
										onReset,
										onBackspace,
									}
								),
							],
						}
					);
				};
			Main.displayName = "Main";
			var EqualsDisabled = function EqualsDisabled(_ref2) {
				var onInsertElement = _ref2.onInsertElement,
					onEquals = _ref2.onEquals,
					onReset = _ref2.onReset,
					onBackspace = _ref2.onBackspace,
					state = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_2__.Hw)(
						[8, 8, 3, 3],
						""
					);
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
					children: [
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							children: "Equals Disabled",
						}),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
							_ButtonGrid__WEBPACK_IMPORTED_MODULE_3__.Z,
							{
								state,
								equalsEnabled: !1,
								onInsertElement,
								onEquals,
								onReset,
								onBackspace,
							}
						),
					],
				});
			};
			EqualsDisabled.displayName = "EqualsDisabled";
			var Current = function Current(_ref3) {
				var onInsertElement = _ref3.onInsertElement,
					onEquals = _ref3.onEquals,
					onReset = _ref3.onReset,
					onBackspace = _ref3.onBackspace,
					state = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_2__.Hw)(
						[8, 8, 3, 3],
						"s0 / s2"
					);
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
					children: [
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							children: "8 / 3, before =",
						}),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
							_ButtonGrid__WEBPACK_IMPORTED_MODULE_3__.Z,
							{
								state,
								equalsEnabled: !0,
								onInsertElement,
								onEquals,
								onReset,
								onBackspace,
							}
						),
					],
				});
			};
			Current.displayName = "Current";
			var Interm = function Interm(_ref4) {
				var onInsertElement = _ref4.onInsertElement,
					onEquals = _ref4.onEquals,
					onReset = _ref4.onReset,
					onBackspace = _ref4.onBackspace,
					state = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_2__.Hw)(
						[8, 8, 3, 3],
						"",
						["s0 / s2"]
					);
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
					children: [
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							children: "8 / 3 =",
						}),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
							_ButtonGrid__WEBPACK_IMPORTED_MODULE_3__.Z,
							{
								state,
								equalsEnabled: !0,
								onInsertElement,
								onEquals,
								onReset,
								onBackspace,
							}
						),
					],
				});
			};
			Interm.displayName = "Interm";
			var IntermCurrent = function IntermCurrent(_ref5) {
				var onInsertElement = _ref5.onInsertElement,
					onEquals = _ref5.onEquals,
					onReset = _ref5.onReset,
					onBackspace = _ref5.onBackspace,
					state = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_2__.Hw)(
						[8, 8, 3, 3],
						"s3 - i0",
						["s0 / s2"]
					);
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
					children: [
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							children: "8 / 3 =, 3 - 8/3",
						}),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
							_ButtonGrid__WEBPACK_IMPORTED_MODULE_3__.Z,
							{
								state,
								equalsEnabled: !0,
								onInsertElement,
								onEquals,
								onReset,
								onBackspace,
							}
						),
					],
				});
			};
			IntermCurrent.displayName = "IntermCurrent";
			var IntermTwice = function IntermTwice(_ref6) {
				var onInsertElement = _ref6.onInsertElement,
					onEquals = _ref6.onEquals,
					onReset = _ref6.onReset,
					onBackspace = _ref6.onBackspace,
					state = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_2__.Hw)(
						[8, 8, 3, 3],
						"s1 / i1",
						["s0 / s2", "s3 - i0"]
					);
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
					children: [
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							children: "8 / 3 =, 3 - 8/3 =, 8 / 1/3",
						}),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
							_ButtonGrid__WEBPACK_IMPORTED_MODULE_3__.Z,
							{
								state,
								equalsEnabled: !0,
								onInsertElement,
								onEquals,
								onReset,
								onBackspace,
							}
						),
					],
				});
			};
			IntermTwice.displayName = "IntermTwice";
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: "Components/ButtonGrid",
				component: _ButtonGrid__WEBPACK_IMPORTED_MODULE_3__.Z,
				argTypes: {
					onInsertElement: {action: "onInsertElement"},
					onEquals: {action: "onEquals"},
					onReset: {action: "onReset"},
					onBackspace: {action: "onBackspace"},
				},
			};
			(Main.parameters = Object.assign(
				{
					storySource: {
						source:
							'({\n\tonInsertElement,\n\tonEquals,\n\tonReset,\n\tonBackspace,\n}: any) => {\n\tconst state = makeStateFromStrings([8, 8, 3, 3], "");\n\treturn (\n\t\t<div>\n\t\t\t<div>Initial</div>\n\t\t\t<ButtonGrid\n\t\t\t\tstate={state}\n\t\t\t\tequalsEnabled={true}\n\t\t\t\tonInsertElement={onInsertElement}\n\t\t\t\tonEquals={onEquals}\n\t\t\t\tonReset={onReset}\n\t\t\t\tonBackspace={onBackspace}\n\t\t\t/>\n\t\t</div>\n\t);\n}',
					},
				},
				Main.parameters
			)),
				(EqualsDisabled.parameters = Object.assign(
					{
						storySource: {
							source:
								'({\n\tonInsertElement,\n\tonEquals,\n\tonReset,\n\tonBackspace,\n}: any) => {\n\tconst state = makeStateFromStrings([8, 8, 3, 3], "");\n\treturn (\n\t\t<div>\n\t\t\t<div>Equals Disabled</div>\n\t\t\t<ButtonGrid\n\t\t\t\tstate={state}\n\t\t\t\tequalsEnabled={false}\n\t\t\t\tonInsertElement={onInsertElement}\n\t\t\t\tonEquals={onEquals}\n\t\t\t\tonReset={onReset}\n\t\t\t\tonBackspace={onBackspace}\n\t\t\t/>\n\t\t</div>\n\t);\n}',
						},
					},
					EqualsDisabled.parameters
				)),
				(Current.parameters = Object.assign(
					{
						storySource: {
							source:
								'({\n\tonInsertElement,\n\tonEquals,\n\tonReset,\n\tonBackspace,\n}: any) => {\n\tconst state = makeStateFromStrings([8, 8, 3, 3], "s0 / s2");\n\treturn (\n\t\t<div>\n\t\t\t<div>8 / 3, before =</div>\n\t\t\t<ButtonGrid\n\t\t\t\tstate={state}\n\t\t\t\tequalsEnabled={true}\n\t\t\t\tonInsertElement={onInsertElement}\n\t\t\t\tonEquals={onEquals}\n\t\t\t\tonReset={onReset}\n\t\t\t\tonBackspace={onBackspace}\n\t\t\t/>\n\t\t</div>\n\t);\n}',
						},
					},
					Current.parameters
				)),
				(Interm.parameters = Object.assign(
					{
						storySource: {
							source:
								'({\n\tonInsertElement,\n\tonEquals,\n\tonReset,\n\tonBackspace,\n}: any) => {\n\tconst state = makeStateFromStrings([8, 8, 3, 3], "", ["s0 / s2"]);\n\treturn (\n\t\t<div>\n\t\t\t<div>8 / 3 =</div>\n\t\t\t<ButtonGrid\n\t\t\t\tstate={state}\n\t\t\t\tequalsEnabled={true}\n\t\t\t\tonInsertElement={onInsertElement}\n\t\t\t\tonEquals={onEquals}\n\t\t\t\tonReset={onReset}\n\t\t\t\tonBackspace={onBackspace}\n\t\t\t/>\n\t\t</div>\n\t);\n}',
						},
					},
					Interm.parameters
				)),
				(IntermCurrent.parameters = Object.assign(
					{
						storySource: {
							source:
								'({\n\tonInsertElement,\n\tonEquals,\n\tonReset,\n\tonBackspace,\n}: any) => {\n\tconst state = makeStateFromStrings([8, 8, 3, 3], "s3 - i0", ["s0 / s2"]);\n\treturn (\n\t\t<div>\n\t\t\t<div>8 / 3 =, 3 - 8/3</div>\n\t\t\t<ButtonGrid\n\t\t\t\tstate={state}\n\t\t\t\tequalsEnabled={true}\n\t\t\t\tonInsertElement={onInsertElement}\n\t\t\t\tonEquals={onEquals}\n\t\t\t\tonReset={onReset}\n\t\t\t\tonBackspace={onBackspace}\n\t\t\t/>\n\t\t</div>\n\t);\n}',
						},
					},
					IntermCurrent.parameters
				)),
				(IntermTwice.parameters = Object.assign(
					{
						storySource: {
							source:
								'({\n\tonInsertElement,\n\tonEquals,\n\tonReset,\n\tonBackspace,\n}: any) => {\n\tconst state = makeStateFromStrings([8, 8, 3, 3], "s1 / i1", [\n\t\t"s0 / s2",\n\t\t"s3 - i0",\n\t]);\n\treturn (\n\t\t<div>\n\t\t\t<div>8 / 3 =, 3 - 8/3 =, 8 / 1/3</div>\n\t\t\t<ButtonGrid\n\t\t\t\tstate={state}\n\t\t\t\tequalsEnabled={true}\n\t\t\t\tonInsertElement={onInsertElement}\n\t\t\t\tonEquals={onEquals}\n\t\t\t\tonReset={onReset}\n\t\t\t\tonBackspace={onBackspace}\n\t\t\t/>\n\t\t</div>\n\t);\n}',
						},
					},
					IntermTwice.parameters
				));
			try {
				(Main.displayName = "Main"),
					(Main.__docgenInfo = {
						description: "",
						displayName: "Main",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/ButtonGrid.stories.tsx#Main"] = {
							docgenInfo: Main.__docgenInfo,
							name: "Main",
							path: "src/view/ButtonGrid.stories.tsx#Main",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(EqualsDisabled.displayName = "EqualsDisabled"),
					(EqualsDisabled.__docgenInfo = {
						description: "",
						displayName: "EqualsDisabled",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/ButtonGrid.stories.tsx#EqualsDisabled"
						] = {
							docgenInfo: EqualsDisabled.__docgenInfo,
							name: "EqualsDisabled",
							path: "src/view/ButtonGrid.stories.tsx#EqualsDisabled",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Current.displayName = "Current"),
					(Current.__docgenInfo = {
						description: "",
						displayName: "Current",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/ButtonGrid.stories.tsx#Current"
						] = {
							docgenInfo: Current.__docgenInfo,
							name: "Current",
							path: "src/view/ButtonGrid.stories.tsx#Current",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Interm.displayName = "Interm"),
					(Interm.__docgenInfo = {
						description: "",
						displayName: "Interm",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/ButtonGrid.stories.tsx#Interm"] =
							{
								docgenInfo: Interm.__docgenInfo,
								name: "Interm",
								path: "src/view/ButtonGrid.stories.tsx#Interm",
							});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(IntermCurrent.displayName = "IntermCurrent"),
					(IntermCurrent.__docgenInfo = {
						description: "",
						displayName: "IntermCurrent",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/ButtonGrid.stories.tsx#IntermCurrent"
						] = {
							docgenInfo: IntermCurrent.__docgenInfo,
							name: "IntermCurrent",
							path: "src/view/ButtonGrid.stories.tsx#IntermCurrent",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(IntermTwice.displayName = "IntermTwice"),
					(IntermTwice.__docgenInfo = {
						description: "",
						displayName: "IntermTwice",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/ButtonGrid.stories.tsx#IntermTwice"
						] = {
							docgenInfo: IntermTwice.__docgenInfo,
							name: "IntermTwice",
							path: "src/view/ButtonGrid.stories.tsx#IntermTwice",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/view/ExpressionDisplay.stories.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Main: () => Main,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),
				__webpack_require__("./node_modules/react/index.js");
			var _expr_Line__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__("./src/expr/Line.ts"),
				_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					"./src/view/ExpressionDisplay.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				Main = function Main() {
					var state1 = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_2__.Hw)(
							[3, 3, 8, 8],
							"s2 / (s0 - s3 / s1)"
						),
						state2 = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_2__.Hw)(
							[3, 3, 8, 8],
							"s2 / i1",
							["s3 / s1", "s0 - i0"]
						);
					return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(
						"div",
						{
							children: [
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{state: state1}
								),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{state: state2}
								),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{state: state2, intermIndex: 0, color: "interm1"}
								),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{state: state2, intermIndex: 1, color: "interm2"}
								),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{state: state2, evalInterm: !0}
								),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{
										state: state2,
										evalInterm: !0,
										intermIndex: 0,
										color: "interm1",
									}
								),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{
										state: state2,
										evalInterm: !0,
										intermIndex: 1,
										color: "interm2",
									}
								),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{state: state2, colorInterm: !0}
								),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
									_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
									{state: state2, evalInterm: !0, colorInterm: !0}
								),
							],
						}
					);
				};
			Main.displayName = "Main";
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: "Components/ExpressionDisplay",
				component: _ExpressionDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
			};
			Main.parameters = Object.assign(
				{
					storySource: {
						source:
							'() => {\n\tconst state1 = makeStateFromStrings([3, 3, 8, 8], "s2 / (s0 - s3 / s1)");\n\n\tconst state2 = makeStateFromStrings([3, 3, 8, 8], "s2 / i1", [\n\t\t"s3 / s1",\n\t\t"s0 - i0",\n\t]);\n\n\treturn (\n\t\t<div>\n\t\t\t<ExpressionDisplay state={state1} />\n\t\t\t<ExpressionDisplay state={state2} />\n\t\t\t<ExpressionDisplay state={state2} intermIndex={0} color="interm1" />\n\t\t\t<ExpressionDisplay state={state2} intermIndex={1} color="interm2" />\n\t\t\t<ExpressionDisplay state={state2} evalInterm />\n\t\t\t<ExpressionDisplay\n\t\t\t\tstate={state2}\n\t\t\t\tevalInterm\n\t\t\t\tintermIndex={0}\n\t\t\t\tcolor="interm1"\n\t\t\t/>\n\t\t\t<ExpressionDisplay\n\t\t\t\tstate={state2}\n\t\t\t\tevalInterm\n\t\t\t\tintermIndex={1}\n\t\t\t\tcolor="interm2"\n\t\t\t/>\n\t\t\t<ExpressionDisplay state={state2} colorInterm />\n\t\t\t<ExpressionDisplay state={state2} evalInterm colorInterm />\n\t\t</div>\n\t);\n}',
					},
				},
				Main.parameters
			);
		},
		"./src/view/IconButton.stories.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Main: () => Main,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),
				__webpack_require__("./node_modules/react/index.js");
			var _stitches_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				_IconButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					"./src/view/IconButton.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				Column = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_2__.zo)("div", {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}),
				Row = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_2__.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "flex-start",
					variants: {
						align: {
							start: {alignItems: "flex-start"},
							end: {alignItems: "flex-end"},
						},
					},
				}),
				Main = function Main() {
					return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(
						Column,
						{
							children: [
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(Row, {
									children: [
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{number: 8, color: "start", size: "large"}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{number: [8, 3], color: "interm1", size: "large"}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{number: [-2, 1], color: "interm2", size: "large"}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{number: 2, color: "disabled", size: "large"}
										),
									],
								}),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
									style: {marginBottom: 12},
								}),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(Row, {
									children: [
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{icon: "(", color: "white"}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{icon: "*"}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{icon: "=", color: "white"}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{icon: "/"}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{icon: ")", color: "white"}
										),
									],
								}),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
									style: {marginBottom: 12},
								}),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(Row, {
									children: [
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{icon: "share", color: "white", size: "small"}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
											{icon: "help", color: "white", size: "small"}
										),
									],
								}),
							],
						}
					);
				};
			Main.displayName = "Main";
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: "Components/IconButton",
				component: _IconButton__WEBPACK_IMPORTED_MODULE_3__.Z,
			};
			Main.parameters = Object.assign(
				{
					storySource: {
						source:
							'() => {\n\treturn (\n\t\t<Column>\n\t\t\t<Row>\n\t\t\t\t<IconButton number={8} color="start" size="large" />\n\t\t\t\t<IconButton number={[8, 3]} color="interm1" size="large" />\n\t\t\t\t<IconButton number={[-2, 1]} color="interm2" size="large" />\n\t\t\t\t<IconButton number={2} color="disabled" size="large" />\n\t\t\t</Row>\n\t\t\t<div style={{marginBottom: 12}} />\n\t\t\t<Row>\n\t\t\t\t<IconButton icon="(" color="white" />\n\t\t\t\t<IconButton icon="*" />\n\t\t\t\t<IconButton icon="=" color="white" />\n\t\t\t\t<IconButton icon="/" />\n\t\t\t\t<IconButton icon=")" color="white" />\n\t\t\t</Row>\n\t\t\t<div style={{marginBottom: 12}} />\n\t\t\t<Row>\n\t\t\t\t<IconButton icon="share" color="white" size="small" />\n\t\t\t\t<IconButton icon="help" color="white" size="small" />\n\t\t\t</Row>\n\t\t</Column>\n\t);\n}',
					},
				},
				Main.parameters
			);
		},
		"./src/view/Main.stories.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					P1234ForbidParensConcat: () => P1234ForbidParensConcat,
					P1238OpLimit: () => P1238OpLimit,
					P1258NegTargets: () => P1258NegTargets,
					P1468SquareTargets: () => P1468SquareTargets,
					P2222Imposs: () => P2222Imposs,
					P2267: () => P2267,
					P3568SingleOps: () => P3568SingleOps,
					P3_4_8_36SingleOps: () => P3_4_8_36SingleOps,
					P4679ForbidOps: () => P4679ForbidOps,
					default: () => Main_stories,
				});
			__webpack_require__(
				"./node_modules/core-js/modules/es.date.to-string.js"
			),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				);
			var react = __webpack_require__("./node_modules/react/index.js"),
				printf =
					(__webpack_require__(
						"./node_modules/core-js/modules/es.array.map.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.every.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.reduce.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.find-index.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.index-of.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.string.split.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.regexp.exec.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.string.trim.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.number.constructor.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.is-array.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.filter.js"
					),
					__webpack_require__("./node_modules/core-js/modules/web.timers.js"),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.for-each.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/web.dom-collections.for-each.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.object.define-property.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.slice.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.object.to-string.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.function.name.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.from.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.string.iterator.js"
					),
					__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
					__webpack_require__(
						"./node_modules/core-js/modules/es.symbol.description.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.symbol.iterator.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/es.array.iterator.js"
					),
					__webpack_require__(
						"./node_modules/core-js/modules/web.dom-collections.iterator.js"
					),
					__webpack_require__("./node_modules/fast-printf/dist/src/printf.js")),
				mobx_esm = __webpack_require__("./node_modules/mobx/dist/mobx.esm.js"),
				Operators = __webpack_require__("./src/expr/Operators.ts"),
				Unicode = __webpack_require__("./src/util/Unicode.ts"),
				ErrorCopy = __webpack_require__("./src/util/ErrorCopy.ts"),
				State = __webpack_require__("./src/expr/State.ts"),
				Utils = __webpack_require__("./src/util/Utils.ts"),
				Constants = __webpack_require__("./src/view/util/Constants.tsx");
			function _slicedToArray(arr, i) {
				return (
					(function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function _iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function _unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return _arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function _nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function pstStringify(d) {
				return (
					d
						.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
						.split(",")
						.shift() || ""
				);
			}
			function pstStringifyForRobots(d) {
				var _pstStringify$split2 = _slicedToArray(
						pstStringify(d).split("/"),
						3
					),
					_pstStringify$split2$ = _pstStringify$split2[0],
					month = void 0 === _pstStringify$split2$ ? "" : _pstStringify$split2$,
					_pstStringify$split2$2 = _pstStringify$split2[1],
					day = void 0 === _pstStringify$split2$2 ? "" : _pstStringify$split2$2,
					_pstStringify$split2$3 = _pstStringify$split2[2],
					year =
						void 0 === _pstStringify$split2$3 ? "" : _pstStringify$split2$3;
				return (
					(0, Utils.WZ)(year, 4) +
					(0, Utils.WZ)(month, 2) +
					(0, Utils.WZ)(day, 2)
				);
			}
			function jumpDays(date, nDays) {
				if (Math.floor(nDays) !== nDays)
					throw new Error("nDays is not an integer");
				var newDate = new Date(date);
				return newDate.setDate(date.getDate() + nDays), newDate;
			}
			function AppState_slicedToArray(arr, i) {
				return (
					(function AppState_arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function AppState_iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					AppState_unsupportedIterableToArray(arr, i) ||
					(function AppState_nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _createForOfIteratorHelper(o, allowArrayLike) {
				var it =
					("undefined" != typeof Symbol && o[Symbol.iterator]) ||
					o["@@iterator"];
				if (!it) {
					if (
						Array.isArray(o) ||
						(it = AppState_unsupportedIterableToArray(o)) ||
						(allowArrayLike && o && "number" == typeof o.length)
					) {
						it && (o = it);
						var i = 0,
							F = function F() {};
						return {
							s: F,
							n: function n() {
								return i >= o.length ? {done: !0} : {done: !1, value: o[i++]};
							},
							e: function e(_e2) {
								throw _e2;
							},
							f: F,
						};
					}
					throw new TypeError(
						"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
					);
				}
				var err,
					normalCompletion = !0,
					didErr = !1;
				return {
					s: function s() {
						it = it.call(o);
					},
					n: function n() {
						var step = it.next();
						return (normalCompletion = step.done), step;
					},
					e: function e(_e3) {
						(didErr = !0), (err = _e3);
					},
					f: function f() {
						try {
							normalCompletion || null == it.return || it.return();
						} finally {
							if (didErr) throw err;
						}
					},
				};
			}
			function AppState_unsupportedIterableToArray(o, minLen) {
				if (o) {
					if ("string" == typeof o) return AppState_arrayLikeToArray(o, minLen);
					var n = Object.prototype.toString.call(o).slice(8, -1);
					return (
						"Object" === n && o.constructor && (n = o.constructor.name),
						"Map" === n || "Set" === n
							? Array.from(o)
							: "Arguments" === n ||
							  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							? AppState_arrayLikeToArray(o, minLen)
							: void 0
					);
				}
			}
			function AppState_arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function _defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					(descriptor.enumerable = descriptor.enumerable || !1),
						(descriptor.configurable = !0),
						"value" in descriptor && (descriptor.writable = !0),
						Object.defineProperty(target, descriptor.key, descriptor);
				}
			}
			(0, mobx_esm.jQ)({enforceActions: "always"});
			var AppState = (function () {
					function AppState(problem, problemDate) {
						!(function _classCallCheck(instance, Constructor) {
							if (!(instance instanceof Constructor))
								throw new TypeError("Cannot call a class as a function");
						})(this, AppState),
							(this.helpShowing = void 0),
							(this.displayedHelp = void 0),
							(this.linksShowing = void 0),
							(this.resultsShowing = void 0),
							(this.resultCopiedModalShowing = void 0),
							(this.statsShowing = void 0),
							(this.profile = void 0),
							(this.yesterdaysProblemDate = void 0),
							(this.yesterdaysProblem = void 0),
							(this.yesterdaysTargets = void 0),
							(this.problemDate = void 0),
							(this.problem = void 0),
							(this.targets = void 0),
							(this.exprState = void 0),
							(this.backspaceState = void 0),
							(this.equalsEnabled = void 0),
							(this.exprDividedByZero = void 0),
							(this.undosHighlighted = void 0),
							(this.grabbableWhenNonempty = void 0),
							(this.nextGen = void 0),
							(this.lastError = void 0),
							(this.lastResultMessage = void 0),
							(this.currAnimGen = void 0),
							(this.currAnim = void 0),
							(this.hasSharedToday = void 0),
							(this.buttonText = void 0),
							problemDate || (problemDate = new Date()),
							(this.profile = {
								numPlays: 0,
								numStreak: 0,
								numAllTens: 0,
								showHelpOnStart: !0,
							}),
							(this.displayedHelp = !1),
							(this.helpShowing = !1),
							(this.linksShowing = !1),
							(this.resultsShowing = !1),
							(this.resultCopiedModalShowing = !1),
							(this.statsShowing = !1);
						var targets = problem.targets.map(function (n) {
							return {
								number: n,
								impossible: !1,
								solution: null,
								solutionState: null,
								solveOrder: null,
							};
						});
						(this.problemDate = problemDate),
							(this.yesterdaysProblemDate = jumpDays(this.problemDate, -1)),
							(this.problem = problem),
							(this.targets = targets),
							(this.exprState = {
								start: this.problem.start,
								rules: this.problem.rules,
								main: [],
								interm: [],
							}),
							(this.backspaceState = null),
							(this.equalsEnabled = !1),
							(this.exprDividedByZero = !1),
							(this.undosHighlighted = !1),
							(this.grabbableWhenNonempty = !1),
							(this.nextGen = 1),
							(this.lastError = null),
							(this.lastResultMessage = null),
							(this.currAnimGen = 0),
							(this.currAnim = null),
							(this.hasSharedToday = !1),
							(0, mobx_esm.ky)(this, {
								exprState: mobx_esm.LO.ref,
								backspaceState: mobx_esm.LO.ref,
								lastError: mobx_esm.LO.ref,
								lastResultMessage: mobx_esm.LO.ref,
							});
					}
					return (
						(function _createClass(Constructor, protoProps, staticProps) {
							return (
								protoProps &&
									_defineProperties(Constructor.prototype, protoProps),
								staticProps && _defineProperties(Constructor, staticProps),
								Object.defineProperty(Constructor, "prototype", {writable: !1}),
								Constructor
							);
						})(AppState, [
							{
								key: "completed",
								get: function get() {
									return this.targets.every(function (t) {
										return t.impossible || t.solution;
									});
								},
							},
							{
								key: "numSolved",
								get: function get() {
									return this.targets
										.map(function (t) {
											return t.solution ? 1 : 0;
										})
										.reduce(function (partial, x) {
											return x + partial;
										}, 0);
								},
							},
							{
								key: "showHelp",
								value: function showHelp(value) {
									this.helpShowing = value;
								},
							},
							{
								key: "showLinks",
								value: function showLinks(value) {
									this.linksShowing = value;
								},
							},
							{
								key: "showResults",
								value: function showResults(value) {
									this.resultsShowing = value;
								},
							},
							{
								key: "showStats",
								value: function showStats(value) {
									this.statsShowing = value;
								},
							},
							{
								key: "showResultCopiedModal",
								value: function showResultCopiedModal(value) {
									(this.resultCopiedModalShowing = value),
										console.log(this.resultCopiedModalShowing);
								},
							},
							{
								key: "setError",
								value: function setError(message) {
									var _options$duration,
										options =
											arguments.length > 1 && void 0 !== arguments[1]
												? arguments[1]
												: {};
									if (message) {
										var gen = this.nextGen;
										(this.nextGen += 1),
											(this.lastError = {
												gen,
												message,
												duration:
													null !== (_options$duration = options.duration) &&
													void 0 !== _options$duration
														? _options$duration
														: 1500,
											});
									} else this.lastError = null;
								},
							},
							{
								key: "setResultMessage",
								value: function setResultMessage(message) {
									var _options$duration2,
										options =
											arguments.length > 1 && void 0 !== arguments[1]
												? arguments[1]
												: {};
									if (message) {
										var gen = this.nextGen;
										(this.nextGen += 1),
											(this.lastError = {
												gen,
												message,
												duration:
													null !== (_options$duration2 = options.duration) &&
													void 0 !== _options$duration2
														? _options$duration2
														: 1500,
											});
									} else this.lastResultMessage = null;
								},
							},
							{
								key: "pushStateElement",
								value: function pushStateElement(el) {
									var newState = State.jy(this.exprState, el),
										errors = State.P9(newState);
									if (errors.length) {
										var newStateAuto = this.tryAutoInterm(this.exprState, el);
										newStateAuto
											? (this.updateExpressionState(newStateAuto),
											  this.setAnim(null))
											: this.setError(this.convertExprError(newState, errors));
									} else
										this.updateExpressionState(newState), this.setAnim(null);
								},
							},
							{
								key: "pushEquals",
								value: function pushEquals() {
									if (State.a$(this.exprState)) this.tryAddTarget();
									else if (State.Gp(this.exprState)) {
										var newState = State._3(this.exprState),
											errors = State.P9(newState),
											finishValue = State.zo(this.exprState).value.evalValue;
										if (errors.length)
											this.setError(this.convertExprError(newState, errors));
										else if (null === finishValue)
											(this.equalsEnabled = !1),
												(this.undosHighlighted = !0),
												this.setError(ErrorCopy.DIVIDE_BY_ZERO);
										else {
											this.updateExpressionState(newState), this.setAnim(null);
											var intermIndex = newState.interm.length - 1,
												nbsIndex = State.D(newState).findIndex(function (b) {
													return (
														"interm" === b.el.type && b.el.index === intermIndex
													);
												});
											nbsIndex > -1 &&
												this.setAnim({
													name: "makeInterm",
													buttonIndex: nbsIndex,
												});
										}
									} else {
										var _errors = State.Ww(this.exprState);
										this.setError(
											this.convertExprError(this.exprState, _errors)
										);
									}
									State.H$(this.exprState)
										? ((this.exprDividedByZero = !0), (this.equalsEnabled = !1))
										: (this.exprDividedByZero = !1);
								},
							},
							{
								key: "resetExpression",
								value: function resetExpression() {
									this.updateExpressionState(
										{
											start: this.problem.start,
											rules: this.problem.rules,
											main: [],
											interm: [],
										},
										{previousIsBackspace: !0}
									),
										this.setAnim(null);
								},
							},
							{
								key: "doBackspace",
								value: function doBackspace() {
									var tryMain = State._F(this.exprState);
									if (tryMain === this.exprState) {
										var tryInterm = State.mN(this.exprState);
										tryInterm === this.exprState
											? this.backspaceState &&
											  this.updateExpressionState(this.backspaceState)
											: this.updateExpressionState(tryInterm);
									} else this.updateExpressionState(tryMain);
								},
							},
							{
								key: "grabTarget",
								value: function grabTarget(i) {
									var _this$targets$i;
									if (this.grabbableWhenNonempty || State.xb(this.exprState)) {
										var newState =
											null === (_this$targets$i = this.targets[i]) ||
											void 0 === _this$targets$i
												? void 0
												: _this$targets$i.solutionState;
										newState &&
											(this.updateExpressionState(newState, {
												grabbableWhenNonempty: !0,
											}),
											this.setAnim(null));
									}
								},
							},
							{
								key: "handleKeyboardChar",
								value: function handleKeyboardChar(_char) {
									var numberPos = ["q", "w", "a", "s"].indexOf(
										_char.toLowerCase()
									);
									if (/^[0-9]$/.test(_char)) {
										var buttonState = State.D(this.exprState)[
											State.Hl(this.exprState, _char)
										];
										if (!buttonState || "available" !== buttonState.state)
											return;
										return this.pushStateElement(buttonState.el);
									}
									if (numberPos > -1) {
										var _buttonState = State.D(this.exprState)[numberPos];
										if (!_buttonState || "available" !== _buttonState.state)
											return;
										return this.pushStateElement(_buttonState.el);
									}
									if ((0, Operators.qj)(_char)) {
										var op = (0, Operators.dd)(_char);
										return op && this.pushStateElement({type: "op", op});
									}
									if ("=" === _char) return this.pushEquals();
								},
							},
							{
								key: "areValidTargetsForProblem",
								value: function areValidTargetsForProblem(problem, targets) {
									var _step,
										start = problem.start,
										rules = problem.rules,
										_iterator = _createForOfIteratorHelper(targets);
									try {
										for (_iterator.s(); !(_step = _iterator.n()).done; ) {
											var t = _step.value;
											if (t.solution) {
												var exprState = {
														start,
														rules,
														interm: [],
														main: t.solution,
													},
													evalValue = State.zo(exprState).value.evalValue;
												if (
													!State.a$(exprState) ||
													State.Jw(exprState).length ||
													!evalValue ||
													1 !== evalValue[1] ||
													evalValue[0] !== t.number
												)
													return !1;
											}
										}
									} catch (err) {
										_iterator.e(err);
									} finally {
										_iterator.f();
									}
									return !0;
								},
							},
							{
								key: "saveToStorage",
								value: function saveToStorage() {
									localStorage.setItem(
										pstStringify(this.problemDate) + "-problem",
										JSON.stringify(this.problem)
									),
										localStorage.setItem(
											pstStringify(this.problemDate) + "-targets",
											JSON.stringify(this.targets)
										),
										localStorage.setItem(
											"allten-profile",
											JSON.stringify(this.profile)
										);
								},
							},
							{
								key: "loadFromStorage",
								value: function loadFromStorage() {
									var val;
									(this.loadFromCookies(),
									(val = localStorage.getItem(
										pstStringify(this.yesterdaysProblemDate) + "-problem"
									)) && (this.yesterdaysProblem = JSON.parse(val || "")),
									(val = localStorage.getItem(
										pstStringify(this.yesterdaysProblemDate) + "-targets"
									)) && this.yesterdaysProblem) &&
										((this.yesterdaysTargets = JSON.parse(val || "")),
										this.yesterdaysTargets &&
											(!!this.areValidTargetsForProblem(
												this.yesterdaysProblem,
												this.yesterdaysTargets
											) ||
												(this.yesterdaysTargets = void 0)));
									(val = localStorage.getItem(
										pstStringify(this.problemDate) + "-targets"
									)) &&
										((this.targets = JSON.parse(val || "")),
										!!this.areValidTargetsForProblem(
											this.problem,
											this.targets
										) ||
											(this.targets = this.problem.targets.map(function (n) {
												return {
													number: n,
													impossible: !1,
													solution: null,
													solutionState: null,
													solveOrder: null,
												};
											})));
									(val = localStorage.getItem("allten-profile")) &&
										(this.profile = JSON.parse(val || "")),
										this.updateProfileStatsToToday(),
										this.validateDaysPlayed(this.problemDate),
										this.validateNumAllTens(this.problemDate);
								},
							},
							{
								key: "loadFromCookies",
								value: function loadFromCookies() {
									var _step2,
										savedCookiesStr = document.cookie,
										_iterator2 =
											(pstStringify(this.yesterdaysProblemDate),
											_createForOfIteratorHelper(
												savedCookiesStr.split(";").map(function (cookie) {
													return cookie.split("=");
												})
											));
									try {
										for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
											var cookieArr = _step2.value;
											if (!(cookieArr.length < 2)) {
												var _cookieArr$map2 = AppState_slicedToArray(
														cookieArr.map(function (v) {
															return v.trim();
														}),
														2
													),
													key = _cookieArr$map2[0],
													val = _cookieArr$map2[1];
												switch (key) {
													case "numPlays":
													case "numStreak":
													case "numAllTens":
														(0, Utils.yL)(val || "") &&
															(this.profile[key] = Number(val));
														break;
													case "mostRecentPlayDate":
													case "mostRecentAllTen":
														/\d{2}-\d{2}-\d{4}/.test(val || "") &&
															(this.profile[key] = val);
												}
											}
										}
									} catch (err) {
										_iterator2.e(err);
									} finally {
										_iterator2.f();
									}
								},
							},
							{
								key: "updateProfileStatsToToday",
								value: function updateProfileStatsToToday() {
									var yesterday = pstStringifyForRobots(
										this.yesterdaysProblemDate
									);
									(this.profile.mostRecentPlayDate =
										this.profile.mostRecentPlayDate || ""),
										("" === this.profile.mostRecentPlayDate ||
											this.profile.mostRecentPlayDate < yesterday) &&
											(this.profile.numStreak = 0);
								},
							},
							{
								key: "validateDaysPlayed",
								value: function validateDaysPlayed(todaysDate) {
									for (var calculatedNumPlays = 0, loop = 0; loop < 30; loop++)
										localStorage.getItem(
											pstStringify(todaysDate) + "-problem"
										) &&
											localStorage.getItem(
												pstStringify(todaysDate) + "-targets"
											) &&
											calculatedNumPlays++,
											(todaysDate = jumpDays(todaysDate, -1));
									this.profile.numPlays < calculatedNumPlays &&
										((this.profile.numPlays = calculatedNumPlays),
										this.saveToStorage());
								},
							},
							{
								key: "validateNumAllTens",
								value: function validateNumAllTens(todaysDate) {
									for (
										var calculatedNumAllTens = 0, loop = 0;
										loop < 30;
										loop++
									) {
										var targets = JSON.parse(
											localStorage.getItem(
												pstStringify(todaysDate) + "-targets"
											) || "[]"
										);
										Array.isArray(targets) &&
											10 ===
												targets.filter(function (target) {
													return null == target ? void 0 : target.solution;
												}).length &&
											(calculatedNumAllTens++, console.log("")),
											(todaysDate = jumpDays(todaysDate, -1));
									}
									this.profile.numAllTens < calculatedNumAllTens &&
										((this.profile.numAllTens = calculatedNumAllTens),
										this.saveToStorage());
								},
							},
							{
								key: "updateExpressionState",
								value: function updateExpressionState(newState) {
									var options =
										arguments.length > 1 && void 0 !== arguments[1]
											? arguments[1]
											: {};
									(this.backspaceState = options.previousIsBackspace
										? this.exprState
										: null),
										(this.exprState = newState);
									var newEqualsEnabled = State.Xn(this.exprState);
									(this.undosHighlighted = !1),
										(this.equalsEnabled =
											null === newEqualsEnabled
												? this.equalsEnabled
												: newEqualsEnabled),
										(this.grabbableWhenNonempty =
											!!options.grabbableWhenNonempty),
										(this.lastError = null);
								},
							},
							{
								key: "tryAutoInterm",
								value: function tryAutoInterm(exprState, el) {
									var newState = State.nF(exprState, el);
									return newState
										? State.P9(newState).length
											? null
											: newState
										: null;
								},
							},
							{
								key: "tryAddTarget",
								value: function tryAddTarget() {
									var _this = this,
										finishRes = State.zo(this.exprState),
										_finishRes$value = finishRes.value,
										line = _finishRes$value.line,
										evalValue = _finishRes$value.evalValue;
									if (null !== evalValue)
										if (1 === evalValue[1]) {
											if (null === line)
												return (
													console.error(
														"Unexpected error",
														"Could not flatten expression",
														finishRes.errors
													),
													void this.setError(ErrorCopy.INTERNAL)
												);
											this.profile.showHelpOnStart = !1;
											var num = evalValue[0],
												numStr =
													num < 0 ? Unicode.hL + String(-num) : String(num),
												targetIndex = this.targets.findIndex(function (t) {
													return t.number === num;
												}),
												targetState = this.targets[targetIndex],
												firstAllTenForDay =
													this.profile.mostRecentAllTen ===
													pstStringify(this.problemDate),
												firstSolutionForToday =
													(this.profile.mostRecentPlayDate || "00000000") <
													pstStringifyForRobots(this.problemDate);
											if (!targetState)
												return (
													(this.undosHighlighted = !0),
													void this.setError(
														(0, printf.zt)(ErrorCopy.NOT_TARGET, numStr)
													)
												);
											var newTargetSolved = !1;
											firstSolutionForToday &&
												((this.profile.numStreak += 1),
												(this.profile.numPlays += 1),
												(this.profile.mostRecentPlayDate =
													pstStringifyForRobots(this.problemDate))),
												targetState.solution ||
													((targetState.solveOrder = this.numSolved + 1),
													(newTargetSolved = !0)),
												(targetState.solution = line),
												(targetState.solutionState = this.exprState),
												this.saveToStorage(),
												!firstAllTenForDay &&
													this.completed &&
													(this.showResults(!0),
													(this.profile.numAllTens += 1),
													(this.profile.mostRecentAllTen = pstStringify(
														this.problemDate
													)),
													this.saveToStorage()),
												this.tryFillImpossible(),
												this.resetExpression(),
												this.setAnim({
													name: newTargetSolved
														? "makeTarget"
														: "makeExtraTarget",
													targetIndex,
												}),
												setTimeout(function () {
													_this.buttonText = "+1";
												}, 1200),
												setTimeout(function () {
													_this.buttonText = void 0;
												}, 2e3);
										} else {
											var _evalValue = AppState_slicedToArray(evalValue, 2),
												fraction = _evalValue[0] + "/" + _evalValue[1];
											this.setError(ErrorCopy.FRACTION_NOT_INTEGER(fraction));
										}
									else this.setError(ErrorCopy.DIVIDE_BY_ZERO);
								},
							},
							{
								key: "tryFillImpossible",
								value: function tryFillImpossible() {
									var impossible = this.problem.rules.impossible;
									impossible <= 0 ||
										(this.targets.filter(function (t) {
											return !t.solution;
										}).length <= impossible &&
											this.targets.forEach(function (t) {
												t.impossible = !t.solution;
											}));
								},
							},
							{
								key: "convertExprError",
								value: function convertExprError(badState, errors) {
									if (!errors.length) return null;
									var usedAllNumbers = State.F1(badState),
										firstErr = errors[0],
										code = firstErr.code;
									if (
										"E_EMPTY_EXPRESSION" === code ||
										"E_DANGLING_OPERATOR" === code
									)
										return usedAllNumbers
											? ErrorCopy.UNNECESSARY_OPERATORS
											: ErrorCopy.INCOMPLETE_EXPRESSION;
									if ("E_MISPLACED_OPERATOR" === code)
										return usedAllNumbers
											? ErrorCopy.UNNECESSARY_OPERATORS
											: ErrorCopy.MISPLACED_OPERATOR;
									if ("E_NOT_ENOUGH_FOR_INTERM" === code)
										return ErrorCopy.INCOMPLETE_EXPRESSION;
									if ("E_TOO_LONG" === code) return ErrorCopy.TOO_LONG;
									if (
										"E_UNCLOSED_PAREN" === code ||
										"E_UNOPENED_PAREN" === code
									)
										return ErrorCopy.INVALID_PARENTHESES;
									if (
										"E_NO_IMPLICIT_MULTIPLICATION" === code ||
										"E_CONCAT_NON_DIGIT" === code
									)
										return ErrorCopy.INVALID_CONCAT;
									if ("E_UNUSED_NUMBER" === code)
										return ErrorCopy.UNUSED_NUMBER;
									if ("E_DIVIDE_BY_ZERO" === code)
										return ErrorCopy.DIVIDE_BY_ZERO;
									if ("E_RULE_FORBIDDEN_OP" === code) {
										var op = Unicode.H4(firstErr.op);
										return (0, printf.zt)(ErrorCopy.RULE_FORBIDDEN_OP, op);
									}
									return "E_RULE_FORBIDDEN_PARENS" === code
										? ErrorCopy.RULE_FORBIDDEN_PARENS
										: "E_RULE_FORBIDDEN_CONCAT" === code
										? ErrorCopy.RULE_FORBIDDEN_CONCAT
										: "E_RULE_MULTIPLE_OPS" === code
										? ErrorCopy.RULE_MULTIPLE_OPS
										: "E_RULE_OPS_OVER_LIMIT" === code
										? (0, printf.zt)(
												ErrorCopy.RULE_OPS_OVER_LIMIT,
												firstErr.limit
										  )
										: (console.error("Unexpected error", errors),
										  ErrorCopy.INTERNAL);
								},
							},
							{
								key: "setAnim",
								value: function setAnim(newAnim) {
									newAnim && (this.currAnimGen += 1), (this.currAnim = newAnim);
								},
							},
						]),
						AppState
					);
				})(),
				Problem = __webpack_require__("./src/state/Problem.ts"),
				es = __webpack_require__("./node_modules/mobx-react-lite/es/index.js"),
				stitches_config = __webpack_require__("./src/stitches.config.ts"),
				AnimControl = __webpack_require__("./src/view/util/AnimControl.tsx");
			function startMakeTarget(ctrl, targetIndex, extra) {
				var _els2,
					targetExprName = "targetExpr" + targetIndex,
					translateFrom = ctrl.getTranslation("fakeAnimButton", "exprDisplay"),
					translateTo = ctrl.getTranslation("fakeAnimButton", targetExprName),
					translateToAbove = ctrl.getTranslation(
						"fakeAnimButton",
						targetExprName,
						"up"
					),
					exprDisplayTextVanishKF = (0, stitches_config.F4)({
						"0%": {
							opacity: 1,
							transform: "initial",
							"-webkit-transform": "initial",
							transformOrigin: "center",
							"-webkit-transform-origin": "center",
						},
						"30%": {
							opacity: 0,
							transform: "scale(0, 0)",
							"-webkit-transform": "scale(0, 0)",
							transformOrigin: "center",
							"-webkit-transform-origin": "center",
						},
						"100%": {
							opacity: 0,
							transform: "scale(0, 0)",
							"-webkit-transform": "scale(0, 0)",
							transformOrigin: "center",
							"-webkit-transform-origin": "center",
						},
					}),
					targetExprLeavingKF = (0, stitches_config.F4)({
						"0%": {opacity: 1},
						"50%": {opacity: 1},
						"100%": {opacity: 0},
					}),
					fakeButtonAppearKF = (0, stitches_config.F4)({
						"0%": {opacity: 0},
						"10%": {opacity: 0},
						"40%": {opacity: 1},
						"60%": {opacity: 1},
						"80%": {opacity: 0},
						"100%": {opacity: 0},
					}),
					fakeButtonMoveKF = extra
						? (0, stitches_config.F4)({
								"0%": {
									transform: translateFrom,
									"-webkit-transform": translateFrom,
								},
								"18%": {
									transform: translateFrom,
									"-webkit-transform": translateFrom,
								},
								"50%": {
									transform: translateTo,
									"-webkit-transform": translateTo,
								},
								"80%": {
									transform: translateToAbove,
									"-webkit-transform": translateToAbove,
								},
								"100%": {
									transform: translateToAbove,
									"-webkit-transform": translateToAbove,
								},
						  })
						: (0, stitches_config.F4)({
								"0%": {
									transform: translateFrom,
									"-webkit-transform": translateFrom,
								},
								"25%": {
									transform: translateFrom,
									"-webkit-transform": translateFrom,
								},
								"62.5%": {
									transform: translateTo,
									"-webkit-transform": translateTo,
								},
								"100%": {
									transform: translateTo,
									"-webkit-transform": translateTo,
								},
						  }),
					duration = extra ? 2400 : 1600,
					durationCSS = duration + "ms";
				ctrl.startAnim({
					duration,
					els:
						((_els2 = {
							exprDisplay: {
								leavingAnim: {
									animation:
										exprDisplayTextVanishKF +
										" " +
										durationCSS +
										" linear forwards",
								},
							},
							fakeAnimButton: {
								mainAnim: {
									animation:
										fakeButtonAppearKF +
										" " +
										durationCSS +
										" linear both, " +
										fakeButtonMoveKF +
										" " +
										durationCSS +
										" ease-in-out both",
								},
							},
						}),
						(_els2[targetExprName] = {
							leavingAnim: {
								animation:
									targetExprLeavingKF +
									" " +
									durationCSS +
									" ease-in-out forwards",
							},
						}),
						_els2),
				});
			}
			function startAnim(ctrl, anim) {
				"makeInterm" === anim.name
					? (function startMakeInterm(ctrl, buttonIndex) {
							var _els,
								numberButtonName = "numberButton" + buttonIndex,
								translate = ctrl.getTranslation(
									numberButtonName,
									"exprDisplay"
								),
								exprDisplayTextVanishKF = (0, stitches_config.F4)({
									"0%": {
										opacity: 1,
										transform: "initial",
										"-webkit-transform": "initial",
										transformOrigin: "center",
										"-webkit-transform-origin": "center",
									},
									"60%": {
										opacity: 0,
										transform: "scale(0, 0)",
										"-webkit-transform": "scale(0, 0)",
										transformOrigin: "center",
										"-webkit-transform-origin": "center",
									},
									"100%": {
										opacity: 0,
										transform: "scale(0, 0)",
										"-webkit-transform": "scale(0, 0)",
										transformOrigin: "center",
										"-webkit-transform-origin": "center",
									},
								}),
								intermButtonAppearKF = (0, stitches_config.F4)({
									"0%": {opacity: 0},
									"20%": {opacity: 0},
									"80%": {opacity: 1},
									"100%": {opacity: 1},
								}),
								intermButtonMoveKF = (0, stitches_config.F4)({
									"0%": {transform: translate, "-webkit-transform": translate},
									"40%": {transform: translate, "-webkit-transform": translate},
									"100%": {
										transform: "translate(0, 0)",
										"-webkit-transform": "translate(0, 0)",
									},
								});
							ctrl.startAnim({
								duration: 800,
								els:
									((_els = {
										exprDisplay: {
											leavingAnim: {
												animation:
													exprDisplayTextVanishKF + " 800ms linear forwards",
											},
										},
									}),
									(_els[numberButtonName] = {
										mainAnim: {
											animation:
												intermButtonAppearKF +
												" 800ms linear, " +
												intermButtonMoveKF +
												" 800ms ease-in-out",
										},
									}),
									_els),
							});
					  })(ctrl, anim.buttonIndex)
					: "makeTarget" === anim.name
					? startMakeTarget(ctrl, anim.targetIndex)
					: "makeExtraTarget" === anim.name &&
					  startMakeTarget(ctrl, anim.targetIndex, !0);
			}
			var jsx_runtime = __webpack_require__(
				"./node_modules/react/jsx-runtime.js"
			);
			function AnimationProvider_slicedToArray(arr, i) {
				return (
					(function AnimationProvider_arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function AnimationProvider_iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function AnimationProvider_unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o)
							return AnimationProvider_arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return AnimationProvider_arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function AnimationProvider_nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function AnimationProvider_arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var AnimationProvider = function AnimationProvider(props) {
				var children = props.children,
					currAnimGen = props.currAnimGen,
					currAnim = props.currAnim,
					ctrl = AnimationProvider_slicedToArray(
						(0, react.useState)(new AnimControl.Y()),
						1
					)[0],
					lastGenRef = (0, react.useRef)(null);
				return (
					(0, react.useLayoutEffect)(
						function () {
							var _lastGenRef$current;
							currAnim &&
							(null !== (_lastGenRef$current = lastGenRef.current) &&
							void 0 !== _lastGenRef$current
								? _lastGenRef$current
								: 0) < currAnimGen
								? ((lastGenRef.current = currAnimGen),
								  startAnim(ctrl, currAnim))
								: currAnim ||
								  null === lastGenRef.current ||
								  ((lastGenRef.current = null), ctrl.stopAnim());
						},
						[ctrl, currAnim]
					),
					(0, react.useEffect)(
						function () {
							var stopAnim = function stopAnim() {
								ctrl.stopAnim();
							};
							return (
								"undefined" != typeof window &&
									window.addEventListener("resize", stopAnim),
								function () {
									"undefined" != typeof window &&
										window.removeEventListener("resize", stopAnim);
								}
							);
						},
						[ctrl]
					),
					(0, jsx_runtime.jsx)(AnimControl.N.Provider, {value: ctrl, children})
				);
			};
			AnimationProvider.displayName = "AnimationProvider";
			const view_AnimationProvider = (0, es.Pi)(AnimationProvider);
			try {
				(AnimationProvider.displayName = "AnimationProvider"),
					(AnimationProvider.__docgenInfo = {
						description: "",
						displayName: "AnimationProvider",
						props: {
							currAnimGen: {
								defaultValue: null,
								description: "",
								name: "currAnimGen",
								required: !0,
								type: {name: "number"},
							},
							currAnim: {
								defaultValue: null,
								description: "",
								name: "currAnim",
								required: !0,
								type: {name: "AppAnimation | null"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/AnimationProvider.tsx#AnimationProvider"
						] = {
							docgenInfo: AnimationProvider.__docgenInfo,
							name: "AnimationProvider",
							path: "src/view/AnimationProvider.tsx#AnimationProvider",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var AnimationHook = __webpack_require__("./src/view/AnimationHook.tsx"),
				Line = __webpack_require__("./src/expr/Line.ts"),
				Rules = __webpack_require__("./src/expr/Rules.ts"),
				IconButton = __webpack_require__("./src/view/IconButton.tsx"),
				TargetDisplay = __webpack_require__("./src/view/TargetDisplay.tsx"),
				ExpressionDisplay = __webpack_require__(
					"./src/view/ExpressionDisplay.tsx"
				),
				SlideIn = (0, stitches_config.F4)({
					"0%": {opacity: 0, top: "20px"},
					"100%": {opacity: 1, top: "0"},
				}),
				Background = (0, stitches_config.zo)("div", {
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					zIndex: "50",
					margin: 0,
					backgroundColor: "$bgTransparent",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					transition: "opacity 0.3s ease-in",
					opacity: 0,
					overflow: "hidden",
					visibility: "hidden",
					display: "none",
					variants: {
						show: {true: {opacity: 1, visibility: "visible", display: "flex"}},
						priority: {true: {zIndex: 100}},
					},
				}),
				Body = (0, stitches_config.zo)("div", {
					display: "none",
					position: "relative",
					width: "min(95%, 450px)",
					maxHeight: "min(95%, 750px)",
					borderRadius: "10px",
					backgroundColor: "$bg",
					padding: "20px 0",
					boxSizing: "border-box",
					animation: SlideIn + " ease-in .3s",
					boxShadow:
						"1px 2px 16px 4px rgba(15, 10, 8, .05),1px 1px 8px 1px rgba(15, 10, 8, .08),1px 1px 4px 1px rgba(15, 10, 8, .04)",
					transition: "opacity 0.3s ease-in, top 0.3s ease-in, visibility 0.3s",
					opacity: 0,
					top: "20px",
					visibility: "hidden",
					overflow: "hidden",
					variants: {
						size: {
							fullscreen: {
								width: "100%",
								height: "100%",
								maxHeight: "initial",
								borderRadius: "0",
							},
							wide: {width: "min(95%, 730px)"},
						},
						extraPad: {true: {padding: "30px 0"}},
						show: {
							true: {
								opacity: 1,
								top: 0,
								right: 0,
								display: "block",
								visibility: "visible",
							},
						},
					},
				}),
				ContentContainer = (0, stitches_config.zo)("div", {
					overflowY: "auto",
					"-ms-overflow-style": "none",
					scrollbarWidth: "none",
					padding: "0 20px",
					height: "100%",
					variants: {
						center: {
							true: {
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							},
						},
					},
				}),
				CloseButton = (0, stitches_config.zo)("div", {
					position: "absolute",
					top: "10px",
					right: "10px",
					zIndex: 10,
				}),
				handleDrag = function handleDrag(e) {
					e.stopPropagation();
				},
				Modal = function Modal(props) {
					var children = props.children,
						close = props.close,
						size = props.size,
						extraPad = props.extraPad,
						show = props.show,
						center = props.center,
						priority = props.priority,
						hideClose = props.hideClose,
						bodyRef = (0, react.useRef)(null);
					return (0, jsx_runtime.jsx)(Background, {
						show,
						onClick: function closeIfClickOutside(e) {
							if (bodyRef.current) {
								var _body$getBoundingClie =
										bodyRef.current.getBoundingClientRect(),
									x = _body$getBoundingClie.x,
									y = _body$getBoundingClie.y,
									width = _body$getBoundingClie.width,
									height = _body$getBoundingClie.height,
									clientX = e.clientX,
									clientY = e.clientY;
								(clientX < x ||
									clientX > x + width ||
									clientY < y ||
									clientY > y + height) &&
									close();
							}
						},
						priority,
						children: (0, jsx_runtime.jsxs)(Body, {
							ref: bodyRef,
							size,
							extraPad,
							show,
							children: [
								hideClose
									? (0, jsx_runtime.jsx)(jsx_runtime.Fragment, {})
									: (0, jsx_runtime.jsx)(CloseButton, {
											children: (0, jsx_runtime.jsx)(IconButton.Z, {
												icon: "close",
												size: "small",
												noBackground: !0,
												color: "mainInverted",
												onClick: close,
											}),
									  }),
								(0, jsx_runtime.jsx)(ContentContainer, {
									center,
									onDragStart: handleDrag,
									children,
								}),
							],
						}),
					});
				};
			Modal.displayName = "Modal";
			const view_Modal = (0, es.Pi)(Modal);
			try {
				(Modal.displayName = "Modal"),
					(Modal.__docgenInfo = {
						description: "",
						displayName: "Modal",
						props: {
							close: {
								defaultValue: null,
								description: "",
								name: "close",
								required: !0,
								type: {name: "() => void"},
							},
							size: {
								defaultValue: null,
								description: "",
								name: "size",
								required: !1,
								type: {
									name: "enum",
									value: [{value: '"fullscreen"'}, {value: '"wide"'}],
								},
							},
							extraPad: {
								defaultValue: null,
								description: "",
								name: "extraPad",
								required: !1,
								type: {name: "boolean"},
							},
							show: {
								defaultValue: null,
								description: "",
								name: "show",
								required: !1,
								type: {name: "boolean"},
							},
							center: {
								defaultValue: null,
								description: "",
								name: "center",
								required: !1,
								type: {name: "boolean"},
							},
							priority: {
								defaultValue: null,
								description: "",
								name: "priority",
								required: !1,
								type: {name: "boolean"},
							},
							hideClose: {
								defaultValue: null,
								description: "",
								name: "hideClose",
								required: !1,
								type: {name: "boolean"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/Modal.tsx#Modal"] = {
							docgenInfo: Modal.__docgenInfo,
							name: "Modal",
							path: "src/view/Modal.tsx#Modal",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var Title = (0, stitches_config.zo)("h2", {
					color: "$main",
					width: "100%",
					textAlign: "center",
					marginTop: 0,
					marginBottom: "10px",
					fontSize: "24px",
				}),
				Subheading = (0, stitches_config.zo)("h3", {
					color: "$main",
					width: "100%",
					textAlign: "center",
					marginTop: 0,
					marginBottom: "10px",
					fontSize: "16px",
				}),
				SubtleSubheading = (0, stitches_config.zo)("h3", {
					fontSize: "12px",
					textAlign: "center",
					fontWeight: "300",
					letterSpacing: "0.1em",
					variants: {
						bold: {true: {fontWeight: "bold"}},
						inline: {true: {display: "inline"}},
					},
				}),
				SubtleLabel = (0, stitches_config.zo)("span", {
					fontSize: "14px",
					textAlign: "center",
					fontWeight: "300",
					variants: {onRight: {true: {paddingLeft: ".15em"}}},
				}),
				Container = (0, stitches_config.zo)("div", {
					display: "block",
					width: "100%",
					variants: {
						pad: {true: {padding: "20px"}},
						horizontal: {
							true: {
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								flexWrap: "nowrap",
							},
						},
					},
				}),
				Centered = (0, stitches_config.zo)(Container, {
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					margin: 0,
					padding: 0,
				}),
				Space = (0, stitches_config.zo)("div", {
					background: "$bg",
					position: "sticky",
					height: Constants.Tj,
					backgroundColor: "$bg",
					zIndex: "-1",
					margin: 0,
					variants: {small: {true: {height: Constants.IB}}},
				}),
				Paragraph = (0, stitches_config.zo)("div", {
					color: "$main",
					fontSize: "12pt",
					marginTop: "6px",
					marginBottom: "6px",
					variants: {
						bold: {true: {fontWeight: "bold"}},
						padded: {true: {marginTop: "10px"}},
						large: {true: {fontSize: "24px"}},
						centered: {true: {width: "100%", textAlign: "center"}},
					},
				}),
				Aside = (0, stitches_config.zo)("div", {
					color: "$main",
					fontSize: "18px",
					marginTop: "12px",
					marginBottom: 0,
					fontWeight: "bold",
					textAlign: "center",
				}),
				IconButtonContainer = (0, stitches_config.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 4,
					marginBottom: 4,
				}),
				ExpressionContainer = (0, stitches_config.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					padding: "10px",
					borderWidth: 1,
					backgroundColor: "$lightGray",
					borderRadius: 6,
					margin: "6px",
					variants: {
						margin: {large: {marginTop: "10px", marginBottom: "10px"}},
					},
				}),
				ThreeColumnContainer = (0, stitches_config.zo)("div", {
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
				});
			try {
				(Title.displayName = "Title"),
					(Title.__docgenInfo = {
						description: "",
						displayName: "Title",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLHeadingElement | null) => void) | RefObject<HTMLHeadingElement> | null",
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/util/TextContainers.tsx#Title"] =
							{
								docgenInfo: Title.__docgenInfo,
								name: "Title",
								path: "src/view/util/TextContainers.tsx#Title",
							});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Subheading.displayName = "Subheading"),
					(Subheading.__docgenInfo = {
						description: "",
						displayName: "Subheading",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLHeadingElement | null) => void) | RefObject<HTMLHeadingElement> | null",
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#Subheading"
						] = {
							docgenInfo: Subheading.__docgenInfo,
							name: "Subheading",
							path: "src/view/util/TextContainers.tsx#Subheading",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(SubtleSubheading.displayName = "SubtleSubheading"),
					(SubtleSubheading.__docgenInfo = {
						description: "",
						displayName: "SubtleSubheading",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLHeadingElement | null) => void) | RefObject<HTMLHeadingElement> | null",
								},
							},
							bold: {
								defaultValue: null,
								description: "",
								name: "bold",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							inline: {
								defaultValue: null,
								description: "",
								name: "inline",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#SubtleSubheading"
						] = {
							docgenInfo: SubtleSubheading.__docgenInfo,
							name: "SubtleSubheading",
							path: "src/view/util/TextContainers.tsx#SubtleSubheading",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(SubtleLabel.displayName = "SubtleLabel"),
					(SubtleLabel.__docgenInfo = {
						description: "",
						displayName: "SubtleLabel",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null",
								},
							},
							onRight: {
								defaultValue: null,
								description: "",
								name: "onRight",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#SubtleLabel"
						] = {
							docgenInfo: SubtleLabel.__docgenInfo,
							name: "SubtleLabel",
							path: "src/view/util/TextContainers.tsx#SubtleLabel",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Container.displayName = "Container"),
					(Container.__docgenInfo = {
						description: "",
						displayName: "Container",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null",
								},
							},
							pad: {
								defaultValue: null,
								description: "",
								name: "pad",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							horizontal: {
								defaultValue: null,
								description: "",
								name: "horizontal",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#Container"
						] = {
							docgenInfo: Container.__docgenInfo,
							name: "Container",
							path: "src/view/util/TextContainers.tsx#Container",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Centered.displayName = "Centered"),
					(Centered.__docgenInfo = {
						description: "",
						displayName: "Centered",
						props: {
							horizontal: {
								defaultValue: null,
								description: "",
								name: "horizontal",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null",
								},
							},
							pad: {
								defaultValue: null,
								description: "",
								name: "pad",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#Centered"
						] = {
							docgenInfo: Centered.__docgenInfo,
							name: "Centered",
							path: "src/view/util/TextContainers.tsx#Centered",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Space.displayName = "Space"),
					(Space.__docgenInfo = {
						description: "",
						displayName: "Space",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null",
								},
							},
							small: {
								defaultValue: null,
								description: "",
								name: "small",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/util/TextContainers.tsx#Space"] =
							{
								docgenInfo: Space.__docgenInfo,
								name: "Space",
								path: "src/view/util/TextContainers.tsx#Space",
							});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Paragraph.displayName = "Paragraph"),
					(Paragraph.__docgenInfo = {
						description: "",
						displayName: "Paragraph",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null",
								},
							},
							bold: {
								defaultValue: null,
								description: "",
								name: "bold",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							padded: {
								defaultValue: null,
								description: "",
								name: "padded",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							large: {
								defaultValue: null,
								description: "",
								name: "large",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							centered: {
								defaultValue: null,
								description: "",
								name: "centered",
								required: !1,
								type: {
									name: 'boolean | "true" | ({ "@bpXSmall"?: boolean | "true"; "@bpSmall"?: boolean | "true"; "@bpMedium"?: boolean | "true" | undefined; "@bpLarge"?: boolean | "true" | undefined; "@bpExtraLarge"?: boolean | ... 1 more ... | undefined; "@initial"?: boolean | ... 1 more ... | undefined; } & { ...; }) ...',
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#Paragraph"
						] = {
							docgenInfo: Paragraph.__docgenInfo,
							name: "Paragraph",
							path: "src/view/util/TextContainers.tsx#Paragraph",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Aside.displayName = "Aside"),
					(Aside.__docgenInfo = {
						description: "",
						displayName: "Aside",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null",
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/util/TextContainers.tsx#Aside"] =
							{
								docgenInfo: Aside.__docgenInfo,
								name: "Aside",
								path: "src/view/util/TextContainers.tsx#Aside",
							});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(IconButtonContainer.displayName = "IconButtonContainer"),
					(IconButtonContainer.__docgenInfo = {
						description: "",
						displayName: "IconButtonContainer",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null",
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#IconButtonContainer"
						] = {
							docgenInfo: IconButtonContainer.__docgenInfo,
							name: "IconButtonContainer",
							path: "src/view/util/TextContainers.tsx#IconButtonContainer",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(ExpressionContainer.displayName = "ExpressionContainer"),
					(ExpressionContainer.__docgenInfo = {
						description: "",
						displayName: "ExpressionContainer",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null",
								},
							},
							margin: {
								defaultValue: null,
								description: "",
								name: "margin",
								required: !1,
								type: {
									name: '"large" | ({ "@bpXSmall"?: "large"; "@bpSmall"?: "large"; "@bpMedium"?: "large" | undefined; "@bpLarge"?: "large" | undefined; "@bpExtraLarge"?: "large" | undefined; "@initial"?: "large" | undefined; } & { ...; }) | undefined',
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#ExpressionContainer"
						] = {
							docgenInfo: ExpressionContainer.__docgenInfo,
							name: "ExpressionContainer",
							path: "src/view/util/TextContainers.tsx#ExpressionContainer",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(ThreeColumnContainer.displayName = "ThreeColumnContainer"),
					(ThreeColumnContainer.__docgenInfo = {
						description: "",
						displayName: "ThreeColumnContainer",
						props: {
							ref: {
								defaultValue: null,
								description: "",
								name: "ref",
								required: !1,
								type: {
									name: "((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null",
								},
							},
							as: {
								defaultValue: null,
								description: "",
								name: "as",
								required: !1,
								type: {name: "undefined"},
							},
							css: {
								defaultValue: null,
								description: "",
								name: "css",
								required: !1,
								type: {
									name: 'CSS<{ bpXSmall: "(min-width: 374px)"; bpSmall: "(min-width: 416px)"; bpMedium: "(min-width: 768px)"; bpLarge: "(min-width: 992px)"; bpExtraLarge: "(min-width: 1200px)"; }, { colors: { ...; }; }, DefaultThemeMap, {}>',
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/util/TextContainers.tsx#ThreeColumnContainer"
						] = {
							docgenInfo: ThreeColumnContainer.__docgenInfo,
							name: "ThreeColumnContainer",
							path: "src/view/util/TextContainers.tsx#ThreeColumnContainer",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var TargetDisplayContainer = (0, stitches_config.zo)("div", {
					height: Constants.kA,
					margin: "10px 0",
					padding: 0,
				}),
				Instructions_IconButtonContainer = (0, stitches_config.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 4,
					marginBottom: 4,
				}),
				WalkthroughContainer = (0, stitches_config.zo)("div", {
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}),
				Walkthrough = (0, stitches_config.zo)("img", {
					maxWidth: "min(60%, 300px)",
					aspectRatio: "auto",
				});
			function stringToLineWithLog(s) {
				var lineRes = (0, Line.J8)(s);
				return (
					lineRes.errors.length &&
						console.warn("Broken instructions line string", {
							string: s,
							errors: lineRes.errors,
						}),
					lineRes.value
				);
			}
			var Instructions = function Instructions(props) {
				var hideHelp = props.hideHelp,
					fullscreen = props.fullscreen,
					show = props.show,
					sampleProblemTarget = {
						start: [1, 2, 3, 4],
						targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
						rules: (0, Rules.j)(),
					},
					sampleTargetStates = [
						"(s3 - s2) / (s1 - s0)",
						"s2 - s3 / s1 + s0",
						"s0 + (s3 + s1) / s2",
						"s0 s3 / s1 - s2",
						"s3 + s2 / (s0 + s1)",
						"s1 s3 / (s2 + s0)",
						"s3 + s2 * (s1 - s0)",
						"s2 s1 / s3 * s0",
						"s2 * (s3 / s1 + s0)",
						"s0 + s1 + s2 + s3",
					].map(function (s, i) {
						return {
							number: i + 1,
							impossible: !1,
							solution: stringToLineWithLog(s),
							solutionState: null,
							solveOrder: null,
						};
					}),
					sampleExprState1 = {
						start: [1, 2, 3, 4],
						rules: (0, Rules.j)(),
						main: stringToLineWithLog("s3 + s2 * (s1 - s0)") || [],
						interm: [],
					},
					sampleExprState2 = {
						start: [12, 3, 0, 0],
						rules: (0, Rules.j)(),
						main: stringToLineWithLog("s0 / s1") || [],
						interm: [],
					},
					sampleExprState3 = {
						start: [3, 4, 0, 0],
						rules: (0, Rules.j)(),
						main: stringToLineWithLog("s0 - s1") || [],
						interm: [],
					},
					sampleExprState4 = {
						start: [8, 3, 0, 0],
						rules: (0, Rules.j)(),
						main: stringToLineWithLog("s0 / s1") || [],
						interm: [],
					};
				return (0, jsx_runtime.jsx)(view_Modal, {
					close: hideHelp,
					size: fullscreen ? "fullscreen" : void 0,
					show,
					children: (0, jsx_runtime.jsxs)(Container, {
						children: [
							(0, jsx_runtime.jsx)(Space, {}),
							(0, jsx_runtime.jsx)(Title, {children: "How to Play"}),
							(0, jsx_runtime.jsx)(Paragraph, {
								bold: !0,
								children:
									"Use all four numbers once each to make 1 through 10 using the given operations.",
							}),
							(0, jsx_runtime.jsx)(Space, {small: !0}),
							(0, jsx_runtime.jsx)(WalkthroughContainer, {
								children: (0, jsx_runtime.jsx)(Walkthrough, {
									src: "/u/AllTen/instructions.gif",
								}),
							}),
							(0, jsx_runtime.jsx)(Space, {small: !0}),
							(0, jsx_runtime.jsx)(Paragraph, {
								children: "For example, with 1, 2, 3, and 4, we can make:",
							}),
							(0, jsx_runtime.jsx)(TargetDisplayContainer, {
								children: (0, jsx_runtime.jsx)(TargetDisplay.Z, {
									problem: sampleProblemTarget,
									targets: sampleTargetStates,
									keySuffix: "Instrs",
								}),
							}),
							(0, jsx_runtime.jsxs)(Paragraph, {
								children: [
									"You can type all four numbers in one expression and press",
									" ",
									(0, jsx_runtime.jsx)(IconButton.Z, {
										icon: "=",
										inline: !0,
										size: "xsmall",
										color: "example",
									}),
									".",
								],
							}),
							(0, jsx_runtime.jsx)(ExpressionContainer, {
								margin: "large",
								children: (0, jsx_runtime.jsx)(ExpressionDisplay.Z, {
									state: sampleExprState1,
									size: "medium",
								}),
							}),
							(0, jsx_runtime.jsxs)(Paragraph, {
								children: [
									"Or, turn any expression into a new combo button with",
									" ",
									(0, jsx_runtime.jsx)(IconButton.Z, {
										icon: "=",
										inline: !0,
										size: "xsmall",
										color: "example",
									}),
									".",
								],
							}),
							(0, jsx_runtime.jsx)(Paragraph, {
								children: "Fractions and negatives are allowed.",
							}),
							(0, jsx_runtime.jsxs)(ThreeColumnContainer, {
								children: [
									(0, jsx_runtime.jsx)(ExpressionContainer, {
										children: (0, jsx_runtime.jsx)(ExpressionDisplay.Z, {
											state: sampleExprState2,
											size: "medium",
										}),
									}),
									(0, jsx_runtime.jsx)(ExpressionContainer, {
										children: (0, jsx_runtime.jsx)(ExpressionDisplay.Z, {
											state: sampleExprState3,
											size: "medium",
										}),
									}),
									(0, jsx_runtime.jsx)(ExpressionContainer, {
										children: (0, jsx_runtime.jsx)(ExpressionDisplay.Z, {
											state: sampleExprState4,
											size: "medium",
										}),
									}),
									(0, jsx_runtime.jsx)(Instructions_IconButtonContainer, {
										children: (0, jsx_runtime.jsx)(IconButton.Z, {
											number: 4,
											color: "interm1",
											size: "mediumNum",
										}),
									}),
									(0, jsx_runtime.jsx)(Instructions_IconButtonContainer, {
										children: (0, jsx_runtime.jsx)(IconButton.Z, {
											number: -1,
											color: "interm1",
											size: "mediumNum",
										}),
									}),
									(0, jsx_runtime.jsx)(Instructions_IconButtonContainer, {
										children: (0, jsx_runtime.jsx)(IconButton.Z, {
											number: [8, 3],
											color: "interm1",
											size: "mediumNum",
										}),
									}),
								],
							}),
							(0, jsx_runtime.jsx)(Paragraph, {
								children:
									"Combo buttons cannot be used to type multi-digit numbers.",
							}),
							(0, jsx_runtime.jsx)(Paragraph, {
								children: "All four original numbers must be used.",
							}),
							(0, jsx_runtime.jsx)(Aside, {children: "Try to get all ten!"}),
						],
					}),
				});
			};
			Instructions.displayName = "Instructions";
			const view_Instructions = (0, es.Pi)(Instructions);
			try {
				(Instructions.displayName = "Instructions"),
					(Instructions.__docgenInfo = {
						description: "",
						displayName: "Instructions",
						props: {
							hideHelp: {
								defaultValue: null,
								description: "",
								name: "hideHelp",
								required: !0,
								type: {name: "() => void"},
							},
							show: {
								defaultValue: null,
								description: "",
								name: "show",
								required: !0,
								type: {name: "boolean"},
							},
							fullscreen: {
								defaultValue: null,
								description: "",
								name: "fullscreen",
								required: !1,
								type: {name: "boolean"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/Instructions.tsx#Instructions"] =
							{
								docgenInfo: Instructions.__docgenInfo,
								name: "Instructions",
								path: "src/view/Instructions.tsx#Instructions",
							});
			} catch (__react_docgen_typescript_loader_error) {}
			var Colors = __webpack_require__("./src/view/util/Colors.ts"),
				Button_Container = (0, stitches_config.zo)("button", {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "$$color",
					color: "$$foreColor",
					borderColor: "$$color",
					borderStyle: "solid",
					borderRadius: 5,
					margin: 0,
					padding: "15px 10px",
					cursor: "pointer",
					transform: "scale(0.999)",
					transformOrigin: "center",
					height: "20px",
					fontSize: "14pt",
					transition: "color .2s ease-out",
					variants: {color: Colors.Jj},
					defaultVariants: {color: "main"},
				}),
				Button = function Button(props) {
					var onClick = props.onClick,
						text = props.text;
					return (0, jsx_runtime.jsx)(Button_Container, {
						onClick,
						children: text,
					});
				};
			Button.displayName = "Button";
			const view_Button = Button;
			try {
				(Button.displayName = "Button"),
					(Button.__docgenInfo = {
						description: "",
						displayName: "Button",
						props: {
							onClick: {
								defaultValue: null,
								description: "",
								name: "onClick",
								required: !0,
								type: {name: "() => void"},
							},
							text: {
								defaultValue: null,
								description: "",
								name: "text",
								required: !0,
								type: {name: "string"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/Button.tsx#Button"] = {
							docgenInfo: Button.__docgenInfo,
							name: "Button",
							path: "src/view/Button.tsx#Button",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var ResultCopiedModal = function ResultCopiedModal(props) {
				var hideModal = props.hideModal,
					show = props.show;
				return (0, jsx_runtime.jsx)(view_Modal, {
					close: hideModal,
					show,
					hideClose: !0,
					children: (0, jsx_runtime.jsxs)(Container, {
						horizontal: !0,
						children: [
							(0, jsx_runtime.jsx)(Paragraph, {
								children: "Results copied to clipboard.",
							}),
							(0, jsx_runtime.jsx)(view_Button, {
								onClick: hideModal,
								text: "OK",
							}),
						],
					}),
				});
			};
			ResultCopiedModal.displayName = "ResultCopiedModal";
			const view_ResultCopiedModal = (0, es.Pi)(ResultCopiedModal);
			try {
				(ResultCopiedModal.displayName = "ResultCopiedModal"),
					(ResultCopiedModal.__docgenInfo = {
						description: "",
						displayName: "ResultCopiedModal",
						props: {
							hideModal: {
								defaultValue: null,
								description: "",
								name: "hideModal",
								required: !0,
								type: {name: "() => void"},
							},
							show: {
								defaultValue: null,
								description: "",
								name: "show",
								required: !0,
								type: {name: "boolean"},
							},
							fullscreen: {
								defaultValue: null,
								description: "",
								name: "fullscreen",
								required: !1,
								type: {name: "boolean"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/ResultCopiedModal.tsx#ResultCopiedModal"
						] = {
							docgenInfo: ResultCopiedModal.__docgenInfo,
							name: "ResultCopiedModal",
							path: "src/view/ResultCopiedModal.tsx#ResultCopiedModal",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var Image = (0, stitches_config.zo)("img", {
					display: "inline-block",
					cursor: "pointer",
					variants: {disabled: {true: {cursor: "initial"}}},
				}),
				ImageButton = function ImageButton(props) {
					var type = props.type,
						alt = props.alt,
						disabled = props.disabled,
						onClick = props.onClick,
						size = props.size,
						realOnClick = disabled
							? function () {
									return null;
							  }
							: onClick,
						source = "u/AllTen/cube.svg";
					"aops-logo" === type
						? (source = "u/AllTen/aops-logo.svg")
						: "ba-logo" === type
						? (source = "u/AllTen/ba-logo.svg")
						: "academy-logo" === type
						? (source = "u/AllTen/academy-logo.svg")
						: "beastacademy-logo" === type &&
						  (source = "u/AllTen/beastacademy-logo.svg");
					var style = {};
					return (
						"small" === size
							? ((style.width = "20px"), (style.height = "20px"))
							: "medium" === size
							? ((style.width = "30px"), (style.height = "30px"))
							: "banner" === size
							? ((style.height = "40px"), (style.width = "auto"))
							: "compactBanner" === size
							? ((style.height = "35px"), (style.width = "auto"))
							: "titleLogo" === size && (style.height = "26px"),
						(0, jsx_runtime.jsx)(Image, {
							src: source,
							alt,
							onClick: realOnClick,
							disabled,
							style,
						})
					);
				};
			ImageButton.displayName = "ImageButton";
			const view_ImageButton = ImageButton;
			try {
				(ImageButton.displayName = "ImageButton"),
					(ImageButton.__docgenInfo = {
						description: "",
						displayName: "ImageButton",
						props: {
							type: {
								defaultValue: null,
								description: "",
								name: "type",
								required: !0,
								type: {
									name: "enum",
									value: [
										{value: '"ba-boxes-logo"'},
										{value: '"aops-logo"'},
										{value: '"ba-logo"'},
										{value: '"academy-logo"'},
										{value: '"beastacademy-logo"'},
									],
								},
							},
							alt: {
								defaultValue: null,
								description: "",
								name: "alt",
								required: !0,
								type: {name: "string"},
							},
							invis: {
								defaultValue: null,
								description: "",
								name: "invis",
								required: !1,
								type: {name: "boolean"},
							},
							disabled: {
								defaultValue: null,
								description: "",
								name: "disabled",
								required: !1,
								type: {name: "boolean"},
							},
							onClick: {
								defaultValue: null,
								description: "",
								name: "onClick",
								required: !1,
								type: {name: "(() => void)"},
							},
							size: {
								defaultValue: null,
								description: "",
								name: "size",
								required: !1,
								type: {
									name: "enum",
									value: [
										{value: '"small"'},
										{value: '"medium"'},
										{value: '"banner"'},
										{value: '"compactBanner"'},
										{value: '"titleLogo"'},
									],
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/ImageButton.tsx#ImageButton"] = {
							docgenInfo: ImageButton.__docgenInfo,
							name: "ImageButton",
							path: "src/view/ImageButton.tsx#ImageButton",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var Card = (0, stitches_config.zo)("a", {
					display: "block",
					width: "calc(100% - 12px)",
					boxSizing: "border-box",
					margin: Constants.IB + "px 6px",
					padding: Constants.Tj,
					borderRadius: Constants.Tj,
					textDecoration: "none",
					boxShadow:
						"1px 1px 4px 2px rgba(15, 10, 8, .04),1px 1px 4px 1px rgba(15, 10, 8, .05),1px 1px 2px 1px rgba(15, 10, 8, .03)",
					variants: {
						compact: {
							true: {padding: Constants.IB, margin: Constants.a2 + "px 0"},
						},
					},
				}),
				CardText = (0, stitches_config.zo)("div", {
					color: "$main",
					marginTop: 0,
					marginBottom: "10px",
					variants: {
						type: {ba: {marginLeft: "43px"}, schools: {marginLeft: "10px"}},
					},
					fontSize: "16px",
				}),
				CardTitle = (0, stitches_config.zo)("div", {
					color: "$main",
					marginTop: 0,
					marginBottom: "10px",
					marginLeft: "10px",
					marginRight: "10px",
					fontSize: "24px",
					fontWeight: "bold",
				}),
				RedirectLink = (0, stitches_config.zo)("div", {
					marginBottom: 0,
					width: "100%",
					textAlign: "right",
					color: "$baRed",
				}),
				LinkCard = function LinkCard(props) {
					var type = props.type,
						compact = props.compact;
					return (0, jsx_runtime.jsxs)(Card, {
						href: "https://beastacademy.com/educators",
						compact,
						children: [
							(0, jsx_runtime.jsx)(CardTitle, {
								children: "Engaging Math Curriculum for Your Classroom",
							}),
							(0, jsx_runtime.jsx)(CardText, {
								type,
								children:
									"Beast Academy keeps your gifted students challenged, giving you more time to focus on your whole class.",
							}),
							(0, jsx_runtime.jsxs)(RedirectLink, {
								children: [
									"Learn More ",
									(0, jsx_runtime.jsx)("i", {
										className: "fa-solid fa-circle-arrow-right",
									}),
								],
							}),
						],
					});
				};
			LinkCard.displayName = "LinkCard";
			var ImageLinkCard = function ImageLinkCard(props) {
				var type = props.type,
					compact = props.compact,
					text =
						"Engaging math books and online learning for students grades 1" +
						Constants.H0 +
						"6.";
				return (0, jsx_runtime.jsxs)(Card, {
					href: "https://beastacademy.com/",
					compact,
					children: [
						(0, jsx_runtime.jsx)(view_ImageButton, {
							type: "ba-logo",
							alt: "Beast Academy logo.",
							size: compact ? "compactBanner" : "banner",
						}),
						(0, jsx_runtime.jsx)(CardText, {type, children: text}),
						(0, jsx_runtime.jsxs)(RedirectLink, {
							children: [
								"Visit ",
								"Beast Academy",
								" ",
								(0, jsx_runtime.jsx)("i", {
									className: "fa-solid fa-circle-arrow-right",
								}),
							],
						}),
					],
				});
			};
			ImageLinkCard.displayName = "ImageLinkCard";
			try {
				(LinkCard.displayName = "LinkCard"),
					(LinkCard.__docgenInfo = {
						description: "",
						displayName: "LinkCard",
						props: {
							type: {
								defaultValue: null,
								description: "",
								name: "type",
								required: !0,
								type: {
									name: "enum",
									value: [{value: '"ba"'}, {value: '"schools"'}],
								},
							},
							compact: {
								defaultValue: null,
								description: "",
								name: "compact",
								required: !1,
								type: {name: "boolean"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/LinkCard.tsx#LinkCard"] = {
							docgenInfo: LinkCard.__docgenInfo,
							name: "LinkCard",
							path: "src/view/LinkCard.tsx#LinkCard",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(ImageLinkCard.displayName = "ImageLinkCard"),
					(ImageLinkCard.__docgenInfo = {
						description: "",
						displayName: "ImageLinkCard",
						props: {
							type: {
								defaultValue: null,
								description: "",
								name: "type",
								required: !0,
								type: {
									name: "enum",
									value: [{value: '"ba"'}, {value: '"schools"'}],
								},
							},
							compact: {
								defaultValue: null,
								description: "",
								name: "compact",
								required: !1,
								type: {name: "boolean"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/LinkCard.tsx#ImageLinkCard"] = {
							docgenInfo: ImageLinkCard.__docgenInfo,
							name: "ImageLinkCard",
							path: "src/view/LinkCard.tsx#ImageLinkCard",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var Links_Container = (0, stitches_config.zo)("div", {
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					margin: "auto",
					overflowX: "hidden",
					overflowY: "auto",
					"-ms-overflow-style": "none",
					scrollbarWidth: "none",
				}),
				Links_Space = (0, stitches_config.zo)("div", {minHeight: Constants.Tj}),
				HalfSpace = (0, stitches_config.zo)("div", {minHeight: Constants.IB}),
				Privacy = (0, stitches_config.zo)("a", {color: "$main"}),
				Links = function Links(props) {
					var hideLinks = props.hideLinks,
						show = props.show,
						compact = props.compact;
					return (0, jsx_runtime.jsx)(view_Modal, {
						close: hideLinks,
						show,
						children: (0, jsx_runtime.jsxs)(Links_Container, {
							children: [
								compact
									? (0, jsx_runtime.jsx)(HalfSpace, {})
									: (0, jsx_runtime.jsx)(Links_Space, {}),
								(0, jsx_runtime.jsx)(HalfSpace, {}),
								(0, jsx_runtime.jsx)(ImageLinkCard, {type: "ba", compact}),
								(0, jsx_runtime.jsx)(LinkCard, {type: "schools", compact}),
								(0, jsx_runtime.jsx)(HalfSpace, {}),
								(0, jsx_runtime.jsx)(Privacy, {
									href: "https://beastacademy.com/privacy",
									children: "Privacy Policy",
								}),
								compact
									? (0, jsx_runtime.jsx)(HalfSpace, {})
									: (0, jsx_runtime.jsx)(Links_Space, {}),
							],
						}),
					});
				};
			Links.displayName = "Links";
			const view_Links = (0, es.Pi)(Links);
			try {
				(Links.displayName = "Links"),
					(Links.__docgenInfo = {
						description: "",
						displayName: "Links",
						props: {
							hideLinks: {
								defaultValue: null,
								description: "",
								name: "hideLinks",
								required: !0,
								type: {name: "() => void"},
							},
							show: {
								defaultValue: null,
								description: "",
								name: "show",
								required: !0,
								type: {name: "boolean"},
							},
							compact: {
								defaultValue: null,
								description: "",
								name: "compact",
								required: !1,
								type: {name: "boolean"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/Links.tsx#Links"] = {
							docgenInfo: Links.__docgenInfo,
							name: "Links",
							path: "src/view/Links.tsx#Links",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			__webpack_require__(
				"./node_modules/core-js/modules/es.string.replace.js"
			),
				__webpack_require__("./node_modules/core-js/modules/es.array.join.js");
			var copy_to_clipboard = __webpack_require__(
					"./node_modules/copy-to-clipboard/index.js"
				),
				copy_to_clipboard_default = __webpack_require__.n(copy_to_clipboard),
				isMobile = __webpack_require__(
					"./node_modules/ismobilejs/esm/isMobile.js"
				),
				ZERO_TO_TEN_STRINGS =
					(__webpack_require__(
						"./node_modules/core-js/modules/es.string.bold.js"
					),
					[
						"",
						"ONE-derful",
						"TWO-riffic",
						"THREE-mendous",
						"FOUR-bulous",
						"FIVE-tastic",
						"SIX-traordinary",
						"SEVEN-sational",
						"EIGHT-stonishing",
						"NINE-omenal",
						"ALL TEN!",
					]),
				ProgressDisplay_Container = (0, stitches_config.zo)("div", {
					fontSize: "20px",
					variants: {
						size: {large: {fontSize: "24px"}},
						color: {done: {color: "$done"}},
						margin: {small: {margin: ".5em 0"}},
					},
				}),
				ProgressDisplay = function ProgressDisplay(props) {
					var style = props.style,
						targets = props.targets,
						hideIfEmpty = props.hideIfEmpty,
						size = props.size,
						color = props.color,
						margin = props.margin,
						bold = props.bold,
						excited = props.excited,
						problemDate = props.problemDate,
						numCorrect = targets.filter(function (target) {
							return !!target.solution;
						}).length,
						numTotal = targets.length;
					if (hideIfEmpty && 0 === numCorrect)
						return (0, jsx_runtime.jsx)(ProgressDisplay_Container, {
							size,
							color,
							margin,
						});
					if ("fraction" === style)
						return (0, jsx_runtime.jsx)(ProgressDisplay_Container, {
							size,
							color,
							margin,
							children: numCorrect + "/" + numTotal,
						});
					var text,
						decoration = excited && numCorrect > 0 ? "!" : "";
					return (
						numCorrect < ZERO_TO_TEN_STRINGS.length
							? ((text =
									numCorrect <= 0
										? (function pstShortStringifyForHumans(d) {
												return (
													Constants.NJ[d.getDay()] +
													" " +
													Constants.qe[d.getMonth()] +
													". " +
													d.getDate()
												);
										  })(problemDate)
										: ZERO_TO_TEN_STRINGS[numCorrect] + decoration),
							  bold && (text = (0, jsx_runtime.jsx)("b", {children: text})))
							: (text = "TEN-tacular!"),
						(0, jsx_runtime.jsx)(ProgressDisplay_Container, {
							size,
							color,
							margin,
							children: text,
						})
					);
				};
			ProgressDisplay.displayName = "ProgressDisplay";
			const view_ProgressDisplay = ProgressDisplay;
			try {
				(ProgressDisplay.displayName = "ProgressDisplay"),
					(ProgressDisplay.__docgenInfo = {
						description: "",
						displayName: "ProgressDisplay",
						props: {
							style: {
								defaultValue: null,
								description: "",
								name: "style",
								required: !0,
								type: {
									name: "enum",
									value: [{value: '"text"'}, {value: '"fraction"'}],
								},
							},
							targets: {
								defaultValue: null,
								description: "",
								name: "targets",
								required: !0,
								type: {name: "TargetState[]"},
							},
							problemDate: {
								defaultValue: null,
								description: "",
								name: "problemDate",
								required: !0,
								type: {name: "Date"},
							},
							hideIfEmpty: {
								defaultValue: null,
								description: "",
								name: "hideIfEmpty",
								required: !1,
								type: {name: "boolean"},
							},
							size: {
								defaultValue: null,
								description: "",
								name: "size",
								required: !1,
								type: {name: "enum", value: [{value: '"large"'}]},
							},
							color: {
								defaultValue: null,
								description: "",
								name: "color",
								required: !1,
								type: {name: "enum", value: [{value: '"done"'}]},
							},
							margin: {
								defaultValue: null,
								description: "",
								name: "margin",
								required: !1,
								type: {name: "enum", value: [{value: '"small"'}]},
							},
							bold: {
								defaultValue: null,
								description: "",
								name: "bold",
								required: !1,
								type: {name: "boolean"},
							},
							excited: {
								defaultValue: null,
								description: "",
								name: "excited",
								required: !1,
								type: {name: "boolean"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/ProgressDisplay.tsx#ProgressDisplay"
						] = {
							docgenInfo: ProgressDisplay.__docgenInfo,
							name: "ProgressDisplay",
							path: "src/view/ProgressDisplay.tsx#ProgressDisplay",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			__webpack_require__("./node_modules/core-js/modules/es.array.sort.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.set-prototype-of.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.reflect.construct.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.bind.js"
				);
			function _construct(Parent, args, Class) {
				return (
					(_construct = _isNativeReflectConstruct()
						? Reflect.construct
						: function _construct(Parent, args, Class) {
								var a = [null];
								a.push.apply(a, args);
								var instance = new (Function.bind.apply(Parent, a))();
								return (
									Class && _setPrototypeOf(instance, Class.prototype), instance
								);
						  }),
					_construct.apply(null, arguments)
				);
			}
			function _isNativeReflectConstruct() {
				if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
				if (Reflect.construct.sham) return !1;
				if ("function" == typeof Proxy) return !0;
				try {
					return (
						Boolean.prototype.valueOf.call(
							Reflect.construct(Boolean, [], function () {})
						),
						!0
					);
				} catch (e) {
					return !1;
				}
			}
			function _setPrototypeOf(o, p) {
				return (
					(_setPrototypeOf =
						Object.setPrototypeOf ||
						function _setPrototypeOf(o, p) {
							return (o.__proto__ = p), o;
						}),
					_setPrototypeOf(o, p)
				);
			}
			function _toConsumableArray(arr) {
				return (
					(function _arrayWithoutHoles(arr) {
						if (Array.isArray(arr)) return AppStateUtil_arrayLikeToArray(arr);
					})(arr) ||
					(function _iterableToArray(iter) {
						if (
							("undefined" != typeof Symbol && null != iter[Symbol.iterator]) ||
							null != iter["@@iterator"]
						)
							return Array.from(iter);
					})(arr) ||
					(function AppStateUtil_unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o)
							return AppStateUtil_arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return AppStateUtil_arrayLikeToArray(o, minLen);
					})(arr) ||
					(function _nonIterableSpread() {
						throw new TypeError(
							"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function AppStateUtil_arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function getSortedTargets(targets) {
				return _construct(Array, _toConsumableArray(targets)).sort(function (
					a,
					b
				) {
					return (
						(a.solveOrder ? -1 : 0) + (b.solveOrder ? 1 : 0) ||
						(a.solveOrder || 0) - (b.solveOrder || 0)
					);
				});
			}
			var TargetContainer = (0, stitches_config.zo)("div", {
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
				}),
				Target = (0, stitches_config.zo)("div", {
					fontSize: "16px",
					fontWeight: "bold",
					variants: {done: {true: {color: "$done"}}},
				}),
				SolveOrderDisplay = function SolveOrderDisplay(props) {
					var sortedTargets = getSortedTargets(props.targets),
						key = 0,
						solveOrders = sortedTargets.map(function (target) {
							return (0,
							jsx_runtime.jsx)(Target, {done: !!target.solution, children: target.number}, key++);
						});
					return (0, jsx_runtime.jsx)(TargetContainer, {children: solveOrders});
				};
			SolveOrderDisplay.displayName = "SolveOrderDisplay";
			const view_SolveOrderDisplay = SolveOrderDisplay;
			try {
				(SolveOrderDisplay.displayName = "SolveOrderDisplay"),
					(SolveOrderDisplay.__docgenInfo = {
						description: "",
						displayName: "SolveOrderDisplay",
						props: {
							targets: {
								defaultValue: null,
								description: "",
								name: "targets",
								required: !0,
								type: {name: "TargetState[]"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/SolveOrderDisplay.tsx#SolveOrderDisplay"
						] = {
							docgenInfo: SolveOrderDisplay.__docgenInfo,
							name: "SolveOrderDisplay",
							path: "src/view/SolveOrderDisplay.tsx#SolveOrderDisplay",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function ShareButton_slicedToArray(arr, i) {
				return (
					(function ShareButton_arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function ShareButton_iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function ShareButton_unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o)
							return ShareButton_arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return ShareButton_arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function ShareButton_nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function ShareButton_arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var ShareButton_Container = (0, stitches_config.zo)("button", {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "$$color",
					color: "$$foreColor",
					borderColor: "$$color",
					borderStyle: "solid",
					borderRadius: 5,
					margin: 0,
					padding: "15px 10px",
					cursor: "pointer",
					transform: "scale(0.999)",
					transformOrigin: "center",
					height: "20px",
					fontSize: "14pt",
					transition: "color .2s ease-out",
					variants: {color: Colors.Jj},
					defaultVariants: {color: "main"},
				}),
				Icon = (0, stitches_config.zo)("span", {marginLeft: ".5em"}),
				ShareButton = function ShareButton(props) {
					var doShare = props.doShare,
						_useState2 = ShareButton_slicedToArray((0, react.useState)(!1), 2),
						clicked = _useState2[0],
						setClicked = _useState2[1];
					return (0, jsx_runtime.jsxs)(ShareButton_Container, {
						onClick: function onClick() {
							doShare(), setClicked(!0);
						},
						color: clicked ? "done" : void 0,
						children: [
							"SHARE",
							(0, jsx_runtime.jsx)(Icon, {
								children: (0, jsx_runtime.jsx)("i", {
									className: "fas " + (clicked ? "fa-clipboard" : "fa-share"),
								}),
							}),
						],
					});
				};
			ShareButton.displayName = "ShareButton";
			const view_ShareButton = ShareButton;
			try {
				(ShareButton.displayName = "ShareButton"),
					(ShareButton.__docgenInfo = {
						description: "",
						displayName: "ShareButton",
						props: {
							doShare: {
								defaultValue: null,
								description: "",
								name: "doShare",
								required: !0,
								type: {name: "() => void"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/ShareButton.tsx#ShareButton"] = {
							docgenInfo: ShareButton.__docgenInfo,
							name: "ShareButton",
							path: "src/view/ShareButton.tsx#ShareButton",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function PlayAgainTimer_slicedToArray(arr, i) {
				return (
					(function PlayAgainTimer_arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function PlayAgainTimer_iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function PlayAgainTimer_unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o)
							return PlayAgainTimer_arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return PlayAgainTimer_arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function PlayAgainTimer_nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function PlayAgainTimer_arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var PlayAgainTimer_Container = (0, stitches_config.zo)("div", {
					display: "block",
				}),
				TimeLabel = (0, stitches_config.zo)("span", {
					fontWeight: "lighter",
					fontSize: "20px",
					paddingRight: "10px",
				}),
				TimeDisplay = (0, stitches_config.zo)("span", {
					fontWeight: "bold",
					fontSize: "36px",
				}),
				PlayAgainTimer = function PlayAgainTimer(props) {
					var today = props.today,
						_useState2 = PlayAgainTimer_slicedToArray(
							(0, react.useState)(
								(function secondsUntilTomorrow(startOfToday) {
									var now = new Date(),
										startOfTomorrow = new Date(startOfToday);
									return (
										startOfTomorrow.setHours(0, 0, 0, 0),
										startOfTomorrow.setDate(now.getDate() + 1),
										Math.round((Number(startOfTomorrow) - Number(now)) / 1e3)
									);
								})(today)
							),
							2
						),
						seconds = _useState2[0],
						setSeconds = _useState2[1];
					(0, react.useEffect)(function () {
						var remainingSeconds = seconds;
						setInterval(function () {
							setSeconds(remainingSeconds - 1), remainingSeconds--;
						}, 1e3);
					}, []);
					var minutes = Math.floor(seconds / 60),
						hours = Math.floor(minutes / 60),
						_map2 = PlayAgainTimer_slicedToArray(
							[seconds % 60, minutes % 60].map(function (n) {
								return (0, Utils.WZ)("" + n, 2);
							}),
							2
						),
						dispSeconds = _map2[0],
						dispMinutes = _map2[1];
					return (0, jsx_runtime.jsx)(Centered, {
						children: (0, jsx_runtime.jsxs)(PlayAgainTimer_Container, {
							children: [
								(0, jsx_runtime.jsx)(Space, {}),
								seconds > 0
									? (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
											children: [
												(0, jsx_runtime.jsx)(TimeLabel, {
													children: "PLAY AGAIN IN:",
												}),
												(0, jsx_runtime.jsxs)(TimeDisplay, {
													children: [hours, ":", dispMinutes, ":", dispSeconds],
												}),
											],
									  })
									: (0, jsx_runtime.jsx)(TimeLabel, {
											children: "The Next All Ten is out!",
									  }),
							],
						}),
					});
				};
			PlayAgainTimer.displayName = "PlayAgainTimer";
			const view_PlayAgainTimer = PlayAgainTimer;
			try {
				(PlayAgainTimer.displayName = "PlayAgainTimer"),
					(PlayAgainTimer.__docgenInfo = {
						description: "",
						displayName: "PlayAgainTimer",
						props: {
							today: {
								defaultValue: null,
								description: "",
								name: "today",
								required: !0,
								type: {name: "string"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/PlayAgainTimer.tsx#PlayAgainTimer"
						] = {
							docgenInfo: PlayAgainTimer.__docgenInfo,
							name: "PlayAgainTimer",
							path: "src/view/PlayAgainTimer.tsx#PlayAgainTimer",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var WidgetRowContainer = (0, stitches_config.zo)("div", {
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}),
				StatsContainer = (0, stitches_config.zo)("div", {
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					margin: "0 " + 1.3 * Constants.Tj + "px",
				}),
				ValueContainer = (0, stitches_config.zo)("div", {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
				}),
				Amount = (0, stitches_config.zo)("span", {
					fontSize: "30px",
					fontWeight: "bold",
				}),
				StatsWidget = function StatsWidget(props) {
					var profile = props.profile,
						numPlays = profile.numPlays,
						numStreak = profile.numStreak,
						numAllTens = profile.numAllTens,
						getSuffix = function getSuffix(n) {
							return 1 === n ? "" : "s";
						};
					return (0, jsx_runtime.jsxs)(WidgetRowContainer, {
						children: [
							(0, jsx_runtime.jsxs)(StatsContainer, {
								children: [
									(0, jsx_runtime.jsx)(SubtleSubheading, {children: "PLAYED"}),
									(0, jsx_runtime.jsxs)(ValueContainer, {
										children: [
											(0, jsx_runtime.jsx)(Amount, {children: numPlays}),
											(0, jsx_runtime.jsxs)(SubtleLabel, {
												onRight: !0,
												children: ["day", getSuffix(numPlays)],
											}),
										],
									}),
								],
							}),
							(0, jsx_runtime.jsxs)(StatsContainer, {
								children: [
									(0, jsx_runtime.jsx)(SubtleSubheading, {children: "STREAK"}),
									(0, jsx_runtime.jsxs)(ValueContainer, {
										children: [
											(0, jsx_runtime.jsx)(Amount, {children: numStreak}),
											(0, jsx_runtime.jsxs)(SubtleLabel, {
												onRight: !0,
												children: ["day", getSuffix(numStreak)],
											}),
										],
									}),
								],
							}),
							(0, jsx_runtime.jsxs)(StatsContainer, {
								children: [
									(0, jsx_runtime.jsx)(SubtleSubheading, {children: "ALL TEN"}),
									(0, jsx_runtime.jsxs)(ValueContainer, {
										children: [
											(0, jsx_runtime.jsx)(Amount, {children: numAllTens}),
											(0, jsx_runtime.jsxs)(SubtleLabel, {
												onRight: !0,
												children: ["time", getSuffix(numAllTens)],
											}),
										],
									}),
								],
							}),
						],
					});
				};
			StatsWidget.displayName = "StatsWidget";
			const view_StatsWidget = StatsWidget;
			try {
				(StatsWidget.displayName = "StatsWidget"),
					(StatsWidget.__docgenInfo = {
						description: "",
						displayName: "StatsWidget",
						props: {
							profile: {
								defaultValue: null,
								description: "",
								name: "profile",
								required: !0,
								type: {name: "ProfileState"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/StatsWidget.tsx#StatsWidget"] = {
							docgenInfo: StatsWidget.__docgenInfo,
							name: "StatsWidget",
							path: "src/view/StatsWidget.tsx#StatsWidget",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var ProblemUtil = __webpack_require__("./src/util/ProblemUtil.ts"),
				HTML_TAG_REGEX = /<[\s\S\n]*?>/,
				isPhone = (0, isMobile.Z)(navigator.userAgent).phone,
				MarginContainer = (0, stitches_config.zo)("div", {
					margin: "1.25em 0 1em 0",
					height: 170,
				}),
				Clipboard = (0, stitches_config.zo)("div", {display: "none"}),
				Results = function Results(props) {
					var hideResults = props.hideResults,
						appState = props.appState,
						show = props.show,
						problem = appState.problem,
						targets = appState.targets,
						profile = appState.profile,
						problemDate = appState.problemDate,
						solveOrderString = (function targetsToSolveOrderString(targets) {
							return getSortedTargets(targets)
								.map(function (target) {
									return target.solution
										? target.number + "✅"
										: target.number + "⬜";
								})
								.join(" ");
						})(targets),
						puzzleNumberStr = (0, ProblemUtil.vQ)(problemDate),
						resultsForMobileSharing = (0, jsx_runtime.jsxs)(Clipboard, {
							id: "3834033daa48",
							children: [
								(0, jsx_runtime.jsxs)(Paragraph, {
									children: ["All Ten #", puzzleNumberStr],
								}),
								(0, jsx_runtime.jsx)(view_ProgressDisplay, {
									style: "fraction",
									targets,
									bold: !0,
									excited: !0,
									problemDate: appState.problemDate,
								}),
								(0, jsx_runtime.jsx)(Paragraph, {children: solveOrderString}),
							],
						});
					return (0, jsx_runtime.jsx)(view_Modal, {
						close: hideResults,
						show,
						extraPad: !0,
						center: !0,
						children: (0, jsx_runtime.jsxs)(Container, {
							children: [
								(0, jsx_runtime.jsx)(Centered, {
									children: (0, jsx_runtime.jsx)(view_ProgressDisplay, {
										targets,
										style: "text",
										size: "large",
										problemDate: appState.problemDate,
									}),
								}),
								(0, jsx_runtime.jsx)(Space, {small: !0}),
								(0, jsx_runtime.jsx)(view_StatsWidget, {profile}),
								(0, jsx_runtime.jsx)(MarginContainer, {
									children: (0, jsx_runtime.jsx)(TargetDisplay.Z, {
										problem,
										targets,
										keySuffix: "Results",
									}),
								}),
								(0, jsx_runtime.jsxs)(Centered, {
									children: [
										(0, jsx_runtime.jsx)(SubtleSubheading, {
											children: "SOLVE ORDER",
										}),
										(0, jsx_runtime.jsx)(view_SolveOrderDisplay, {targets}),
									],
								}),
								(0, jsx_runtime.jsx)(Space, {}),
								(0, jsx_runtime.jsx)(Centered, {
									children: (0, jsx_runtime.jsx)(view_ShareButton, {
										doShare: function doShare() {
											var results = (function getResultsAsStr() {
													var _document$getElementB,
														plainStr,
														richStr =
															(null ===
																(_document$getElementB =
																	document.getElementById("3834033daa48")) ||
															void 0 === _document$getElementB
																? void 0
																: _document$getElementB.innerHTML) || "",
														nextPlainStr = richStr;
													do {
														nextPlainStr = (plainStr = nextPlainStr).replace(
															HTML_TAG_REGEX,
															"\n"
														);
													} while (plainStr !== nextPlainStr);
													return {
														richStr,
														plainStr: (plainStr = plainStr
															.split("\n")
															.filter(function (s) {
																return s.length;
															})
															.join("\n")),
													};
												})(),
												shareData = {text: results.plainStr};
											isPhone &&
											navigator.share &&
											navigator.canShare(shareData)
												? navigator.share(shareData)
												: (function resultsToClipboard(
														result,
														showResultCopiedModal
												  ) {
														var richStr = result.richStr,
															plainStr = result.plainStr;
														copy_to_clipboard_default()(richStr, {
															format: "text/html",
														}),
															copy_to_clipboard_default()(plainStr, {
																format: "text/plain",
															}),
															showResultCopiedModal();
												  })(results, function () {
														return appState.showResultCopiedModal(!0);
												  }),
												(appState.hasSharedToday = !0);
										},
									}),
								}),
								(appState.hasSharedToday || appState.completed) &&
									(0, jsx_runtime.jsx)(view_PlayAgainTimer, {
										today: pstStringify(appState.problemDate),
									}),
								resultsForMobileSharing,
							],
						}),
					});
				};
			Results.displayName = "Results";
			const view_Results = (0, es.Pi)(Results);
			try {
				(Results.displayName = "Results"),
					(Results.__docgenInfo = {
						description: "",
						displayName: "Results",
						props: {
							hideResults: {
								defaultValue: null,
								description: "",
								name: "hideResults",
								required: !0,
								type: {name: "() => void"},
							},
							appState: {
								defaultValue: null,
								description: "",
								name: "appState",
								required: !0,
								type: {name: "AppState"},
							},
							show: {
								defaultValue: null,
								description: "",
								name: "show",
								required: !0,
								type: {name: "boolean"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/Results.tsx#Results"] = {
							docgenInfo: Results.__docgenInfo,
							name: "Results",
							path: "src/view/Results.tsx#Results",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var NoticeDisplay = __webpack_require__("./src/view/NoticeDisplay.tsx"),
				ButtonGrid = __webpack_require__("./src/view/ButtonGrid.tsx"),
				SplitContainer =
					(__webpack_require__(
						"./node_modules/core-js/modules/es.array.fill.js"
					),
					(0, stitches_config.zo)("div", {
						display: "flex",
						width: "100%",
						justifyContent: "space-between",
					})),
				StatsPage = function StatsPage(props) {
					var problemStr,
						problemCommentStr,
						targetDisplay,
						d,
						hideStats = props.hideStats,
						show = props.show,
						profile = props.profile,
						yesterdaysDate = props.yesterdaysDate,
						yesterdaysProblem = props.yesterdaysProblem,
						yesterdaysTargets = props.yesterdaysTargets,
						playedYesterday = yesterdaysProblem && yesterdaysTargets,
						solutions = ProblemUtil.JT[(0, ProblemUtil.vh)(yesterdaysDate)];
					if (playedYesterday) {
						problemStr = yesterdaysProblem.start.join(" ");
						var numSolved = yesterdaysTargets.filter(function (target) {
							return target.solution;
						}).length;
						(problemCommentStr =
							numSolved > 0
								? ZERO_TO_TEN_STRINGS[numSolved] + "!"
								: "You didn't play yesterday."),
							(targetDisplay = (0, jsx_runtime.jsx)(TargetDisplay.Z, {
								problem: yesterdaysProblem,
								targets: yesterdaysTargets,
								solutions,
							}));
					} else
						(problemStr = (0, ProblemUtil.vh)(yesterdaysDate)
							.split("")
							.join(" ")),
							(problemCommentStr = "You didn't play yesterday."),
							(targetDisplay = (0, jsx_runtime.jsx)(TargetDisplay.l, {
								userSolutions: new Array(10).fill(""),
								solutions,
							}));
					return (0, jsx_runtime.jsx)(view_Modal, {
						close: hideStats,
						show,
						extraPad: !0,
						center: !0,
						children: (0, jsx_runtime.jsxs)(Container, {
							children: [
								(0, jsx_runtime.jsx)(Title, {children: "Stats"}),
								(0, jsx_runtime.jsx)(view_StatsWidget, {profile}),
								(0, jsx_runtime.jsx)(Space, {}),
								(0, jsx_runtime.jsxs)(SplitContainer, {
									children: [
										(0, jsx_runtime.jsxs)(Paragraph, {
											bold: !0,
											children: [
												"Yesterday: ",
												((d = yesterdaysDate),
												Constants.Yi[d.getMonth()] +
													" " +
													d.getDate() +
													", " +
													d.getFullYear()),
											],
										}),
										(0, jsx_runtime.jsx)(Paragraph, {children: problemStr}),
									],
								}),
								(0, jsx_runtime.jsx)(Paragraph, {children: problemCommentStr}),
								(0, jsx_runtime.jsx)(Space, {small: !0}),
								targetDisplay,
							],
						}),
					});
				};
			StatsPage.displayName = "StatsPage";
			const view_StatsPage = (0, es.Pi)(StatsPage);
			try {
				(StatsPage.displayName = "StatsPage"),
					(StatsPage.__docgenInfo = {
						description: "",
						displayName: "StatsPage",
						props: {
							hideStats: {
								defaultValue: null,
								description: "",
								name: "hideStats",
								required: !0,
								type: {name: "() => void"},
							},
							show: {
								defaultValue: null,
								description: "",
								name: "show",
								required: !0,
								type: {name: "boolean"},
							},
							profile: {
								defaultValue: null,
								description: "",
								name: "profile",
								required: !0,
								type: {name: "ProfileState"},
							},
							yesterdaysDate: {
								defaultValue: null,
								description: "",
								name: "yesterdaysDate",
								required: !0,
								type: {name: "Date"},
							},
							yesterdaysProblem: {
								defaultValue: null,
								description: "",
								name: "yesterdaysProblem",
								required: !1,
								type: {name: "Problem"},
							},
							yesterdaysTargets: {
								defaultValue: null,
								description: "",
								name: "yesterdaysTargets",
								required: !1,
								type: {name: "TargetState[]"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/StatsPage.tsx#StatsPage"] = {
							docgenInfo: StatsPage.__docgenInfo,
							name: "StatsPage",
							path: "src/view/StatsPage.tsx#StatsPage",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function Main_slicedToArray(arr, i) {
				return (
					(function Main_arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function Main_iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function Main_unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o) return Main_arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return Main_arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function Main_nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function Main_arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var ScreenContainer = (0, stitches_config.zo)("div", {
					position: "relative",
					width: "100vw",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					color: "$main",
					fontFamily: "Roboto, sans-serif",
				}),
				TitleRow = (0, stitches_config.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					margin: 0,
					padding: Constants.IB + "px",
					height: Constants.ms + "px",
					boxSizing: "border-box",
					color: "$main",
					width: "100%",
					boxShadow:
						"1px 2px 16px 4px rgba(15, 10, 8, .05),1px 1px 8px 1px rgba(15, 10, 8, .08),1px 1px 4px 1px rgba(15, 10, 8, .04)",
					variants: {compactLayout: {true: {padding: Constants.a2 + "px"}}},
				}),
				TitleRowContent = (0, stitches_config.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					margin: 0,
					boxSizing: "border-box",
					width: "min(95vw, " + Constants.UR + "px)",
				}),
				SubheadingRow = (0, stitches_config.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "20px",
					height: "40px",
					padding: Constants.IB + "px 0px",
					color: "$main",
					variants: {compactLayout: {true: {fontSize: "16px", height: "28px"}}},
				}),
				TargetDisplayArea = (0, stitches_config.zo)("div", {
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
				}),
				Main_TargetDisplayContainer = (0, stitches_config.zo)("div", {
					height: Constants.kA,
					width: "100%",
					margin: Constants.IB + "px 0",
					variants: {
						size: {
							small: {height: Constants.r3, margin: Constants.a2 + "px 0"},
							tall: {height: Constants.$S + "px"},
							compact: {margin: Constants.a2 + "px 0"},
						},
						compact: {},
					},
				}),
				Main_Title = (0, stitches_config.zo)("h1", {
					margin: 0,
					paddingTop: "0",
					paddingLeft: "5px",
					fontSize: "21px",
					display: "inline-block",
					"@bpXSmall": {fontSize: "26px"},
				}),
				LogoContainer = (0, stitches_config.zo)("div", {
					borderRight: "2px solid $main",
					paddingTop: "0.4em",
					paddingBottom: "0.4em",
					paddingRight: "5px",
					width: "auto",
				}),
				TitleDiv = (0, stitches_config.zo)("div", {
					display: "flex",
					margin: 0,
					padding: 0,
					alignItems: "center",
				}),
				TitleRowSide = (0, stitches_config.zo)("div", {
					display: "flex",
					alignItems: "center",
					width: "auto",
					height: "auto",
					variants: {
						side: {
							left: {
								justifyContent: "flex-start",
								flex: "0 0 auto",
								alignSelf: "stretch",
							},
							right: {
								justifyContent: "flex-end",
								flex: "0 1 auto",
								alignSelf: "unset",
							},
						},
					},
				}),
				RowSide = (0, stitches_config.zo)("div", {
					alignSelf: "stretch",
					display: "flex",
					flex: "1 1 0",
					alignItems: "center",
					width: "100%",
					height: "100%",
					variants: {
						side: {
							left: {justifyContent: "flex-start"},
							right: {justifyContent: "flex-end"},
						},
					},
				}),
				NoticeContainer = (0, stitches_config.zo)("div", {
					position: "absolute",
					top: -40,
					width: "100%",
					zIndex: 1,
				}),
				Main_ExpressionContainer = (0, stitches_config.zo)("div", {
					position: "relative",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					padding: 8,
					margin: "0 0 " + Constants.Tj + "px 0",
					backgroundColor: "$disabled",
					borderRadius: 8,
					variants: {
						compactLayout: {true: {margin: "0 0 " + Constants.IB + "px 0"}},
					},
				}),
				BodyContainer = (0, stitches_config.zo)("div", {
					height: "100%",
					width: "min(95vw, " + Constants.UR + "px)",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					boxSizing: "border-box",
					paddingBottom: Constants.IB,
					margin: "0 auto",
				}),
				KeyboardContainer = (0, stitches_config.zo)("div", {
					padding: "0 0 " + Constants.IB + "px 0",
					boxSizing: "border-box",
					width: "min(95%, " + Constants.UR + "px)",
				}),
				fakeAnimButtonClassName = (0, stitches_config.iv)({
					position: "absolute",
					zIndex: 1,
				}),
				fakeAnimButtonInnerClassName = (0, stitches_config.iv)({opacity: 0}),
				Main = function Main(props) {
					var appState = props.appState,
						_useState2 = Main_slicedToArray((0, react.useState)(0), 2),
						height = _useState2[0],
						setHeight = _useState2[1],
						gameElRef = (0, react.useRef)(null),
						grabRectDimensions = function grabRectDimensions() {
							var element = null == gameElRef ? void 0 : gameElRef.current;
							setHeight(null == element ? void 0 : element.clientHeight);
						};
					appState.profile.showHelpOnStart &&
						!appState.displayedHelp &&
						appState.showHelp(!0),
						(0, react.useEffect)(function () {
							return (
								window.addEventListener("resize", grabRectDimensions),
								document.addEventListener("keydown", onKeyDown),
								grabRectDimensions(),
								function () {
									document.removeEventListener("keydown", onKeyDown);
								}
							);
						}, []);
					var keyboardSize,
						targetDisplayContainerSize,
						onKeyDown = function onKeyDown(evt) {
							evt.metaKey ||
								evt.altKey ||
								evt.ctrlKey ||
								(appState.helpShowing
									? "Enter" === evt.key &&
									  (evt.preventDefault(),
									  evt.stopPropagation(),
									  appState.showHelp(!1))
									: "Backspace" === evt.key || "Delete" === evt.key
									? (evt.preventDefault(),
									  evt.stopPropagation(),
									  appState.doBackspace())
									: "Enter" === evt.key
									? (evt.preventDefault(),
									  evt.stopPropagation(),
									  appState.pushEquals())
									: 1 === evt.key.length &&
									  (evt.preventDefault(),
									  evt.stopPropagation(),
									  appState.handleKeyboardChar(evt.key)));
						},
						subheadingColor = appState.numSolved ? "done" : void 0,
						useCompactLinks = height ? height < Constants.D9 : void 0,
						useCompactLayout = height ? height < Constants.DR : void 0,
						useCompactTargetDisplay = height ? height < Constants.HS : void 0;
					(keyboardSize = useCompactLayout
						? height > Constants.Et
							? "mediumLarge"
							: height > Constants.S$
							? "medium"
							: "small"
						: "large"),
						useCompactTargetDisplay
							? (targetDisplayContainerSize = "small")
							: useCompactLayout && (targetDisplayContainerSize = "compact");
					var fakeButton = null;
					if (appState.currAnim)
						if ("makeTarget" === appState.currAnim.name) {
							var index = appState.currAnim.targetIndex,
								target = appState.targets[index];
							target &&
								(fakeButton = (0, jsx_runtime.jsx)(IconButton.Z, {
									number: target.number,
									size: "large",
									color: "done",
									disabled: !0,
								}));
						} else
							"makeExtraTarget" === appState.currAnim.name &&
								(fakeButton = (0, jsx_runtime.jsx)(IconButton.Z, {
									text: "+1",
									size: "large",
									color: "done",
									disabled: !0,
								}));
					var modals = (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
							children: [
								(0, jsx_runtime.jsx)(view_Instructions, {
									hideHelp: function hideHelp() {
										appState.showHelp(!1),
											(appState.displayedHelp = !0),
											appState.saveToStorage();
									},
									show: appState.helpShowing,
								}),
								(0, jsx_runtime.jsx)(view_Links, {
									hideLinks: function hideLinks() {
										return appState.showLinks(!1);
									},
									show: appState.linksShowing,
									compact: useCompactLinks,
								}),
								(0, jsx_runtime.jsx)(view_Results, {
									hideResults: function hideResults() {
										return appState.showResults(!1);
									},
									appState,
									show: appState.resultsShowing,
								}),
								(0, jsx_runtime.jsx)(view_ResultCopiedModal, {
									hideModal: function hideModal() {
										appState.showResultCopiedModal(!1);
									},
									show: appState.resultCopiedModalShowing,
								}),
								(0, jsx_runtime.jsx)(view_StatsPage, {
									hideStats: function hideStats() {
										return appState.showStats(!1);
									},
									show: appState.statsShowing,
									profile: appState.profile,
									yesterdaysDate: appState.yesterdaysProblemDate,
									yesterdaysProblem: appState.yesterdaysProblem,
									yesterdaysTargets: appState.yesterdaysTargets,
								}),
							],
						}),
						titleLogo = (0, jsx_runtime.jsx)(LogoContainer, {
							children: (0, jsx_runtime.jsx)(view_ImageButton, {
								type: "beastacademy-logo",
								alt: "Beast Academy full logo",
								size: "titleLogo",
								onClick: function onClick() {
									return appState.showLinks(!0);
								},
							}),
						}),
						title = (0, jsx_runtime.jsx)(TitleRow, {
							compactLayout: useCompactLayout,
							children: (0, jsx_runtime.jsxs)(TitleRowContent, {
								children: [
									(0, jsx_runtime.jsxs)(TitleRowSide, {
										side: "left",
										children: [
											(0, jsx_runtime.jsx)(IconButton.Z, {
												icon: "menu",
												size: "small",
												onClick: function onClick() {
													return appState.showLinks(!0);
												},
												color: "mainInverted",
											}),
											(0, jsx_runtime.jsx)(view_ImageButton, {
												type: "ba-boxes-logo",
												alt: "Beast Academy boxes logo.",
												size: "medium",
												onClick: function onClick() {
													return appState.showLinks(!0);
												},
											}),
										],
									}),
									(0, jsx_runtime.jsxs)(TitleDiv, {
										children: [
											titleLogo,
											(0, jsx_runtime.jsx)(Main_Title, {children: "All Ten"}),
										],
									}),
									(0, jsx_runtime.jsxs)(TitleRowSide, {
										side: "right",
										children: [
											(0, jsx_runtime.jsx)(IconButton.Z, {
												icon: "chart",
												size: "small",
												onClick: function onClick() {
													return appState.showStats(!0);
												},
											}),
											(0, jsx_runtime.jsx)(IconButton.Z, {
												icon: "help",
												size: "small",
												onClick: function onClick() {
													return appState.showHelp(!0);
												},
											}),
										],
									}),
								],
							}),
						}),
						body = (0, jsx_runtime.jsxs)(BodyContainer, {
							className: "pullToRefresh",
							children: [
								(0, jsx_runtime.jsxs)(SubheadingRow, {
									compactLayout: useCompactLayout,
									children: [
										(0, jsx_runtime.jsx)(RowSide, {
											side: "left",
											children: (0, jsx_runtime.jsx)(view_ProgressDisplay, {
												style: "fraction",
												targets: appState.targets,
												hideIfEmpty: !0,
												color: subheadingColor,
												problemDate: appState.problemDate,
											}),
										}),
										(0, jsx_runtime.jsx)(view_ProgressDisplay, {
											style: "text",
											targets: appState.targets,
											size: "large",
											color: subheadingColor,
											margin: "small",
											problemDate: appState.problemDate,
										}),
										(0, jsx_runtime.jsx)(RowSide, {
											side: "right",
											children: (0, jsx_runtime.jsx)(IconButton.Z, {
												icon: "share-mobile",
												size: "small",
												color: subheadingColor,
												onClick: function onClick() {
													return appState.showResults(!0);
												},
											}),
										}),
									],
								}),
								(0, jsx_runtime.jsx)(TargetDisplayArea, {
									children: (0, jsx_runtime.jsx)(Main_TargetDisplayContainer, {
										size: targetDisplayContainerSize,
										children: (0, jsx_runtime.jsx)(TargetDisplay.Z, {
											problem: appState.problem,
											targets: appState.targets,
											onClick: function onTargetGrab(i) {
												appState.grabTarget(i);
											},
											compact: useCompactTargetDisplay,
											animated: !0,
										}),
									}),
								}),
							],
						}),
						keyboard = (0, jsx_runtime.jsxs)(KeyboardContainer, {
							children: [
								(0, jsx_runtime.jsxs)(Main_ExpressionContainer, {
									compactLayout: useCompactLayout,
									children: [
										(0, jsx_runtime.jsx)(NoticeContainer, {
											children: (0, jsx_runtime.jsx)(NoticeDisplay.Z, {
												notice: appState.lastError,
											}),
										}),
										(0, jsx_runtime.jsx)(AnimationHook.Z, {
											name: "exprDisplay",
											children: (0, jsx_runtime.jsx)(ExpressionDisplay.Z, {
												state: appState.exprState,
												evalInterm: !0,
												size: useCompactLayout ? "medium" : "large",
											}),
										}),
									],
								}),
								(0, jsx_runtime.jsx)(ButtonGrid.Z, {
									state: appState.exprState,
									equalsEnabled: appState.equalsEnabled,
									undosHighlighted: appState.undosHighlighted,
									onInsertElement: function onInsertElement(el) {
										appState.pushStateElement(el);
									},
									onEquals: function onEquals() {
										appState.pushEquals();
									},
									onReset: function onReset() {
										appState.resetExpression();
									},
									onBackspace: function onBackspace() {
										appState.doBackspace();
									},
									size: keyboardSize,
								}),
							],
						});
					return (0, jsx_runtime.jsx)(view_AnimationProvider, {
						currAnimGen: appState.currAnimGen,
						currAnim: appState.currAnim,
						children: (0, jsx_runtime.jsxs)(ScreenContainer, {
							ref: gameElRef,
							children: [
								(0, jsx_runtime.jsx)(AnimationHook.Z, {
									name: "fakeAnimButton",
									outerClassName: fakeAnimButtonClassName(),
									innerClassName: fakeAnimButtonInnerClassName(),
									hideIfNotAnimating: !0,
									children: fakeButton,
								}),
								modals,
								title,
								body,
								keyboard,
							],
						}),
					});
				};
			Main.displayName = "Main";
			const view_Main = (0, es.Pi)(Main);
			try {
				(Main.displayName = "Main"),
					(Main.__docgenInfo = {
						description: "",
						displayName: "Main",
						props: {
							appState: {
								defaultValue: null,
								description: "",
								name: "appState",
								required: !0,
								type: {name: "AppState"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/Main.tsx#Main"] = {
							docgenInfo: Main.__docgenInfo,
							name: "Main",
							path: "src/view/Main.tsx#Main",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var testDate = new Date("2023/05/26 12:00:00"),
				P2267 = function P2267() {
					var problem = (0, Problem.R)([2, 2, 6, 7]),
						appState = new AppState(problem, testDate);
					return (0, jsx_runtime.jsx)(view_Main, {appState});
				};
			P2267.displayName = "P2267";
			var P4679ForbidOps = function P4679ForbidOps() {
				var problem = (0, Problem.R)([4, 6, 7, 9], {
						rules: {forbidOps: ["+", "*"]},
					}),
					appState = new AppState(problem, testDate);
				return (0, jsx_runtime.jsx)(view_Main, {appState});
			};
			P4679ForbidOps.displayName = "P4679ForbidOps";
			var P1234ForbidParensConcat = function P1234ForbidParensConcat() {
				var problem = (0, Problem.R)([1, 2, 3, 4], {
						rules: {forbidParens: !0, forbidConcat: !0},
					}),
					appState = new AppState(problem, testDate);
				return (0, jsx_runtime.jsx)(view_Main, {appState});
			};
			P1234ForbidParensConcat.displayName = "P1234ForbidParensConcat";
			var P3568SingleOps = function P3568SingleOps() {
				var problem = (0, Problem.R)([3, 5, 6, 8], {rules: {singleOps: !0}}),
					appState = new AppState(problem, testDate);
				return (0, jsx_runtime.jsx)(view_Main, {appState});
			};
			P3568SingleOps.displayName = "P3568SingleOps";
			var P1238OpLimit = function P1238OpLimit() {
				var problem = (0, Problem.R)([1, 2, 3, 8], {rules: {opLimit: 2}}),
					appState = new AppState(problem, testDate);
				return (0, jsx_runtime.jsx)(view_Main, {appState});
			};
			P1238OpLimit.displayName = "P1238OpLimit";
			var P2222Imposs = function P2222Imposs() {
				var problem = (0, Problem.R)([2, 2, 2, 2], {rules: {impossible: 1}}),
					appState = new AppState(problem, testDate);
				return (0, jsx_runtime.jsx)(view_Main, {appState});
			};
			P2222Imposs.displayName = "P2222Imposs";
			var P3_4_8_36SingleOps = function P3_4_8_36SingleOps() {
				var problem = (0, Problem.R)([3, 4, 8, 36], {
						rules: {forbidConcat: !0, singleOps: !0},
					}),
					appState = new AppState(problem, testDate);
				return (0, jsx_runtime.jsx)(view_Main, {appState});
			};
			P3_4_8_36SingleOps.displayName = "P3_4_8_36SingleOps";
			var P1258NegTargets = function P1258NegTargets() {
				var problem = (0, Problem.R)([1, 2, 3, 8], {
						targets: [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10],
					}),
					appState = new AppState(problem, testDate);
				return (0, jsx_runtime.jsx)(view_Main, {appState});
			};
			P1258NegTargets.displayName = "P1258NegTargets";
			var P1468SquareTargets = function P1468SquareTargets() {
				var problem = (0, Problem.R)([1, 4, 6, 8], {
						targets: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100],
					}),
					appState = new AppState(problem, testDate);
				return (0, jsx_runtime.jsx)(view_Main, {appState});
			};
			P1468SquareTargets.displayName = "P1468SquareTargets";
			const Main_stories = {title: "Pages/Full", component: view_Main};
			(P2267.parameters = Object.assign(
				{
					storySource: {
						source:
							"() => {\n\tconst problem = createProblem([2, 2, 6, 7]);\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}",
					},
				},
				P2267.parameters
			)),
				(P4679ForbidOps.parameters = Object.assign(
					{
						storySource: {
							source:
								'() => {\n\tconst problem = createProblem([4, 6, 7, 9], {\n\t\trules: {forbidOps: ["+", "*"]},\n\t});\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}',
						},
					},
					P4679ForbidOps.parameters
				)),
				(P1234ForbidParensConcat.parameters = Object.assign(
					{
						storySource: {
							source:
								"() => {\n\tconst problem = createProblem([1, 2, 3, 4], {\n\t\trules: {forbidParens: true, forbidConcat: true},\n\t});\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}",
						},
					},
					P1234ForbidParensConcat.parameters
				)),
				(P3568SingleOps.parameters = Object.assign(
					{
						storySource: {
							source:
								"() => {\n\tconst problem = createProblem([3, 5, 6, 8], {\n\t\trules: {singleOps: true},\n\t});\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}",
						},
					},
					P3568SingleOps.parameters
				)),
				(P1238OpLimit.parameters = Object.assign(
					{
						storySource: {
							source:
								"() => {\n\tconst problem = createProblem([1, 2, 3, 8], {\n\t\trules: {opLimit: 2},\n\t});\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}",
						},
					},
					P1238OpLimit.parameters
				)),
				(P2222Imposs.parameters = Object.assign(
					{
						storySource: {
							source:
								"() => {\n\tconst problem = createProblem([2, 2, 2, 2], {\n\t\trules: {impossible: 1},\n\t});\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}",
						},
					},
					P2222Imposs.parameters
				)),
				(P3_4_8_36SingleOps.parameters = Object.assign(
					{
						storySource: {
							source:
								"() => {\n\tconst problem = createProblem([3, 4, 8, 36], {\n\t\trules: {forbidConcat: true, singleOps: true},\n\t});\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}",
						},
					},
					P3_4_8_36SingleOps.parameters
				)),
				(P1258NegTargets.parameters = Object.assign(
					{
						storySource: {
							source:
								"() => {\n\tconst problem = createProblem([1, 2, 3, 8], {\n\t\ttargets: [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10],\n\t});\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}",
						},
					},
					P1258NegTargets.parameters
				)),
				(P1468SquareTargets.parameters = Object.assign(
					{
						storySource: {
							source:
								"() => {\n\tconst problem = createProblem([1, 4, 6, 8], {\n\t\ttargets: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100],\n\t});\n\tconst appState = new AppState(problem, testDate);\n\treturn <Main appState={appState} />;\n}",
						},
					},
					P1468SquareTargets.parameters
				));
		},
		"./src/view/NoticeDisplay.stories.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Main: () => Main,
					Errors: () => Errors,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),
				__webpack_require__("./node_modules/core-js/modules/es.array.sort.js"),
				__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.is-array.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js");
			var react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
					"./node_modules/react/index.js"
				),
				_util_ErrorCopy__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
					"./src/util/ErrorCopy.ts"
				),
				_NoticeDisplay__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
					"./src/view/NoticeDisplay.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				);
			function _slicedToArray(arr, i) {
				return (
					(function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function _iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function _unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return _arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function _nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var Main = function Main() {
				var _useState2 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_15__.useState)(1),
						2
					),
					nextGen = _useState2[0],
					setNextGen = _useState2[1],
					_useState4 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_15__.useState)(null),
						2
					),
					notice = _useState4[0],
					setNotice = _useState4[1];
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(
					"div",
					{
						style: {fontFamily: "sans-serif", width: 320},
						children: [
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
								_NoticeDisplay__WEBPACK_IMPORTED_MODULE_17__.Z,
								{notice}
							),
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
								style: {marginTop: 8},
								children: [
									(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										"button",
										{
											onClick: function onShort() {
												setNotice({
													gen: nextGen,
													message: "This is notice #" + nextGen,
													duration: 2e3,
												}),
													setNextGen(nextGen + 1);
											},
											children: "Set short notice",
										}
									),
									(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										"button",
										{
											onClick: function onForever() {
												setNotice({
													gen: nextGen,
													message: "This is notice #" + nextGen,
													duration: 0,
												}),
													setNextGen(nextGen + 1);
											},
											children: "Set forever notice",
										}
									),
									(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										"button",
										{
											onClick: function onNone() {
												setNotice(null);
											},
											children: "Set no notice",
										}
									),
								],
							}),
						],
					}
				);
			};
			Main.displayName = "Main";
			var errorCopyKeys = Object.keys(
				_util_ErrorCopy__WEBPACK_IMPORTED_MODULE_16__
			);
			errorCopyKeys.sort();
			var Errors = function Errors() {
				var _useState6 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_15__.useState)(1),
						2
					),
					nextGen = _useState6[0],
					setNextGen = _useState6[1],
					_useState8 = _slicedToArray(
						(0, react__WEBPACK_IMPORTED_MODULE_15__.useState)(null),
						2
					),
					notice = _useState8[0],
					setNotice = _useState8[1],
					options = errorCopyKeys.map(function (k) {
						return (0,
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("option", {value: k, children: k}, k);
					});
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(
					"div",
					{
						style: {fontFamily: "sans-serif", width: 320},
						children: [
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
								_NoticeDisplay__WEBPACK_IMPORTED_MODULE_17__.Z,
								{notice}
							),
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
								style: {marginTop: 8},
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(
									"select",
									{
										onChange: function onChange(evt) {
											var key = evt.currentTarget.value,
												message =
													"function" ==
													typeof _util_ErrorCopy__WEBPACK_IMPORTED_MODULE_16__[
														key
													]
														? null
														: _util_ErrorCopy__WEBPACK_IMPORTED_MODULE_16__[
																key
														  ];
											message
												? (setNotice({gen: nextGen, message, duration: 5e3}),
												  setNextGen(nextGen + 1))
												: setNotice(null);
										},
										children: [
											(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
												"option",
												{value: "", children: "(none)"}
											),
											options,
										],
									}
								),
							}),
						],
					}
				);
			};
			Errors.displayName = "Errors";
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: "Components/NoticeDisplay",
				component: _NoticeDisplay__WEBPACK_IMPORTED_MODULE_17__.Z,
			};
			(Main.parameters = Object.assign(
				{
					storySource: {
						source:
							'() => {\n\tconst [nextGen, setNextGen] = useState<number>(1);\n\tconst [notice, setNotice] = useState<NoticeState | null>(null);\n\n\tconst onShort = () => {\n\t\tsetNotice({\n\t\t\tgen: nextGen,\n\t\t\tmessage: "This is notice #" + nextGen,\n\t\t\tduration: 2000,\n\t\t});\n\t\tsetNextGen(nextGen + 1);\n\t};\n\n\tconst onForever = () => {\n\t\tsetNotice({\n\t\t\tgen: nextGen,\n\t\t\tmessage: "This is notice #" + nextGen,\n\t\t\tduration: 0,\n\t\t});\n\t\tsetNextGen(nextGen + 1);\n\t};\n\n\tconst onNone = () => {\n\t\tsetNotice(null);\n\t};\n\n\treturn (\n\t\t<div style={{fontFamily: "sans-serif", width: 320}}>\n\t\t\t<NoticeDisplay notice={notice} />\n\t\t\t<div style={{marginTop: 8}}>\n\t\t\t\t<button onClick={onShort}>Set short notice</button>\n\t\t\t\t<button onClick={onForever}>Set forever notice</button>\n\t\t\t\t<button onClick={onNone}>Set no notice</button>\n\t\t\t</div>\n\t\t</div>\n\t);\n}',
					},
				},
				Main.parameters
			)),
				(Errors.parameters = Object.assign(
					{
						storySource: {
							source:
								'() => {\n\tconst [nextGen, setNextGen] = useState<number>(1);\n\tconst [notice, setNotice] = useState<NoticeState | null>(null);\n\n\tconst onChange = (evt: any) => {\n\t\tconst key: keyof typeof ErrorCopy = evt.currentTarget.value;\n\t\tconst message =\n\t\t\ttypeof ErrorCopy[key] === "function" ? null : ErrorCopy[key];\n\t\tif (!message) {\n\t\t\tsetNotice(null);\n\t\t\treturn;\n\t\t}\n\t\tsetNotice({\n\t\t\tgen: nextGen,\n\t\t\tmessage: message as string, // needed since ErrorCopy includes one function for fractions\n\t\t\tduration: 5000,\n\t\t});\n\t\tsetNextGen(nextGen + 1);\n\t};\n\n\tconst options = errorCopyKeys.map((k) => (\n\t\t<option key={k} value={k}>\n\t\t\t{k}\n\t\t</option>\n\t));\n\treturn (\n\t\t<div style={{fontFamily: "sans-serif", width: 320}}>\n\t\t\t<NoticeDisplay notice={notice} />\n\t\t\t<div style={{marginTop: 8}}>\n\t\t\t\t<select onChange={onChange}>\n\t\t\t\t\t<option value="">(none)</option>\n\t\t\t\t\t{options}\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t</div>\n\t);\n}',
						},
					},
					Errors.parameters
				));
		},
		"./src/view/RationalDisplay.stories.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					GridOfCases: () => GridOfCases,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__("./node_modules/react/index.js");
			var _RationalDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					"./src/view/RationalDisplay.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				testNumbers = [
					[2, 1],
					[8, 1],
					[12, 1],
					[100, 1],
					[-2, 1],
					[-12, 1],
					[1, 2],
					[5, 12],
					[-3, 4],
					null,
				];
			function makeRow(fontSize, color, backgroundColor) {
				var rowStyle = {
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
						fontSize: fontSize + "pt",
						backgroundColor,
					},
					cellStyle = {margin: "0.5em"},
					els = testNumbers.map(function (r) {
						return (0,
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {style: cellStyle, children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_RationalDisplay__WEBPACK_IMPORTED_MODULE_3__.Z, {number: r, color})}, String(r));
					});
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
					style: rowStyle,
					children: els,
				});
			}
			makeRow.displayName = "makeRow";
			var GridOfCases = function GridOfCases() {
				var rowMarginStyle = {marginTop: 12};
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
					children: [
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							style: rowMarginStyle,
							children: "Size 12",
						}),
						makeRow(12),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							style: rowMarginStyle,
							children: "Size 20",
						}),
						makeRow(20),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							style: rowMarginStyle,
							children: "Size 16, interm1",
						}),
						makeRow(16, "interm1"),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							style: rowMarginStyle,
							children: "Size 16, white on dark",
						}),
						makeRow(16, "white", "#18355E"),
						(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
							style: rowMarginStyle,
							children: "Size 60",
						}),
						makeRow(60),
					],
				});
			};
			GridOfCases.displayName = "GridOfCases";
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: "Components/RationalDisplay",
				component: _RationalDisplay__WEBPACK_IMPORTED_MODULE_3__.Z,
			};
			GridOfCases.parameters = Object.assign(
				{
					storySource: {
						source:
							'() => {\n\tconst rowMarginStyle = {marginTop: 12};\n\n\treturn (\n\t\t<div>\n\t\t\t<div style={rowMarginStyle}>Size 12</div>\n\t\t\t{makeRow(12)}\n\t\t\t<div style={rowMarginStyle}>Size 20</div>\n\t\t\t{makeRow(20)}\n\t\t\t<div style={rowMarginStyle}>Size 16, interm1</div>\n\t\t\t{makeRow(16, "interm1")}\n\t\t\t<div style={rowMarginStyle}>Size 16, white on dark</div>\n\t\t\t{makeRow(16, "white", "#18355E")}\n\t\t\t<div style={rowMarginStyle}>Size 60</div>\n\t\t\t{makeRow(60)}\n\t\t</div>\n\t);\n}',
					},
				},
				GridOfCases.parameters
			);
		},
		"./src/view/TargetDisplay.stories.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Blank: () => Blank,
					Partial: () => Partial,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__("./node_modules/react/index.js");
			var _stitches_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				_expr_Line__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__("./src/expr/Line.ts"),
				_state_Problem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
					"./src/state/Problem.ts"
				),
				_TargetDisplay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
					"./src/view/TargetDisplay.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				DEFAULT_TARGETS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				Container = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_3__.zo)(
					"div",
					{
						width: 400,
						height: 200,
						marginLeft: 100,
						fontFamily: "sans-serif",
						color: "$main",
					}
				);
			function makeTargetStates(targets, lineStrings) {
				return targets.map(function (t, i) {
					var _lineStrings$t;
					return "impossible" ===
						(null === (_lineStrings$t = lineStrings[t]) ||
						void 0 === _lineStrings$t
							? void 0
							: _lineStrings$t.toLowerCase())
						? {
								number: t,
								impossible: !0,
								solution: null,
								solutionState: null,
								solveOrder: null,
						  }
						: {
								number: t,
								impossible: !1,
								solution: lineStrings[t]
									? (0, _expr_Line__WEBPACK_IMPORTED_MODULE_4__.J8)(
											lineStrings[t]
									  ).value
									: null,
								solutionState: null,
								solveOrder: i + 1,
						  };
				});
			}
			var Blank = function Blank(_ref) {
				var onClick = _ref.onClick,
					problem = (0, _state_Problem__WEBPACK_IMPORTED_MODULE_5__.R)([
						1, 2, 3, 4,
					]),
					targets = makeTargetStates(DEFAULT_TARGETS, {});
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
					Container,
					{
						children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							_TargetDisplay__WEBPACK_IMPORTED_MODULE_6__.Z,
							{problem, targets, onClick}
						),
					}
				);
			};
			Blank.displayName = "Blank";
			var Partial = function Partial(_ref2) {
				var onClick = _ref2.onClick,
					problem = (0, _state_Problem__WEBPACK_IMPORTED_MODULE_5__.R)([
						1, 2, 3, 4,
					]),
					targets = makeTargetStates(DEFAULT_TARGETS, {
						2: "s1 + s3 - s0 - s2",
						4: "impossible",
						5: "(s0 + s3)(s2 - s1)",
					});
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
					Container,
					{
						children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							_TargetDisplay__WEBPACK_IMPORTED_MODULE_6__.Z,
							{problem, targets, onClick}
						),
					}
				);
			};
			Partial.displayName = "Partial";
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: "Components/TargetDisplay",
				component: _TargetDisplay__WEBPACK_IMPORTED_MODULE_6__.Z,
				argTypes: {onClick: {action: "onClick"}},
			};
			(Blank.parameters = Object.assign(
				{
					storySource: {
						source:
							"({onClick}: any) => {\n\tconst problem = createProblem([1, 2, 3, 4]);\n\tconst targets = makeTargetStates(DEFAULT_TARGETS, {});\n\treturn (\n\t\t<Container>\n\t\t\t<TargetDisplay problem={problem} targets={targets} onClick={onClick} />\n\t\t</Container>\n\t);\n}",
					},
				},
				Blank.parameters
			)),
				(Partial.parameters = Object.assign(
					{
						storySource: {
							source:
								'({onClick}: any) => {\n\tconst problem = createProblem([1, 2, 3, 4]);\n\tconst targets = makeTargetStates(DEFAULT_TARGETS, {\n\t\t2: "s1 + s3 - s0 - s2",\n\t\t4: "impossible",\n\t\t5: "(s0 + s3)(s2 - s1)",\n\t});\n\treturn (\n\t\t<Container>\n\t\t\t<TargetDisplay problem={problem} targets={targets} onClick={onClick} />\n\t\t</Container>\n\t);\n}',
						},
					},
					Partial.parameters
				));
			try {
				(Blank.displayName = "Blank"),
					(Blank.__docgenInfo = {
						description: "",
						displayName: "Blank",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/TargetDisplay.stories.tsx#Blank"
						] = {
							docgenInfo: Blank.__docgenInfo,
							name: "Blank",
							path: "src/view/TargetDisplay.stories.tsx#Blank",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Partial.displayName = "Partial"),
					(Partial.__docgenInfo = {
						description: "",
						displayName: "Partial",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/TargetDisplay.stories.tsx#Partial"
						] = {
							docgenInfo: Partial.__docgenInfo,
							name: "Partial",
							path: "src/view/TargetDisplay.stories.tsx#Partial",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/expr/Eval.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				vq: () => evalTree,
				$w: () => evalIntermediate,
			});
			__webpack_require__("./node_modules/core-js/modules/es.array.concat.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.is-array.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js");
			var _util_Utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
					"./src/util/Utils.ts"
				),
				_Rational__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
					"./src/expr/Rational.ts"
				),
				_Operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
					"./src/expr/Operators.ts"
				),
				_TreeParse__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
					"./src/expr/TreeParse.ts"
				),
				_util_ErrorCopy__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
					"./src/util/ErrorCopy.ts"
				);
			function _toConsumableArray(arr) {
				return (
					(function _arrayWithoutHoles(arr) {
						if (Array.isArray(arr)) return _arrayLikeToArray(arr);
					})(arr) ||
					(function _iterableToArray(iter) {
						if (
							("undefined" != typeof Symbol && null != iter[Symbol.iterator]) ||
							null != iter["@@iterator"]
						)
							return Array.from(iter);
					})(arr) ||
					_unsupportedIterableToArray(arr) ||
					(function _nonIterableSpread() {
						throw new TypeError(
							"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _createForOfIteratorHelper(o, allowArrayLike) {
				var it =
					("undefined" != typeof Symbol && o[Symbol.iterator]) ||
					o["@@iterator"];
				if (!it) {
					if (
						Array.isArray(o) ||
						(it = _unsupportedIterableToArray(o)) ||
						(allowArrayLike && o && "number" == typeof o.length)
					) {
						it && (o = it);
						var i = 0,
							F = function F() {};
						return {
							s: F,
							n: function n() {
								return i >= o.length ? {done: !0} : {done: !1, value: o[i++]};
							},
							e: function e(_e2) {
								throw _e2;
							},
							f: F,
						};
					}
					throw new TypeError(
						"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
					);
				}
				var err,
					normalCompletion = !0,
					didErr = !1;
				return {
					s: function s() {
						it = it.call(o);
					},
					n: function n() {
						var step = it.next();
						return (normalCompletion = step.done), step;
					},
					e: function e(_e3) {
						(didErr = !0), (err = _e3);
					},
					f: function f() {
						try {
							normalCompletion || null == it.return || it.return();
						} finally {
							if (didErr) throw err;
						}
					},
				};
			}
			function _slicedToArray(arr, i) {
				return (
					(function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function _iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					_unsupportedIterableToArray(arr, i) ||
					(function _nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _unsupportedIterableToArray(o, minLen) {
				if (o) {
					if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
					var n = Object.prototype.toString.call(o).slice(8, -1);
					return (
						"Object" === n && o.constructor && (n = o.constructor.name),
						"Map" === n || "Set" === n
							? Array.from(o)
							: "Arguments" === n ||
							  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							? _arrayLikeToArray(o, minLen)
							: void 0
					);
				}
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function rationalToDigit(r) {
				if (!r) return null;
				var _r = _slicedToArray(r, 2),
					p = _r[0];
				return 1 !== _r[1] || p < 0 || p > 9 ? null : p;
			}
			function evalTree(tree) {
				if ("number" === tree.type) return {value: tree.number, errors: []};
				if ("concat" === tree.type) {
					var _step,
						concatValue = 0,
						_iterator = _createForOfIteratorHelper(tree.terms);
					try {
						for (_iterator.s(); !(_step = _iterator.n()).done; ) {
							var evalResult = evalTree(_step.value);
							if (!evalResult.value) return evalResult;
							var digit = rationalToDigit(evalResult.value);
							if (null === digit)
								return {
									value: null,
									errors: [
										{
											code: "E_CONCAT_NON_DIGIT",
											message: "Applied concatenation to non-digit value",
											value: evalResult.value,
										},
									],
								};
							concatValue = 10 * concatValue + digit;
						}
					} catch (err) {
						_iterator.e(err);
					} finally {
						_iterator.f();
					}
					return {
						value: _Rational__WEBPACK_IMPORTED_MODULE_13__.xS(concatValue),
						errors: [],
					};
				}
				if ("op" === tree.type)
					return (function evalTreeOp(tree) {
						var terms = tree.terms,
							ops = tree.ops;
						if (!terms.length)
							throw new Error("Tried to evalute expression with no terms");
						for (
							var stack = [], value = null, i = 0;
							i < terms.length;
							i += 1
						) {
							var term = terms[i],
								termIsLast = i === terms.length - 1,
								termResult = evalTree(term);
							if (!(value = termResult.value) || termResult.errors.length)
								return termResult;
							for (
								var currPrecNum = termIsLast
										? _Operators__WEBPACK_IMPORTED_MODULE_14__.On()
										: _Operators__WEBPACK_IMPORTED_MODULE_14__.E5(ops[i]),
									tail = stack[stack.length - 1];
								tail;

							) {
								var _tail2 = _slicedToArray(tail, 2),
									tailValue = _tail2[0],
									tailOp = _tail2[1],
									tailPrecNum =
										_Operators__WEBPACK_IMPORTED_MODULE_14__.E5(tailOp),
									tailPrecDir =
										_Operators__WEBPACK_IMPORTED_MODULE_14__.nH(tailOp);
								if (
									!(
										currPrecNum < tailPrecNum ||
										(currPrecNum === tailPrecNum &&
											tailPrecDir ===
												_Operators__WEBPACK_IMPORTED_MODULE_14__.xW.LEFT)
									)
								)
									break;
								if (
									!(value = _Rational__WEBPACK_IMPORTED_MODULE_13__.Bx(
										tailValue,
										value,
										tailOp
									))
								)
									return {
										value: null,
										errors: [
											{
												code: "E_DIVIDE_BY_ZERO",
												message:
													_util_ErrorCopy__WEBPACK_IMPORTED_MODULE_16__.DIVIDE_BY_ZERO +
													" Or a value was null.",
											},
										],
									};
								stack.pop(), (tail = stack[stack.length - 1]);
							}
							termIsLast || stack.push([value, ops[i]]);
						}
						return {value, errors: []};
					})(tree);
				(0, _util_Utils__WEBPACK_IMPORTED_MODULE_12__.vE)(tree);
			}
			function evalIntermediate(state, index) {
				var treeRes = (0, _TreeParse__WEBPACK_IMPORTED_MODULE_15__.j)(
					state,
					index
				);
				if (!treeRes.value) return {value: null, errors: treeRes.errors};
				var evalRes = evalTree(treeRes.value);
				return {
					value: evalRes.value,
					errors: [].concat(
						_toConsumableArray(treeRes.errors),
						_toConsumableArray(evalRes.errors)
					),
				};
			}
		},
		"./src/expr/Line.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				dN: () => isExprElEqual,
				J8: () => stringToLine,
				uO: () => encloseLineInParens,
				Hw: () => makeStateFromStrings,
			});
			__webpack_require__("./node_modules/core-js/modules/es.array.join.js"),
				__webpack_require__("./node_modules/core-js/modules/es.regexp.exec.js"),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__("./node_modules/core-js/modules/es.parse-int.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.concat.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.is-array.js"
				),
				__webpack_require__("./src/util/Utils.ts");
			var _Operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
					"./src/expr/Operators.ts"
				),
				_Rules__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
					"./src/expr/Rules.ts"
				);
			function _toConsumableArray(arr) {
				return (
					(function _arrayWithoutHoles(arr) {
						if (Array.isArray(arr)) return _arrayLikeToArray(arr);
					})(arr) ||
					(function _iterableToArray(iter) {
						if (
							("undefined" != typeof Symbol && null != iter[Symbol.iterator]) ||
							null != iter["@@iterator"]
						)
							return Array.from(iter);
					})(arr) ||
					_unsupportedIterableToArray(arr) ||
					(function _nonIterableSpread() {
						throw new TypeError(
							"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _createForOfIteratorHelper(o, allowArrayLike) {
				var it =
					("undefined" != typeof Symbol && o[Symbol.iterator]) ||
					o["@@iterator"];
				if (!it) {
					if (
						Array.isArray(o) ||
						(it = _unsupportedIterableToArray(o)) ||
						(allowArrayLike && o && "number" == typeof o.length)
					) {
						it && (o = it);
						var i = 0,
							F = function F() {};
						return {
							s: F,
							n: function n() {
								return i >= o.length ? {done: !0} : {done: !1, value: o[i++]};
							},
							e: function e(_e) {
								throw _e;
							},
							f: F,
						};
					}
					throw new TypeError(
						"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
					);
				}
				var err,
					normalCompletion = !0,
					didErr = !1;
				return {
					s: function s() {
						it = it.call(o);
					},
					n: function n() {
						var step = it.next();
						return (normalCompletion = step.done), step;
					},
					e: function e(_e2) {
						(didErr = !0), (err = _e2);
					},
					f: function f() {
						try {
							normalCompletion || null == it.return || it.return();
						} finally {
							if (didErr) throw err;
						}
					},
				};
			}
			function _unsupportedIterableToArray(o, minLen) {
				if (o) {
					if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
					var n = Object.prototype.toString.call(o).slice(8, -1);
					return (
						"Object" === n && o.constructor && (n = o.constructor.name),
						"Map" === n || "Set" === n
							? Array.from(o)
							: "Arguments" === n ||
							  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							? _arrayLikeToArray(o, minLen)
							: void 0
					);
				}
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function isExprElEqual(e1, e2) {
				return "op" === e1.type && "op" === e2.type
					? e1.op === e2.op
					: (("start" === e1.type && "start" === e2.type) ||
							("interm" === e1.type && "interm" === e2.type)) &&
							e1.index === e2.index;
			}
			function stringToLine(str) {
				var i = 0,
					line = [],
					errors = [];
				function consumeNumIndex() {
					var m = /^[0-9]+/.exec(str.slice(i));
					return m ? ((i += m[0].length), parseInt(m[0])) : null;
				}
				for (; i < str.length; ) {
					var _char = str[i];
					if (((i += 1), !/\s/.test(_char)))
						if ((0, _Operators__WEBPACK_IMPORTED_MODULE_16__.zm)(_char))
							line.push({type: "op", op: _char});
						else if ("s" === _char) {
							var numIndex = consumeNumIndex();
							null === numIndex
								? errors.push({
										code: "E_START_NO_INDEX",
										index: i,
										message: "s not followed by digits",
								  })
								: line.push({type: "start", index: numIndex});
						} else if ("i" === _char) {
							var _numIndex = consumeNumIndex();
							null === _numIndex
								? errors.push({
										code: "E_INTERM_NO_INDEX",
										index: i,
										message: "i not followed by digits",
								  })
								: line.push({type: "interm", index: _numIndex});
						} else
							errors.push({
								code: "E_INVALID_CHARACTER",
								index: i,
								message: "Invalid character " + _char,
							});
				}
				return errors.length ? {value: null, errors} : {value: line, errors};
			}
			function encloseLineInParens(line) {
				return [{type: "op", op: "("}].concat(_toConsumableArray(line), [
					{type: "op", op: ")"},
				]);
			}
			function makeStateFromStrings(start, mainString) {
				var intermStrings =
						arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
					mainRes = stringToLine(mainString);
				if (mainRes.errors.length || !mainRes.value)
					throw new Error(
						"main stringToLine failed: " + JSON.stringify(mainRes.errors)
					);
				var _step2,
					intermLines = [],
					i = 0,
					_iterator2 = _createForOfIteratorHelper(intermStrings);
				try {
					for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
						var intermString = _step2.value,
							intermRes = stringToLine(intermString);
						if (intermRes.errors.length || !intermRes.value)
							throw new Error(
								"interm[" +
									i +
									"] stringToLine failed: " +
									JSON.stringify(intermRes.errors)
							);
						intermLines.push(intermRes.value), (i += 1);
					}
				} catch (err) {
					_iterator2.e(err);
				} finally {
					_iterator2.f();
				}
				var state = {
					start,
					rules: (0, _Rules__WEBPACK_IMPORTED_MODULE_17__.j)(),
					interm: intermLines,
					main: mainRes.value,
				};
				return state;
			}
		},
		"./src/expr/Operators.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				xW: () => AssocDir,
				On: () => getTerminalPrecedence,
				E5: () => getPrecedence,
				nH: () => getAssocDir,
				xs: () => isCommutative,
				zm: () => isExpressionOperator,
				qj: () => isExpressionOperatorChar,
				dd: () => toExpressionOperator,
			});
			__webpack_require__(
				"./node_modules/core-js/modules/es.array.includes.js"
			);
			var AssocDir,
				_util_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					"./src/util/Utils.ts"
				),
				expressionOperators = ["+", "-", "*", "/", "(", ")"];
			function getTerminalPrecedence() {
				return -1;
			}
			function getPrecedence(op) {
				return "+" === op || "-" === op
					? 0
					: "*" === op || "/" === op
					? 1
					: void (0, _util_Utils__WEBPACK_IMPORTED_MODULE_1__.vE)(op);
			}
			function getAssocDir(op) {
				return AssocDir.LEFT;
			}
			function isCommutative(op) {
				return "+" === op || "*" === op;
			}
			function isExpressionOperator(str) {
				return expressionOperators.includes(str);
			}
			function isExpressionOperatorChar(str) {
				return "x" === str || expressionOperators.includes(str);
			}
			function toExpressionOperator(str) {
				return "x" === str
					? "*"
					: expressionOperators.includes(str)
					? str
					: null;
			}
			!(function (AssocDir) {
				(AssocDir[(AssocDir.LEFT = 0)] = "LEFT"),
					(AssocDir[(AssocDir.RIGHT = 1)] = "RIGHT");
			})(AssocDir || (AssocDir = {}));
		},
		"./src/expr/Rational.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				xS: () => fromNumber,
				Bx: () => doOp,
			});
			__webpack_require__(
				"./node_modules/core-js/modules/es.array.is-array.js"
			),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js");
			var _util_Utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
				"./src/util/Utils.ts"
			);
			function _slicedToArray(arr, i) {
				return (
					(function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function _iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function _unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return _arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function _nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function fromNumber(n) {
				return [n, 1];
			}
			function normalize(r) {
				if (!r) return null;
				var _r = _slicedToArray(r, 2),
					p = _r[0],
					q = _r[1];
				if (0 === q) return null;
				q < 0 && ((p *= -1), (q *= -1));
				var d = (function gcd(m, n) {
					if (m !== Math.floor(m) || n !== Math.floor(n)) return 1;
					for (
						var _ref2 = _slicedToArray(
								(m = Math.abs(m)) > (n = Math.abs(n)) ? [m, n] : [n, m],
								2
							),
							hi = _ref2[0],
							lo = _ref2[1];
						hi > lo && lo > 0;

					) {
						var rem = hi % lo;
						(hi = lo), (lo = rem);
					}
					return hi;
				})(p, q);
				return [(p /= d), (q /= d)];
			}
			function doOp(r1, r2, op) {
				if (!r1 || !r2) return null;
				var _r2 = _slicedToArray(r1, 2),
					p1 = _r2[0],
					q1 = _r2[1],
					_r3 = _slicedToArray(r2, 2),
					p2 = _r3[0],
					q2 = _r3[1];
				return "+" === op
					? normalize([p1 * q2 + p2 * q1, q1 * q2])
					: "-" === op
					? normalize([p1 * q2 - p2 * q1, q1 * q2])
					: "*" === op
					? normalize([p1 * p2, q1 * q2])
					: "/" === op
					? normalize([p1 * q2, q1 * p2])
					: void (0, _util_Utils__WEBPACK_IMPORTED_MODULE_11__.vE)(op);
			}
		},
		"./src/expr/Rules.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {j: () => resolveRules});
			__webpack_require__("./node_modules/core-js/modules/es.object.assign.js");
			var defaultRules = {
				forbidOps: [],
				forbidParens: !1,
				forbidConcat: !1,
				singleOps: !1,
				opLimit: 0,
				impossible: 0,
			};
			function resolveRules(rules) {
				return Object.assign({}, defaultRules, rules || {});
			}
		},
		"./src/expr/State.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				_F: () => backspaceStateMain,
				H$: () => canFinishDivisionByZero,
				Gp: () => canFinishInterm,
				a$: () => canFinishMain,
				Jw: () => checkNumberUsage,
				Hl: () => getButtonIndexByChar,
				P9: () => getErrorsForPartial,
				Ww: () => getFinishErrors,
				zo: () => getFinishedLine,
				D: () => getNumberButtonStates,
				F1: () => hasUsedAllNumbers,
				xb: () => isEmpty,
				Xn: () => isEqualsEnabled,
				HO: () => isOpEnabled,
				jy: () => pushStateElement,
				nF: () => pushStateElementAsAutoInterm,
				_3: () => pushStateIntermediate,
				mN: () => undoStateIntermediate,
			});
			__webpack_require__(
				"./node_modules/core-js/modules/es.array.includes.js"
			),
				__webpack_require__("./node_modules/core-js/modules/es.set.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.for-each.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.for-each.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.filter.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.find-index.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.concat.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.some.js"),
				__webpack_require__("./node_modules/core-js/modules/es.array.every.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.includes.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.splice.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.parse-int.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.is-array.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				);
			var Utils = __webpack_require__("./src/util/Utils.ts"),
				TreeParse = __webpack_require__("./src/expr/TreeParse.ts"),
				Operators = __webpack_require__("./src/expr/Operators.ts");
			function _toConsumableArray(arr) {
				return (
					(function _arrayWithoutHoles(arr) {
						if (Array.isArray(arr)) return _arrayLikeToArray(arr);
					})(arr) ||
					(function _iterableToArray(iter) {
						if (
							("undefined" != typeof Symbol && null != iter[Symbol.iterator]) ||
							null != iter["@@iterator"]
						)
							return Array.from(iter);
					})(arr) ||
					(function _unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return _arrayLikeToArray(o, minLen);
					})(arr) ||
					(function _nonIterableSpread() {
						throw new TypeError(
							"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function getMinPrecInTree(tree) {
				if ("op" !== tree.type || !tree.terms.length) return 1 / 0;
				var precs = tree.ops.map(function (op) {
					return Operators.E5(op);
				});
				return precs.length
					? Math.min.apply(Math, _toConsumableArray(precs))
					: getMinPrecInTree(tree.terms[0]);
			}
			function needsParens(tree, index) {
				var stripParens =
					arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
				if ("op" !== tree.type) return !1;
				var child = tree.terms[index];
				if (!stripParens)
					return !!child && "op" === child.type && child.ops.length > 0;
				for (; child && "op" === child.type && 1 === child.terms.length; )
					child = child.terms[0];
				if (!child) return !1;
				var prevOp = tree.ops[index - 1],
					nextOp = tree.ops[index],
					minPrecInChild = getMinPrecInTree(child);
				if (prevOp) {
					var prevPrec = Operators.E5(prevOp),
						prevComm = Operators.xs(prevOp);
					if (prevPrec > minPrecInChild) return !0;
					if (!prevComm && prevPrec === minPrecInChild) return !0;
				}
				if (nextOp) {
					var nextPrec = Operators.E5(nextOp);
					if (nextPrec > minPrecInChild) return !0;
				}
				return !1;
			}
			var Eval = __webpack_require__("./src/expr/Eval.ts");
			function State_toConsumableArray(arr) {
				return (
					(function State_arrayWithoutHoles(arr) {
						if (Array.isArray(arr)) return State_arrayLikeToArray(arr);
					})(arr) ||
					(function State_iterableToArray(iter) {
						if (
							("undefined" != typeof Symbol && null != iter[Symbol.iterator]) ||
							null != iter["@@iterator"]
						)
							return Array.from(iter);
					})(arr) ||
					State_unsupportedIterableToArray(arr) ||
					(function State_nonIterableSpread() {
						throw new TypeError(
							"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function State_unsupportedIterableToArray(o, minLen) {
				if (o) {
					if ("string" == typeof o) return State_arrayLikeToArray(o, minLen);
					var n = Object.prototype.toString.call(o).slice(8, -1);
					return (
						"Object" === n && o.constructor && (n = o.constructor.name),
						"Map" === n || "Set" === n
							? Array.from(o)
							: "Arguments" === n ||
							  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							? State_arrayLikeToArray(o, minLen)
							: void 0
					);
				}
			}
			function State_arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var PARTIAL_CODES = ["E_DIVIDE_BY_ZERO", "E_UNUSED_NUMBER"],
				PARTIAL_NUM_REMAINING_CODES = [
					"E_EMPTY_EXPRESSION",
					"E_DANGLING_OPERATOR",
				];
			function stopsFinishingInterm(error) {
				return "E_UNUSED_NUMBER" !== error.code;
			}
			function stopsFinishingMain(_error) {
				return !0;
			}
			function checkNumberUsage(state) {
				var seenStart = new Set(),
					seenInterm = new Set(),
					errors = [];
				return (
					(function checkLine(line) {
						line.forEach(function (el) {
							if ("start" === el.type)
								if (seenStart.has(el.index)) {
									var s = state.start[el.index];
									errors.push({
										code: "E_OVERUSED_NUMBER",
										message: "Starting number " + s + " is used too many times",
										el,
									});
								} else seenStart.add(el.index);
							else if ("interm" === el.type)
								if (seenInterm.has(el.index))
									errors.push({
										code: "E_OVERUSED_NUMBER",
										message: "Intermediate number is used too many times",
										el,
									});
								else {
									seenInterm.add(el.index);
									var intermLine = state.interm[el.index];
									intermLine && checkLine(intermLine);
								}
						});
					})(state.main),
					state.start.forEach(function (s, i) {
						seenStart.has(i) ||
							errors.push({
								code: "E_UNUSED_NUMBER",
								message: "Starting number " + s + " is never used",
								el: {type: "start", index: i},
							});
					}),
					errors
				);
			}
			function usesEnoughNumbersForInterm(state) {
				return (
					state.main.filter(function (el) {
						return "start" === el.type || "interm" === el.type;
					}).length > 1
				);
			}
			function getLineIntermIndices(line) {
				return line
					.filter(function (el) {
						return "interm" === el.type;
					})
					.map(function (el) {
						return el.index;
					});
			}
			function getUsedOpsInTree(tree) {
				if ("op" === tree.type) {
					var ops = State_toConsumableArray(tree.ops);
					return (
						tree.terms.forEach(function (term) {
							ops.push.apply(
								ops,
								State_toConsumableArray(getUsedOpsInTree(term))
							);
						}),
						ops
					);
				}
				return [];
			}
			function getUsedOps(state, mainTree) {
				var ops = [];
				return (
					mainTree &&
						ops.push.apply(
							ops,
							State_toConsumableArray(getUsedOpsInTree(mainTree))
						),
					(function getUnusedIntermIndices(state) {
						var seen = new Set();
						getLineIntermIndices(state.main).forEach(function (i) {
							return seen.add(i);
						});
						for (
							var unused = [], _intermIndex = state.interm.length - 1;
							_intermIndex >= 0;
							_intermIndex -= 1
						)
							seen.has(_intermIndex) ||
								(unused.push(_intermIndex),
								getLineIntermIndices(state.interm[_intermIndex]).forEach(
									function (i) {
										return seen.add(i);
									}
								));
						return unused;
					})(state).forEach(function (intermIndex) {
						var res = (0, TreeParse.j)(state, intermIndex);
						res.value &&
							ops.push.apply(
								ops,
								State_toConsumableArray(getUsedOpsInTree(res.value))
							);
					}),
					ops
				);
			}
			function getTooLongErrors(state) {
				var _step,
					errors = [],
					counts = {"(": 0, ")": 0, op: 0, num: 0},
					startCount = state.start.length,
					_iterator = (function _createForOfIteratorHelper(o, allowArrayLike) {
						var it =
							("undefined" != typeof Symbol && o[Symbol.iterator]) ||
							o["@@iterator"];
						if (!it) {
							if (
								Array.isArray(o) ||
								(it = State_unsupportedIterableToArray(o)) ||
								(allowArrayLike && o && "number" == typeof o.length)
							) {
								it && (o = it);
								var i = 0,
									F = function F() {};
								return {
									s: F,
									n: function n() {
										return i >= o.length
											? {done: !0}
											: {done: !1, value: o[i++]};
									},
									e: function e(_e) {
										throw _e;
									},
									f: F,
								};
							}
							throw new TypeError(
								"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
							);
						}
						var err,
							normalCompletion = !0,
							didErr = !1;
						return {
							s: function s() {
								it = it.call(o);
							},
							n: function n() {
								var step = it.next();
								return (normalCompletion = step.done), step;
							},
							e: function e(_e2) {
								(didErr = !0), (err = _e2);
							},
							f: function f() {
								try {
									normalCompletion || null == it.return || it.return();
								} finally {
									if (didErr) throw err;
								}
							},
						};
					})(state.main);
				try {
					for (_iterator.s(); !(_step = _iterator.n()).done; ) {
						var el = _step.value;
						"op" !== el.type || ("(" !== el.op && ")" !== el.op)
							? "op" === el.type
								? ((counts.op += 1),
								  counts.op > startCount - 1 &&
										errors.push({
											code: "E_TOO_LONG",
											message: "Expression has too many elements",
											el,
										}))
								: ((counts.num += 1),
								  counts.op > startCount &&
										errors.push({
											code: "E_TOO_LONG",
											message: "Expression has too many elements",
											el,
										}))
							: ((counts[el.op] += 1),
							  counts[el.op] > startCount &&
									errors.push({
										code: "E_TOO_LONG",
										message: "Expression has too many elements",
										el,
									}));
					}
				} catch (err) {
					_iterator.e(err);
				} finally {
					_iterator.f();
				}
				return errors;
			}
			var _derivedMemoLastInput = null,
				_derivedMemoLastReturn = null;
			function getDerivedStateInfo(state) {
				if (_derivedMemoLastInput === state) return _derivedMemoLastReturn;
				var derived,
					treeRes = (0, TreeParse.K)(state),
					tree = treeRes.value,
					usedOps = getUsedOps(state, tree),
					numberButtonStates = (function getNumberButtonStatesUnmemo(state) {
						var buttons = state.start.map(function (_s, i) {
								return {state: "available", el: {type: "start", index: i}};
							}),
							intermPosTable = {};
						function processLine(line, usedState) {
							line.forEach(function (el) {
								if ("start" === el.type && buttons[el.index])
									buttons[el.index].state = usedState;
								else if ("interm" === el.type) {
									var index = intermPosTable[el.index];
									void 0 !== index &&
										buttons[index] &&
										(buttons[index].state = usedState);
								}
							});
						}
						return (
							state.interm.forEach(function (intermLine, intermIndex) {
								processLine(intermLine, "used");
								var intermPos = buttons.findIndex(function (b) {
									return "used" === b.state;
								});
								intermPos > -1 &&
									((intermPosTable[intermIndex] = intermPos),
									buttons[intermPos] &&
										((buttons[intermPos].state = "available"),
										(buttons[intermPos].el = {
											type: "interm",
											index: intermIndex,
										})));
							}),
							processLine(state.main, "current"),
							buttons
						);
					})(state),
					usageErrors = checkNumberUsage(state),
					usedAllNumbers = !usageErrors.length,
					tooLongErrors = getTooLongErrors(state);
				if (treeRes.errors.length) {
					var errors = [].concat(
						State_toConsumableArray(treeRes.errors),
						State_toConsumableArray(usageErrors),
						State_toConsumableArray(tooLongErrors)
					);
					derived = {
						tree: treeRes.value,
						usedAllNumbers,
						usedOps,
						numberButtonStates,
						evalValue: null,
						errors,
						finishableInterm: !1,
						finishableMain: !1,
						finishErrors: errors,
					};
				} else if (tree) {
					var evalRes = (0, Eval.vq)(tree),
						_errors2 = [].concat(
							State_toConsumableArray(evalRes.errors),
							State_toConsumableArray(usageErrors),
							State_toConsumableArray(tooLongErrors)
						),
						finishableMain = !_errors2.some(stopsFinishingMain),
						finishableInterm =
							!finishableMain &&
							!state.rules.forbidParens &&
							usesEnoughNumbersForInterm(state) &&
							!_errors2.some(stopsFinishingInterm),
						finishErrors = [];
					!usageErrors.length &&
						state.rules.forbidParens &&
						finishErrors.push({
							code: "E_RULE_FORBIDDEN_PARENS",
							loc: {intermIndex: null, start: 0, end: state.main.length},
							message: "No parentheses or grouping allowed in this problem",
						}),
						usesEnoughNumbersForInterm(state) ||
							finishErrors.push({
								code: "E_NOT_ENOUGH_FOR_INTERM",
								message: "Not enough numbers to make an intermediate",
							}),
						finishErrors.push.apply(
							finishErrors,
							State_toConsumableArray(_errors2)
						),
						(derived = {
							tree,
							usedAllNumbers,
							usedOps,
							numberButtonStates,
							evalValue: evalRes.value,
							errors: _errors2,
							finishableInterm,
							finishableMain,
							finishErrors,
						});
				} else {
					var _errors = [
						{code: "E_UNKNOWN", message: "Failed to build expression tree"},
					];
					derived = {
						tree: null,
						usedAllNumbers,
						usedOps,
						numberButtonStates,
						evalValue: null,
						errors: _errors,
						finishableInterm: !1,
						finishableMain: !1,
						finishErrors: _errors,
					};
				}
				return (
					(_derivedMemoLastInput = state),
					(_derivedMemoLastReturn = derived),
					derived
				);
			}
			function getErrorsForPartial(state) {
				var derived = getDerivedStateInfo(state);
				return derived.errors.filter(function (e) {
					return !(function isErrorOkIfPartial(error) {
						var usedAllNumbers =
							arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
						if ("partial" in error && error.partial) {
							if (
								!usedAllNumbers ||
								!PARTIAL_NUM_REMAINING_CODES.includes(error.code)
							)
								return !0;
						} else if (PARTIAL_CODES.includes(error.code)) return !0;
						return !1;
					})(e, derived.usedAllNumbers);
				});
			}
			function getFinishErrors(state) {
				return getDerivedStateInfo(state).finishErrors;
			}
			function canFinishInterm(state) {
				return getDerivedStateInfo(state).finishableInterm;
			}
			function canFinishMain(state) {
				return getDerivedStateInfo(state).finishableMain;
			}
			function hasUsedAllNumbers(state) {
				return getDerivedStateInfo(state).usedAllNumbers;
			}
			function isEmpty(state) {
				return !state.main.length && !state.interm.length;
			}
			function canFinishDivisionByZero(state) {
				var acceptedErrors = ["E_DIVIDE_BY_ZERO", "E_UNUSED_NUMBER"],
					derivedState = getDerivedStateInfo(state);
				return (
					derivedState.finishErrors.length > 0 &&
					derivedState.finishErrors.every(function (_ref) {
						var code = _ref.code;
						return acceptedErrors.includes(code);
					})
				);
			}
			function isEqualsEnabled(state) {
				return (
					!!(
						canFinishMain(state) ||
						canFinishInterm(state) ||
						canFinishDivisionByZero(state)
					) ||
					(!!state.main.length && !state.rules.forbidParens && null)
				);
			}
			function isOpEnabled(state, op) {
				if ("(" === op || ")" === op) return !state.rules.forbidParens;
				if (state.rules.forbidOps.includes(op)) return !1;
				if (
					state.rules.singleOps &&
					getDerivedStateInfo(state).usedOps.includes(op)
				)
					return !1;
				if (
					state.rules.opLimit &&
					getDerivedStateInfo(state).usedOps.length >= state.rules.opLimit
				)
					return !1;
				return !0;
			}
			function pushStateElement(state, el) {
				return Object.assign({}, state, {
					main: [].concat(State_toConsumableArray(state.main), [el]),
				});
			}
			function pushStateElementAsAutoInterm(state, el) {
				if ("op" !== el.type) return null;
				if (!state.interm.length) return null;
				if (
					state.main.filter(function (mainEl) {
						return "start" === mainEl.type || "interm" === mainEl.type;
					}).length
				)
					return null;
				var autoEl = {type: "interm", index: state.interm.length - 1};
				return Object.assign({}, state, {
					main: [].concat(State_toConsumableArray(state.main), [autoEl, el]),
				});
			}
			function pushStateIntermediate(state) {
				return Object.assign({}, state, {
					interm: [].concat(State_toConsumableArray(state.interm), [
						state.main,
					]),
					main: [],
				});
			}
			function backspaceStateMain(state) {
				return state.main.length
					? Object.assign({}, state, {main: state.main.slice(0, -1)})
					: state;
			}
			function undoStateIntermediate(state) {
				return !state.interm.length || state.main.length
					? state
					: Object.assign({}, state, {
							interm: state.interm.slice(0, -1),
							main: state.interm[state.interm.length - 1],
					  });
			}
			function getNumberButtonStates(state) {
				return getDerivedStateInfo(state).numberButtonStates;
			}
			function getButtonIndexByChar(state, _char) {
				if (!/^[0-9]$/.test(_char)) return -1;
				var numberButtonStates = getNumberButtonStates(state),
					num = parseInt(_char),
					isWorkingIndex = function isWorkingIndex(allowInterm, b) {
						if ("available" !== b.state) return !1;
						if ("interm" === b.el.type) {
							if (!allowInterm) return !1;
							var intermValue = (0, Eval.$w)(state, b.el.index).value;
							if (intermValue && intermValue[0] === num && 1 === intermValue[1])
								return !0;
						} else if ("start" === b.el.type) {
							if (state.start[b.el.index] === num) return !0;
						} else (0, Utils.vE)(b.el);
						return !1;
					},
					indexStart = numberButtonStates.findIndex(function (b) {
						return isWorkingIndex(!1, b);
					});
				if (indexStart > -1) return indexStart;
				var indexInterm = numberButtonStates.findIndex(function (b) {
					return isWorkingIndex(!0, b);
				});
				return indexInterm > -1 ? indexInterm : -1;
			}
			function getFinishedLine(state, options) {
				var _ref2$stripParens = (options || {}).stripParens,
					stripParens = void 0 !== _ref2$stripParens && _ref2$stripParens,
					derived = getDerivedStateInfo(state);
				if (!derived.tree)
					return {value: {line: null, evalValue: null}, errors: derived.errors};
				var line = (function buildLineFromTree(tree, options) {
					for (
						var _ref$stripParens = (options || {}).stripParens,
							stripParens = void 0 !== _ref$stripParens && _ref$stripParens,
							line = [],
							stack = [{tree, index: 0}];
						stack.length;

					) {
						var tail = stack[stack.length - 1];
						if ("number" === tail.tree.type) {
							if (!tail.tree.source)
								throw new Error("Tree number node missing source");
							line.push(tail.tree.source), stack.pop();
						} else if ("concat" === tail.tree.type) {
							var nextTree = tail.tree.terms[tail.index];
							nextTree
								? (stack.push({tree: nextTree, index: 0}), (tail.index += 1))
								: stack.pop();
						} else if ("op" === tail.tree.type) {
							var _nextTree = tail.tree.terms[tail.index];
							_nextTree
								? (tail.index > 0 &&
										line.push({type: "op", op: tail.tree.ops[tail.index - 1]}),
								  needsParens(tail.tree, tail.index, stripParens)
										? (line.push({type: "op", op: "("}),
										  stack.push({tree: _nextTree, index: 0, parens: !0}))
										: stack.push({tree: _nextTree, index: 0}),
								  (tail.index += 1))
								: (tail.parens && line.push({type: "op", op: ")"}),
								  stack.pop());
						}
					}
					return line;
				})(derived.tree, {stripParens});
				return {
					value: {line, evalValue: derived.evalValue},
					errors: derived.errors,
				};
			}
		},
		"./src/expr/TreeParse.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				j: () => buildTreeFromStateIntermediate,
				K: () => buildTreeFromStateMain,
			});
			__webpack_require__(
				"./node_modules/core-js/modules/es.array.find-index.js"
			),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.concat.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.for-each.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.for-each.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.includes.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.includes.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.is-array.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				);
			var _util_Utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
					"./src/util/Utils.ts"
				),
				_Rational__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
					"./src/expr/Rational.ts"
				),
				_Line__WEBPACK_IMPORTED_MODULE_21__ =
					__webpack_require__("./src/expr/Line.ts");
			function _toConsumableArray(arr) {
				return (
					(function _arrayWithoutHoles(arr) {
						if (Array.isArray(arr)) return _arrayLikeToArray(arr);
					})(arr) ||
					(function _iterableToArray(iter) {
						if (
							("undefined" != typeof Symbol && null != iter[Symbol.iterator]) ||
							null != iter["@@iterator"]
						)
							return Array.from(iter);
					})(arr) ||
					_unsupportedIterableToArray(arr) ||
					(function _nonIterableSpread() {
						throw new TypeError(
							"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _unsupportedIterableToArray(o, minLen) {
				if (o) {
					if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
					var n = Object.prototype.toString.call(o).slice(8, -1);
					return (
						"Object" === n && o.constructor && (n = o.constructor.name),
						"Map" === n || "Set" === n
							? Array.from(o)
							: "Arguments" === n ||
							  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							? _arrayLikeToArray(o, minLen)
							: void 0
					);
				}
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			function makeErrorLoc(ps, index) {
				var endOffset =
					arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
				return (
					(index = void 0 === index ? ps.lineIndex : index),
					{
						intermIndex: ps.lineIntermIndex,
						start: index + ps.errorOffset,
						end: index + ps.errorOffset + endOffset,
					}
				);
			}
			function createPS(state, line) {
				var options =
						arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
					_options$stack = options.stack,
					stack = void 0 === _options$stack ? [] : _options$stack,
					_options$isRoot = options.isRoot,
					isRoot = void 0 === _options$isRoot || _options$isRoot,
					_options$canBePartial = options.canBePartial,
					canBePartial =
						void 0 === _options$canBePartial || _options$canBePartial,
					_options$errorOffset = options.errorOffset,
					errorOffset =
						void 0 === _options$errorOffset ? 0 : _options$errorOffset,
					_options$lineIntermIn = options.lineIntermIndex,
					lineIntermIndex =
						void 0 === _options$lineIntermIn ? null : _options$lineIntermIn,
					source = (isRoot && stack[0]) || null;
				return {
					state,
					line,
					lineIntermIndex,
					stack,
					canBePartial,
					errorOffset,
					partialOp: {type: "op", source, terms: [], ops: []},
					errors: [],
					opLocList: [],
					lineIndex: 0,
					mode: "term",
					canMultiply: !1,
				};
			}
			function parseLineOpenParen(ps) {
				for (
					var _ps$errors,
						_ps$opLocList,
						line = ps.line,
						lineIndex = ps.lineIndex,
						nestLevel = 1,
						closeIndex = lineIndex + 1;
					closeIndex < line.length;

				) {
					var el = line[closeIndex];
					if (
						("op" === el.type && ")" === el.op
							? (nestLevel -= 1)
							: "op" === el.type && "(" === el.op && (nestLevel += 1),
						nestLevel <= 0)
					)
						break;
					closeIndex += 1;
				}
				var restPS = (function createPSFromRange(ps, start, end) {
						var canBePartial =
								arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
							newLine = ps.line.slice(start, end);
						return createPS(ps.state, newLine, {
							lineIntermIndex: ps.lineIntermIndex,
							stack: ps.stack,
							isRoot: !1,
							canBePartial,
							errorOffset: start,
						});
					})(ps, lineIndex + 1, closeIndex, nestLevel > 0),
					restTree = parseLine(restPS);
				(_ps$errors = ps.errors).push.apply(
					_ps$errors,
					_toConsumableArray(restPS.errors)
				),
					(_ps$opLocList = ps.opLocList).push.apply(
						_ps$opLocList,
						_toConsumableArray(restPS.opLocList)
					),
					nestLevel > 0 &&
						ps.errors.push({
							code: "E_UNCLOSED_PAREN",
							loc: makeErrorLoc(ps, lineIndex),
							message: "Unclosed open parenthesis",
							partial: ps.canBePartial,
						}),
					(ps.lineIndex = closeIndex + (nestLevel > 0 ? 0 : 1)),
					restTree &&
						(ps.partialOp.terms.push(restTree),
						(ps.mode = "op"),
						(ps.canMultiply = !0));
			}
			function parseLineIntermNumber(ps, curr) {
				var _ps$errors2,
					_ps$opLocList2,
					stackIndex = (function findIndexStackEl(ps, el) {
						return ps.stack.findIndex(function (other) {
							return (0, _Line__WEBPACK_IMPORTED_MODULE_21__.dN)(el, other);
						});
					})(ps, curr);
				if (stackIndex > -1) {
					var intermIndices = ps.stack.slice(stackIndex).map(function (el) {
						return el.index;
					});
					return (
						ps.errors.push({
							code: "E_INTERM_CYCLE",
							loc: makeErrorLoc(ps),
							message: "Intermediate expression " + curr.index + " is circular",
							intermIndices,
						}),
						void (ps.lineIndex += 1)
					);
				}
				var intermLine = ps.state.interm[curr.index];
				if (void 0 === intermLine)
					return (
						ps.errors.push({
							code: "E_INVALID_NUMBER_INDEX",
							loc: makeErrorLoc(ps),
							message: "Invalid interm index " + curr.index,
							el: curr,
						}),
						void (ps.lineIndex += 1)
					);
				var newStack = [].concat(_toConsumableArray(ps.stack), [curr]),
					restPS = createPS(ps.state, intermLine, {
						lineIntermIndex: curr.index,
						stack: newStack,
						canBePartial: !1,
					}),
					restTree = parseLine(restPS);
				(_ps$errors2 = ps.errors).push.apply(
					_ps$errors2,
					_toConsumableArray(restPS.errors)
				),
					(_ps$opLocList2 = ps.opLocList).push.apply(
						_ps$opLocList2,
						_toConsumableArray(restPS.opLocList)
					);
				var subtree = restTree;
				subtree &&
					((subtree.source &&
						(0, _Line__WEBPACK_IMPORTED_MODULE_21__.dN)(
							subtree.source,
							curr
						)) ||
						(subtree = subtree.source
							? {type: "op", source: curr, terms: [subtree], ops: []}
							: Object.assign({}, subtree, {source: curr}))),
					(ps.lineIndex += 1),
					subtree &&
						(ps.partialOp.terms.push(subtree),
						(ps.mode = "op"),
						(ps.canMultiply = !1));
			}
			function parseLineModeTerm(ps, curr) {
				"op" === curr.type
					? "(" === curr.op
						? parseLineOpenParen(ps)
						: ")" === curr.op
						? (ps.errors.push({
								code: "E_UNOPENED_PAREN",
								loc: makeErrorLoc(ps),
								message: "Unopened close parenthesis",
						  }),
						  (ps.lineIndex += 1))
						: 0 === ps.lineIndex
						? (ps.errors.push({
								code: "E_MISPLACED_OPERATOR",
								loc: makeErrorLoc(ps),
								message: "Started expression with operator",
								begin: !0,
						  }),
						  (ps.lineIndex += 1))
						: (ps.errors.push({
								code: "E_MISPLACED_OPERATOR",
								loc: makeErrorLoc(ps, ps.lineIndex - 1, 1),
								message: "Two consecutive operators",
								begin: !1,
						  }),
						  (ps.lineIndex += 1))
					: "start" === curr.type
					? (function parseLineStartNumber(ps) {
							for (
								var state = ps.state,
									line = ps.line,
									concatEls = [],
									initLineIndex = ps.lineIndex;
								ps.lineIndex < line.length;

							) {
								var el = line[ps.lineIndex];
								if ("start" !== el.type) break;
								var number = state.start[el.index];
								if (void 0 === number) {
									ps.errors.push({
										code: "E_INVALID_NUMBER_INDEX",
										loc: makeErrorLoc(ps),
										message: "Invalid start index " + el.index,
										el,
									}),
										(ps.lineIndex += 1);
									break;
								}
								(ps.lineIndex += 1),
									concatEls.push({
										type: "number",
										source: el,
										number: (0, _Rational__WEBPACK_IMPORTED_MODULE_20__.xS)(
											number
										),
									});
							}
							concatEls.length &&
								(1 === concatEls.length
									? ps.partialOp.terms.push(concatEls[0])
									: (ps.state.rules.forbidConcat &&
											ps.errors.push({
												code: "E_RULE_FORBIDDEN_CONCAT",
												loc: makeErrorLoc(
													ps,
													initLineIndex,
													ps.lineIndex - initLineIndex - 1
												),
												message:
													"Concatenating digits is not allowed in this problem",
											}),
									  ps.partialOp.terms.push({
											type: "concat",
											source: null,
											terms: concatEls,
									  })),
								(ps.mode = "op"),
								(ps.canMultiply = !1));
					  })(ps)
					: "interm" === curr.type
					? parseLineIntermNumber(ps, curr)
					: (0, _util_Utils__WEBPACK_IMPORTED_MODULE_19__.vE)(curr);
			}
			function parseLineModeOp(ps, curr) {
				"op" === curr.type
					? "(" === curr.op
						? (ps.partialOp.ops.push("*"),
						  ps.opLocList.push({
								op: "*",
								loc: makeErrorLoc(ps, ps.lineIndex, 1),
								implicit: !0,
						  }),
						  (ps.mode = "term"))
						: ")" === curr.op
						? (ps.errors.push({
								code: "E_UNOPENED_PAREN",
								loc: makeErrorLoc(ps),
								message: "Unopened close parenthesis",
						  }),
						  (ps.lineIndex += 1))
						: (ps.partialOp.ops.push(curr.op),
						  ps.opLocList.push({
								op: curr.op,
								loc: makeErrorLoc(ps),
								implicit: !1,
						  }),
						  (ps.lineIndex += 1),
						  (ps.mode = "term"))
					: "start" === curr.type || "interm" === curr.type
					? (ps.canMultiply ||
							ps.errors.push({
								code: "E_NO_IMPLICIT_MULTIPLICATION",
								loc: makeErrorLoc(ps),
								message: "Cannot do implicit multiplication here",
							}),
					  ps.partialOp.ops.push("*"),
					  ps.opLocList.push({
							op: "*",
							loc: makeErrorLoc(ps, ps.lineIndex - 1, 1),
							implicit: !0,
					  }),
					  (ps.mode = "term"))
					: (0, _util_Utils__WEBPACK_IMPORTED_MODULE_19__.vE)(curr);
			}
			function checkRules(ps) {
				var rules = ps.state.rules,
					opCounts = {};
				if (
					(ps.opLocList.forEach(function (_ref) {
						var op = _ref.op,
							loc = _ref.loc,
							implicit = _ref.implicit;
						rules.forbidOps.includes(op) &&
							ps.errors.push({
								code: "E_RULE_FORBIDDEN_OP",
								loc,
								message: "Operator " + op + " is forbidden in this problem.",
								op,
								implicit,
							}),
							(opCounts[op] = (opCounts[op] || 0) + 1),
							rules.singleOps &&
								opCounts[op] > 1 &&
								ps.errors.push({
									code: "E_RULE_MULTIPLE_OPS",
									loc,
									message:
										"Using an operator twice is forbidden in this problem",
									op,
								});
					}),
					rules.opLimit > 0 && ps.opLocList.length > rules.opLimit)
				) {
					var badEntry = ps.opLocList[rules.opLimit];
					ps.errors.push({
						code: "E_RULE_OPS_OVER_LIMIT",
						loc: badEntry.loc,
						message:
							"Limited to " + rules.opLimit + " operations in this problem",
						limit: rules.opLimit,
					});
				}
				if (rules.forbidParens) {
					var _step,
						i = 0,
						_iterator = (function _createForOfIteratorHelper(
							o,
							allowArrayLike
						) {
							var it =
								("undefined" != typeof Symbol && o[Symbol.iterator]) ||
								o["@@iterator"];
							if (!it) {
								if (
									Array.isArray(o) ||
									(it = _unsupportedIterableToArray(o)) ||
									(allowArrayLike && o && "number" == typeof o.length)
								) {
									it && (o = it);
									var i = 0,
										F = function F() {};
									return {
										s: F,
										n: function n() {
											return i >= o.length
												? {done: !0}
												: {done: !1, value: o[i++]};
										},
										e: function e(_e) {
											throw _e;
										},
										f: F,
									};
								}
								throw new TypeError(
									"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
								);
							}
							var err,
								normalCompletion = !0,
								didErr = !1;
							return {
								s: function s() {
									it = it.call(o);
								},
								n: function n() {
									var step = it.next();
									return (normalCompletion = step.done), step;
								},
								e: function e(_e2) {
									(didErr = !0), (err = _e2);
								},
								f: function f() {
									try {
										normalCompletion || null == it.return || it.return();
									} finally {
										if (didErr) throw err;
									}
								},
							};
						})(ps.state.main);
					try {
						for (_iterator.s(); !(_step = _iterator.n()).done; ) {
							var el = _step.value;
							(("op" === el.type && "(" === el.op) || "interm" === el.type) &&
								ps.errors.push({
									code: "E_RULE_FORBIDDEN_PARENS",
									loc: {intermIndex: null, start: i, end: i},
									message: "No parentheses or grouping allowed in this problem",
								}),
								(i += 1);
						}
					} catch (err) {
						_iterator.e(err);
					} finally {
						_iterator.f();
					}
				}
			}
			function parseLine(ps) {
				for (var line = ps.line; ps.lineIndex < line.length; ) {
					var curr = line[ps.lineIndex];
					"term" === ps.mode
						? parseLineModeTerm(ps, curr)
						: "op" === ps.mode
						? parseLineModeOp(ps, curr)
						: (0, _util_Utils__WEBPACK_IMPORTED_MODULE_19__.vE)(ps.mode);
				}
				var _final = ps.partialOp,
					terms = _final.terms,
					ops = _final.ops;
				if ("term" === ps.mode && !terms.length)
					return (
						ps.errors.push({
							code: "E_EMPTY_EXPRESSION",
							loc: makeErrorLoc(ps),
							message: "Empty expression",
							partial: ps.canBePartial,
						}),
						null
					);
				if ("term" === ps.mode)
					ps.errors.push({
						code: "E_DANGLING_OPERATOR",
						loc: makeErrorLoc(ps, ps.lineIndex - 1),
						message: "Dangling operator",
						partial: ps.canBePartial,
					});
				else if (terms.length !== ops.length + 1)
					throw new Error(
						"Expected exactly one more term than operator, got " +
							terms.length +
							" terms and " +
							ops.length +
							" ops"
					);
				return (
					checkRules(ps),
					1 === terms.length && 0 === ops.length ? terms[0] : _final
				);
			}
			function buildTreeFromStateIntermediate(state, index) {
				var line = state.interm[index];
				if (!line)
					return {
						value: null,
						errors: [
							{
								code: "E_INVALID_NUMBER_INDEX",
								loc: {intermIndex: index, start: 0, end: 0},
								message:
									"Tried to build tree with invalid interm index " + index,
								el: {type: "interm", index},
							},
						],
					};
				var ps = createPS(state, line);
				return {value: parseLine(ps), errors: ps.errors};
			}
			function buildTreeFromStateMain(state) {
				var ps = createPS(state, state.main);
				return {value: parseLine(ps), errors: ps.errors};
			}
		},
		"./src/state/Problem.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {R: () => createProblem});
			__webpack_require__(
				"./node_modules/core-js/modules/es.array.is-array.js"
			);
			var _expr_Rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					"./src/expr/Rules.ts"
				),
				DEFAULT_TARGETS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			function createProblem(start) {
				var targets,
					options =
						arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
				Array.isArray(options.targets)
					? (targets = options.targets)
					: options.targets && "default" !== options.targets
					? (console.warn("Invalid targets value", options.targets),
					  (targets = DEFAULT_TARGETS))
					: (targets = DEFAULT_TARGETS);
				var rules = (0, _expr_Rules__WEBPACK_IMPORTED_MODULE_1__.j)(
					options.rules
				);
				return {start, targets, rules};
			}
		},
		"./src/stitches.config.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				zo: () => styled,
				iv: () => css,
				F4: () => keyframes,
			});
			var _createStitches = (0,
				__webpack_require__("./node_modules/@stitches/react/dist/index.mjs")
					.Th)({
					theme: {
						colors: {
							main: "#18355E",
							mainLight: "#289ECC",
							white: "#FFF",
							gray: "#AAA",
							lightGray: "#E0E3E4",
							cyan: "#368FB2",
							bg: "$white",
							bgTransparent: "rgba(255, 255, 255, 0.5)",
							start: "#D6002C",
							impossible: "$start",
							op: "$main",
							disabled: "#E0E3E4",
							empty: "$disabled",
							interm1: "#CC52CC",
							interm2: "#CC52CC",
							done: "#7AC45F",
							ambientShadow: "rgba(0, 0, 0, .4)",
							aopsBlue: "#44C2CC",
							baRed: "#ED1940",
							academyGreen: "#61AD00",
							mainHover: "#465D7E",
							mainLightHover: "#53B1D6",
							whiteHover: "#FFFFFF",
							bgHover: "$whiteHover",
							startHover: "#DE3356",
							impossibleHover: "$startHover",
							opHover: "$mainHover",
							disabledHover: "#E6E9E9",
							emptyHover: "$disabledHover",
							interm1Hover: "#FF33FF",
							interm2Hover: "#3333FF",
							doneHover: "#95D07F",
						},
					},
					media: {
						bpXSmall: "(min-width: 374px)",
						bpSmall: "(min-width: 416px)",
						bpMedium: "(min-width: 768px)",
						bpLarge: "(min-width: 992px)",
						bpExtraLarge: "(min-width: 1200px)",
					},
				}),
				styled = _createStitches.styled,
				css = _createStitches.css,
				keyframes = (_createStitches.globalCss, _createStitches.keyframes);
			_createStitches.getCssText,
				_createStitches.theme,
				_createStitches.createTheme,
				_createStitches.config;
		},
		"./src/util/ErrorCopy.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					INCOMPLETE_EXPRESSION: () => INCOMPLETE_EXPRESSION,
					MISPLACED_OPERATOR: () => MISPLACED_OPERATOR,
					UNNECESSARY_OPERATORS: () => UNNECESSARY_OPERATORS,
					TOO_LONG: () => TOO_LONG,
					INVALID_PARENTHESES: () => INVALID_PARENTHESES,
					INVALID_CONCAT: () => INVALID_CONCAT,
					UNUSED_NUMBER: () => UNUSED_NUMBER,
					DIVIDE_BY_ZERO: () => DIVIDE_BY_ZERO,
					ALREADY_FOUND_TARGET: () => ALREADY_FOUND_TARGET,
					NOT_TARGET: () => NOT_TARGET,
					NOT_INTEGER: () => NOT_INTEGER,
					FRACTION_NOT_INTEGER: () => FRACTION_NOT_INTEGER,
					RULE_FORBIDDEN_OP: () => RULE_FORBIDDEN_OP,
					RULE_FORBIDDEN_PARENS: () => RULE_FORBIDDEN_PARENS,
					RULE_FORBIDDEN_CONCAT: () => RULE_FORBIDDEN_CONCAT,
					RULE_MULTIPLE_OPS: () => RULE_MULTIPLE_OPS,
					RULE_OPS_OVER_LIMIT: () => RULE_OPS_OVER_LIMIT,
					INTERNAL: () => INTERNAL,
				});
			__webpack_require__("./node_modules/core-js/modules/es.string.trim.js");
			var INCOMPLETE_EXPRESSION = "\nHmm... This looks incomplete.\n".trim(),
				MISPLACED_OPERATOR = "\nYou need a number here.\n".trim(),
				UNNECESSARY_OPERATORS = "\nYou used all numbers already.\n".trim(),
				TOO_LONG = "\nYou don't need an expression this long.\n".trim(),
				INVALID_PARENTHESES = "\nThe parentheses do not match up.\n".trim(),
				INVALID_CONCAT =
					"\nCombo buttons cannot be used in 2-digit numbers\n".trim(),
				UNUSED_NUMBER = "\nEvery number must be used.\n".trim(),
				DIVIDE_BY_ZERO = "\nEek! You can't divide by zero.\n".trim(),
				ALREADY_FOUND_TARGET = "\nYou found another way to get %s.\n".trim(),
				NOT_TARGET = "\n%s is not on the list.\n".trim(),
				NOT_INTEGER = "\nThat does not get an integer.\n".trim(),
				FRACTION_NOT_INTEGER = function FRACTION_NOT_INTEGER(fraction) {
					return ("\n" + fraction + " is not an integer.\n").trim();
				},
				RULE_FORBIDDEN_OP = "\nThis problem forbids the operation %s.\n".trim(),
				RULE_FORBIDDEN_PARENS = "\nThis problem forbids grouping.\n".trim(),
				RULE_FORBIDDEN_CONCAT =
					"\nThis problem forbids concatenating.\n".trim(),
				RULE_MULTIPLE_OPS =
					"\nThis problem forbids repeated operations.\n".trim(),
				RULE_OPS_OVER_LIMIT =
					"\nThis problem limits to %s operations.\n".trim(),
				INTERNAL = "\nOops! An internal error occurred.\n".trim();
		},
		"./src/util/ProblemUtil.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				JT: () => ProblemSolutions_namespaceObject,
				vh: () => getProblemNumbersForDay,
				vQ: () => getPuzzleNumberAsString,
				kb: () => prettifySolution,
			});
			__webpack_require__(
				"./node_modules/core-js/modules/es.date.to-string.js"
			),
				__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.split.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.regexp.exec.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.number.constructor.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.replace.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.join.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.regexp.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.repeat.js"
				),
				__webpack_require__("./src/state/Problem.ts");
			var Constants = __webpack_require__("./src/view/util/Constants.tsx");
			const ProblemSolutions_namespaceObject = JSON.parse(
				'{"1114":{"1":"1+(1-1)*4","2":"1/(1+1)*4","3":"(11+1)/4","4":"1-1+1*4","5":"1+1-1+4","6":"11-1-4","7":"11-1*4","8":"11+1-4","9":"1+(1+1)*4","10":"(1+1)*(1+4)"},"1115":{"1":"1+(1-1)*5","2":"(11-1)/5","3":"1*5-1-1","4":"1-1-1+5","5":"11-1-5","6":"11-1*5","7":"11+1-5","8":"1+1+1+5","9":"(1+1)*5-1","10":"(1+1)*1*5"},"1116":{"1":"1+(1-1)*6","2":"(11+1)/6","3":"1/(1+1)*6","4":"11-1-6","5":"11-1*6","6":"11+1-6","7":"1+1-1+6","8":"1+1+1*6","9":"1+1+1+6","10":"(1+1)*(6-1)"},"1118":{"1":"1+(1-1)*8","2":"11-1-8","3":"11-1*8","4":"11+1-8","5":"1+8/(1+1)","6":"1*8-1-1","7":"1-1-1+8","8":"1-1+1*8","9":"1+1-1+8","10":"1+1+1*8"},"1119":{"1":"11-1-9","2":"11-1*9","3":"11+1-9","4":"(9-1)/(1+1)","5":"(1+9)/(1+1)","6":"9-1-1-1","7":"1*9-1-1","8":"1-1-1+9","9":"1-1+1*9","10":"1+1-1+9"},"1122":{"1":"1+1-2/2","2":"1+1+2-2","3":"1+1+2/2","4":"1-1+2+2","5":"1+1*2+2","6":"1+1+2+2","7":"11-2-2","8":"(1+1)*2*2","9":"12-1-2","10":"11-2/2"},"1123":{"1":"1+1+2-3","2":"1-1*2+3","3":"(11-2)/3","4":"(1+1)/2+3","5":"11-2*3","6":"11-2-3","7":"1+1+2+3","8":"1+1+2*3","9":"1*(1+2)*3","10":"11+2-3"},"1124":{"1":"(1+1)*2/4","2":"1-1-2+4","3":"11-2*4","4":"1+1-2+4","5":"11-2-4","6":"1-1+2+4","7":"1+1*2+4","8":"1+1+2+4","9":"11+2-4","10":"1+1+2*4"},"1125":{"1":"11-2*5","2":"(1-1)*5+2","3":"1-1-2+5","4":"11-2-5","5":"1+1-2+5","6":"(1+1)/2+5","7":"1-1+2+5","8":"11+2-5","9":"1+1+2+5","10":"1-1+2*5"},"1126":{"1":"2*6-11","2":"1/(1+2)*6","3":"11-2-6","4":"1+1/2*6","5":"1-1*2+6","6":"1+1-2+6","7":"11+2-6","8":"1-1+2+6","9":"1+1*2+6","10":"2*(11-6)"},"1128":{"1":"11-2-8","2":"(1-1)*8+2","3":"12-1-8","4":"1*1/2*8","5":"11+2-8","6":"2*(11-8)","7":"1-1*2+8","8":"1+1-2+8","9":"(1+1)/2+8","10":"1-1+2+8"},"1129":{"1":"(11-2)/9","2":"(1-1)*9+2","3":"1/(1+2)*9","4":"11+2-9","5":"1-(1-9)/2","6":"1+(1+9)/2","7":"2*9-11","8":"1-1*2+9","9":"1+1-2+9","10":"(1+1)/2+9"},"1133":{"1":"1+1-3/3","2":"11-3*3","3":"1+1+3/3","4":"(1+1/3)*3","5":"11-3-3","6":"1-1+3+3","7":"1+1*3+3","8":"1+1+3+3","9":"1-1+3*3","10":"11-3/3"},"1134":{"1":"3*4-11","2":"(11-3)/4","3":"1+1-3+4","4":"11-3-4","5":"(11+4)/3","6":"1*3-1+4","7":"1-1+3+4","8":"1+1*3+4","9":"1+1+3+4","10":"11+3-4"},"1135":{"1":"(1+1)*3-5","2":"1-1-3+5","3":"11-3-5","4":"3*5-11","5":"(1-1)*3+5","6":"1+15/3","7":"(1+1)*5-3","8":"1-1+3+5","9":"11+3-5","10":"1+1+3+5"},"1136":{"1":"(1+1)*3/6","2":"11-3-6","3":"1+1/3*6","4":"1-1*3+6","5":"1+1-3+6","6":"(1-1)*3+6","7":"3*6-11","8":"11+3-6","9":"1-1+3+6","10":"1+1*3+6"},"1137":{"1":"11-3-7","2":"(11+3)/7","3":"(1-1)*7+3","4":"1-1-3+7","5":"1-1*3+7","6":"1+1-3+7","7":"11+3-7","8":"(1+1)*(7-3)","9":"1*3-1+7","10":"3*7-11"},"1138":{"1":"(11-3)/8","2":"1/(1+3)*8","3":"(1-1)*8+3","4":"1+(1+8)/3","5":"1-1-3+8","6":"11+3-8","7":"1+1-3+8","8":"(1-1)*3+8","9":"3*(11-8)","10":"(1+1)*(8-3)"},"1139":{"1":"3-11+9","2":"1/3*9-1","3":"1*1/3*9","4":"1+1/3*9","5":"11+3-9","6":"3*(11-9)","7":"1-1*3+9","8":"1+1-3+9","9":"(1-1)*3+9","10":"3-1-1+9"},"1144":{"1":"1+1-4/4","2":"1+1+4-4","3":"11-4-4","4":"(1+1)*4-4","5":"4*4-11","6":"4-1-1+4","7":"1*4-1+4","8":"1-1+4+4","9":"1+1*4+4","10":"11-4/4"},"1145":{"1":"1+1+4-5","2":"11-4-5","3":"(11+4)/5","4":"(11+5)/4","5":"(1-1)*4+5","6":"(1+1)*5-4","7":"4-1-1+5","8":"14-1-5","9":"4*5-11","10":"11+4-5"},"1146":{"1":"11-4-6","2":"1-1-4+6","3":"1-1*4+6","4":"1+1-4+6","5":"1+16/4","6":"(1-1)*4+6","7":"14-1-6","8":"(1+1)*6-4","9":"11+4-6","10":"1-1+4+6"},"1147":{"1":"(11-4)/7","2":"1*(1+7)/4","3":"1-1-4+7","4":"1-1*4+7","5":"1+1-4+7","6":"(1+1)*(7-4)","7":"(1-1)*4+7","8":"11+4-7","9":"4-1-1+7","10":"(1+1)*7-4"},"1148":{"1":"4-11+8","2":"1*1/4*8","3":"1+1/4*8","4":"1-1-4+8","5":"1-1*4+8","6":"1+1-4+8","7":"11+4-8","8":"(1-1)*4+8","9":"11-8/4","10":"(1+1/4)*8"},"1149":{"1":"9-(1+1)*4","2":"4-11+9","3":"1-(1-9)/4","4":"(1-1)*9+4","5":"1-1-4+9","6":"11+4-9","7":"1+1-4+9","8":"4*(11-9)","9":"(1-1)*4+9","10":"(1+1)*(9-4)"},"1156":{"1":"(11-5)/6","2":"1-1*5+6","3":"1+1-5+6","4":"(1+1)*5-6","5":"(1-1)*6+5","6":"(1-1)*5+6","7":"(1+1)*6-5","8":"15-1-6","9":"15-1*6","10":"11+5-6"},"1157":{"1":"5-11+7","2":"1-1-5+7","3":"1-1*5+7","4":"1+1-5+7","5":"(1-1)*7+5","6":"(5+7)/(1+1)","7":"(1-1)*5+7","8":"15-1*7","9":"11+5-7","10":"5-1-1+7"},"1158":{"1":"5-8/(1+1)","2":"5-11+8","3":"1-1-5+8","4":"1-1*5+8","5":"1+1-5+8","6":"(1+1)*(8-5)","7":"15-1*8","8":"11+5-8","9":"5+8/(1+1)","10":"8/(1-1/5)"},"1159":{"1":"(1+1)*5-9","2":"1*(1+9)/5","3":"5-11+9","4":"1-1-5+9","5":"1-1*5+9","6":"1+1-5+9","7":"11+5-9","8":"(1+1)*(9-5)","9":"(1-1)*5+9","10":"5*(11-9)"},"1167":{"1":"1+1+6-7","2":"6-11+7","3":"1+1-6+7","4":"7-6/(1+1)","5":"(1+1)*6-7","6":"(1-1)*7+6","7":"(1-1)*6+7","8":"(1+1)*7-6","9":"16-1*7","10":"11+6-7"},"1168":{"1":"(1+1+6)/8","2":"6/(11-8)","3":"6-11+8","4":"1+1-6+8","5":"8-6/(1+1)","6":"(1-1)*8+6","7":"16-1-8","8":"(1-1)*6+8","9":"11+6-8","10":"(1+1)*8-6"},"1189":{"1":"1+1+8-9","2":"1-1*8+9","3":"1+1-8+9","4":"8/(11-9)","5":"9-8/(1+1)","6":"8-11+9","7":"(1+1)*8-9","8":"(1-1)*9+8","9":"(1-1)*8+9","10":"11+8-9"},"1222":{"1":"1*2-2/2","2":"1+2-2/2","3":"12/2/2","4":"12/2-2","5":"(12-2)/2","6":"1*2+2+2","7":"(12+2)/2","8":"12-2-2","9":"1+2*2*2","10":"(1+2+2)*2"},"1223":{"1":"1*2+2-3","2":"12/2/3","3":"12/2-3","4":"1+2-2+3","5":"1+2/2+3","6":"12-2*3","7":"12-2-3","8":"12*2/3","9":"12/2+3","10":"1*2*(2+3)"},"1224":{"1":"1+2+2-4","2":"12/2-4","3":"1/2*(2+4)","4":"12-2*4","5":"2+12/4","6":"12-2-4","7":"1-2+2*4","8":"1*2+2+4","9":"1+2+2+4","10":"12+2-4"},"1225":{"1":"12/2-5","2":"12-2*5","3":"(1-2)*2+5","4":"12/(5-2)","5":"12-2-5","6":"1+2-2+5","7":"1+2/2+5","8":"1*2*5-2","9":"12+2-5","10":"1+2+2+5"},"1226":{"1":"12/2/6","2":"1-2+6/2","3":"1-2-2+6","4":"12-2-6","5":"1*2+6/2","6":"1-2/2+6","7":"1+2-2+6","8":"12+2-6","9":"(1+2)/2*6","10":"1*2+2+6"},"1227":{"1":"1+(2-2)*7","2":"2*7-12","3":"12-2-7","4":"1-2-2+7","5":"(1-2)*2+7","6":"1*7-2/2","7":"12+2-7","8":"1+2-2+7","9":"1+2/2+7","10":"2*(12-7)"},"1228":{"1":"1+(2-2)*8","2":"12-2-8","3":"12*2/8","4":"2*8-12","5":"1-2-2+8","6":"12+2-8","7":"1+2+8/2","8":"2*(12-8)","9":"1+2-2+8","10":"1+2/2+8"},"1229":{"1":"12-2-9","2":"(9-1)/2-2","3":"9-12/2","4":"(1-2+9)/2","5":"12+2-9","6":"2*9-12","7":"(1-2)*2+9","8":"1*9-2/2","9":"1-2/2+9","10":"1+2-2+9"},"1233":{"1":"12/3-3","2":"12/(3+3)","3":"12-3*3","4":"1+2+3/3","5":"(12+3)/3","6":"12-3-3","7":"12/3+3","8":"1-2+3*3","9":"1+2+3+3","10":"1+2*3+3"},"1234":{"1":"12/3/4","2":"1+2+3-4","3":"1+2*3-4","4":"1+2-3+4","5":"12-3-4","6":"3+12/4","7":"1-(2-4)*3","8":"12/3+4","9":"12*3/4","10":"1+2+3+4"},"1235":{"1":"1+2+3-5","2":"1+2*3-5","3":"3*5-12","4":"12-3-5","5":"1+2-3+5","6":"(1+2)/3+5","7":"1-2+3+5","8":"1+2*5-3","9":"12/3+5","10":"12+3-5"},"1236":{"1":"3-12/6","2":"1+2*3/6","3":"12-3-6","4":"1*2/3*6","5":"3+12/6","6":"12*3/6","7":"(1+2)/3+6","8":"1-2+3+6","9":"12+3-6","10":"12/3+6"},"1237":{"1":"(1+2*3)/7","2":"12-3-7","3":"1-2-3+7","4":"(1-2)*3+7","5":"1/2*(3+7)","6":"1*2-3+7","7":"1+2-3+7","8":"12+3-7","9":"3*7-12","10":"(1-3)*(2-7)"},"1238":{"1":"12-3-8","2":"3/12*8","3":"1-2*3+8","4":"1-2-3+8","5":"(1-2)*3+8","6":"(1+3+8)/2","7":"12+3-8","8":"1+2-3+8","9":"(1+2)/3+8","10":"1-2+3+8"},"1239":{"1":"(12-3)/9","2":"12/(9-3)","3":"1/2*(9-3)","4":"12*3/9","5":"1-2-3+9","6":"12+3-9","7":"1+2/3*9","8":"1*2-3+9","9":"3*(12-9)","10":"(1+2)/3+9"},"1244":{"1":"4-12/4","2":"(12-4)/4","3":"1+2+4-4","4":"12-4-4","5":"1+2*4-4","6":"1/2*4+4","7":"12/4+4","8":"1/2*4*4","9":"1-(2-4)*4","10":"1*2+4+4"},"1245":{"1":"1*2+4-5","2":"1+2+4-5","3":"12-4-5","4":"1+2-4+5","5":"(1+4)*2-5","6":"1*2*5-4","7":"1/2*4+5","8":"12/4+5","9":"(1-4)*(2-5)","10":"1/2*4*5"},"1246":{"1":"1+2+4-6","2":"12-4-6","3":"1+2*4-6","4":"1+2/4*6","5":"1+2-4+6","6":"4+12/6","7":"1/2*6+4","8":"12*4/6","9":"12/4+6","10":"12+4-6"},"1247":{"1":"12-4-7","2":"1+2*4-7","3":"(1-2)*4+7","4":"7-12/4","5":"1*2-4+7","6":"1+2-4+7","7":"1-2*(4-7)","8":"(1-4+7)*2","9":"12+4-7","10":"12/4+7"},"1248":{"1":"(12-4)/8","2":"(12+4)/8","3":"1-2-4+8","4":"1*2/4*8","5":"1+2/4*8","6":"12*4/8","7":"1+2-4+8","8":"12+4-8","9":"1-2*(4-8)","10":"1/2*4+8"},"1249":{"1":"4-12+9","2":"1-2*4+9","3":"4/12*9","4":"1-2-4+9","5":"(1-2)*4+9","6":"9-12/4","7":"12+4-9","8":"1+2-4+9","9":"(1+9)/2+4","10":"1*2*(9-4)"},"1255":{"1":"1*2-5/5","2":"12-5-5","3":"1+2+5-5","4":"1+2+5/5","5":"1*2*5-5","6":"1+2*5-5","7":"(1+2/5)*5","8":"15-2-5","9":"1-2+5+5","10":"(1+2)*5-5"},"1256":{"1":"12-5-6","2":"1+2+5-6","3":"5-12/6","4":"1+2-5+6","5":"1+2*5-6","6":"(1+5)*2-6","7":"5+12/6","8":"1+2*6-5","9":"(1+2)*5-6","10":"12*5/6"},"1257":{"1":"(12-5)/7","2":"(1-2)*5+7","3":"1*2*5-7","4":"1+2*5-7","5":"1+2-5+7","6":"1/2*(5+7)","7":"1+(5+7)/2","8":"(1+2)*5-7","9":"1*2*7-5","10":"12+5-7"},"1258":{"1":"5-12+8","2":"1-2-5+8","3":"1+2*5-8","4":"(12+8)/5","5":"1*2-5+8","6":"1+2-5+8","7":"(1+2)*5-8","8":"(1-5+8)*2","9":"12+5-8","10":"1+5+8/2"},"1259":{"1":"1*2*5-9","2":"5-12+9","3":"1-2-5+9","4":"(1-2)*5+9","5":"2-1-5+9","6":"1*2-5+9","7":"1+2-5+9","8":"12+5-9","9":"1-2*(5-9)","10":"(1-5+9)*2"},"1266":{"1":"(12-6)/6","2":"1+2-6/6","3":"6/12*6","4":"6-12/6","5":"(16-6)/2","6":"1*2*6-6","7":"1+2*6-6","8":"12/6+6","9":"1/2*6+6","10":"1+6/2+6"},"1267":{"1":"6-12+7","2":"1+2+6-7","3":"1*2-6+7","4":"1+2-6+7","5":"1*2*6-7","6":"1+2*6-7","7":"16-2-7","8":"1*2*7-6","9":"12/6+7","10":"1/2*6+7"},"1268":{"1":"1+2+6-8","2":"6-12+8","3":"1+6-8/2","4":"6/12*8","5":"1+2-6+8","6":"8-12/6","7":"1/2*(6+8)","8":"1+(6+8)/2","9":"12*6/8","10":"12+6-8"},"1269":{"1":"(1+2+6)/9","2":"(12+6)/9","3":"6-12+9","4":"1+2*6-9","5":"1*2-6+9","6":"1+2-6+9","7":"1-2*(6-9)","8":"12*6/9","9":"12+6-9","10":"2*(9-1)-6"},"1277":{"1":"1*2-7/7","2":"7-12+7","3":"1+2+7-7","4":"1+2+7/7","5":"(1-2/7)*7","6":"2*7-1-7","7":"1*2*7-7","8":"1+2*7-7","9":"(1+2/7)*7","10":"21/7+7"},"1278":{"1":"1*2+7-8","2":"1+2+7-8","3":"7-12+8","4":"1+2-7+8","5":"(1-7)/2+8","6":"1*2*7-8","7":"1+2*7-8","8":"(1+7)*2-8","9":"1*2*8-7","10":"1+2*8-7"},"1279":{"1":"1+2+7-9","2":"(1-2)*7+9","3":"(12+9)/7","4":"7-12+9","5":"1+2-7+9","6":"1+2*7-9","7":"(1+7)*2-9","8":"1/2*(7+9)","9":"1+(7+9)/2","10":"12+7-9"},"1288":{"1":"1*2-8/8","2":"8/(12-8)","3":"1+2+8-8","4":"8-12+8","5":"1-8/2+8","6":"(1-2/8)*8","7":"2*8-1-8","8":"1*2*8-8","9":"1+2*8-8","10":"(1+2/8)*8"},"1289":{"1":"1*2+8-9","2":"1+2+8-9","3":"1*2-8+9","4":"1+2-8+9","5":"8-12+9","6":"8/12*9","7":"1*2*8-9","8":"1+2*8-9","9":"(1+8)*2-9","10":"1*2*9-8"},"1299":{"1":"1*2-9/9","2":"1+2-9/9","3":"9/(12-9)","4":"1+2+9/9","5":"(1-9)/2+9","6":"9-12+9","7":"(1-2/9)*9","8":"19-2-9","9":"1*2*9-9","10":"1+2*9-9"},"1333":{"1":"1+(3-3)*3","2":"1*3-3/3","3":"1+3-3/3","4":"13-3*3","5":"1+3+3/3","6":"1*3*3-3","7":"13-3-3","8":"3-1+3+3","9":"1*3+3+3","10":"1+3+3+3"},"1334":{"1":"13-3*4","2":"1*3+3-4","3":"1+3+3-4","4":"(13+3)/4","5":"1+3-3+4","6":"13-3-4","7":"(31-3)/4","8":"(1+3)*3-4","9":"1*3*4-3","10":"1-3+3*4"},"1335":{"1":"1*3+3-5","2":"3*5-13","3":"(1+3+5)/3","4":"1*3*3-5","5":"13-3-5","6":"1+3-3+5","7":"1+3/3+5","8":"(1+3)*(5-3)","9":"(1-3+5)*3","10":"(1+3/3)*5"},"1336":{"1":"1+3+3-6","2":"(1+3)*3/6","3":"1*3*3-6","4":"13-3-6","5":"3*6-13","6":"1-3/3+6","7":"1+3-3+6","8":"1+3/3+6","9":"1*3*(6-3)","10":"13+3-6"},"1337":{"1":"(1-3)*3+7","2":"1-3-3+7","3":"13-3-7","4":"(31-3)/7","5":"(1+3)*3-7","6":"1*7-3/3","7":"1-3/3+7","8":"3*7-13","9":"13+3-7","10":"(1+7/3)*3"},"1338":{"1":"1*3*3-8","2":"13-3-8","3":"1-3-3+8","4":"(1+3)*3-8","5":"(18-3)/3","6":"(1+8)/3+3","7":"(13+8)/3","8":"13+3-8","9":"1+3-3+8","10":"1+3/3+8"},"1339":{"1":"13-3-9","2":"1+3*3/9","3":"(1+3)*3-9","4":"1-3-3+9","5":"1+(3+9)/3","6":"1*3+9/3","7":"13+3-9","8":"1*9-3/3","9":"1-3/3+9","10":"1+3-3+9"},"1344":{"1":"1+3*(4-4)","2":"1*3-4/4","3":"4*4-13","4":"1+3+4-4","5":"13-4-4","6":"1-3+4+4","7":"(1+3/4)*4","8":"1*3*4-4","9":"1+3*4-4","10":"3-1+4+4"},"1345":{"1":"3*5-14","2":"1*3+4-5","3":"1+3+4-5","4":"13-4-5","5":"1+3-4+5","6":"(1+3)/4+5","7":"4*5-13","8":"1+3*4-5","9":"1-(3-5)*4","10":"(1-3+4)*5"},"1346":{"1":"1*3+4-6","2":"1+3+4-6","3":"13-4-6","4":"(1-3)*(4-6)","5":"1*3-4+6","6":"1+3-4+6","7":"1+3*4-6","8":"1-3+4+6","9":"1+4/3*6","10":"(1+3)*4-6"},"1347":{"1":"1+3+4-7","2":"13-4-7","3":"31-4*7","4":"14-3-7","5":"1*3*4-7","6":"1+3*4-7","7":"1+3-4+7","8":"(1+3)/4+7","9":"1-3+4+7","10":"13+4-7"},"1348":{"1":"13-4-8","2":"1-3-4+8","3":"(1+3+8)/4","4":"1*3*4-8","5":"1+3*4-8","6":"1*3/4*8","7":"1+3/4*8","8":"1+3-4+8","9":"13+4-8","10":"1-3+4+8"},"1349":{"1":"(13-4)/9","2":"14-3-9","3":"1-3-4+9","4":"1+3*4-9","5":"(19-4)/3","6":"(1+4)*3-9","7":"(1+3)*4-9","8":"13+4-9","9":"1+3-4+9","10":"(1+3)/4+9"},"1355":{"1":"1+3*(5-5)","2":"1*3-5/5","3":"13-5-5","4":"1+3+5-5","5":"1+3+5/5","6":"3+15/5","7":"15-3-5","8":"1-3+5+5","9":"15*3/5","10":"1*3*5-5"},"1356":{"1":"6-15/3","2":"13-5-6","3":"(13+5)/6","4":"1*3-5+6","5":"1+3-5+6","6":"15-3-6","7":"1/3*6+5","8":"1*5-3+6","9":"1-3+5+6","10":"1+3*5-6"},"1357":{"1":"13-5-7","2":"1+3+5-7","3":"1+(3+7)/5","4":"1/3*(5+7)","5":"1*3-5+7","6":"1+3-5+7","7":"1-3*(5-7)","8":"1*3*5-7","9":"1+3*5-7","10":"1-3+5+7"},"1358":{"1":"(13-5)/8","2":"1+(3+5)/8","3":"8-15/3","4":"15-3-8","5":"(1+3*8)/5","6":"1*3-5+8","7":"1+3-5+8","8":"1+3*5-8","9":"1*3*(8-5)","10":"13+5-8"},"1359":{"1":"5-13+9","2":"(13+5)/9","3":"15-3-9","4":"9-15/3","5":"15*3/9","6":"1*3*5-9","7":"1+3*5-9","8":"1+3-5+9","9":"13+5-9","10":"5-1-3+9"},"1366":{"1":"13-6-6","2":"1*3-6/6","3":"1+3-6/6","4":"1+3+6-6","5":"1+3+6/6","6":"(1+6/6)*3","7":"16-3-6","8":"1/3*6+6","9":"(1+3/6)*6","10":"1-3+6+6"},"1367":{"1":"(13-6)/7","2":"1*3+6-7","3":"1+3+6-7","4":"1*3-6+7","5":"1+3-6+7","6":"16-3-7","7":"(6/3-1)*7","8":"17-3-6","9":"1/3*6+7","10":"1+6/3+7"},"1368":{"1":"6-13+8","2":"1+3+6-8","3":"(1+3)*6/8","4":"1*3/6*8","5":"1+3/6*8","6":"1+3-6+8","7":"1-3*(6-8)","8":"(1+3)*(8-6)","9":"(1-6+8)*3","10":"1*3*6-8"},"1369":{"1":"1+3+6-9","2":"6-13+9","3":"1+3*6/9","4":"(1-3/9)*6","5":"1/3*(6+9)","6":"1*3-6+9","7":"1+3-6+9","8":"(1+3/9)*6","9":"1*3*6-9","10":"13+6-9"},"1377":{"1":"7-13+7","2":"1*3-7/7","3":"1+3-7/7","4":"1+3+7-7","5":"1+3+7/7","6":"(1+7/7)*3","7":"17-3-7","8":"(17+7)/3","9":"(7-1)/3+7","10":"(1+3/7)*7"},"1378":{"1":"7-18/3","2":"7-13+8","3":"1+3+7-8","4":"1*3-7+8","5":"1+3-7+8","6":"17-3-8","7":"3*8-17","8":"18-3-7","9":"(3-1)*8-7","10":"(1+8)/3+7"},"1379":{"1":"1*3+7-9","2":"1+3+7-9","3":"7-13+9","4":"(1-3)*(7-9)","5":"1*3-7+9","6":"1+3-7+9","7":"1-3*(7-9)","8":"(1+3)*(9-7)","9":"(1-7+9)*3","10":"1/3*9+7"},"1389":{"1":"3-18/9","2":"8/(13-9)","3":"1+3+8-9","4":"8-13+9","5":"1+3-8+9","6":"18-3-9","7":"(3-1)*8-9","8":"19-3-8","9":"3*9-18","10":"(3-1)*9-8"},"1445":{"1":"1+(4-4)*5","2":"(14-4)/5","3":"1*4+4-5","4":"1+4+4-5","5":"14-4-5","6":"4*5-14","7":"1+4/4+5","8":"(1-4+5)*4","9":"(1+5/4)*4","10":"(1+4/4)*5"},"1446":{"1":"1+(4-4)*6","2":"1*4+4-6","3":"(14+4)/6","4":"14-4-6","5":"(14+6)/4","6":"1-4/4+6","7":"1+4-4+6","8":"1+4/4+6","9":"1-4*(4-6)","10":"4*6-14"},"1448":{"1":"1+4+4-8","2":"14-4-8","3":"1+4*4/8","4":"1+(4+8)/4","5":"4-1+8/4","6":"1*4+8/4","7":"14*4/8","8":"1-4/4+8","9":"1+4-4+8","10":"14+4-8"},"1455":{"1":"1+4*(5-5)","2":"(1+4+5)/5","3":"1*4-5/5","4":"14-5-5","5":"1+4+5-5","6":"1+4+5/5","7":"1-4+5+5","8":"(1+5/5)*4","9":"(1+4/5)*5","10":"(1-4+5)*5"},"1456":{"1":"5-16/4","2":"1*(4+6)/5","3":"14-5-6","4":"1+4+5-6","5":"1*4-5+6","6":"1+4-5+6","7":"(1+4)/5+6","8":"1-4+5+6","9":"4*6-15","10":"15*4/6"},"1457":{"1":"4-1+5-7","2":"14-5-7","3":"5-14/7","4":"15-4-7","5":"15/(7-4)","6":"1*4-5+7","7":"5+14/7","8":"(1+4)/5+7","9":"1-4+5+7","10":"14*5/7"},"1458":{"1":"14-5-8","2":"1+4+5-8","3":"15-4-8","4":"1+5-8/4","5":"45/(1+8)","6":"4-1-5+8","7":"1*4-5+8","8":"1+4-5+8","9":"(1+4)/5+8","10":"1-4+5+8"},"1459":{"1":"(14-5)/9","2":"1+(4+5)/9","3":"15/(9-4)","4":"5*9-41","5":"45*1/9","6":"(15+9)/4","7":"4-1-5+9","8":"1*4-5+9","9":"1+4-5+9","10":"14+5-9"},"1466":{"1":"1+4*(6-6)","2":"14-6-6","3":"1*4-6/6","4":"1+4-6/6","5":"1+4+6-6","6":"1+4+6/6","7":"6-1-4+6","8":"4*6-16","9":"1-4+6+6","10":"(1+4/6)*6"},"1467":{"1":"14-6-7","2":"(1+4+7)/6","3":"6/14*7","4":"6-14/7","5":"1*4-6+7","6":"1+4-6+7","7":"17-4-6","8":"6+14/7","9":"1*6-4+7","10":"1-4+6+7"},"1468":{"1":"(14-6)/8","2":"1*4+6-8","3":"1+4+6-8","4":"1+4*6/8","5":"1+6-8/4","6":"1*4-6+8","7":"1+4-6+8","8":"1/4*8+6","9":"1-4*(6-8)","10":"(1+4)*(8-6)"},"1469":{"1":"6-14+9","2":"1+4+6-9","3":"16-4-9","4":"(1+6+9)/4","5":"9-16/4","6":"1*4/6*9","7":"1+4/6*9","8":"1+4-6+9","9":"(1-4)*(6-9)","10":"(1+9/6)*4"},"1478":{"1":"7-14+8","2":"(1+7)/(8-4)","3":"1*4+7-8","4":"7/14*8","5":"1*4-7+8","6":"1+4-7+8","7":"18-4-7","8":"(1-7+8)*4","9":"1/4*8+7","10":"14/7+8"},"1479":{"1":"4-1+7-9","2":"7-14+9","3":"1+4+7-9","4":"1/4*(7+9)","5":"1+(7+9)/4","6":"1*4-7+9","7":"1+4-7+9","8":"1*4*(9-7)","9":"1-4*(7-9)","10":"(1+4)*(9-7)"},"1488":{"1":"1+4*(8-8)","2":"8-14+8","3":"1*4-8/8","4":"1+4-8/8","5":"1+4+8-8","6":"1+4+8/8","7":"1-8/4+8","8":"(1+8/8)*4","9":"18*4/8","10":"1/4*8+8"},"1556":{"1":"1+(5-5)*6","2":"5/15*6","3":"6-15/5","4":"15-5-6","5":"1+5+5-6","6":"1-5/5+6","7":"1+5-5+6","8":"1+5/5+6","9":"15/5+6","10":"(1-5+6)*5"},"1557":{"1":"1+(5-5)*7","2":"(1-5)/(5-7)","3":"15-5-7","4":"1+5+5-7","5":"5*(7-1-5)","6":"1*7-5/5","7":"1-5/5+7","8":"1+5-5+7","9":"1+5/5+7","10":"15/5+7"},"1558":{"1":"1+(5-5)*8","2":"15-5-8","3":"1+5+5-8","4":"8/(1+5/5)","5":"8-15/5","6":"8-1-5/5","7":"5*5-18","8":"1-5/5+8","9":"1+5-5+8","10":"1+5/5+8"},"1566":{"1":"1+5*(6-6)","2":"(1+5+6)/6","3":"15-6-6","4":"1*5-6/6","5":"1+5-6/6","6":"1+5+6-6","7":"1+5+6/6","8":"1-5+6+6","9":"6/(5-1)*6","10":"(1+6/6)*5"},"1567":{"1":"(5+7)/6-1","2":"15-6-7","3":"(15+6)/7","4":"1*5+6-7","5":"1+5+6-7","6":"1*5-6+7","7":"1+5-6+7","8":"(1+5)/6+7","9":"1-5+6+7","10":"(1-6)*(5-7)"},"1568":{"1":"15-6-8","2":"(1-5)/(6-8)","3":"1*5+6-8","4":"1+5+6-8","5":"5*(8-1-6)","6":"5-1-6+8","7":"1*5-6+8","8":"1+5-6+8","9":"(1+5)/6+8","10":"1-5+6+8"},"1569":{"1":"(15-6)/9","2":"1*5+6-9","3":"1+5+6-9","4":"(1+5)*6/9","5":"15/(9-6)","6":"(5-1)/6*9","7":"5-1-6+9","8":"1*5-6+9","9":"1+5-6+9","10":"15*6/9"},"1577":{"1":"15-7-7","2":"(1-5/7)*7","3":"(1-7)/(5-7)","4":"1*5-7/7","5":"1+5-7/7","6":"1+5+7-7","7":"1+5+7/7","8":"(57-1)/7","9":"1*7-5+7","10":"1-5+7+7"},"1578":{"1":"(15-7)/8","2":"(1+5+8)/7","3":"1/5*(7+8)","4":"1*5+7-8","5":"1+5+7-8","6":"1*5-7+8","7":"1+5-7+8","8":"(7-1-5)*8","9":"18/(7-5)","10":"1*7-5+8"},"1579":{"1":"7-15+9","2":"(1-5)/(7-9)","3":"1*5+7-9","4":"1+5+7-9","5":"(1+9)/(7-5)","6":"5-1-7+9","7":"1*5-7+9","8":"1+5-7+9","9":"(1+9)/5+7","10":"1*5*(9-7)"},"1668":{"1":"1+(6-6)*8","2":"16-6-8","3":"6/16*8","4":"6-16/8","5":"1+6+6-8","6":"18-6-6","7":"1*8-6/6","8":"6+16/8","9":"1+6-6+8","10":"1+6/6+8"},"1669":{"1":"16-6-9","2":"1*6/(9-6)","3":"1*6+6-9","4":"1+6+6-9","5":"1+6*6/9","6":"96/16","7":"19-6-6","8":"1*9-6/6","9":"1-6/6+9","10":"1+6-6+9"},"1678":{"1":"16-7-8","2":"1*(6+8)/7","3":"1+(6+8)/7","4":"(1+7)/(8-6)","5":"7-16/8","6":"1+6+7-8","7":"1*6-7+8","8":"1+6-7+8","9":"7+16/8","10":"1-6+7+8"},"1679":{"1":"(16-7)/9","2":"17-6-9","3":"1*6/(9-7)","4":"1*6+7-9","5":"1+6+7-9","6":"19-6-7","7":"6-1-7+9","8":"1*6-7+9","9":"1+6-7+9","10":"(1+6)/7+9"},"1688":{"1":"(16-8)/8","2":"(1-6/8)*8","3":"(16+8)/8","4":"8/16*8","5":"1*6-8/8","6":"8-16/8","7":"1+6+8-8","8":"1+6+8/8","9":"18/(8-6)","10":"16/8+8"},"1689":{"1":"8-16+9","2":"(1+6+9)/8","3":"18-6-9","4":"6-18/9","5":"1*6+8-9","6":"1+6+8-9","7":"1*6-8+9","8":"1+6-8+9","9":"(8-1-6)*9","10":"8-1-6+9"},"1778":{"1":"1+(7-7)*8","2":"17-7-8","3":"(17+7)/8","4":"18-7-7","5":"7-1+7-8","6":"1*7+7-8","7":"1+7+7-8","8":"1-7/7+8","9":"1+7-7+8","10":"1+7/7+8"},"1779":{"1":"17-7-9","2":"(7+9)/(1+7)","3":"(1-7)/(7-9)","4":"(1+7)/(9-7)","5":"1*7+7-9","6":"1+7+7-9","7":"7*(9-1-7)","8":"1*9-7/7","9":"1-7/7+9","10":"1+7-7+9"},"1788":{"1":"17-8-8","2":"(1+7+8)/8","3":"18-7-8","4":"8/(1-7+8)","5":"7-1-8/8","6":"1*7-8/8","7":"1+7-8/8","8":"1+7+8-8","9":"1+7+8/8","10":"1-7+8+8"},"1789":{"1":"(17-8)/9","2":"1*(7+9)/8","3":"1+(7+9)/8","4":"1*8/(9-7)","5":"7-18/9","6":"1*7+8-9","7":"1+7+8-9","8":"1*7-8+9","9":"1+7-8+9","10":"(1+7)/8+9"},"1799":{"1":"9-17+9","2":"(1-7/9)*9","3":"19-7-9","4":"(1-9)/(7-9)","5":"(1+9)/(9-7)","6":"1*7-9/9","7":"1+7-9/9","8":"1+7+9-9","9":"1+7+9/9","10":"9*9-71"},"2223":{"1":"2-2-2+3","2":"2/2-2+3","3":"2+2+2-3","4":"2-2/2+3","5":"2+2-2+3","6":"2+2/2+3","7":"2/2+2*3","8":"22/2-3","9":"2+2+2+3","10":"2+2+2*3"},"2224":{"1":"2-2*2/4","2":"2+2+2-4","3":"2+2*2/4","4":"2*2*2-4","5":"(22-2)/4","6":"(22+2)/4","7":"22/2-4","8":"2-2+2*4","9":"2/2+2*4","10":"2+2+2+4"},"2225":{"1":"2+2+2-5","2":"2+(2-2)*5","3":"2-2-2+5","4":"(22-2)/5","5":"(2-2)*2+5","6":"22/2-5","7":"2+2-2+5","8":"2+2/2+5","9":"2*(2+5/2)","10":"2-2+2*5"},"2226":{"1":"(2+2+2)/6","2":"2*2*2-6","3":"2/2/2*6","4":"(22+2)/6","5":"22/2-6","6":"(2-2)*2+6","7":"2-2/2+6","8":"2+2-2+6","9":"2+2/2+6","10":"22-2*6"},"2227":{"1":"2*2*2-7","2":"2+(2-2)*7","3":"2*(7/2-2)","4":"22/2-7","5":"2-2-2+7","6":"2/2-2+7","7":"(2-2)*2+7","8":"22-2*7","9":"2+2-2+7","10":"2+2/2+7"},"2228":{"1":"2*2*2/8","2":"2+(2-2)*8","3":"22/2-8","4":"2/2/2*8","5":"2/2+8/2","6":"22-2*8","7":"2/2-2+8","8":"(2-2)*2+8","9":"2-2/2+8","10":"2+2-2+8"},"2229":{"1":"9-2*2*2","2":"22/2-9","3":"9-2-2-2","4":"22-2*9","5":"(2/2+9)/2","6":"9-2-2/2","7":"2-2-2+9","8":"2/2-2+9","9":"(2-2)*2+9","10":"2-2/2+9"},"2233":{"1":"2-2+3/3","2":"2/2+3/3","3":"2+2-3/3","4":"2+2+3-3","5":"2+2+3/3","6":"2-2+3+3","7":"2/2+3+3","8":"(2+2/3)*3","9":"2-2+3*3","10":"2+2+3+3"},"2234":{"1":"2-2-3+4","2":"2/2-3+4","3":"2+2+3-4","4":"2+2*3-4","5":"2+2-3+4","6":"2-(2-3)*4","7":"2-2+3+4","8":"2*2*3-4","9":"2*(2+4)-3","10":"22-3*4"},"2235":{"1":"2-2*3+5","2":"2+2+3-5","3":"2+2*3-5","4":"(2+2*5)/3","5":"(22+3)/5","6":"2+2-3+5","7":"22-3*5","8":"2-2+3+5","9":"2/2+3+5","10":"2*(3-2)*5"},"2236":{"1":"2+2+3-6","2":"2+2*3-6","3":"2+2*3/6","4":"22-3*6","5":"2*(2+3/6)","6":"2+2/3*6","7":"2+2-3+6","8":"2*2/3*6","9":"2-2+3+6","10":"2/2+3+6"},"2237":{"1":"22-3*7","2":"2*(7-2*3)","3":"2-2*3+7","4":"2-2-3+7","5":"2*2*3-7","6":"2*(2+7)/3","7":"(2-2)*3+7","8":"2+2-3+7","9":"2-(2-3)*7","10":"2-2+3+7"},"2238":{"1":"(2+2*3)/8","2":"3*8-22","3":"(2-2)*8+3","4":"2-2*3+8","5":"2-2-3+8","6":"2/2-3+8","7":"23-2*8","8":"(2-2)*3+8","9":"2+2-3+8","10":"2-(2-3)*8"},"2239":{"1":"2*(2+3)-9","2":"2*(9/3-2)","3":"2*2*3-9","4":"2/2+9/3","5":"3*9-22","6":"2-2-3+9","7":"2/2-3+9","8":"2+2/3*9","9":"(2-2)*3+9","10":"22-3-9"},"2244":{"1":"2-2+4/4","2":"2/2+4/4","3":"2+2-4/4","4":"2+2+4-4","5":"2+2+4/4","6":"22-4*4","7":"(2+4)/2+4","8":"2-2+4+4","9":"2/2+4+4","10":"2-(2-4)*4"},"2245":{"1":"2-2-4+5","2":"22-4*5","3":"2+2+4-5","4":"2/(2-4)+5","5":"2+2-4+5","6":"2*2/4+5","7":"2*(2+4)-5","8":"2+2*5-4","9":"2-2+4+5","10":"2/2+4+5"},"2246":{"1":"2-(2+4)/6","2":"4*6-22","3":"(22-4)/6","4":"2+2*4-6","5":"2+2/4*6","6":"2+2-4+6","7":"2*2/4+6","8":"2*(2-4+6)","9":"(2-2/4)*6","10":"2-2+4+6"},"2247":{"1":"2+2+4-7","2":"22/(4+7)","3":"2+2*4-7","4":"2/2-4+7","5":"2*(2+4)-7","6":"4*7-22","7":"2+2-4+7","8":"2*2/4+7","9":"2*2*4-7","10":"2*(2-4+7)"},"2248":{"1":"2-2*4/8","2":"2+2*4-8","3":"2+2*4/8","4":"2-2-4+8","5":"2/2-4+8","6":"2+2/4*8","7":"2/(2-4)+8","8":"2+2-4+8","9":"2*2/4+8","10":"22-4-8"},"2249":{"1":"2+2*4-9","2":"(22-4)/9","3":"2-2*4+9","4":"(2-2)*9+4","5":"2-2-4+9","6":"2/2-4+9","7":"2*2*4-9","8":"2/(2-4)+9","9":"22-4-9","10":"2*2/4+9"},"2255":{"1":"2-2+5/5","2":"2/2+5/5","3":"5*5-22","4":"2+2+5-5","5":"2+2+5/5","6":"2*(2+5/5)","7":"2+2*5-5","8":"(2-2/5)*5","9":"2*(2+5)-5","10":"2-2+5+5"},"2256":{"1":"2-2-5+6","2":"22/(5+6)","3":"2+2+5-6","4":"2-2*(5-6)","5":"2+2-5+6","6":"2+2*5-6","7":"2*5-6/2","8":"5*6-22","9":"2+2*6-5","10":"2+5+6/2"},"2257":{"1":"2-(2+5)/7","2":"2+2+5-7","3":"2/2-5+7","4":"2*7-2*5","5":"2+2*5-7","6":"2+2-5+7","7":"(2-2)*5+7","8":"2*(2-5+7)","9":"(25-7)/2","10":"22-5-7"},"2258":{"1":"2+2+5-8","2":"2*(2-5)+8","3":"2-2-5+8","4":"2+2*5-8","5":"(2-2)*8+5","6":"2*(2+5)-8","7":"2+2-5+8","8":"(2-2)*5+8","9":"22-5-8","10":"2*(2-5+8)"},"2259":{"1":"2-2*5+9","2":"2*(2*5-9)","3":"(22+5)/9","4":"2-2-5+9","5":"2/2-5+9","6":"2/(5-2)*9","7":"25-2*9","8":"22-5-9","9":"(2-2)*5+9","10":"2-2*(5-9)"},"2266":{"1":"2-2+6/6","2":"2/2+6/6","3":"2+2-6/6","4":"2+2+6-6","5":"2+2+6/6","6":"(2-2)*6+6","7":"26/2-6","8":"2+2*6-6","9":"2*6-6/2","10":"22-6-6"},"2267":{"1":"2-2-6+7","2":"2/2-6+7","3":"2+2+6-7","4":"(22+6)/7","5":"2+2-6+7","6":"2*(2-6+7)","7":"2+2*6-7","8":"2*(7-6/2)","9":"22-6-7","10":"2*(2*6-7)"},"2268":{"1":"2-(2+6)/8","2":"(22-6)/8","3":"2*2*6/8","4":"2/(6-2)*8","5":"(22+8)/6","6":"2+2-6+8","7":"2-6/2+8","8":"22-6-8","9":"(26-8)/2","10":"26-2*8"},"2269":{"1":"2+2+6-9","2":"2*(9-2-6)","3":"2-2-6+9","4":"2/2-6+9","5":"2+2*6-9","6":"2*2/6*9","7":"22-6-9","8":"2-2*(6-9)","9":"(2-2)*6+9","10":"2*(2-6+9)"},"2277":{"1":"2-2+7/7","2":"2/2+7/7","3":"2+2-7/7","4":"2+2+7-7","5":"2+2+7/7","6":"2*(2+7/7)","7":"(2-2)*7+7","8":"22-7-7","9":"2+2*7-7","10":"(27-7)/2"},"2278":{"1":"2-2-7+8","2":"2/2-7+8","3":"2+2+7-8","4":"2-2*(7-8)","5":"2+2-7+8","6":"2*(2-7+8)","7":"22-7-8","8":"2+2*7-8","9":"2*(8-7/2)","10":"2*(2+7)-8"},"2279":{"1":"2-(2+7)/9","2":"2+2+7-9","3":"2/2-7+9","4":"2*9-2*7","5":"2+27/9","6":"22-7-9","7":"2+2*7-9","8":"2*(2-7+9)","9":"(2-2)*7+9","10":"2*(2*7-9)"},"2288":{"1":"2-2+8/8","2":"2/2+8/8","3":"2+2-8/8","4":"2+2+8-8","5":"2+2+8/8","6":"22-8-8","7":"28*2/8","8":"(2-2)*8+8","9":"(2+8+8)/2","10":"2+2*8-8"},"2289":{"1":"2-2-8+9","2":"2/2-8+9","3":"2+2+8-9","4":"2-2*(8-9)","5":"22-8-9","6":"2*(2-8+9)","7":"2-8/2+9","8":"(2-2)*9+8","9":"2+2*8-9","10":"28-2*9"},"2299":{"1":"2-2+9/9","2":"2/2+9/9","3":"2+2-9/9","4":"22-9-9","5":"2+2+9/9","6":"2*(2+9/9)","7":"2*9-2-9","8":"(9-2+9)/2","9":"(2-2)*9+9","10":"(29-9)/2"},"2333":{"1":"2/(3+3)*3","2":"2+(3-3)*3","3":"2*(3-3)+3","4":"2+3-3/3","5":"2+3+3-3","6":"2+3+3/3","7":"2*3+3/3","8":"2+3*3-3","9":"2*(3+3)-3","10":"3-2+3*3"},"2334":{"1":"(2-3)*3+4","2":"2+(3-3)*4","3":"2*(3+3)/4","4":"2+3+3-4","5":"(23-3)/4","6":"2+3-3+4","7":"2+3*3-4","8":"2*3/3*4","9":"(23+4)/3","10":"2*(3*3-4)"},"2335":{"1":"2-3-3+5","2":"(2-3)*3+5","3":"2+3+3-5","4":"(23-3)/5","5":"2*(3-3)+5","6":"2+3*3-5","7":"2+3-3+5","8":"23-3*5","9":"2*5-3/3","10":"2*3/3*5"},"2336":{"1":"2-(3+3)/6","2":"2+3+3-6","3":"2*3+3-6","4":"2*3-6/3","5":"23-3*6","6":"2*(3+3)-6","7":"2-3/3+6","8":"2+3-3+6","9":"2+3/3+6","10":"(2+3)/3*6"},"2337":{"1":"2+3+3-7","2":"23-3*7","3":"2-3-3+7","4":"2+3*3-7","5":"2*(3+3)-7","6":"27/3-3","7":"2*(3-3)+7","8":"2-3/3+7","9":"2+3-3+7","10":"2+3/3+7"},"2338":{"1":"3*8-23","2":"2+(3-3)*8","3":"2+3*3-8","4":"2-3-3+8","5":"(2-3)*3+8","6":"3-2-3+8","7":"(2+3)*3-8","8":"2*(3-3)+8","9":"2-3/3+8","10":"2+3-3+8"},"2339":{"1":"2-3*3/9","2":"2+3*3-9","3":"2+3*3/9","4":"3*9-23","5":"2-3-3+9","6":"(2+3)*3-9","7":"(2+3/9)*3","8":"2/3*(3+9)","9":"2*3*3-9","10":"2-3/3+9"},"2344":{"1":"2/(3-4/4)","2":"2*(3-4)+4","3":"24/4-3","4":"2+3-4/4","5":"2+3+4-4","6":"2+3+4/4","7":"23-4*4","8":"(2*3-4)*4","9":"3+24/4","10":"2+3*4-4"},"2345":{"1":"(2-3)*4+5","2":"(2*3+4)/5","3":"23-4*5","4":"2+3+4-5","5":"2*3+4-5","6":"2+3-4+5","7":"2*3-4+5","8":"2-3+4+5","9":"2+3*4-5","10":"(2*3-4)*5"},"2346":{"1":"4*6-23","2":"(2-3)*4+6","3":"2+3+4-6","4":"2+3*4/6","5":"2*3/6+4","6":"(2+3-4)*6","7":"2+3-4+6","8":"2+3*4-6","9":"2-3+4+6","10":"2*(3-4+6)"},"2347":{"1":"2-(3+4)/7","2":"2+3+4-7","3":"2*3+4-7","4":"(23-7)/4","5":"4*7-23","6":"24/(7-3)","7":"2+3*4-7","8":"2+3-4+7","9":"2*3-4+7","10":"2-3+4+7"},"2348":{"1":"2+3+4-8","2":"2*3+4-8","3":"2-3-4+8","4":"(2-3)*4+8","5":"2*(3-4/8)","6":"2+3*4-8","7":"2*(3+4/8)","8":"2+3/4*8","9":"4*8-23","10":"2*3-4+8"},"2349":{"1":"2*3+4-9","2":"2/3*9-4","3":"(23+4)/9","4":"2-3-4+9","5":"2+3*4-9","6":"2*(3*4-9)","7":"2*(3-4)+9","8":"(23+9)/4","9":"(2+3-4)*9","10":"23-4-9"},"2355":{"1":"2*(3-5)+5","2":"5*5-23","3":"2*(5-5)+3","4":"2+3-5/5","5":"2+3+5-5","6":"2+3+5/5","7":"2*3+5/5","8":"2*(3+5/5)","9":"2-3+5+5","10":"25-3*5"},"2356":{"1":"(2-3)*5+6","2":"2*(3-5)+6","3":"(23-5)/6","4":"2+3+5-6","5":"2*3+5-6","6":"2+3-5+6","7":"5*6-23","8":"2*(3-5+6)","9":"2/3*6+5","10":"2-3+5+6"},"2357":{"1":"2-3-5+7","2":"(2-3)*5+7","3":"2+3+5-7","4":"(23+5)/7","5":"(32-7)/5","6":"2/(3-5)+7","7":"2+3-5+7","8":"2*3-5+7","9":"2*(3+5)-7","10":"2+3*5-7"},"2358":{"1":"2-(3+5)/8","2":"2+3+5-8","3":"2*3+5-8","4":"2*(3-5)+8","5":"2*5+3-8","6":"(2*5+8)/3","7":"2/(3-5)+8","8":"2+3-5+8","9":"2+3*5-8","10":"23-5-8"},"2359":{"1":"2+3+5-9","2":"(23-5)/9","3":"2-3-5+9","4":"(2-3)*5+9","5":"2*(3-5)+9","6":"3/2*(9-5)","7":"2*(3+5)-9","8":"2+3*5-9","9":"23-5-9","10":"2*3-5+9"},"2366":{"1":"2/(3-6/6)","2":"2+3*(6-6)","3":"2*(3+6)/6","4":"2+3-6/6","5":"2+3+6-6","6":"2+3+6/6","7":"2*3+6/6","8":"2/3*(6+6)","9":"(2-3/6)*6","10":"2/3*6+6"},"2367":{"1":"(2-3)*6+7","2":"(2+3+7)/6","3":"2*6/(7-3)","4":"2+3+6-7","5":"2*3+6-7","6":"2+3-6+7","7":"2*3-6+7","8":"2*3/6+7","9":"(2-6+7)*3","10":"23-6-7"},"2368":{"1":"2-3-6+8","2":"(2-3)*6+8","3":"2+3+6-8","4":"2*3+6-8","5":"(2+8)*3/6","6":"2+3/6*8","7":"2+3-6+8","8":"2*3-6+8","9":"23-6-8","10":"2*(3+6)-8"},"2369":{"1":"2/3/6*9","2":"2+3+6-9","3":"2*3+6-9","4":"2+3*6/9","5":"2+6-9/3","6":"2*6+3-9","7":"2+(6+9)/3","8":"23-6-9","9":"2*3-6+9","10":"2*3/6+9"},"2377":{"1":"2/(3-7/7)","2":"2+3*(7-7)","3":"2*(7-7)+3","4":"2+3-7/7","5":"2+3+7-7","6":"2+3+7/7","7":"2*3+7/7","8":"2*(3+7/7)","9":"23-7-7","10":"2*7+3-7"},"2378":{"1":"(2-3)*7+8","2":"(23-7)/8","3":"27-3*8","4":"2+3+7-8","5":"2*3+7-8","6":"2+3-7+8","7":"2*3-7+8","8":"23-7-8","9":"2*7+3-8","10":"2/3*(7+8)"},"2379":{"1":"2-3-7+9","2":"(2-3)*7+9","3":"2+3+7-9","4":"2*3+7-9","5":"2*(9-3)-7","6":"3+27/9","7":"23-7-9","8":"2*3-7+9","9":"27*3/9","10":"2*(3-7+9)"},"2388":{"1":"2/(3-8/8)","2":"2+3*(8-8)","3":"2*(8-8)+3","4":"2+3-8/8","5":"2+3+8-8","6":"2+3+8/8","7":"23-8-8","8":"2*(3+8/8)","9":"(2+8/8)*3","10":"38-28"},"2389":{"1":"(2-3)*8+9","2":"3-2-8+9","3":"2*(3+9)/8","4":"2+3+8-9","5":"2*3+8-9","6":"23-8-9","7":"2*3-8+9","8":"2*(3-8+9)","9":"(2-8+9)*3","10":"2*8+3-9"},"2399":{"1":"2/(3-9/9)","2":"2+3*(9-9)","3":"2*(9-3)-9","4":"2+3-9/9","5":"23-9-9","6":"2+3+9/9","7":"2*3+9/9","8":"2*(3+9/9)","9":"(2+9/9)*3","10":"39-29"},"2444":{"1":"2/(4+4)*4","2":"24/4-4","3":"24/(4+4)","4":"2+(4+4)/4","5":"(24-4)/4","6":"2+4+4-4","7":"(24+4)/4","8":"24-4*4","9":"2*4+4/4","10":"24/4+4"},"2445":{"1":"24/4-5","2":"2+(4-4)*5","3":"(2-5/4)*4","4":"24-4*5","5":"2+4+4-5","6":"2-4/4+5","7":"2+4-4+5","8":"2+4/4+5","9":"2*4-4+5","10":"2*4/4*5"},"2446":{"1":"24/4/6","2":"2+(4-4)*6","3":"(2+4*4)/6","4":"2+4+4-6","5":"2/4*(4+6)","6":"2*4+4-6","7":"2-4/4+6","8":"4+24/6","9":"2+4/4+6","10":"2*4-4+6"},"2447":{"1":"2-4-4+7","2":"2+(4-4)*7","3":"2+4+4-7","4":"4*7-24","5":"2*4+4-7","6":"(2-4)*(4-7)","7":"2*(4-4)+7","8":"2-4/4+7","9":"2+4-4+7","10":"2+4/4+7"},"2448":{"1":"4-24/8","2":"24/(4+8)","3":"(2+4)*4/8","4":"2+4*4/8","5":"2*4/8+4","6":"2/4*(4+8)","7":"4+24/8","8":"4*8-24","9":"2-4/4+8","10":"2+4-4+8"},"2449":{"1":"2+4+4-9","2":"2+(4-4)*9","3":"2-4-4+9","4":"44/(2+9)","5":"4-2*4+9","6":"2*(9-4)-4","7":"2*(4+4)-9","8":"4/4-2+9","9":"2+4*4-9","10":"2-4/4+9"},"2455":{"1":"5*5-24","2":"2+4*(5-5)","3":"2*(4-5)+5","4":"2*(5-5)+4","5":"2+4-5/5","6":"2+4+5-5","7":"2+4+5/5","8":"2-4+5+5","9":"2*4+5/5","10":"2*(4+5/5)"},"2456":{"1":"5-24/6","2":"(2-4)*(5-6)","3":"2*(4+5)/6","4":"2*(4-5)+6","5":"2+4+5-6","6":"5*6-24","7":"2+4-5+6","8":"2-(4-5)*6","9":"5+24/6","10":"2*(4-5+6)"},"2457":{"1":"2/(4+5-7)","2":"24/(5+7)","3":"(2*4+7)/5","4":"2+4+5-7","5":"2*(4-5)+7","6":"2*4+5-7","7":"(2+4-5)*7","8":"2+4-5+7","9":"2-(4-5)*7","10":"2-4+5+7"},"2458":{"1":"2-4-5+8","2":"5-24/8","3":"2+4+5-8","4":"(2*8+4)/5","5":"2*4+5-8","6":"2*(4-5)+8","7":"4*8-25","8":"5+24/8","9":"2+4-5+8","10":"2-(4-5)*8"},"2459":{"1":"2-(4+5)/9","2":"2+4+5-9","3":"2+(4+5)/9","4":"2*4+5-9","5":"2*5+4-9","6":"24/(9-5)","7":"2*(4-5)+9","8":"(2-4)*(5-9)","9":"2*(4+5)-9","10":"24-5-9"},"2466":{"1":"2/6+4/6","2":"6-24/6","3":"(24-6)/6","4":"2*(6-6)+4","5":"(24+6)/6","6":"2+4+6-6","7":"2+4+6/6","8":"2*4+6-6","9":"2*4+6/6","10":"24/6+6"},"2467":{"1":"2*6-4-7","2":"(2*4+6)/7","3":"2*(4-6)+7","4":"2-6/(4-7)","5":"2+4+6-7","6":"2/(4-6)+7","7":"2+4-6+7","8":"(2+4)/6+7","9":"2*4-6+7","10":"2/4*6+7"},"2468":{"1":"2/(4+6-8)","2":"6/24*8","3":"6-24/8","4":"2+4+6-8","5":"2+4*6/8","6":"2*4+6-8","7":"2/(4-6)+8","8":"2+4-6+8","9":"6+24/8","10":"24-6-8"},"2469":{"1":"2-4-6+9","2":"(24-6)/9","3":"2+4+6-9","4":"(2+4)*6/9","5":"2*4+6-9","6":"(2-4)*(6-9)","7":"2*6+4-9","8":"2+4/6*9","9":"24-6-9","10":"(2+4)/6+9"},"2477":{"1":"2*(4-7)+7","2":"2+4*(7-7)","3":"2*7-4-7","4":"2*(7-7)+4","5":"2+4-7/7","6":"2+4+7-7","7":"2+4+7/7","8":"2*4+7-7","9":"2*4+7/7","10":"24-7-7"},"2478":{"1":"28/4/7","2":"2*(4-7)+8","3":"4-2-7+8","4":"7-24/8","5":"2+4+7-8","6":"2-4*(7-8)","7":"2+4-7+8","8":"(2*4-7)*8","9":"24-7-8","10":"7+24/8"},"2479":{"1":"2/(4+7-9)","2":"(2*7+4)/9","3":"2*(4-7)+9","4":"2+4+7-9","5":"(2+7)/9+4","6":"2*4+7-9","7":"4+27/9","8":"24-7-9","9":"(2*4-7)*9","10":"2*4-7+9"},"2488":{"1":"2*(8-4)/8","2":"(24-8)/8","3":"2*(4+8)/8","4":"(24+8)/8","5":"8-24/8","6":"2+4+8-8","7":"2+4+8/8","8":"24-8-8","9":"2*4+8/8","10":"2*(4+8/8)"},"2489":{"1":"2*(4-8)+9","2":"(2-4)*(8-9)","3":"8/24*9","4":"(2+8-9)*4","5":"2+4+8-9","6":"2-4*(8-9)","7":"24-8-9","8":"2*4*(9-8)","9":"2*4-8+9","10":"2*4/8+9"},"2499":{"1":"2*(9-4)-9","2":"2+4*(9-9)","3":"4-2+9/9","4":"2*(9-9)+4","5":"2+4-9/9","6":"24-9-9","7":"2+4+9/9","8":"2*4+9-9","9":"2*4+9/9","10":"2*(4+9/9)"},"2555":{"1":"25/5/5","2":"2+(5-5)*5","3":"(2*5+5)/5","4":"(25-5)/5","5":"2*(5-5)+5","6":"(25+5)/5","7":"2+5+5-5","8":"2+5+5/5","9":"2*5-5/5","10":"25/5+5"},"2556":{"1":"6-25/5","2":"2+(5-5)*6","3":"(2-5)*(5-6)","4":"(2-6/5)*5","5":"5*6-25","6":"2+5+5-6","7":"2-5/5+6","8":"2+5-5+6","9":"2+5/5+6","10":"2*5*(6-5)"},"2557":{"1":"2*(5-7)+5","2":"2+(5-5)*7","3":"75/25","4":"2/(5-7)+5","5":"2+5+5-7","6":"2*(5+5-7)","7":"2*(5-5)+7","8":"2-5/5+7","9":"2+5-5+7","10":"5*7-25"},"2558":{"1":"2/(5+5-8)","2":"2+(5-5)*8","3":"8-25/5","4":"2+5+5-8","5":"5/5+8/2","6":"2*8-5-5","7":"2*5+5-8","8":"2*(5-5)+8","9":"2-5/5+8","10":"2+5-5+8"},"2559":{"1":"2-5-5+9","2":"2+(5-5)*9","3":"2+5+5-9","4":"9-25/5","5":"(2*5-9)*5","6":"2*5+5-9","7":"52-5*9","8":"2*9-5-5","9":"2*(5-5)+9","10":"2-5/5+9"},"2566":{"1":"2*6-5-6","2":"2+5*(6-6)","3":"5-2+6-6","4":"2*(5-6)+6","5":"2*(6-6)+5","6":"2+5-6/6","7":"2+5+6-6","8":"2+5+6/6","9":"2-5+6+6","10":"2*5+6-6"},"2567":{"1":"2/(5+7)*6","2":"2*(5-7)+6","3":"(2-5)*(6-7)","4":"2+(5+7)/6","5":"2*(5-6)+7","6":"2+5+6-7","7":"2-5*(6-7)","8":"2+5-6+7","9":"2*5+6-7","10":"2-5+6+7"},"2568":{"1":"2*(6-8)+5","2":"(2*5+6)/8","3":"(2*5+8)/6","4":"(2+5*6)/8","5":"2+5+6-8","6":"2*(5-6)+8","7":"(2+5*8)/6","8":"2*5+6-8","9":"2+5-6+8","10":"2-(5-6)*8"},"2569":{"1":"2/(5+6-9)","2":"(2+6)/(9-5)","3":"2*6/(9-5)","4":"2+5+6-9","5":"2+(6+9)/5","6":"2/5*(6+9)","7":"2*5+6-9","8":"2*6+5-9","9":"(2+5-6)*9","10":"25-6-9"},"2577":{"1":"2/7+5/7","2":"2+5*(7-7)","3":"2*(5-7)+7","4":"(27-7)/5","5":"2*(7-7)+5","6":"2+5-7/7","7":"2+5+7-7","8":"2+5+7/7","9":"2*5-7/7","10":"2*5+7-7"},"2578":{"1":"2*(5-8)+7","2":"5-2+7-8","3":"2*(5+7)/8","4":"(25+7)/8","5":"2+(7+8)/5","6":"2+5+7-8","7":"2/(5-7)+8","8":"2+5-7+8","9":"2*5+7-8","10":"25-7-8"},"2579":{"1":"2/(5+9)*7","2":"(25-7)/9","3":"72/9-5","4":"2+(5+9)/7","5":"2+5+7-9","6":"2*(5+7-9)","7":"(2*5-9)*7","8":"2*5+7-9","9":"25-7-9","10":"(2+5)/7+9"},"2588":{"1":"5+8/2-8","2":"2*(5-8)+8","3":"2*8-5-8","4":"(28-8)/5","5":"2*(8-8)+5","6":"2+5-8/8","7":"2+5+8-8","8":"2+5+8/8","9":"25-8-8","10":"2*5+8-8"},"2589":{"1":"2/8*(9-5)","2":"(2*5+8)/9","3":"2*(5-8)+9","4":"2-8/(5-9)","5":"(2+8-9)*5","6":"2+5+8-9","7":"2-5*(8-9)","8":"25-8-9","9":"2*5+8-9","10":"2*5*(9-8)"},"2599":{"1":"2*(5-9)+9","2":"2+5*(9-9)","3":"5-2+9-9","4":"2*9-5-9","5":"2*(9-9)+5","6":"2+5-9/9","7":"25-9-9","8":"2+5+9/9","9":"2*5-9/9","10":"2*5+9-9"},"2666":{"1":"2/(6+6)*6","2":"2+(6-6)*6","3":"(2*6+6)/6","4":"2+(6+6)/6","5":"6-2+6/6","6":"2*(6-6)+6","7":"2+6-6/6","8":"2+6+6-6","9":"2+6+6/6","10":"6*6-26"},"2667":{"1":"6-2*6+7","2":"26/(6+7)","3":"6-2+6-7","4":"(2-6)*(6-7)","5":"(2-7/6)*6","6":"(2+6-7)*6","7":"2+6+6-7","8":"2-6/6+7","9":"2+6-6+7","10":"2+6/6+7"},"2668":{"1":"6/2+6-8","2":"2+(6-6)*8","3":"2*(6+6)/8","4":"(26+6)/8","5":"2-6/(6-8)","6":"2+6+6-8","7":"(2+6)/8+6","8":"2*(6-6)+8","9":"2-6/6+8","10":"2+6-6+8"},"2669":{"1":"2/6+6/9","2":"2+(6-6)*9","3":"(2-9/6)*6","4":"2-6/(6-9)","5":"2+6+6-9","6":"2+6*6/9","7":"6*6-29","8":"2*6*6/9","9":"2*6+6-9","10":"2-6/6+9"},"2677":{"1":"2*7-6-7","2":"2+6*(7-7)","3":"(27-6)/7","4":"6-2+7-7","5":"2*(6-7)+7","6":"2*(7-7)+6","7":"2+6-7/7","8":"2+6+7-7","9":"2+6+7/7","10":"2-6+7+7"},"2678":{"1":"2/(6+8)*7","2":"6-28/7","3":"2*(6-8)+7","4":"(2-6)*(7-8)","5":"2/6*(7+8)","6":"2*(6-7)+8","7":"2+6+7-8","8":"2-6*(7-8)","9":"2+6-7+8","10":"2-(6-7)*8"},"2679":{"1":"2*(6-9)+7","2":"(2-6)/(7-9)","3":"(2*6+9)/7","4":"(2+6)/(9-7)","5":"2-6/(7-9)","6":"2+6+7-9","7":"2*(6-7)+9","8":"2*(6+7-9)","9":"(2+6-7)*9","10":"26-7-9"},"2688":{"1":"2/8+6/8","2":"2+6*(8-8)","3":"(2-8)/(6-8)","4":"2*(6-8)+8","5":"(2+8)/(8-6)","6":"2-8/(6-8)","7":"2+6-8/8","8":"2+6+8-8","9":"2+6+8/8","10":"26-8-8"},"2689":{"1":"2*8-6-9","2":"(26-8)/9","3":"(2*9+6)/8","4":"(2-6)*(8-9)","5":"2*(6-8)+9","6":"(2+8-9)*6","7":"2+6+8-9","8":"2/(6-8)+9","9":"26-8-9","10":"(2+6)/8+9"},"2699":{"1":"(9+9)/6-2","2":"2+6*(9-9)","3":"2*(6-9)+9","4":"6-2+9-9","5":"2-9/(6-9)","6":"2/6*(9+9)","7":"2+6-9/9","8":"26-9-9","9":"2+6+9/9","10":"2*(6-9/9)"},"2777":{"1":"2/(7+7)*7","2":"2+(7-7)*7","3":"(2*7+7)/7","4":"2+(7+7)/7","5":"7-2+7-7","6":"7-2+7/7","7":"2*(7-7)+7","8":"2+7-7/7","9":"2+7+7-7","10":"2+7+7/7"},"2778":{"1":"7-2*7+8","2":"2+(7-7)*8","3":"7-28/7","4":"7-2+7-8","5":"(2-7)*(7-8)","6":"(2-8/7)*7","7":"(2+7-8)*7","8":"2+7+7-8","9":"2-7/7+8","10":"2+7-7+8"},"2779":{"1":"72/9-7","2":"2+(7-7)*9","3":"2*(7-9)+7","4":"7-27/9","5":"(7/7+9)/2","6":"2/(7-9)+7","7":"2+7+7-9","8":"(2+7)/9+7","9":"2*(7-7)+9","10":"7+27/9"},"2788":{"1":"2*8-7-8","2":"2+7*(8-8)","3":"7+8/2-8","4":"8-28/7","5":"7-2+8-8","6":"2*(7-8)+8","7":"2*(8-8)+7","8":"2+7-8/8","9":"2+7+8-8","10":"2+7+8/8"},"2789":{"1":"2/(7+9)*8","2":"7+8/2-9","3":"(2-8)/(7-9)","4":"2+(7+9)/8","5":"8-27/9","6":"2-8/(7-9)","7":"2*(7-8)+9","8":"2+7+8-9","9":"2-7*(8-9)","10":"27-8-9"},"2799":{"1":"2/9+7/9","2":"(27-9)/9","3":"9/27*9","4":"(27+9)/9","5":"2*(7-9)+9","6":"9-27/9","7":"2*(9-9)+7","8":"2+7-9/9","9":"27-9-9","10":"2+7+9/9"},"2888":{"1":"2/(8+8)*8","2":"2+(8-8)*8","3":"(2*8+8)/8","4":"2+(8+8)/8","5":"8-2-8/8","6":"8-2+8-8","7":"8-2+8/8","8":"2*(8-8)+8","9":"2+8-8/8","10":"2+8+8-8"},"2889":{"1":"8-2*8+9","2":"2+(8-8)*9","3":"8/2+8-9","4":"(28+8)/9","5":"8-2+8-9","6":"(2-8)*(8-9)","7":"(2-9/8)*8","8":"(2+8-9)*8","9":"2+8+8-9","10":"2-8/8+9"},"2899":{"1":"2*9-8-9","2":"2+8*(9-9)","3":"8/2-9/9","4":"8/2+9-9","5":"8-2-9/9","6":"8-2+9-9","7":"2*(8-9)+9","8":"2*(9-9)+8","9":"2+8-9/9","10":"28-9-9"},"2999":{"1":"2/(9+9)*9","2":"2+(9-9)*9","3":"(2*9+9)/9","4":"2+(9+9)/9","5":"(9+9/9)/2","6":"9-2-9/9","7":"9-2+9-9","8":"9-2+9/9","9":"2*(9-9)+9","10":"2+9-9/9"},"3333":{"1":"33/33","2":"3/3+3/3","3":"3*3-3-3","4":"(3+3*3)/3","5":"3+3-3/3","6":"3+3+3-3","7":"3+3+3/3","8":"33/3-3","9":"3+3*3-3","10":"(33-3)/3"},"3334":{"1":"3-3-3+4","2":"3*3-3-4","3":"3+(3-3)*4","4":"(3-3)*3+4","5":"3+3+3-4","6":"3-3/3+4","7":"33/3-4","8":"3+3*3-4","9":"(33+3)/4","10":"3*3-3+4"},"3335":{"1":"3*3-3-5","2":"3-3-3+5","3":"3/3-3+5","4":"3+3+3-5","5":"(3-3)*3+5","6":"33/3-5","7":"3+3*3-5","8":"3+3-3+5","9":"3+3/3+5","10":"(3+3)/3*5"},"3336":{"1":"3*3/(3+6)","2":"3/3/3*6","3":"3+3+3-6","4":"3/3-3+6","5":"33/3-6","6":"(33+3)/6","7":"3*3-6/3","8":"3-3/3+6","9":"3+3-3+6","10":"3+3/3+6"},"3337":{"1":"3-3*3+7","2":"3+3+3-7","3":"3+(3-3)*7","4":"33/3-7","5":"3+3*3-7","6":"3*(3*3-7)","7":"(3-3)*3+7","8":"(3+3*7)/3","9":"3-3/3+7","10":"3+3-3+7"},"3338":{"1":"3+3+3-8","2":"3-3*3+8","3":"33/3-8","4":"3+3*3-8","5":"3-3-3+8","6":"3/3-3+8","7":"(3*8-3)/3","8":"(3-3)*3+8","9":"33-3*8","10":"3-3/3+8"},"3339":{"1":"(3+3+3)/9","2":"33/3-9","3":"3+3*3-9","4":"(33+3)/9","5":"3-(3-9)/3","6":"33-3*9","7":"3/3-3+9","8":"3*(3-3/9)","9":"(3+3)*3-9","10":"3*(3+3/9)"},"3344":{"1":"3-3+4/4","2":"3/3+4/4","3":"3+3*(4-4)","4":"(3-3)*4+4","5":"3+3-4/4","6":"3+3+4-4","7":"3+3+4/4","8":"3-3+4+4","9":"3*3+4-4","10":"3*3+4/4"},"3345":{"1":"3-3-4+5","2":"3/3-4+5","3":"(3+3*4)/5","4":"(3-3)*5+4","5":"3+3+4-5","6":"3-3*(4-5)","7":"3+3-4+5","8":"3*3+4-5","9":"3-3+4+5","10":"3+3*4-5"},"3346":{"1":"3-3*4/6","2":"3-3-4+6","3":"3/3-4+6","4":"3+3+4-6","5":"3+3*4/6","6":"3*3*4/6","7":"3*3+4-6","8":"3+3-4+6","9":"33-4*6","10":"3-3+4+6"},"3348":{"1":"33-4*8","2":"3+3+4-8","3":"(3+3)*4/8","4":"3-3-4+8","5":"3*3+4-8","6":"4-3-3+8","7":"3+3*4-8","8":"(3-3)*4+8","9":"3+3/4*8","10":"3+3-4+8"},"3349":{"1":"3+3+4-9","2":"3-4+9/3","3":"4*9-33","4":"3*3+4-9","5":"3-3-4+9","6":"3+3*4-9","7":"34-3*9","8":"(3+9)/3+4","9":"(3-3)*4+9","10":"3+4+9/3"},"3355":{"1":"3-3+5/5","2":"3/3+5/5","3":"3+3*(5-5)","4":"(3-5)*(3-5)","5":"3+3-5/5","6":"3+3+5-5","7":"3+3+5/5","8":"33-5*5","9":"3*3+5-5","10":"3-3+5+5"},"3356":{"1":"3-3-5+6","2":"3/3-5+6","3":"33-5*6","4":"3*(3+5)/6","5":"3+3+5-6","6":"(3-3)*5+6","7":"3+3-5+6","8":"3*3+5-6","9":"3*3*(6-5)","10":"3*3-5+6"},"3357":{"1":"3*(3-5)+7","2":"5*7-33","3":"3/3-5+7","4":"(33-5)/7","5":"(3-3)*7+5","6":"3*(3+7)/5","7":"3*3+5-7","8":"3+3-5+7","9":"3-3*(5-7)","10":"(3*3-7)*5"},"3358":{"1":"8/(5-3)-3","2":"3-(3+5)/8","3":"3+3+5-8","4":"3/3-5+8","5":"(33-8)/5","6":"3*3+5-8","7":"5*8-33","8":"(3-3)*5+8","9":"3+3-5+8","10":"3+3*5-8"},"3359":{"1":"3-5+9/3","2":"3+3+5-9","3":"3*(3-5)+9","4":"3-3-5+9","5":"3*3+5-9","6":"3*3/9+5","7":"5-(3-9)/3","8":"35-3*9","9":"3+3*5-9","10":"3+3-5+9"},"3366":{"1":"3-3+6/6","2":"3/3+6/6","3":"6*6-33","4":"36/(3+6)","5":"3+3-6/6","6":"3+3+6-6","7":"3+3+6/6","8":"3*3-6/6","9":"3*3+6-6","10":"3*3+6/6"},"3367":{"1":"3-3-6+7","2":"3/3-6+7","3":"(3+3*6)/7","4":"(3+3*7)/6","5":"3+3+6-7","6":"3/(3-6)+7","7":"3+3-6+7","8":"3*3+6-7","9":"6*7-33","10":"3*3-6+7"},"3368":{"1":"3*(6-3)-8","2":"3-3-6+8","3":"3/3-6+8","4":"3+3+6-8","5":"3*(3-8/6)","6":"(3-3)*8+6","7":"3+3/6*8","8":"3+3-6+8","9":"(3+3)/6+8","10":"3*(6-8/3)"},"3369":{"1":"3-3*6/9","2":"3-(3+6)/9","3":"(33-6)/9","4":"3/3-6+9","5":"3+3*6/9","6":"3*3+6-9","7":"3*(3-6/9)","8":"3/(3-6)+9","9":"3+3-6+9","10":"(3+3)/6+9"},"3378":{"1":"3-3-7+8","2":"3/3-7+8","3":"(3+3*7)/8","4":"3*(7-3)-8","5":"(33+7)/8","6":"3-3*(7-8)","7":"3+3-7+8","8":"3*3+7-8","9":"3*3*(8-7)","10":"3*3-7+8"},"3379":{"1":"7-3-9/3","2":"3-3-7+9","3":"3/3-7+9","4":"3+3+7-9","5":"(3-9)/3+7","6":"(33+9)/7","7":"3*3+7-9","8":"3+3-7+9","9":"(3-3)*7+9","10":"37-3*9"},"3388":{"1":"3-3+8/8","2":"3/3+8/8","3":"3+3*(8-8)","4":"8/(8-3-3)","5":"3+3-8/8","6":"3+3+8-8","7":"3+3+8/8","8":"3*3-8/8","9":"3*3+8-8","10":"3*3+8/8"},"3389":{"1":"3-3-8+9","2":"3/3-8+9","3":"(3+3*8)/9","4":"3*8/(9-3)","5":"3+3+8-9","6":"3-3*(8-9)","7":"3+3-8+9","8":"3*3+8-9","9":"(3-3)*8+9","10":"3*3-8+9"},"3399":{"1":"3-3+9/9","2":"3/3+9/9","3":"3+3*(9-9)","4":"3*(3+9)/9","5":"3+3-9/9","6":"3+3+9-9","7":"3+3+9/9","8":"3*3-9/9","9":"3*3+9-9","10":"3*3+9/9"},"3444":{"1":"3-(4+4)/4","2":"(3*4-4)/4","3":"3+(4-4)*4","4":"3*4-4-4","5":"3+(4+4)/4","6":"3+4-4/4","7":"3+4+4-4","8":"3+4+4/4","9":"3*(4-4/4)","10":"44-34"},"3445":{"1":"(3-4)*4+5","2":"3/4+5/4","3":"3*4-4-5","4":"(4+4)/(5-3)","5":"3*(4-4)+5","6":"(34-4)/5","7":"3-4/4+5","8":"3+4-4+5","9":"3+4/4+5","10":"(3-4/4)*5"},"3446":{"1":"3-4-4+6","2":"3*4-4-6","3":"3+(4-4)*6","4":"3*(4+4)/6","5":"(34-4)/6","6":"3*(4-4)+6","7":"(34-6)/4","8":"3-4/4+6","9":"3+4-4+6","10":"34-4*6"},"3447":{"1":"3*4-4-7","2":"3-4-4+7","3":"(3-4)*4+7","4":"3+4+4-7","5":"(3+4)/7+4","6":"34-4*7","7":"3*(4-4)+7","8":"(4*7-4)/3","9":"3-4/4+7","10":"3+4-4+7"},"3448":{"1":"3-4*4/8","2":"34-4*8","3":"3+4+4-8","4":"(3-4)*4+8","5":"3+4*4/8","6":"3*4*4/8","7":"(3*8+4)/4","8":"3*4+4-8","9":"3/4*(4+8)","10":"3-4/4+8"},"3449":{"1":"4-3*4+9","2":"4*9-34","3":"3+(4-4)*9","4":"3-4-4+9","5":"(3-4)*4+9","6":"4-3-4+9","7":"3*4+4-9","8":"4/3*9-4","9":"3*(4-4)+9","10":"3+4*4-9"},"3455":{"1":"3/(4-5/5)","2":"3*4-5-5","3":"3+4*(5-5)","4":"3*(5-5)+4","5":"(3*5+5)/4","6":"3+4-5/5","7":"3+4+5-5","8":"3+4+5/5","9":"34-5*5","10":"(3+4-5)*5"},"3456":{"1":"3*4-5-6","2":"3/(4+5)*6","3":"3*(4-5)+6","4":"34-5*6","5":"3+(4+6)/5","6":"3+4+5-6","7":"3-4*(5-6)","8":"3+4-5+6","9":"3-(4-5)*6","10":"3-4+5+6"},"3457":{"1":"5*7-34","2":"(3-4)*5+7","3":"4-3-5+7","4":"3*(4-5)+7","5":"3+4+5-7","6":"3*(4+5-7)","7":"35-4*7","8":"(3+7)*4/5","9":"3+4-5+7","10":"3*4+5-7"},"3458":{"1":"3/4*8-5","2":"3-4-5+8","3":"(3-4)*5+8","4":"3+4+5-8","5":"3*(4-5)+8","6":"5*8-34","7":"(3+4*8)/5","8":"(3-5)*(4-8)","9":"3*4+5-8","10":"3+4-5+8"},"3459":{"1":"4*9-35","2":"3-(4+5)/9","3":"3+4+5-9","4":"(3-4)*5+9","5":"(34-9)/5","6":"3*(4-5)+9","7":"35/(9-4)","8":"3*4+5-9","9":"54/3-9","10":"3*5+4-9"},"3466":{"1":"3*4/(6+6)","2":"6*6-34","3":"3+4*(6-6)","4":"3*(6-6)+4","5":"3*(4+6)/6","6":"3+4-6/6","7":"3+4+6-6","8":"3+4+6/6","9":"3/4*(6+6)","10":"4+36/6"},"3467":{"1":"(3-4)*6+7","2":"36/4-7","3":"(3+6)/(7-4)","4":"(34-6)/7","5":"3/(4-7)+6","6":"3+4+6-7","7":"3-4*(6-7)","8":"6*7-34","9":"3*4/6+7","10":"4*7-3*6"},"3468":{"1":"3-4-6+8","2":"(3-4)*6+8","3":"36/(4+8)","4":"36-4*8","5":"(34+6)/8","6":"3+4*6/8","7":"(34+8)/6","8":"(3+4-6)*8","9":"3+4-6+8","10":"3*4+6-8"},"3469":{"1":"36/4/9","2":"3-4-6+9","3":"(3-4)*6+9","4":"3+4+6-9","5":"3*6-4-9","6":"3*6/9+4","7":"46-39","8":"3*4*6/9","9":"3+4/6*9","10":"3+4-6+9"},"3478":{"1":"(3-4)*7+8","2":"4-3-7+8","3":"(4+8)/(7-3)","4":"(3*8+4)/7","5":"(3+4*8)/7","6":"3+4+7-8","7":"3/(4-7)+8","8":"3+4-7+8","9":"(3+4)/7+8","10":"(3-7/4)*8"},"3479":{"1":"3-4-7+9","2":"(3-4)*7+9","3":"(34-7)/9","4":"(3+7-9)*4","5":"3+4+7-9","6":"3*(4+7-9)","7":"(37-9)/4","8":"3/(4-7)+9","9":"3+4-7+9","10":"3*4+7-9"},"3488":{"1":"3/(4-8/8)","2":"3/(4+8)*8","3":"3+4*(8-8)","4":"3*(8-4)-8","5":"3-8/(4-8)","6":"3+4-8/8","7":"3+4+8-8","8":"3+4+8/8","9":"3*(4-8/8)","10":"48-38"},"3489":{"1":"(3-4)*8+9","2":"34/(8+9)","3":"3*(8-4)-9","4":"3*(4+8)/9","5":"(3+8+9)/4","6":"3+4+8-9","7":"3-4*(8-9)","8":"3+4-8+9","9":"3*(4+8-9)","10":"3-8/4+9"},"3555":{"1":"3-(5+5)/5","2":"35/5-5","3":"3+(5-5)*5","4":"(3*5+5)/5","5":"3*5-5-5","6":"(35-5)/5","7":"3+5-5/5","8":"(35+5)/5","9":"3+5+5/5","10":"35-5*5"},"3556":{"1":"35/5-6","2":"(3-5)*(5-6)","3":"3+(5-5)*6","4":"3*5-5-6","5":"35-5*6","6":"3*(5-5)+6","7":"3+5+5-6","8":"3-5/5+6","9":"3+5-5+6","10":"3+5/5+6"},"3557":{"1":"35/5/7","2":"3/5+7/5","3":"3*5-5-7","4":"(3+5*5)/7","5":"(3+5-7)*5","6":"3+5+5-7","7":"3*(5-5)+7","8":"(3-7/5)*5","9":"3-5/5+7","10":"5+35/7"},"3558":{"1":"3-5-5+8","2":"3*5-5-8","3":"3+(5-5)*8","4":"3/(5-8)+5","5":"5*8-35","6":"3*(5+5-8)","7":"(3-8/5)*5","8":"3*(5-5)+8","9":"(53-8)/5","10":"3-5/5+8"},"3559":{"1":"3*5-5-9","2":"3-5-5+9","3":"3+(5-5)*9","4":"3+5+5-9","5":"5*(9-3-5)","6":"(3-9/5)*5","7":"3*(9-5)-5","8":"(3-5)*(5-9)","9":"3*(5-5)+9","10":"5*9-35"},"3566":{"1":"6*6-35","2":"5-3+6-6","3":"3*5-6-6","4":"5/3*6-6","5":"3*(6-6)+5","6":"36-5*6","7":"3+5-6/6","8":"3+5+6-6","9":"3+5+6/6","10":"3-5+6+6"},"3567":{"1":"6-35/7","2":"3*5-6-7","3":"(3*5+6)/7","4":"3*(5-6)+7","5":"3+(5+7)/6","6":"3*(5+7)/6","7":"6*7-35","8":"3-5*(6-7)","9":"3+5-6+7","10":"3-(5-6)*7"},"3568":{"1":"3*5-6-8","2":"(3*6-8)/5","3":"(3+6)/(8-5)","4":"(3-5)*(6-8)","5":"3*(5-6)+8","6":"3+5+6-8","7":"(3+5)/8+6","8":"38-5*6","9":"3*(5+6-8)","10":"3+5-6+8"},"3569":{"1":"3-5-6+9","2":"3/6*(9-5)","3":"5-3*6/9","4":"(3*5+9)/6","5":"3+5+6-9","6":"3*(5-6)+9","7":"3*(5+9)/6","8":"(3+5*9)/6","9":"3/5*(6+9)","10":"3*5*6/9"},"3577":{"1":"3*5-7-7","2":"7-35/7","3":"3+5*(7-7)","4":"(35-7)/7","5":"3*(7-7)+5","6":"(35+7)/7","7":"3+5-7/7","8":"3+5+7-7","9":"3+5+7/7","10":"(3-7/7)*5"},"3578":{"1":"3*5/(7+8)","2":"3*(5-7)+8","3":"8-35/7","4":"(37-5)/8","5":"7/(3-8/5)","6":"3/(5-8)+7","7":"3+5+7-8","8":"3-5*(7-8)","9":"3+5-7+8","10":"(3+7)/5+8"},"3579":{"1":"3/(5+7-9)","2":"(5+7)/(9-3)","3":"3*(5-7)+9","4":"3*(5+7)/9","5":"3+(5+9)/7","6":"3+5+7-9","7":"3*7-5-9","8":"5*9-37","9":"(3+5-7)*9","10":"3+5-7+9"},"3588":{"1":"3/8+5/8","2":"(3+5+8)/8","3":"3+5*(8-8)","4":"8/(3-5)+8","5":"3*(8-8)+5","6":"(38-8)/5","7":"3+5-8/8","8":"3+5+8-8","9":"3+5+8/8","10":"(3-8/8)*5"},"3589":{"1":"3*(8-5)/9","2":"(3-5)*(8-9)","3":"(35-8)/9","4":"(3+8+9)/5","5":"3-8/(5-9)","6":"(3+5*9)/8","7":"3+5+8-9","8":"3/(5-8)+9","9":"3+5-8+9","10":"(3+5)/8+9"},"3666":{"1":"36/6/6","2":"(3*6-6)/6","3":"36/(6+6)","4":"(3*6+6)/6","5":"(36-6)/6","6":"3*6-6-6","7":"(36+6)/6","8":"3+6-6/6","9":"3+6+6-6","10":"3+6+6/6"},"3667":{"1":"7-36/6","2":"6-3+6-7","3":"3+(6-6)*7","4":"6-3-6+7","5":"3*6-6-7","6":"6*7-36","7":"3*(6-6)+7","8":"3+6+6-7","9":"3-6/6+7","10":"3+6-6+7"},"3668":{"1":"3/6*(8-6)","2":"3/(6+6)*8","3":"3+(6-6)*8","4":"3*6-6-8","5":"(3*8+6)/6","6":"3-6/(6-8)","7":"3+6+6-8","8":"3*(6-6)+8","9":"3*6/(8-6)","10":"3-6/6+8"},"3669":{"1":"3+6/(6-9)","2":"6-36/9","3":"3*6-6-9","4":"3*(6+6)/9","5":"3-6/(6-9)","6":"3+6+6-9","7":"3+6*6/9","8":"3*6/9+6","9":"3*(6-6)+9","10":"6+36/9"},"3677":{"1":"6/3-7/7","2":"63/7-7","3":"3+6*(7-7)","4":"3*6-7-7","5":"6*7-37","6":"3*(7-7)+6","7":"3/6*(7+7)","8":"3+6-7/7","9":"3+6+7-7","10":"3+6+7/7"},"3678":{"1":"3-(6+8)/7","2":"(3+6+7)/8","3":"3*6-7-8","4":"(36-8)/7","5":"3*(6-7)+8","6":"3*(6+8)/7","7":"(3+6-8)*7","8":"3+6+7-8","9":"3-6*(7-8)","10":"3+6-7+8"},"3679":{"1":"3/6*(9-7)","2":"3*6-7-9","3":"7-36/9","4":"6/3-7+9","5":"(3+6*7)/9","6":"3*(6-7)+9","7":"3+6+7-9","8":"3/6*(7+9)","9":"3*6/9+7","10":"6+7-9/3"},"3688":{"1":"8*8-63","2":"3*6-8-8","3":"3+6*(8-8)","4":"(38-6)/8","5":"(38-8)/6","6":"3*(8-8)+6","7":"3-8/(6-8)","8":"3+6-8/8","9":"3+6+8-8","10":"3+6+8/8"},"3689":{"1":"3*6-8-9","2":"8/36*9","3":"3*(6-8)+9","4":"8-36/9","5":"(6*8-3)/9","6":"(3+9)/(8-6)","7":"3/(6-9)+8","8":"3+6+8-9","9":"3-6*(8-9)","10":"3+6-8+9"},"3699":{"1":"3*6/(9+9)","2":"36/(9+9)","3":"(36-9)/9","4":"(3+9)/(9-6)","5":"9-36/9","6":"3-9/(6-9)","7":"9-3*6/9","8":"3+6-9/9","9":"3+6+9-9","10":"3+6+9/9"},"3777":{"1":"3-(7+7)/7","2":"(3*7-7)/7","3":"3+(7-7)*7","4":"(3*7+7)/7","5":"3+(7+7)/7","6":"3*(7+7)/7","7":"3*7-7-7","8":"77/7-3","9":"3+7-7/7","10":"3+7+7-7"},"3779":{"1":"3*(7-9)+7","2":"(3-7)/(7-9)","3":"3+(7-7)*9","4":"(37-9)/7","5":"3*7-7-9","6":"7-3-7+9","7":"(3+7-9)*7","8":"3+7+7-9","9":"3*(7-7)+9","10":"7*7-39"},"3789":{"1":"3-(7+9)/8","2":"(3+7+8)/9","3":"7-3+8-9","4":"3*7-8-9","5":"(37+8)/9","6":"3*(7-8)+9","7":"3-8/(7-9)","8":"(3+7-9)*8","9":"3+7+8-9","10":"3-7*(8-9)"},"3799":{"1":"7+9/3-9","2":"(7-9/9)/3","3":"3*7-9-9","4":"7-3+9-9","5":"7-3+9/9","6":"(3+9)/(9-7)","7":"3*(9-9)+7","8":"9*9-73","9":"3+7-9/9","10":"3+7+9-9"},"4444":{"1":"44/44","2":"4/4+4/4","3":"(4+4+4)/4","4":"(4-4)*4+4","5":"(4+4*4)/4","6":"(4+4)/4+4","7":"44/4-4","8":"4+4+4-4","9":"4+4+4/4","10":"(44-4)/4"},"4445":{"1":"4-4-4+5","2":"4/4-4+5","3":"5-(4+4)/4","4":"4+(4-4)*5","5":"(4-4)*4+5","6":"44/4-5","7":"4+4+4-5","8":"(44-4)/5","9":"4+4-4+5","10":"4+4/4+5"},"4446":{"1":"6-4-4/4","2":"4-4-4+6","3":"4/4-4+6","4":"4+(4-4)*6","5":"44/4-6","6":"4+4+4-6","7":"(4+4*6)/4","8":"(44+4)/6","9":"4-4/4+6","10":"4+4-4+6"},"4448":{"1":"4-(4+8)/4","2":"4-4*4/8","3":"44/4-8","4":"4+4+4-8","5":"(44-4)/8","6":"(44+4)/8","7":"4+(4+8)/4","8":"4*4*4/8","9":"(44-8)/4","10":"(4+4)/4+8"},"4456":{"1":"4-4-5+6","2":"4/4-5+6","3":"4/(4-6)+5","4":"44/(5+6)","5":"4*4-5-6","6":"(4-4)*5+6","7":"4+4+5-6","8":"4-4*(5-6)","9":"4+4-5+6","10":"4-(4-5)*6"},"4457":{"1":"4-(5+7)/4","2":"4-4-5+7","3":"4/4-5+7","4":"4*4-5-7","5":"(4-4)*7+5","6":"4+4+5-7","7":"(44+5)/7","8":"4*(4+5-7)","9":"44-5*7","10":"4+4-5+7"},"4458":{"1":"4-5+8/4","2":"(4*5-4)/8","3":"4-4-5+8","4":"44-5*8","5":"4+4+5-8","6":"(4+4)/8+5","7":"4*4/8+5","8":"(4-4)*5+8","9":"(5*8-4)/4","10":"4*4*5/8"},"4459":{"1":"5*9-44","2":"4*4-5-9","3":"4-(4+5)/9","4":"4+4+5-9","5":"4/4-5+9","6":"5-4-4+9","7":"(44-9)/5","8":"(4+4*9)/5","9":"(4-4)*5+9","10":"4+54/9"},"4466":{"1":"4-4+6/6","2":"4/4+6/6","3":"(6-4)/4*6","4":"4*4-6-6","5":"(4+6)/(6-4)","6":"(4-4)*6+6","7":"4+4-6/6","8":"44-6*6","9":"4+4+6/6","10":"(46-6)/4"},"4467":{"1":"4-4-6+7","2":"44-6*7","3":"4*4-6-7","4":"(4+4*6)/7","5":"4/(4-6)+7","6":"(4-4)*7+6","7":"4+4+6-7","8":"4-4*(6-7)","9":"4+4-6+7","10":"(6-4)*7-4"},"4468":{"1":"4-4*6/8","2":"4-4-6+8","3":"4/4-6+8","4":"6*8-44","5":"4*(4+6)/8","6":"4+4+6-8","7":"4+4*6/8","8":"(4-4)*6+8","9":"(4+8)/4+6","10":"4+4-6+8"},"4469":{"1":"4*4-6-9","2":"4/6*9-4","3":"4-4-6+9","4":"4/4-6+9","5":"4+4+6-9","6":"(4-4)*9+6","7":"4/(4-6)+9","8":"4*(9-6)-4","9":"(4-4)*6+9","10":"6*9-44"},"4478":{"1":"4-4-7+8","2":"4/4-7+8","3":"(4*7-4)/8","4":"(4+4*7)/8","5":"(4*7-8)/4","6":"4/(4-8)+7","7":"4+4+7-8","8":"(4-4)*7+8","9":"4+4-7+8","10":"(4+8)/4+7"},"4479":{"1":"4*4/(7+9)","2":"4-4-7+9","3":"4/4-7+9","4":"(4+4)/(9-7)","5":"(44-9)/7","6":"4+4+7-9","7":"(4-4)*9+7","8":"4*(4+7-9)","9":"(4-4)*7+9","10":"4+4-7+9"},"4488":{"1":"4-4+8/8","2":"4/4+8/8","3":"(4*4+8)/8","4":"4+4*(8-8)","5":"(4+8+8)/4","6":"4*(4+8)/8","7":"4+4-8/8","8":"4+4+8-8","9":"4+4+8/8","10":"4*4/8+8"},"4489":{"1":"4-4-8+9","2":"4/4-8+9","3":"4/(4+8)*9","4":"(44-8)/9","5":"(4+4*9)/8","6":"9-(4+8)/4","7":"4+4+8-9","8":"4/(4-8)+9","9":"4+4-8+9","10":"(4+4)/8+9"},"4555":{"1":"(4+5/5)/5","2":"4-(5+5)/5","3":"(4*5-5)/5","4":"45/5-5","5":"4*(5-5)+5","6":"4+(5+5)/5","7":"55/5-4","8":"(45-5)/5","9":"4+5+5-5","10":"(45+5)/5"},"4556":{"1":"(4-5)*5+6","2":"4/5+6/5","3":"45/5-6","4":"4+(5-5)*6","5":"(5+5)/(6-4)","6":"4*(5-5)+6","7":"(4+6)/5+5","8":"4+5+5-6","9":"4-5/5+6","10":"4+5-5+6"},"4566":{"1":"4/(5-6/6)","2":"4*(5-6)+6","3":"54/6-6","4":"4+5*(6-6)","5":"4*(6-6)+5","6":"(4*6+6)/5","7":"(6-4)*6-5","8":"4+5-6/6","9":"45-6*6","10":"4+5+6/6"},"4567":{"1":"(4-5)*6+7","2":"(4*5-6)/7","3":"45-6*7","4":"4/(5-7)+6","5":"(4+6)/(7-5)","6":"4+(5+7)/6","7":"4*5-6-7","8":"4+5+6-7","9":"4-5*(6-7)","10":"4+5-6+7"},"4568":{"1":"4-5-6+8","2":"(4-5)*6+8","3":"6*8-45","4":"4*(5-6)+8","5":"6-4-5+8","6":"4*5-6-8","7":"4+5+6-8","8":"4*6/8+5","9":"5+6-8/4","10":"4*5/(8-6)"},"4569":{"1":"6-45/9","2":"4-5-6+9","3":"45/(6+9)","4":"5-4-6+9","5":"4*5-6-9","6":"4+5+6-9","7":"(4+5)/9+6","8":"4*(5+6-9)","9":"6*9-45","10":"4*6-5-9"},"4578":{"1":"(4-5)*7+8","2":"(4+5+7)/8","3":"45/(7+8)","4":"(4*5+8)/7","5":"4*5-7-8","6":"4*(5+7)/8","7":"(4+5-8)*7","8":"4+5+7-8","9":"4-5*(7-8)","10":"4+5-7+8"},"4588":{"1":"4/(5-8/8)","2":"5-4+8/8","3":"5+8/(4-8)","4":"4*5-8-8","5":"4*(8-8)+5","6":"8/4*(8-5)","7":"5-8/(4-8)","8":"4+5-8/8","9":"4+5+8-8","10":"4+5+8/8"},"4599":{"1":"4/(5-9/9)","2":"4*5-9-9","3":"9-54/9","4":"9-45/9","5":"4*(9-9)+5","6":"(45+9)/9","7":"4*(9-5)-9","8":"4+5-9/9","9":"4+5+9-9","10":"4+5+9/9"},"4666":{"1":"6-4-6/6","2":"4-(6+6)/6","3":"(4*6-6)/6","4":"4+(6-6)*6","5":"(4*6+6)/6","6":"4+(6+6)/6","7":"66/6-4","8":"4*(6+6)/6","9":"4+6-6/6","10":"46-6*6"},"4667":{"1":"6-4+6-7","2":"(4-6)*(6-7)","3":"6-4-6+7","4":"46-6*7","5":"(6-4)*6-7","6":"66/(4+7)","7":"4*(6-6)+7","8":"(6-4)*7-6","9":"4+6+6-7","10":"4-6/6+7"},"4668":{"1":"4+6/(6-8)","2":"6*8-46","3":"(4+6+8)/6","4":"4+(6-6)*8","5":"(46-6)/8","6":"4*(6+6)/8","7":"4-6/(6-8)","8":"4+6+6-8","9":"(46+8)/6","10":"4*6-6-8"},"4669":{"1":"4-6-6+9","2":"4+6/(6-9)","3":"4/(6+6)*9","4":"4+(6-6)*9","5":"(4*9-6)/6","6":"4-6/(6-9)","7":"4+6+6-9","8":"6*9-46","9":"4*6-6-9","10":"4/6*(6+9)"},"4678":{"1":"6*8-47","2":"(4-6)*(7-8)","3":"6-4-7+8","4":"4*(6-7)+8","5":"4/(6-8)+7","6":"4+(6+8)/7","7":"84/6-7","8":"4*(6+8)/7","9":"4+6+7-8","10":"7*8-46"},"4679":{"1":"4+6/(7-9)","2":"4*(9-7)-6","3":"6/(4+7-9)","4":"(4-6)*(7-9)","5":"4*(6-7)+9","6":"(4*9+6)/7","7":"4-6/(7-9)","8":"4+6+7-9","9":"(4-7)*(6-9)","10":"6+(7+9)/4"},"4688":{"1":"48/6/8","2":"(4*6-8)/8","3":"6-4+8/8","4":"4+6*(8-8)","5":"8-4*6/8","6":"4/(6-8)+8","7":"4*(6+8)/8","8":"4*6-8-8","9":"4+6-8/8","10":"4+6+8-8"},"4689":{"1":"4*(6-8)+9","2":"(4+6+8)/9","3":"6-4-8+9","4":"(4+8)/(9-6)","5":"84/6-9","6":"(46+8)/9","7":"4*6-8-9","8":"(4+6-9)*8","9":"4+6+8-9","10":"4-6*(8-9)"},"4699":{"1":"4+9/(6-9)","2":"6-4+9-9","3":"4*(9-6)-9","4":"4+6*(9-9)","5":"6*9-49","6":"4*6-9-9","7":"4-9/(6-9)","8":"9-4-6+9","9":"4+6-9/9","10":"4+6+9-9"},"4778":{"1":"7*7-48","2":"7-4+7-8","3":"(4-7)*(7-8)","4":"4+(7-7)*8","5":"(47-7)/8","6":"84/(7+7)","7":"4*(7+7)/8","8":"4*(7-7)+8","9":"7*8-47","10":"4+7+7-8"},"4788":{"1":"7-48/8","2":"7-4-8/8","3":"7-4+8-8","4":"4*(7-8)+8","5":"7+8/(4-8)","6":"7/4*8-8","7":"4*(8-8)+7","8":"7*8-48","9":"7-8/(4-8)","10":"4+7-8/8"},"5556":{"1":"5-5-5+6","2":"5/5-5+6","3":"5/(5+5)*6","4":"6-(5+5)/5","5":"55/5-6","6":"(5-5)*5+6","7":"(5+5*6)/5","8":"(5+5)/5+6","9":"5+5+5-6","10":"(55+5)/6"},"5557":{"1":"7-5-5/5","2":"5-5-5+7","3":"5/5-5+7","4":"55/5-7","5":"5+(5-5)*7","6":"(5*7-5)/5","7":"(5-5)*5+7","8":"5+5+5-7","9":"(5+5)/5+7","10":"5*7-5*5"},"5567":{"1":"5-5-6+7","2":"5/5-6+7","3":"5-(5+7)/6","4":"5*(7-5)-6","5":"(5+5*6)/7","6":"(5-5)*7+6","7":"(55-6)/7","8":"(55-7)/6","9":"5+5+6-7","10":"5-5*(6-7)"},"5568":{"1":"8-5/5-6","2":"5-5-6+8","3":"5/5-6+8","4":"6-5-5+8","5":"(5+5)/(8-6)","6":"(5-5)*8+6","7":"55-6*8","8":"5+5+6-8","9":"5*(8-5)-6","10":"5*6/(8-5)"},"5569":{"1":"55-6*9","2":"5-(6+9)/5","3":"5-5-6+9","4":"5/5-6+9","5":"6-5-5+9","6":"(5-5)*9+6","7":"5+5+6-9","8":"5+(6+9)/5","9":"(5-5)*6+9","10":"5*5-6-9"},"5577":{"1":"5-5+7/7","2":"5/5+7/7","3":"5*(7-5)-7","4":"(5-7)*(5-7)","5":"5+5*(7-7)","6":"55-7*7","7":"(5-5)*7+7","8":"75/5-7","9":"5+5-7/7","10":"5+5+7-7"},"5578":{"1":"7*8-55","2":"5/5-7+8","3":"7/5+8/5","4":"(5*5+7)/8","5":"(5+5*7)/8","6":"(55-7)/8","7":"(5-5)*8+7","8":"(5-5)*7+8","9":"5+5+7-8","10":"5*5-7-8"},"5667":{"1":"(5-6)*6+7","2":"56/7-6","3":"(5+6+7)/6","4":"6-(5+7)/6","5":"5+(6-6)*7","6":"(6+6)/(7-5)","7":"5*(6-6)+7","8":"(5+7)/6+6","9":"66-57","10":"5+6+6-7"},"5677":{"1":"56/7-7","2":"5*(6-7)+7","3":"7-5-6+7","4":"56/(7+7)","5":"5+6*(7-7)","6":"5*(7-7)+6","7":"56-7*7","8":"75-67","9":"(56+7)/7","10":"5+6-7/7"},"5678":{"1":"56/7/8","2":"5*6/(7+8)","3":"5*(6-7)+8","4":"(5-7)*(6-8)","5":"6/(5-7)+8","6":"(5+7)/(8-6)","7":"5+(6+8)/7","8":"78/6-5","9":"57-6*8","10":"5+6+7-8"},"5679":{"1":"5-6-7+9","2":"(5-6)*7+9","3":"(5*6-9)/7","4":"5*(6-7)+9","5":"75/(6+9)","6":"(5-7)*(6-9)","7":"7*9-56","8":"5-6/(7-9)","9":"5+6+7-9","10":"(6+9)/5+7"},"5689":{"1":"(5-6)*8+9","2":"9-56/8","3":"6*8-5*9","4":"58-6*9","5":"(6+9)/(8-5)","6":"8-5-6+9","7":"5*(9-6)-8","8":"(5-9)*(6-8)","9":"(5-8)*(6-9)","10":"5+6+8-9"},"5778":{"1":"57-7*8","2":"(5-7)*(7-8)","3":"7-5-7+8","4":"7/7-5+8","5":"5+(7-7)*8","6":"(7-5)*7-8","7":"(57-8)/7","8":"(57+7)/8","9":"58-7*7","10":"7+(7+8)/5"},"5789":{"1":"5+8/(7-9)","2":"(5-7)*(8-9)","3":"5/(7+8)*9","4":"5*(7-8)+9","5":"7*9-58","6":"(57-9)/8","7":"5+(7+9)/8","8":"95-87","9":"5-8/(7-9)","10":"5*(7+9)/8"},"6788":{"1":"6/(7-8/8)","2":"6*(7-8)+8","3":"67-8*8","4":"7/(6+8)*8","5":"78/6-8","6":"6+7*(8-8)","7":"6*(8-8)+7","8":"(6*8+8)/7","9":"(78-6)/8","10":"(6+8)/7+8"},"6889":{"1":"8-6+8-9","2":"(6-8)*(8-9)","3":"8-6-8+9","4":"8*9-68","5":"69-8*8","6":"6+(8-8)*9","7":"(8-6)*8-9","8":"96-88","9":"6*(8-8)+9","10":"(8-6)*9-8"},"7777":{"1":"77/77","2":"7/7+7/7","3":"(7+7+7)/7","4":"77/7-7","5":"7-(7+7)/7","6":"(7*7-7)/7","7":"(7-7)*7+7","8":"(7+7*7)/7","9":"(7+7)/7+7","10":"(77-7)/7"}}'
			);
			var PROBLEMS_BY_DAY = [
				"1126",
				"1225",
				"1255",
				"4479",
				"4445",
				"2557",
				"4489",
				"2268",
				"1299",
				"2277",
				"4679",
				"2367",
				"1247",
				"3467",
				"3346",
				"3578",
				"2667",
				"2399",
				"2269",
				"1278",
				"1135",
				"3679",
				"4689",
				"3447",
				"1145",
				"1227",
				"2777",
				"1279",
				"1357",
				"1249",
				"3455",
				"2778",
				"2578",
				"1789",
				"2377",
				"3399",
				"1337",
				"4568",
				"2238",
				"4458",
				"1344",
				"1335",
				"3566",
				"3799",
				"1458",
				"2299",
				"2458",
				"2333",
				"1229",
				"1138",
				"2227",
				"1445",
				"1348",
				"3368",
				"3478",
				"1446",
				"4468",
				"1257",
				"2344",
				"3559",
				"1379",
				"3479",
				"3379",
				"3389",
				"1116",
				"2256",
				"2588",
				"2288",
				"1267",
				"1358",
				"1349",
				"1146",
				"2688",
				"2677",
				"1457",
				"2248",
				"3357",
				"1459",
				"3466",
				"2456",
				"1779",
				"2356",
				"3335",
				"3569",
				"2258",
				"3359",
				"2666",
				"1269",
				"2788",
				"2566",
				"4466",
				"1237",
				"3446",
				"3489",
				"3469",
				"3789",
				"2559",
				"2488",
				"1488",
				"2668",
				"2467",
				"1338",
				"2466",
				"3358",
				"2289",
				"2388",
				"3579",
				"2556",
				"1226",
				"1557",
				"1799",
				"2469",
				"2267",
				"1139",
				"3445",
				"2999",
				"2336",
				"1688",
				"5568",
				"1266",
				"3668",
				"1236",
				"2378",
				"2468",
				"3699",
				"2479",
				"2234",
				"1277",
				"1368",
				"2278",
				"2339",
				"1235",
				"3458",
				"1136",
				"2569",
				"3388",
				"4467",
				"2499",
				"4448",
				"1228",
				"2459",
				"3468",
				"2577",
				"1668",
				"2669",
				"2589",
				"1579",
				"1469",
				"1468",
				"1466",
				"2247",
				"2359",
				"1133",
				"4669",
				"3567",
				"2455",
				"2337",
				"1256",
				"2335",
				"5689",
				"2266",
				"1288",
				"1156",
				"1245",
				"3345",
				"3488",
				"2366",
				"2349",
				"1566",
				"2244",
				"3448",
				"3366",
				"2899",
				"2699",
				"2678",
				"5556",
				"2446",
				"1233",
				"1369",
				"1455",
				"2233",
				"5567",
				"1356",
				"3556",
				"1223",
				"1124",
				"1244",
				"5578",
				"4446",
				"3348",
				"3369",
				"2347",
				"3349",
				"1123",
				"3456",
				"2889",
				"2338",
				"4668",
				"2237",
				"3689",
				"1114",
				"1137",
				"1568",
				"1238",
				"4488",
				"1222",
				"1333",
				"2558",
				"3333",
				"2389",
				"1248",
				"4478",
				"1144",
				"2259",
				"1345",
				"2478",
				"1115",
				"1346",
				"3557",
				"2357",
				"2235",
				"1259",
				"2255",
				"1355",
				"2249",
				"1577",
				"2369",
				"3555",
				"1246",
				"2568",
				"4688",
				"4578",
				"2489",
				"5667",
				"1567",
				"1268",
				"3339",
				"1479",
				"2449",
				"3344",
				"4567",
				"1448",
				"1234",
				"1336",
				"2224",
				"2555",
				"3367",
				"2448",
				"2358",
				"2799",
				"2334",
				"2379",
				"1359",
				"1367",
				"2229",
				"1366",
				"3558",
				"2346",
				"2345",
				"3355",
				"3449",
				"2368",
				"2236",
				"1339",
				"2457",
				"3337",
				"1239",
				"1678",
				"4566",
				"2567",
				"2245",
				"1134",
				"1467",
				"5677",
				"4456",
				"3338",
				"4588",
				"3336",
				"2579",
				"2789",
				"2599",
				"2447",
				"2689",
				"2279",
				"2223",
				"1289",
				"2444",
				"3677",
				"4556",
				"2679",
				"1224",
				"5679",
				"1125",
				"2239",
				"3589",
				"3678",
				"2226",
				"1258",
				"3334",
				"1456",
				"2888",
				"2225",
				"2228",
				"2477",
				"2246",
				"2779",
				"3356",
				"3378",
				"2355",
				"2445",
				"2348",
				"4469",
				"4457",
			];
			function prettifySolution(sol) {
				return sol
					.replace(/\*/g, "×")
					.replace(/\//g, "÷")
					.replace(/\+/g, "+")
					.replace(/\-/g, "−")
					.split("")
					.join(" ")
					.replace(/ \)/g, ")")
					.replace(/\( /g, "(")
					.replace(/(\d) (?=\d)/g, "$1");
			}
			function getProblemNumbersForDay(d) {
				var daysSinceLaunch = getDaysSinceLaunch(d);
				return (
					PROBLEMS_BY_DAY[daysSinceLaunch % PROBLEMS_BY_DAY.length] || "1234"
				);
			}
			function getDaysSinceLaunch(d) {
				return Math.floor((Number(d) - Number(Constants.hd)) / Constants.Kh);
			}
			function getPuzzleNumberAsString(d) {
				var puzzleNumber = (function getPuzzleNumber(d) {
						return getDaysSinceLaunch(d);
					})(d).toString(),
					numDigits = puzzleNumber.length;
				return (numDigits < 3 ? "0".repeat(3 - numDigits) : "") + puzzleNumber;
			}
		},
		"./src/util/Unicode.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				hL: () => NEG,
				H4: () => convertOperator,
			});
			var NEG = "−";
			function convertOperator(operator) {
				return "+" === operator
					? "+"
					: "-" === operator
					? "−"
					: "*" === operator
					? "×"
					: "/" === operator
					? "÷"
					: operator;
			}
		},
		"./src/util/Utils.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				vE: () => assertNever,
				yL: () => strIsPositive,
				WZ: () => padLeftWith0s,
			});
			__webpack_require__(
				"./node_modules/core-js/modules/es.number.is-finite.js"
			),
				__webpack_require__(
					"./node_modules/core-js/modules/es.number.constructor.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.repeat.js"
				);
			function assertNever(v) {
				throw new Error("assertNever got value: " + JSON.stringify(v));
			}
			function strIsPositive(s) {
				return Number.isFinite(s) && Number(s) > 0;
			}
			function padLeftWith0s(str, len) {
				return len < str.length ? str : "0".repeat(len - str.length) + str;
			}
		},
		"./src/view/AnimationHook.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				Z: () => __WEBPACK_DEFAULT_EXPORT__,
			});
			__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.is-array.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js");
			var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
					"./node_modules/react/index.js"
				),
				_stitches_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				_util_AnimControl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
					"./src/view/util/AnimControl.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				);
			function _slicedToArray(arr, i) {
				return (
					(function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function _iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function _unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return _arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function _nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var defaultOuterClassName = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_13__.iv)({
					position: "relative",
					width: "100%",
					height: "100%",
				}),
				defaultInnerClassName = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_13__.iv)({
					position: "relative",
					width: "100%",
					height: "100%",
				}),
				defaultLeavingClassName = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_13__.iv)({
					position: "absolute",
					left: 0,
					top: 0,
					right: 0,
					bottom: 0,
				}),
				AnimationHook = function AnimationHook(props) {
					var _props$tag,
						leavingContainer,
						name = props.name,
						children = props.children,
						_props$outerClassName = props.outerClassName,
						outerClassName =
							void 0 === _props$outerClassName
								? defaultOuterClassName()
								: _props$outerClassName,
						_props$innerClassName = props.innerClassName,
						innerClassName =
							void 0 === _props$innerClassName
								? defaultInnerClassName()
								: _props$innerClassName,
						_props$innerStyle = props.innerStyle,
						innerStyle = void 0 === _props$innerStyle ? {} : _props$innerStyle,
						_props$leavingClassNa = props.leavingClassName,
						leavingClassName =
							void 0 === _props$leavingClassNa
								? defaultLeavingClassName()
								: _props$leavingClassNa,
						_props$leavingStyle = props.leavingStyle,
						leavingStyle =
							void 0 === _props$leavingStyle ? {} : _props$leavingStyle,
						_props$leavingProps = props.leavingProps,
						leavingProps =
							void 0 === _props$leavingProps ? {} : _props$leavingProps,
						ContainerTag =
							null !== (_props$tag = props.tag) && void 0 !== _props$tag
								? _props$tag
								: "div",
						mainRef = (0, react__WEBPACK_IMPORTED_MODULE_12__.useRef)(null),
						lastChildrenRef = (0, react__WEBPACK_IMPORTED_MODULE_12__.useRef)(
							null
						),
						_useState2 = _slicedToArray(
							(0, react__WEBPACK_IMPORTED_MODULE_12__.useState)({
								mainAnim: void 0,
								leavingChildIndex: 1,
								leavingEl: null,
								leavingAnim: void 0,
							}),
							2
						),
						internalState = _useState2[0],
						setInternalState = _useState2[1],
						animControl = (0, react__WEBPACK_IMPORTED_MODULE_12__.useContext)(
							_util_AnimControl__WEBPACK_IMPORTED_MODULE_14__.N
						);
					if (
						((0, react__WEBPACK_IMPORTED_MODULE_12__.useEffect)(
							function () {
								if (animControl)
									return (
										animControl.addEl(name, {
											domElement: mainRef.current,
											onStartAnim: function onStartAnim(newData) {
												newData.leavingAnim
													? setInternalState(function (s) {
															return Object.assign({}, s, {
																mainAnim: newData.mainAnim,
																leavingChildIndex: s.leavingChildIndex ? 0 : 1,
																leavingEl: lastChildrenRef.current,
																leavingAnim: newData.leavingAnim,
															});
													  })
													: setInternalState(function (s) {
															return Object.assign({}, s, {
																mainAnim: newData.mainAnim,
															});
													  });
											},
											onFinishAnim: function onFinishAnim() {
												setInternalState(function (s) {
													return Object.assign({}, s, {
														mainAnim: void 0,
														leavingEl: null,
														leavingAnim: void 0,
													});
												});
											},
										}),
										function () {
											return animControl.removeEl(name);
										}
									);
							},
							[name, animControl]
						),
						(0, react__WEBPACK_IMPORTED_MODULE_12__.useEffect)(
							function () {
								lastChildrenRef.current = children;
							},
							[children]
						),
						internalState.leavingEl)
					) {
						var leavingEl = internalState.leavingEl,
							leavingElProps =
								"function" == typeof leavingProps
									? leavingProps(leavingEl.props)
									: Object.assign({}, leavingEl.props, leavingProps),
							leavingElReal = react__WEBPACK_IMPORTED_MODULE_12__.cloneElement(
								leavingEl,
								leavingElProps
							),
							leavingStyleReal = Object.assign(
								{},
								innerStyle,
								leavingStyle,
								internalState.leavingAnim || {}
							);
						leavingContainer = (0,
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
							className: leavingClassName,
							style: leavingStyleReal,
							children: leavingElReal,
						});
					}
					var innerStyleReal = Object.assign(
							{},
							innerStyle,
							internalState.mainAnim || {}
						),
						currentContainer = (0,
						react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
							className: innerClassName,
							style: innerStyleReal,
							children,
						}),
						child0 =
							1 === internalState.leavingChildIndex
								? currentContainer
								: leavingContainer,
						child1 =
							0 === internalState.leavingChildIndex
								? currentContainer
								: leavingContainer;
					return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
						ContainerTag,
						{
							className: outerClassName,
							ref: mainRef,
							children: (0,
							react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment,
								{children: [child0, " ", child1]}
							),
						}
					);
				};
			const __WEBPACK_DEFAULT_EXPORT__ = AnimationHook;
			try {
				(AnimationHook.displayName = "AnimationHook"),
					(AnimationHook.__docgenInfo = {
						description: "",
						displayName: "AnimationHook",
						props: {
							name: {
								defaultValue: null,
								description: "",
								name: "name",
								required: !0,
								type: {name: "string"},
							},
							tag: {
								defaultValue: null,
								description: "",
								name: "tag",
								required: !1,
								type: {name: "string"},
							},
							outerClassName: {
								defaultValue: null,
								description: "",
								name: "outerClassName",
								required: !1,
								type: {name: "string"},
							},
							innerClassName: {
								defaultValue: null,
								description: "",
								name: "innerClassName",
								required: !1,
								type: {name: "string"},
							},
							innerStyle: {
								defaultValue: null,
								description: "",
								name: "innerStyle",
								required: !1,
								type: {name: "CSSProperties"},
							},
							leavingClassName: {
								defaultValue: null,
								description: "",
								name: "leavingClassName",
								required: !1,
								type: {name: "string"},
							},
							hideIfNotAnimating: {
								defaultValue: null,
								description: "",
								name: "hideIfNotAnimating",
								required: !1,
								type: {name: "boolean"},
							},
							leavingStyle: {
								defaultValue: null,
								description: "",
								name: "leavingStyle",
								required: !1,
								type: {name: "CSSProperties"},
							},
							leavingProps: {
								defaultValue: null,
								description: "",
								name: "leavingProps",
								required: !1,
								type: {name: "object | ((origProps: object) => object)"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/AnimationHook.tsx#AnimationHook"
						] = {
							docgenInfo: AnimationHook.__docgenInfo,
							name: "AnimationHook",
							path: "src/view/AnimationHook.tsx#AnimationHook",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/view/ButtonGrid.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				Z: () => __WEBPACK_DEFAULT_EXPORT__,
			});
			__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__("./node_modules/react/index.js");
			var mobx_react_lite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					"./node_modules/mobx-react-lite/es/index.js"
				),
				_stitches_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				_expr_State__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
					"./src/expr/State.ts"
				),
				_expr_Eval__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__("./src/expr/Eval.ts"),
				_util_Colors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
					"./src/view/util/Colors.ts"
				),
				_AnimationHook__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
					"./src/view/AnimationHook.tsx"
				),
				_IconButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
					"./src/view/IconButton.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				Column = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_4__.zo)("div", {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}),
				Row = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_4__.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					variants: {
						align: {
							start: {alignItems: "flex-start"},
							end: {alignItems: "flex-end"},
						},
					},
				}),
				Nudge = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_4__.zo)("div", {
					position: "relative",
					variants: {
						up: {true: {top: -8}},
						down: {true: {top: 8}},
						left: {true: {left: -8}},
						right: {true: {left: 8}},
					},
				}),
				ButtonGrid = function ButtonGrid(props) {
					var opButtonSize,
						mainButtonSize,
						state = props.state,
						equalsEnabled = props.equalsEnabled,
						onInsertElement = props.onInsertElement,
						onEquals = props.onEquals,
						onReset = props.onReset,
						onBackspace = props.onBackspace,
						undosHighlighted = props.undosHighlighted,
						size = props.size,
						numberButtonStates = (0,
						_expr_State__WEBPACK_IMPORTED_MODULE_5__.D)(state);
					"small" === size
						? ((opButtonSize = "mediumXSmall"), (mainButtonSize = "medium"))
						: size && "medium" !== size
						? "mediumLarge" === size
							? ((opButtonSize = "medium"),
							  (mainButtonSize = "mediumLargeLarge"))
							: ((opButtonSize = "medium"), (mainButtonSize = "large"))
						: ((opButtonSize = "mediumSmall"),
						  (mainButtonSize = "mediumLarge"));
					var numberButtons = numberButtonStates
							.map(function (b, i) {
								var baseProps = {
									number:
										"start" === b.el.type
											? state.start[i]
											: (0, _expr_Eval__WEBPACK_IMPORTED_MODULE_6__.$w)(
													state,
													b.el.index
											  ).value,
									size: mainButtonSize,
								};
								if ("available" === b.state) {
									var color = (0, _util_Colors__WEBPACK_IMPORTED_MODULE_7__.Yq)(
										b.el
									);
									return (0,
									react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
										_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
										Object.assign({}, baseProps, {
											color,
											onClick: function onClick() {
												return onInsertElement(b.el);
											},
										})
									);
								}
								return "current" === b.state
									? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
											Object.assign({}, baseProps, {
												color: "disabled",
												disabled: !0,
											})
									  )
									: "used" === b.state
									? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
											Object.assign({}, baseProps, {invis: !0})
									  )
									: null;
							})
							.map(function (el, i) {
								return (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_AnimationHook__WEBPACK_IMPORTED_MODULE_8__.Z, {name: "numberButton" + i, children: el});
							}),
						makeOpButton = function makeOpButton(op) {
							return (0, _expr_State__WEBPACK_IMPORTED_MODULE_5__.HO)(state, op)
								? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
										_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
										{
											icon: op,
											color: (0, _util_Colors__WEBPACK_IMPORTED_MODULE_7__.Xq)(
												op
											),
											onClick: function onClick() {
												return onInsertElement({type: "op", op});
											},
											size: opButtonSize,
										}
								  )
								: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
										_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
										{
											icon: op,
											color: "disabled",
											disabled: !0,
											size: opButtonSize,
										}
								  );
						};
					return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(
						Column,
						{
							children: [
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(Row, {
									align: "end",
									children: [
										numberButtons[0] || null,
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											Nudge,
											{down: !0, children: makeOpButton("+")}
										),
										numberButtons[1] || null,
									],
								}),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(Row, {
									children: [
										makeOpButton("("),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											Nudge,
											{right: !0, children: makeOpButton("*")}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
											{size: opButtonSize, invis: !0}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											Nudge,
											{left: !0, children: makeOpButton("/")}
										),
										makeOpButton(")"),
									],
								}),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(Row, {
									align: "start",
									children: [
										numberButtons[2] || null,
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											Nudge,
											{up: !0, children: makeOpButton("-")}
										),
										numberButtons[3] || null,
									],
								}),
								(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(Row, {
									align: "end",
									children: [
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
											{
												icon: "reset",
												onClick: function onClick() {
													return onReset();
												},
												color: undosHighlighted ? "mainLight" : void 0,
												size: opButtonSize,
											}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											"div",
											{style: {marginLeft: 12}}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
											{
												icon: "=",
												color: equalsEnabled
													? (0, _util_Colors__WEBPACK_IMPORTED_MODULE_7__.Xq)(
															"="
													  )
													: "disabled",
												disabled: !equalsEnabled,
												onClick: function onClick() {
													return onEquals();
												},
												size: mainButtonSize,
											}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											"div",
											{style: {marginLeft: 12}}
										),
										(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(
											_IconButton__WEBPACK_IMPORTED_MODULE_9__.Z,
											{
												icon: "backspace",
												onClick: function onClick() {
													return onBackspace();
												},
												color: undosHighlighted ? "mainLight" : void 0,
												size: opButtonSize,
											}
										),
									],
								}),
							],
						}
					);
				};
			ButtonGrid.displayName = "ButtonGrid";
			const __WEBPACK_DEFAULT_EXPORT__ = (0,
			mobx_react_lite__WEBPACK_IMPORTED_MODULE_3__.Pi)(ButtonGrid);
			try {
				(ButtonGrid.displayName = "ButtonGrid"),
					(ButtonGrid.__docgenInfo = {
						description: "",
						displayName: "ButtonGrid",
						props: {
							state: {
								defaultValue: null,
								description: "",
								name: "state",
								required: !0,
								type: {name: "ExpressionState"},
							},
							equalsEnabled: {
								defaultValue: null,
								description: "",
								name: "equalsEnabled",
								required: !0,
								type: {name: "boolean"},
							},
							onInsertElement: {
								defaultValue: null,
								description: "",
								name: "onInsertElement",
								required: !0,
								type: {name: "(el: ExpressionElement) => void"},
							},
							onEquals: {
								defaultValue: null,
								description: "",
								name: "onEquals",
								required: !0,
								type: {name: "() => void"},
							},
							onReset: {
								defaultValue: null,
								description: "",
								name: "onReset",
								required: !0,
								type: {name: "() => void"},
							},
							onBackspace: {
								defaultValue: null,
								description: "",
								name: "onBackspace",
								required: !0,
								type: {name: "() => void"},
							},
							undosHighlighted: {
								defaultValue: null,
								description: "",
								name: "undosHighlighted",
								required: !1,
								type: {name: "boolean"},
							},
							size: {
								defaultValue: null,
								description: "",
								name: "size",
								required: !1,
								type: {
									name: "enum",
									value: [
										{value: '"small"'},
										{value: '"medium"'},
										{value: '"large"'},
										{value: '"mediumLarge"'},
									],
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/ButtonGrid.tsx#ButtonGrid"] = {
							docgenInfo: ButtonGrid.__docgenInfo,
							name: "ButtonGrid",
							path: "src/view/ButtonGrid.tsx#ButtonGrid",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/view/ExpressionDisplay.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				Z: () => __WEBPACK_DEFAULT_EXPORT__,
			});
			__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.join.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.split.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.regexp.exec.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.includes.js"
				),
				__webpack_require__("./node_modules/react/index.js");
			var _stitches_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				_expr_Line__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__("./src/expr/Line.ts"),
				_expr_Eval__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__("./src/expr/Eval.ts"),
				_util_Unicode__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
					"./src/util/Unicode.ts"
				),
				_util_Colors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
					"./src/view/util/Colors.ts"
				),
				_RationalDisplay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
					"./src/view/RationalDisplay.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				Container = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_7__.zo)(
					"div",
					{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						height: "1.2em",
						variants: {
							size: {
								small: {fontSize: "12pt"},
								medium: {fontSize: "18pt"},
								large: {fontSize: "24pt"},
							},
						},
						defaultVariants: {size: "medium"},
					}
				),
				InnerContainer = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_7__.zo)(
					"div",
					{
						alignSelf: "stretch",
						position: "relative",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						variants: {forceSpace: {true: {minWidth: "0.4em"}}},
					}
				),
				Operator = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_7__.zo)(
					"div",
					{
						marginLeft: 2,
						marginRight: 2,
						color: "$$color",
						variants: {
							noLeft: {true: {marginLeft: 0}},
							noRight: {true: {marginRight: 0}},
							color: _util_Colors__WEBPACK_IMPORTED_MODULE_10__.Jj,
						},
						defaultVariants: {color: "main"},
					}
				);
			function renderLine(props, line) {
				var state = props.state,
					evalInterm = props.evalInterm,
					colorInterm = props.colorInterm,
					color = props.color;
				return line.map(function (el, i) {
					if ("start" === el.type) {
						var number = state.start[el.index];
						if (void 0 === number)
							throw new Error("Invalid start index in line: " + el.index);
						return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(
							_RationalDisplay__WEBPACK_IMPORTED_MODULE_11__.Z,
							{number, color},
							i
						);
					}
					if ("interm" === el.type) {
						var intermLine = state.interm[el.index];
						if (void 0 === intermLine)
							throw new Error("Invalid interm index in line: " + el.index);
						var intermColor = colorInterm
							? (0, _util_Colors__WEBPACK_IMPORTED_MODULE_10__.Hk)(el.index)
							: color;
						if (evalInterm) {
							var evalRes = (0, _expr_Eval__WEBPACK_IMPORTED_MODULE_9__.$w)(
								state,
								el.index
							);
							return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(
								_RationalDisplay__WEBPACK_IMPORTED_MODULE_11__.Z,
								{number: evalRes.value, color: intermColor},
								i
							);
						}
						return (
							(intermLine = (0, _expr_Line__WEBPACK_IMPORTED_MODULE_8__.uO)(
								intermLine
							)),
							renderLine(
								Object.assign({}, props, {color: intermColor}),
								intermLine
							)
						);
					}
					if ("op" === el.type)
						return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(
							Operator,
							{
								color,
								noLeft: ")" === el.op,
								noRight: "(" === el.op,
								children: _util_Unicode__WEBPACK_IMPORTED_MODULE_13__.H4(el.op),
							},
							i
						);
				});
			}
			function renderOpsAsUnicode(s) {
				var EXPRESSION_OPERATORS = ["+", "-", "*", "/", "(", ")"];
				return s
					.split("")
					.map(function (c) {
						return EXPRESSION_OPERATORS.includes(c)
							? Unicode.convertOperator(c)
							: c;
					})
					.join("");
			}
			var ExpressionDisplay = function ExpressionDisplay(props) {
				var state = props.state,
					intermIndex = props.intermIndex,
					size = props.size,
					line = state.main;
				if (void 0 !== intermIndex) {
					var maybeLine = state.interm[intermIndex];
					if (!maybeLine)
						throw new Error("Invalid intermIndex prop " + intermIndex);
					line = maybeLine;
				}
				var wrappedEls = renderLine(props, line).map(function (el, i) {
					return (0,
					react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(InnerContainer, {children: el}, i);
				});
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(
					Container,
					{size, children: wrappedEls}
				);
			};
			ExpressionDisplay.displayName = "ExpressionDisplay";
			const __WEBPACK_DEFAULT_EXPORT__ = ExpressionDisplay;
			try {
				(renderOpsAsUnicode.displayName = "renderOpsAsUnicode"),
					(renderOpsAsUnicode.__docgenInfo = {
						description:
							"Convert * to the times symbol, / to the divide symbol that's a horizontal line with two dots, etc.",
						displayName: "renderOpsAsUnicode",
						props: {},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/ExpressionDisplay.tsx#renderOpsAsUnicode"
						] = {
							docgenInfo: renderOpsAsUnicode.__docgenInfo,
							name: "renderOpsAsUnicode",
							path: "src/view/ExpressionDisplay.tsx#renderOpsAsUnicode",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(ExpressionDisplay.displayName = "ExpressionDisplay"),
					(ExpressionDisplay.__docgenInfo = {
						description: "",
						displayName: "ExpressionDisplay",
						props: {
							state: {
								defaultValue: null,
								description: "",
								name: "state",
								required: !0,
								type: {name: "ExpressionState"},
							},
							intermIndex: {
								defaultValue: null,
								description: "",
								name: "intermIndex",
								required: !1,
								type: {name: "number"},
							},
							evalInterm: {
								defaultValue: null,
								description: "",
								name: "evalInterm",
								required: !1,
								type: {name: "boolean"},
							},
							colorInterm: {
								defaultValue: null,
								description: "",
								name: "colorInterm",
								required: !1,
								type: {name: "boolean"},
							},
							size: {
								defaultValue: null,
								description: "",
								name: "size",
								required: !1,
								type: {
									name: '"small" | "medium" | "large" | ({ "@bpXSmall"?: "small" | "medium" | "large"; "@bpSmall"?: "small" | "medium" | "large"; "@bpMedium"?: "small" | "medium" | "large" | undefined; "@bpLarge"?: "small" | ... 2 more ... | undefined; "@bpExtraLarge"?: "small" | ... 2 more ... | undefined; "@initial...',
								},
							},
							color: {
								defaultValue: null,
								description: "",
								name: "color",
								required: !1,
								type: {
									name: "enum",
									value: [
										{value: '"main"'},
										{value: '"mainLight"'},
										{value: '"white"'},
										{value: '"start"'},
										{value: '"disabled"'},
										{value: '"interm1"'},
										{value: '"interm2"'},
										{value: '"done"'},
										{value: '"mainInverted"'},
										{value: '"tertiary"'},
										{value: '"example"'},
									],
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/ExpressionDisplay.tsx#ExpressionDisplay"
						] = {
							docgenInfo: ExpressionDisplay.__docgenInfo,
							name: "ExpressionDisplay",
							path: "src/view/ExpressionDisplay.tsx#ExpressionDisplay",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/view/IconButton.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				Z: () => __WEBPACK_DEFAULT_EXPORT__,
			});
			__webpack_require__("./node_modules/core-js/modules/es.array.join.js"),
				__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__("./node_modules/react/index.js");
			var _false,
				_stitches_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				_expr_Operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					"./src/expr/Operators.ts"
				),
				_util_Unicode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
					"./src/util/Unicode.ts"
				),
				_util_Colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
					"./src/view/util/Colors.ts"
				),
				_RationalDisplay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
					"./src/view/RationalDisplay.tsx"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				TRANSITION_PROP = [
					"color",
					"background-color",
					"border-color",
					"transform",
				]
					.map(function (prop) {
						return prop + " 0.2s ease-out";
					})
					.join(", "),
				LineContainer = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_3__.zo)(
					"div",
					{variants: {inline: {true: {display: "inline-block"}}}}
				),
				Container = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_3__.zo)(
					"div",
					{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "$$color",
						color: "$$foreColor",
						borderStyle: "solid",
						borderWidth: 2,
						borderColor: "$$borderColor",
						borderRadius: "100%",
						margin: 2,
						cursor: "pointer",
						aspectRatio: 1,
						width: 56,
						height: 56,
						fontSize: "24pt",
						transform: "scale(0.999)",
						transformOrigin: "center",
						transition: TRANSITION_PROP,
						variants: {
							noBackground: {true: {backgroundColor: "initial"}},
							size: {
								xsmall: {height: 26, width: 26, fontSize: "12px"},
								small: {height: 32, width: 32, fontSize: "14pt"},
								mediumXSmall: {height: 42, width: 42, fontSize: "16pt"},
								mediumSmall: {height: 48, width: 48, fontSize: "16pt"},
								mediumNum: {height: 56, width: 56, fontSize: "18pt"},
								medium: {height: 56, width: 56, fontSize: "24pt"},
								mediumLarge: {height: 64, width: 64, fontSize: "24px"},
								mediumLargeLarge: {height: 70, width: 70, fontSize: "24px"},
								large: {height: 80, width: 80, fontSize: "24pt"},
							},
							color: _util_Colors__WEBPACK_IMPORTED_MODULE_5__.Jj,
							invis: {
								true: {
									color: "$white !important",
									backgroundColor: "$white !important",
									borderColor: "$white !important",
									zIndex: -1,
								},
							},
							disabled: {
								true: {cursor: "initial"},
								false:
									((_false = {}),
									(_false["&:hover"] = {
										color: "$$foreColorHover",
										backgroundColor: "$$colorHover",
										borderColor: "$$borderColorHover",
									}),
									(_false["&:active"] = {
										color: "$$foreColorHover",
										backgroundColor: "$$colorHover",
										borderColor: "$$borderColorHover",
										transform: "scale(0.9)",
									}),
									_false),
							},
							inline: {true: {display: "inline-block"}},
							unclickable: {true: {pointerEvents: "none"}},
						},
						defaultVariants: {size: "medium", color: "main", disabled: !1},
					}
				),
				Icon = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_3__.zo)("div", {
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					variants: {
						nudgeUp: {true: {position: "relative", top: "-0.06em"}},
						nudgeLeft: {true: {position: "relative", left: "-0.12em"}},
						nudgeRight: {true: {position: "relative", right: "-0.1em"}},
					},
				}),
				IconButton = function IconButton(props) {
					var icon = props.icon,
						number = props.number,
						text = props.text,
						size = props.size,
						color = props.color,
						invis = props.invis,
						disabled = props.disabled,
						onClick = props.onClick,
						noBackground = props.noBackground,
						inline = props.inline,
						zIndex = props.zIndex,
						unclickable = props.unclickable,
						label = "";
					if (
						icon &&
						(0, _expr_Operators__WEBPACK_IMPORTED_MODULE_4__.zm)(icon)
					) {
						var nudgeUp = "(" === icon || ")" === icon,
							nudgeLeft = "(" === icon,
							nudgeRight = ")" === icon;
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								nudgeUp,
								nudgeLeft,
								nudgeRight,
								children: _util_Unicode__WEBPACK_IMPORTED_MODULE_8__.H4(icon),
							}
						);
					} else if ("=" === icon)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
									className: "fa-solid fa-equals",
								}),
							}
						);
					else if ("reset" === icon)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
									className: "fas fa-arrow-rotate-left fa-sm",
								}),
							}
						);
					else if ("backspace" === icon)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
									className: "fa-solid fa-delete-left fa-xs",
								}),
							}
						);
					else if ("share-mobile" === icon || "share" === icon)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
									className: "fa-solid fa-share-nodes",
								}),
							}
						);
					else if ("help" === icon)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
									className: "fas fa-question",
								}),
							}
						);
					else if ("close" === icon)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
									className: "fa-solid fa-xmark",
								}),
							}
						);
					else if ("chart" === icon)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
									className: "fas fa-chart-column",
								}),
							}
						);
					else if ("menu" === icon)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							Icon,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
									className: "fa-solid fa-bars fa-lg",
								}),
							}
						);
					else if (void 0 !== text)
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							"div",
							{children: text}
						);
					else if (void 0 !== number) {
						var labelColor = (0, _util_Colors__WEBPACK_IMPORTED_MODULE_5__.ZQ)(
							color
						);
						label = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
							_RationalDisplay__WEBPACK_IMPORTED_MODULE_6__.Z,
							{number, color: labelColor}
						);
					}
					var button = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
						Container,
						{
							color,
							size,
							invis,
							disabled: disabled || invis,
							onClick: disabled ? void 0 : onClick,
							noBackground,
							style: {zIndex},
							unclickable,
							children: label,
						}
					);
					return inline
						? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(
								LineContainer,
								{inline, style: {zIndex}, children: button}
						  )
						: button;
				};
			const __WEBPACK_DEFAULT_EXPORT__ = IconButton;
			try {
				(IconButton.displayName = "IconButton"),
					(IconButton.__docgenInfo = {
						description: "",
						displayName: "IconButton",
						props: {
							icon: {
								defaultValue: null,
								description: "",
								name: "icon",
								required: !1,
								type: {
									name: "enum",
									value: [
										{value: '"menu"'},
										{value: '"help"'},
										{value: '"reset"'},
										{value: '"+"'},
										{value: '"-"'},
										{value: '"*"'},
										{value: '"/"'},
										{value: '"("'},
										{value: '")"'},
										{value: '"="'},
										{value: '"backspace"'},
										{value: '"share"'},
										{value: '"share-mobile"'},
										{value: '"close"'},
										{value: '"chart"'},
									],
								},
							},
							number: {
								defaultValue: null,
								description: "",
								name: "number",
								required: !1,
								type: {name: "number | Rational"},
							},
							text: {
								defaultValue: null,
								description: "",
								name: "text",
								required: !1,
								type: {name: "string"},
							},
							size: {
								defaultValue: null,
								description: "",
								name: "size",
								required: !1,
								type: {
									name: '"small" | "medium" | "large" | "xsmall" | "mediumXSmall" | "mediumSmall" | "mediumNum" | "mediumLarge" | "mediumLargeLarge" | ({ "@bpXSmall"?: "small" | "medium" | "large" | "xsmall" | ... 5 more ...; ... 4 more ...; "@initial"?: "small" | ... 8 more ...; } & { ...; }) | undefined',
								},
							},
							color: {
								defaultValue: null,
								description: "",
								name: "color",
								required: !1,
								type: {
									name: "enum",
									value: [
										{value: '"main"'},
										{value: '"mainLight"'},
										{value: '"white"'},
										{value: '"start"'},
										{value: '"disabled"'},
										{value: '"interm1"'},
										{value: '"interm2"'},
										{value: '"done"'},
										{value: '"mainInverted"'},
										{value: '"tertiary"'},
										{value: '"example"'},
									],
								},
							},
							invis: {
								defaultValue: null,
								description: "",
								name: "invis",
								required: !1,
								type: {name: "boolean"},
							},
							disabled: {
								defaultValue: null,
								description: "",
								name: "disabled",
								required: !1,
								type: {name: "boolean"},
							},
							unclickable: {
								defaultValue: null,
								description: "",
								name: "unclickable",
								required: !1,
								type: {name: "boolean"},
							},
							onClick: {
								defaultValue: null,
								description: "",
								name: "onClick",
								required: !1,
								type: {name: "(() => void)"},
							},
							noBackground: {
								defaultValue: null,
								description: "",
								name: "noBackground",
								required: !1,
								type: {name: "boolean"},
							},
							inline: {
								defaultValue: null,
								description: "",
								name: "inline",
								required: !1,
								type: {name: "boolean"},
							},
							zIndex: {
								defaultValue: null,
								description: "",
								name: "zIndex",
								required: !1,
								type: {name: "number"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES["src/view/IconButton.tsx#IconButton"] = {
							docgenInfo: IconButton.__docgenInfo,
							name: "IconButton",
							path: "src/view/IconButton.tsx#IconButton",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/view/NoticeDisplay.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {Z: () => view_NoticeDisplay});
			__webpack_require__(
				"./node_modules/core-js/modules/es.array.is-array.js"
			),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js");
			var react = __webpack_require__("./node_modules/react/index.js"),
				stitches_config = __webpack_require__("./src/stitches.config.ts"),
				Colors = __webpack_require__("./src/view/util/Colors.ts");
			__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),
				__webpack_require__("./node_modules/core-js/modules/web.timers.js");
			function _slicedToArray(arr, i) {
				return (
					(function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function _iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function _unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return _arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function _nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var jsx_runtime = __webpack_require__(
				"./node_modules/react/jsx-runtime.js"
			);
			function NoticeDisplay_slicedToArray(arr, i) {
				return (
					(function NoticeDisplay_arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					})(arr) ||
					(function NoticeDisplay_iterableToArrayLimit(arr, i) {
						var _i =
							null == arr
								? null
								: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
								  arr["@@iterator"];
						if (null == _i) return;
						var _s,
							_e,
							_arr = [],
							_n = !0,
							_d = !1;
						try {
							for (
								_i = _i.call(arr);
								!(_n = (_s = _i.next()).done) &&
								(_arr.push(_s.value), !i || _arr.length !== i);
								_n = !0
							);
						} catch (err) {
							(_d = !0), (_e = err);
						} finally {
							try {
								_n || null == _i.return || _i.return();
							} finally {
								if (_d) throw _e;
							}
						}
						return _arr;
					})(arr, i) ||
					(function NoticeDisplay_unsupportedIterableToArray(o, minLen) {
						if (!o) return;
						if ("string" == typeof o)
							return NoticeDisplay_arrayLikeToArray(o, minLen);
						var n = Object.prototype.toString.call(o).slice(8, -1);
						"Object" === n && o.constructor && (n = o.constructor.name);
						if ("Map" === n || "Set" === n) return Array.from(o);
						if (
							"Arguments" === n ||
							/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
						)
							return NoticeDisplay_arrayLikeToArray(o, minLen);
					})(arr, i) ||
					(function NoticeDisplay_nonIterableRest() {
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
						);
					})()
				);
			}
			function NoticeDisplay_arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var Container = (0, stitches_config.zo)("div", {
					transition: "opacity 0.3s",
					height: 24,
					borderRadius: 8,
					fontSize: "12pt",
					lineHeight: "24px",
					textAlign: "center",
					background: "$$color",
					color: "$$foreColor",
					variants: {background: Colors.Jj, hide: {true: {opacity: 0}}},
					defaultVariants: {background: "main"},
				}),
				noticeConfig = {
					getGen: function getGen(s) {
						return s.gen;
					},
					getDuration: function getDuration(s) {
						return s.duration;
					},
					getData: function getData(s) {
						return s.message;
					},
					fadeOutDuration: 300,
				},
				NoticeDisplay = function NoticeDisplay(props) {
					var notice = props.notice,
						background = props.background,
						_useNotice = (function useNotice(config, notice) {
							var _useState2 = _slicedToArray(
									(0, react.useState)({data: null, fadingOut: !1}),
									2
								),
								state = _useState2[0],
								setInternalState = _useState2[1],
								configFadeOutDurationRef = (0, react.useRef)(0),
								fadeTimeoutRef = (0, react.useRef)(null),
								expireTimeoutRef = (0, react.useRef)(null),
								genRef = (0, react.useRef)(0),
								upcomingDataRef = (0, react.useRef)(null),
								upcomingDurationRef = (0, react.useRef)(0);
							configFadeOutDurationRef.current = config.fadeOutDuration || 0;
							var stopFadeOutTimeout = (0, react.useCallback)(function () {
									fadeTimeoutRef.current &&
										(clearTimeout(fadeTimeoutRef.current),
										(fadeTimeoutRef.current = null));
								}, []),
								stopExpireTimeout = (0, react.useCallback)(function () {
									expireTimeoutRef.current &&
										(clearTimeout(expireTimeoutRef.current),
										(expireTimeoutRef.current = null));
								}, []),
								showUpcomingDataNow = (0, react.useCallback)(function () {
									var upcomingData = upcomingDataRef.current;
									setInternalState(function (s) {
										return Object.assign({}, s, {
											data: upcomingData,
											fadingOut: !1,
										});
									}),
										stopExpireTimeout(),
										upcomingData &&
											upcomingDurationRef.current > 0 &&
											(expireTimeoutRef.current = setTimeout(
												onDurationExpire,
												upcomingDurationRef.current
											));
								}, []),
								startFadeOut = (0, react.useCallback)(function () {
									var fadeOutDuration = configFadeOutDurationRef.current;
									fadeOutDuration
										? (stopExpireTimeout(),
										  (fadeTimeoutRef.current = setTimeout(
												onFadeOutEnd,
												fadeOutDuration
										  )),
										  setInternalState(function (s) {
												return Object.assign({}, s, {fadingOut: !0});
										  }))
										: showUpcomingDataNow();
								}, []),
								onDurationExpire = (0, react.useCallback)(function () {
									(upcomingDataRef.current = null),
										startFadeOut(),
										(expireTimeoutRef.current = null);
								}, []),
								onFadeOutEnd = (0, react.useCallback)(function () {
									showUpcomingDataNow(), (fadeTimeoutRef.current = null);
								}, []);
							if (
								((0, react.useEffect)(function () {
									return function () {
										stopFadeOutTimeout(), stopExpireTimeout();
									};
								}, []),
								notice || !state.data || state.fadingOut)
							) {
								if (notice) {
									var newGen = config.getGen(notice);
									newGen > genRef.current &&
										((genRef.current = newGen),
										(upcomingDataRef.current = config.getData(notice)),
										(upcomingDurationRef.current = config.getDuration(notice)),
										state.data
											? state.fadingOut || startFadeOut()
											: showUpcomingDataNow());
								}
							} else (upcomingDataRef.current = null), startFadeOut();
							return [state.data, state.fadingOut];
						})(noticeConfig, notice),
						_useNotice2 = NoticeDisplay_slicedToArray(_useNotice, 2),
						message = _useNotice2[0],
						fadingOut = _useNotice2[1];
					return null === message
						? (0, jsx_runtime.jsx)(Container, {
								background,
								hide: !0,
								children: "",
						  })
						: (0, jsx_runtime.jsx)(Container, {
								background,
								hide: fadingOut,
								children: message,
						  });
				};
			NoticeDisplay.displayName = "NoticeDisplay";
			const view_NoticeDisplay = NoticeDisplay;
			try {
				(NoticeDisplay.displayName = "NoticeDisplay"),
					(NoticeDisplay.__docgenInfo = {
						description: "",
						displayName: "NoticeDisplay",
						props: {
							notice: {
								defaultValue: null,
								description: "",
								name: "notice",
								required: !0,
								type: {name: "NoticeState | null"},
							},
							background: {
								defaultValue: null,
								description: "",
								name: "background",
								required: !1,
								type: {
									name: "enum",
									value: [
										{value: '"main"'},
										{value: '"mainLight"'},
										{value: '"white"'},
										{value: '"start"'},
										{value: '"disabled"'},
										{value: '"interm1"'},
										{value: '"interm2"'},
										{value: '"done"'},
										{value: '"mainInverted"'},
										{value: '"tertiary"'},
										{value: '"example"'},
									],
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/NoticeDisplay.tsx#NoticeDisplay"
						] = {
							docgenInfo: NoticeDisplay.__docgenInfo,
							name: "NoticeDisplay",
							path: "src/view/NoticeDisplay.tsx#NoticeDisplay",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/view/RationalDisplay.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				Z: () => __WEBPACK_DEFAULT_EXPORT__,
			});
			__webpack_require__("./node_modules/react/index.js");
			var _styled,
				_stitches_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				_expr_Rational__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
					"./src/expr/Rational.ts"
				),
				_util_Unicode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
					"./src/util/Unicode.ts"
				),
				_util_Colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					"./src/view/util/Colors.ts"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				),
				Text = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_1__.zo)("div", {
					variants: {
						frac: {true: {fontSize: "0.8em"}},
						neg: {true: {position: "relative", top: "-0.062em"}},
					},
				}),
				FracStackBox = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_1__.zo)(
					"div",
					{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginLeft: "2px",
						marginRight: "2px",
					}
				),
				FracBar = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_1__.zo)("div", {
					height: "0.08em",
					alignSelf: "stretch",
				}),
				Container = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_1__.zo)(
					"span",
					(((_styled = {
						display: "inline-flex",
						verticalAlign: "middle",
						flexDirection: "row",
						alignItems: "center",
						color: "$$color",
					})["& " + FracBar] = {backgroundColor: "$$color"}),
					(_styled.variants = {
						color: _util_Colors__WEBPACK_IMPORTED_MODULE_3__.Jj,
					}),
					(_styled.defaultVariants = {color: "main"}),
					_styled)
				),
				RationalDisplay = function RationalDisplay(props) {
					var posPart,
						number = props.number,
						color = props.color,
						rational =
							"number" == typeof number
								? (0, _expr_Rational__WEBPACK_IMPORTED_MODULE_2__.xS)(number)
								: number,
						negative = !!rational && rational[0] < 0,
						numText = rational ? String(Math.abs(rational[0])) : "?",
						denomText =
							rational && 1 !== rational[1] ? String(rational[1]) : null;
					posPart =
						null === denomText
							? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Text, {
									children: numText,
							  })
							: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(
									FracStackBox,
									{
										children: [
											(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
												Text,
												{frac: !0, children: numText}
											),
											(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
												FracBar,
												{}
											),
											(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
												Text,
												{frac: !0, children: denomText}
											),
										],
									}
							  );
					var negSign = negative
						? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Text, {
								neg: !0,
								children: _util_Unicode__WEBPACK_IMPORTED_MODULE_5__.hL,
						  })
						: null;
					return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(
						Container,
						{color, children: [negSign, posPart]}
					);
				};
			RationalDisplay.displayName = "RationalDisplay";
			const __WEBPACK_DEFAULT_EXPORT__ = RationalDisplay;
			try {
				(RationalDisplay.displayName = "RationalDisplay"),
					(RationalDisplay.__docgenInfo = {
						description: "",
						displayName: "RationalDisplay",
						props: {
							number: {
								defaultValue: null,
								description: "",
								name: "number",
								required: !0,
								type: {name: "number | Rational | null"},
							},
							color: {
								defaultValue: null,
								description: "",
								name: "color",
								required: !1,
								type: {
									name: "enum",
									value: [
										{value: '"main"'},
										{value: '"mainLight"'},
										{value: '"white"'},
										{value: '"start"'},
										{value: '"disabled"'},
										{value: '"interm1"'},
										{value: '"interm2"'},
										{value: '"done"'},
										{value: '"mainInverted"'},
										{value: '"tertiary"'},
										{value: '"example"'},
									],
								},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/RationalDisplay.tsx#RationalDisplay"
						] = {
							docgenInfo: RationalDisplay.__docgenInfo,
							name: "RationalDisplay",
							path: "src/view/RationalDisplay.tsx#RationalDisplay",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/view/TargetDisplay.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				Z: () => __WEBPACK_DEFAULT_EXPORT__,
				l: () => FauxTargetDisplay,
			});
			__webpack_require__(
				"./node_modules/core-js/modules/es.object.to-string.js"
			),
				__webpack_require__(
					"./node_modules/core-js/modules/es.function.name.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.from.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.description.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.symbol.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.is-array.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),
				__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),
				__webpack_require__("./node_modules/react/index.js");
			var _solution,
				_solution2,
				mobx_react_lite__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
					"./node_modules/mobx-react-lite/es/index.js"
				),
				_stitches_config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
					"./src/stitches.config.ts"
				),
				_AnimationHook__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
					"./src/view/AnimationHook.tsx"
				),
				_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
					"./src/view/ExpressionDisplay.tsx"
				),
				_util_ProblemUtil__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
					"./src/util/ProblemUtil.ts"
				),
				react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
					"./node_modules/react/jsx-runtime.js"
				);
			function _createForOfIteratorHelper(o, allowArrayLike) {
				var it =
					("undefined" != typeof Symbol && o[Symbol.iterator]) ||
					o["@@iterator"];
				if (!it) {
					if (
						Array.isArray(o) ||
						(it = (function _unsupportedIterableToArray(o, minLen) {
							if (!o) return;
							if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
							var n = Object.prototype.toString.call(o).slice(8, -1);
							"Object" === n && o.constructor && (n = o.constructor.name);
							if ("Map" === n || "Set" === n) return Array.from(o);
							if (
								"Arguments" === n ||
								/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
							)
								return _arrayLikeToArray(o, minLen);
						})(o)) ||
						(allowArrayLike && o && "number" == typeof o.length)
					) {
						it && (o = it);
						var i = 0,
							F = function F() {};
						return {
							s: F,
							n: function n() {
								return i >= o.length ? {done: !0} : {done: !1, value: o[i++]};
							},
							e: function e(_e) {
								throw _e;
							},
							f: F,
						};
					}
					throw new TypeError(
						"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
					);
				}
				var err,
					normalCompletion = !0,
					didErr = !1;
				return {
					s: function s() {
						it = it.call(o);
					},
					n: function n() {
						var step = it.next();
						return (normalCompletion = step.done), step;
					},
					e: function e(_e2) {
						(didErr = !0), (err = _e2);
					},
					f: function f() {
						try {
							normalCompletion || null == it.return || it.return();
						} finally {
							if (didErr) throw err;
						}
					},
				};
			}
			function _arrayLikeToArray(arr, len) {
				(null == len || len > arr.length) && (len = arr.length);
				for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
				return arr2;
			}
			var Container = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)(
					"div",
					{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gridTemplateRows: "repeat(5, 30px)",
						gap: "4px",
						height: "100%",
						width: "100%",
						variants: {
							size: {
								large: {gridTemplateRows: "repeat(5, 40px)"},
								compact: {
									gridTemplateRows: "repeat(2, 50px)",
									gridTemplateColumns: "repeat(5, calc(50px))",
									gap: "5px",
									justifyContent: "center",
									alignItems: "center",
								},
							},
							fill: {
								solution:
									((_solution = {
										backgroundColor: "$done",
										cursor: "pointer",
										transition: "background-color 0.2s ease-out",
									}),
									(_solution["&:hover"] = {backgroundColor: "$doneHover"}),
									_solution),
								solutionNoClick: {backgroundColor: "$done"},
								impossible: {
									backgroundColor: "$impossible",
									fontSize: "12pt",
									textAlign: "center",
								},
							},
						},
					}
				),
				TargetRow = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)(
					"div",
					{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						backgroundColor: "$disabled",
						borderRadius: "3px",
						fontSize: 16,
						variants: {
							fill: {
								solution:
									((_solution2 = {
										backgroundColor: "$done",
										cursor: "pointer",
										transition: "background-color 0.2s ease-out",
									}),
									(_solution2["&:hover"] = {backgroundColor: "$doneHover"}),
									_solution2),
								solutionNoClick: {backgroundColor: "$done"},
								impossible: {
									backgroundColor: "$impossible",
									fontSize: "12pt",
									textAlign: "center",
								},
							},
							compact: {
								true: {width: "100%", aspectRatio: "1/1", borderRadius: "12px"},
							},
						},
					}
				),
				targetSolutionBoxClassName = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_14__.iv)({
					position: "relative",
					flex: "1 0 0",
				}),
				TargetSolutionBox = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)("div", {
					position: "relative",
					width: "100%",
					textAlign: "center",
					fontSize: "16px",
				}),
				TargetNumberContainer = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)("div", {
					height: "100%",
					aspectRatio: "1/1",
					borderLeft: "2px solid white",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					variants: {compact: {true: {borderLeft: "none"}}},
				}),
				TargetNumber = (0, _stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)(
					"div",
					{
						textAlign: "center",
						fontWeight: "bold",
						fontSize: 18,
						padding: 3,
						variants: {
							fill: {
								solution: {color: "$white"},
								solutionNoClick: {color: "$white"},
								impossible: {
									backgroundColor: "$impossible",
									textAlign: "center",
								},
							},
						},
					}
				);
			function renderTargetEl(
				problem,
				target,
				i,
				onClick,
				keySuffix,
				compact,
				animated,
				solutions
			) {
				var fillVariant,
					exprEl = null;
				if (target.solution) {
					fillVariant = onClick ? "solution" : "solutionNoClick";
					var exprState = {
						start: problem.start,
						rules: problem.rules,
						main: target.solution,
						interm: [],
					};
					exprEl = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
						_ExpressionDisplay__WEBPACK_IMPORTED_MODULE_16__.Z,
						{state: exprState, color: "white", size: "small"}
					);
				} else
					null != solutions && solutions[target.number]
						? (exprEl = (0,
						  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
								FauxExpressionDisplay,
								{
									children: (0,
									react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										FauxExpressionDisplayText,
										{
											children: (0,
											_util_ProblemUtil__WEBPACK_IMPORTED_MODULE_17__.kb)(
												solutions[target.number] || ""
											),
										}
									),
								}
						  ))
						: target.impossible &&
						  ((fillVariant = "impossible"), (exprEl = "Impossible"));
				var realOnClick = onClick
					? function () {
							return onClick(i);
					  }
					: function () {};
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(
					TargetRow,
					{
						fill: fillVariant,
						onClick: realOnClick,
						compact,
						children: [
							animated
								? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										_AnimationHook__WEBPACK_IMPORTED_MODULE_15__.Z,
										{
											name: "targetExpr" + i + (keySuffix || ""),
											outerClassName: targetSolutionBoxClassName(),
											leavingStyle: {zIndex: 1},
											children: (0,
											react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
												TargetSolutionBox,
												{children: !compact && exprEl}
											),
										}
								  )
								: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										TargetSolutionBox,
										{children: !compact && exprEl}
								  ),
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
								TargetNumberContainer,
								{
									compact,
									children: (0,
									react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										TargetNumber,
										{fill: fillVariant, children: target.number}
									),
								}
							),
						],
					},
					i
				);
			}
			renderTargetEl.displayName = "renderTargetEl";
			var TargetDisplay = function TargetDisplay(props) {
				var problem = props.problem,
					targets = props.targets,
					onClick = props.onClick,
					keySuffix = props.keySuffix,
					compact = props.compact,
					animated = props.animated,
					solutions = props.solutions,
					els = [];
				if (compact) {
					var _step,
						_iterator = _createForOfIteratorHelper(
							targets.map(function (t, i) {
								return renderTargetEl(
									problem,
									t,
									i,
									onClick,
									keySuffix,
									compact,
									animated,
									solutions
								);
							})
						);
					try {
						for (_iterator.s(); !(_step = _iterator.n()).done; ) {
							var el = _step.value;
							els.push(el);
						}
					} catch (err) {
						_iterator.e(err);
					} finally {
						_iterator.f();
					}
				} else
					for (
						var splitIndex = Math.ceil(targets.length / 2),
							column1Targets = targets.slice(0, splitIndex),
							column2Targets = targets.slice(splitIndex),
							column1Els = column1Targets.map(function (t, i) {
								return renderTargetEl(
									problem,
									t,
									i,
									onClick,
									keySuffix,
									compact,
									animated,
									solutions
								);
							}),
							column2Els = column2Targets.map(function (t, i) {
								return renderTargetEl(
									problem,
									t,
									i + splitIndex,
									onClick,
									keySuffix,
									compact,
									animated,
									solutions
								);
							}),
							i = 0;
						i < Math.min(column1Els.length, column2Els.length);
						i++
					)
						els.push(column1Els[i]), els.push(column2Els[i]);
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
					Container,
					{size: compact ? "compact" : void 0, children: els}
				);
			};
			TargetDisplay.displayName = "TargetDisplay";
			const __WEBPACK_DEFAULT_EXPORT__ = (0,
			mobx_react_lite__WEBPACK_IMPORTED_MODULE_13__.Pi)(TargetDisplay);
			var FauxExpressionDisplay = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)("div", {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					height: "1.2em",
					fontSize: "12pt",
				}),
				FauxExpressionDisplayText = (0,
				_stitches_config__WEBPACK_IMPORTED_MODULE_14__.zo)("div", {
					textAlign: "center",
				});
			function renderFauxTargetEl(userSolution, i) {
				var fillVariant,
					exprEl,
					problemSolutions =
						arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
					keySuffix = "faux";
				if (null != userSolution && userSolution.length)
					(fillVariant = "solutionNoClick"),
						(exprEl = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
							FauxExpressionDisplay,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
									FauxExpressionDisplayText,
									{children: userSolution}
								),
							}
						));
				else {
					var strI = String(i);
					if (
						"1" === strI ||
						"2" === strI ||
						"3" === strI ||
						"4" === strI ||
						"5" === strI ||
						"6" === strI ||
						"7" === strI ||
						"8" === strI ||
						"9" === strI ||
						"10" === strI
					) {
						var solution = problemSolutions[strI];
						exprEl = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
							FauxExpressionDisplay,
							{
								children: (0,
								react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
									FauxExpressionDisplayText,
									{
										children: (0,
										_util_ProblemUtil__WEBPACK_IMPORTED_MODULE_17__.kb)(
											solution || ""
										),
									}
								),
							}
						);
					}
				}
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(
					TargetRow,
					{
						fill: fillVariant,
						children: [
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
								_AnimationHook__WEBPACK_IMPORTED_MODULE_15__.Z,
								{
									name: "targetExpr" + i + keySuffix,
									outerClassName: targetSolutionBoxClassName(),
									leavingStyle: {zIndex: 1},
									children: (0,
									react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										TargetSolutionBox,
										{children: exprEl}
									),
								}
							),
							(0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
								TargetNumberContainer,
								{
									children: (0,
									react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
										TargetNumber,
										{fill: fillVariant, children: i}
									),
								}
							),
						],
					},
					i
				);
			}
			renderFauxTargetEl.displayName = "renderFauxTargetEl";
			var FauxTargetDisplay = function FauxTargetDisplay(props) {
				for (
					var userSolutions = props.userSolutions,
						solutions = props.solutions,
						splitIndex = Math.ceil(userSolutions.length / 2),
						els = [],
						column1Els = userSolutions
							.slice(0, splitIndex)
							.map(function (t, i) {
								return renderFauxTargetEl(t, i + 1, solutions);
							}),
						column2Els = userSolutions.slice(splitIndex).map(function (t, i) {
							return renderFauxTargetEl(t, i + splitIndex + 1, solutions);
						}),
						i = 0;
					i < Math.min(column1Els.length, column2Els.length);
					i++
				)
					els.push(column1Els[i]), els.push(column2Els[i]);
				return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(
					Container,
					{children: els}
				);
			};
			FauxTargetDisplay.displayName = "FauxTargetDisplay";
			try {
				(TargetDisplay.displayName = "TargetDisplay"),
					(TargetDisplay.__docgenInfo = {
						description: "",
						displayName: "TargetDisplay",
						props: {
							problem: {
								defaultValue: null,
								description: "",
								name: "problem",
								required: !0,
								type: {name: "Problem"},
							},
							targets: {
								defaultValue: null,
								description: "",
								name: "targets",
								required: !0,
								type: {name: "TargetState[]"},
							},
							onClick: {
								defaultValue: null,
								description: "",
								name: "onClick",
								required: !1,
								type: {name: "((index: number) => void)"},
							},
							keySuffix: {
								defaultValue: null,
								description: "",
								name: "keySuffix",
								required: !1,
								type: {name: "string"},
							},
							compact: {
								defaultValue: null,
								description: "",
								name: "compact",
								required: !1,
								type: {name: "boolean"},
							},
							animated: {
								defaultValue: null,
								description: "",
								name: "animated",
								required: !1,
								type: {name: "boolean"},
							},
							solutions: {
								defaultValue: null,
								description: "",
								name: "solutions",
								required: !1,
								type: {name: "{ [key: string]: string; }"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/TargetDisplay.tsx#TargetDisplay"
						] = {
							docgenInfo: TargetDisplay.__docgenInfo,
							name: "TargetDisplay",
							path: "src/view/TargetDisplay.tsx#TargetDisplay",
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(FauxTargetDisplay.displayName = "FauxTargetDisplay"),
					(FauxTargetDisplay.__docgenInfo = {
						description: "",
						displayName: "FauxTargetDisplay",
						props: {
							userSolutions: {
								defaultValue: null,
								description: "",
								name: "userSolutions",
								required: !0,
								type: {name: "string[]"},
							},
							solutions: {
								defaultValue: null,
								description: "",
								name: "solutions",
								required: !1,
								type: {name: "{ [key: string]: string; }"},
							},
						},
					}),
					"undefined" != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							"src/view/TargetDisplay.tsx#FauxTargetDisplay"
						] = {
							docgenInfo: FauxTargetDisplay.__docgenInfo,
							name: "FauxTargetDisplay",
							path: "src/view/TargetDisplay.tsx#FauxTargetDisplay",
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		"./src/view/util/AnimControl.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				Y: () => AnimControl,
				N: () => AnimContext,
			});
			__webpack_require__("./node_modules/core-js/modules/es.map.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.to-string.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.string.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.iterator.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.assign.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/es.array.for-each.js"
				),
				__webpack_require__(
					"./node_modules/core-js/modules/web.dom-collections.for-each.js"
				),
				__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),
				__webpack_require__("./node_modules/core-js/modules/web.timers.js"),
				__webpack_require__(
					"./node_modules/core-js/modules/es.object.define-property.js"
				);
			var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
				"./node_modules/react/index.js"
			);
			function _defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					(descriptor.enumerable = descriptor.enumerable || !1),
						(descriptor.configurable = !0),
						"value" in descriptor && (descriptor.writable = !0),
						Object.defineProperty(target, descriptor.key, descriptor);
				}
			}
			function getDomElPos(domEl) {
				var rect = domEl.getBoundingClientRect();
				return [rect.left + rect.width / 2, rect.top + rect.height / 2];
			}
			var AnimControl = (function () {
					function AnimControl() {
						!(function _classCallCheck(instance, Constructor) {
							if (!(instance instanceof Constructor))
								throw new TypeError("Cannot call a class as a function");
						})(this, AnimControl),
							(this.els = void 0),
							(this.anyActive = void 0),
							(this.endTimeout = void 0),
							(this.els = new Map()),
							(this.anyActive = !1),
							(this.endTimeout = null);
					}
					return (
						(function _createClass(Constructor, protoProps, staticProps) {
							return (
								protoProps &&
									_defineProperties(Constructor.prototype, protoProps),
								staticProps && _defineProperties(Constructor, staticProps),
								Object.defineProperty(Constructor, "prototype", {writable: !1}),
								Constructor
							);
						})(AnimControl, [
							{
								key: "addEl",
								value: function addEl(name, el) {
									this.els.get(name)
										? console.warn(
												"AnimControl already had an element with this name, ignoring",
												{name}
										  )
										: this.els.set(
												name,
												Object.assign(
													{
														name,
														domElement: null,
														activeAnim: !1,
														onStartAnim: function onStartAnim() {},
														onFinishAnim: function onFinishAnim() {},
													},
													el
												)
										  );
								},
							},
							{
								key: "removeEl",
								value: function removeEl(name) {
									this.els.delete(name);
								},
							},
							{
								key: "startAnim",
								value: function startAnim(data) {
									var _this = this;
									this.stopAnim(),
										Object.keys(data.els).forEach(function (name) {
											var el = _this.els.get(name);
											el &&
												(el.onStartAnim(data.els[name]), (el.activeAnim = !0));
										}),
										(this.anyActive = !0),
										(this.endTimeout = setTimeout(function () {
											return _this.stopAnim();
										}, data.duration));
								},
							},
							{
								key: "stopAnim",
								value: function stopAnim() {
									this.anyActive &&
										(this.els.forEach(function (el) {
											el.activeAnim &&
												(el.onFinishAnim(), (el.activeAnim = !1));
										}),
										this.endTimeout && clearTimeout(this.endTimeout),
										(this.anyActive = !1),
										(this.endTimeout = null));
								},
							},
							{
								key: "getDisplacement",
								value: function getDisplacement(from, to) {
									var fromEl = this.els.get(from),
										fromDom = fromEl && fromEl.domElement,
										toEl = this.els.get(to),
										toDom = toEl && toEl.domElement;
									if (!fromDom || !toDom) return null;
									var fromP = getDomElPos(fromDom),
										toP = getDomElPos(toDom);
									return [toP[0] - fromP[0], toP[1] - fromP[1]];
								},
							},
							{
								key: "getTranslation",
								value: function getTranslation(from, to, nudge) {
									var disp = this.getDisplacement(from, to);
									if (null === disp) return " ";
									switch (nudge) {
										case "up":
											disp[1] -= 50;
											break;
										case "down":
											disp[1] += 50;
											break;
										case "left":
											disp[0] -= 50;
											break;
										case "right":
											disp[0] += 50;
									}
									return "translate(" + disp[0] + "px, " + disp[1] + "px) ";
								},
							},
						]),
						AnimControl
					);
				})(),
				AnimContext = react__WEBPACK_IMPORTED_MODULE_11__.createContext(null);
		},
		"./src/view/util/Colors.ts": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				Jj: () => colorVariants,
				ZQ: () => getForeColor,
				Hk: () => getIntermColor,
				Yq: () => getNumberColor,
				Xq: () => getOpButtonColor,
			});
			__webpack_require__("./node_modules/core-js/modules/es.array.slice.js");
			var colorVariants = {
				main: {
					$$color: "$colors$main",
					$$foreColor: "$colors$white",
					$$borderColor: "transparent",
					$$colorHover: "$colors$mainHover",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				mainLight: {
					$$color: "$colors$mainLight",
					$$foreColor: "$colors$white",
					$$borderColor: "transparent",
					$$colorHover: "$colors$mainLightHover",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				mainInverted: {
					$$color: "$colors$white",
					$$foreColor: "$colors$main",
					$$borderColor: "transparent",
					$$colorHover: "$colors$mainHover",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				white: {
					$$color: "$colors$white",
					$$foreColor: "$colors$main",
					$$borderColor: "$colors$main",
					$$colorHover: "$colors$whiteHover",
					$$foreColorHover: "$colors$mainHover",
					$$borderColorHover: "$colors$mainHover",
				},
				start: {
					$$color: "$colors$start",
					$$foreColor: "$colors$white",
					$$borderColor: "transparent",
					$$colorHover: "$colors$startHover",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				disabled: {
					$$color: "$colors$disabled",
					$$foreColor: "$colors$white",
					$$borderColor: "transparent",
					$$colorHover: "$colors$disabledHover",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				interm1: {
					$$color: "$colors$interm1",
					$$foreColor: "$colors$white",
					$$borderColor: "transparent",
					$$colorHover: "$colors$interm1Hover",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				interm2: {
					$$color: "$colors$interm2",
					$$foreColor: "$colors$white",
					$$borderColor: "transparent",
					$$colorHover: "$colors$interm2Hover",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				done: {
					$$color: "$colors$done",
					$$foreColor: "$colors$white",
					$$borderColor: "transparent",
					$$colorHover: "$colors$doneHover",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				tertiary: {
					$$color: "$colors$gray",
					$$foreColor: "$colors$gray",
					$$borderColor: "transparent",
					$$colorHover: "$colors$gray",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
				example: {
					$$color: "$colors$cyan",
					$$foreColor: "$colors$white",
					$$borderColor: "transparent",
					$$colorHover: "$colors$babyBlue",
					$$foreColorHover: "$colors$whiteHover",
					$$borderColorHover: "transparent",
				},
			};
			function getForeColor(color) {
				return colorVariants[(color = color || "main")].$$foreColor.slice(8);
			}
			function getIntermColor(index) {
				return "interm1";
			}
			function getNumberColor(el) {
				return "start" === el.type ? "start" : (el.index, "interm1");
			}
			function getOpButtonColor(op) {
				return "(" === op || ")" === op
					? "main"
					: "=" === op
					? "mainLight"
					: "main";
			}
		},
		"./src/view/util/Constants.tsx": (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__.d(__webpack_exports__, {
				hd: () => LAUNCH_DATE,
				UR: () => MAX_GAME_WIDTH,
				ms: () => TITLEBAR_HEIGHT,
				DR: () => COMPACT_LAYOUT_BREAKPOINT,
				D9: () => COMPACT_LINKS_BREAKPOINT,
				S$: () => SMALL_KEYBOARD_BREAKPOINT,
				Et: () => MEDIUM_KEYBOARD_BREAKPOINT,
				r3: () => SHORT_TARGET_DISPLAY_HEIGHT,
				HS: () => SHORT_TARGET_DISPLAY_BREAKPOINT,
				kA: () => TARGET_DISPLAY_HEIGHT,
				$S: () => TALL_TARGET_DISPLAY_HEIGHT,
				H0: () => NB_DASH,
				Kh: () => DAY_IN_MS,
				Yi: () => MONTH_NAMES,
				qe: () => SHORT_MONTH_NAMES,
				NJ: () => SHORT_WEEKDAY_NAMES,
				Tj: () => PADDING_UNIT,
				IB: () => HALF_PADDING_UNIT,
				a2: () => QUARTER_PADDING_UNIT,
			});
			__webpack_require__(
				"./node_modules/core-js/modules/es.date.to-string.js"
			);
			var LAUNCH_DATE = new Date(Date.parse("19 Sep 2022 00:00:00 PST")),
				MAX_GAME_WIDTH = 450,
				TITLEBAR_HEIGHT = 57,
				COMPACT_LAYOUT_BREAKPOINT = 750,
				COMPACT_LINKS_BREAKPOINT = 720,
				SMALL_KEYBOARD_BREAKPOINT = 630,
				MEDIUM_KEYBOARD_BREAKPOINT = 655,
				SHORT_TARGET_DISPLAY_HEIGHT = 105,
				SHORT_TARGET_DISPLAY_BREAKPOINT = 600,
				TARGET_DISPLAY_HEIGHT = 170,
				TALL_TARGET_DISPLAY_HEIGHT = 195,
				NB_DASH = "‑",
				DAY_IN_MS = 864e5,
				MONTH_NAMES = [
					"January",
					"Febuary",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				SHORT_MONTH_NAMES = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				],
				SHORT_WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				PADDING_UNIT = 20,
				HALF_PADDING_UNIT = PADDING_UNIT / 2,
				QUARTER_PADDING_UNIT = PADDING_UNIT / 4;
		},
		"./storybook-init-framework-entry.js": (
			__unused_webpack_module,
			__unused_webpack___webpack_exports__,
			__webpack_require__
		) => {
			"use strict";
			__webpack_require__(
				"./node_modules/@storybook/react/dist/esm/client/index.js"
			);
		},
		"./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$":
			(module, __unused_webpack_exports, __webpack_require__) => {
				var map = {
					"./view/AnimationPOC.stories.tsx":
						"./src/view/AnimationPOC.stories.tsx",
					"./view/ButtonGrid.stories.tsx": "./src/view/ButtonGrid.stories.tsx",
					"./view/ExpressionDisplay.stories.tsx":
						"./src/view/ExpressionDisplay.stories.tsx",
					"./view/IconButton.stories.tsx": "./src/view/IconButton.stories.tsx",
					"./view/Main.stories.tsx": "./src/view/Main.stories.tsx",
					"./view/NoticeDisplay.stories.tsx":
						"./src/view/NoticeDisplay.stories.tsx",
					"./view/RationalDisplay.stories.tsx":
						"./src/view/RationalDisplay.stories.tsx",
					"./view/TargetDisplay.stories.tsx":
						"./src/view/TargetDisplay.stories.tsx",
				};
				function webpackContext(req) {
					var id = webpackContextResolve(req);
					return __webpack_require__(id);
				}
				function webpackContextResolve(req) {
					if (!__webpack_require__.o(map, req)) {
						var e = new Error("Cannot find module '" + req + "'");
						throw ((e.code = "MODULE_NOT_FOUND"), e);
					}
					return map[req];
				}
				(webpackContext.keys = function webpackContextKeys() {
					return Object.keys(map);
				}),
					(webpackContext.resolve = webpackContextResolve),
					(module.exports = webpackContext),
					(webpackContext.id =
						"./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$");
			},
		"./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$":
			(module) => {
				function webpackEmptyContext(req) {
					var e = new Error("Cannot find module '" + req + "'");
					throw ((e.code = "MODULE_NOT_FOUND"), e);
				}
				(webpackEmptyContext.keys = () => []),
					(webpackEmptyContext.resolve = webpackEmptyContext),
					(webpackEmptyContext.id =
						"./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$"),
					(module.exports = webpackEmptyContext);
			},
		"?4f7e": () => {},
	},
	(__webpack_require__) => {
		var __webpack_exec__ = (moduleId) =>
			__webpack_require__((__webpack_require__.s = moduleId));
		__webpack_require__.O(
			0,
			[603],
			() => (
				__webpack_exec__(
					"./node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/core-client/dist/esm/globals/globals.js"
				),
				__webpack_exec__("./storybook-init-framework-entry.js"),
				__webpack_exec__(
					"./node_modules/@storybook/addon-essentials/node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/addon-essentials/node_modules/@storybook/addon-docs/dist/esm/frameworks/react/config.js-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/addon-links/dist/esm/preset/addDecorator.js-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/addon-actions/dist/esm/preset/addDecorator.js-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/addon-actions/dist/esm/preset/addArgs.js-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/addon-backgrounds/dist/esm/preset/addDecorator.js-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/addon-backgrounds/dist/esm/preset/addParameter.js-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/addon-measure/dist/esm/preset/addDecorator.js-generated-config-entry.js"
				),
				__webpack_exec__(
					"./node_modules/@storybook/addon-outline/dist/esm/preset/addDecorator.js-generated-config-entry.js"
				),
				__webpack_exec__("./.storybook/preview.js-generated-config-entry.js"),
				__webpack_exec__("./generated-stories-entry.js")
			)
		);
		__webpack_require__.O();
	},
]);
