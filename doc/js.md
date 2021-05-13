# JavaScript 编码规范

  1. [类型](#类型)
  1. [赋值](#赋值)
  1. [对象](#对象)
  1. [数组](#数组)
  1. [解构赋值](#解构赋值)
  1. [字符串](#字符串)
  1. [函数](#函数)
  1. [箭头函数](#箭头函数)
  1. [类和构造函数](#类和构造函数)
  1. [模块](#模块)
  1. [迭代器和生成器](#迭代器和生成器)
  1. [属性](#属性)
  1. [变量](#变量)
  1. [提升](#提升)
  1. [比较运算符](#比较运算符)
  1. [语句块](#语句块)
  1. [控制语句](#控制语句)
  1. [注释](#注释)
  1. [空格](#空格)
  1. [逗号](#逗号)
  1. [分号](#分号)
  1. [类型转换](#类型转换)
  1. [命名规则](#命名规则)
  1. [访问器](#访问器)
  1. [事件](#事件)
  1. [测试](#测试)

## 类型

  <a name="1.1"></a>
  <a name="types--primitives"></a>
  - [1.1](#types--primitives) 基本类型: 你可以直接获取到基本类型的值
    + `string`
    + `number`
    + `boolean`
    + `null`
    + `undefined`
    + `symbol`

    ```javascript
    const foo = 1;
    let bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```
    + Symbols 不能被正确的polyfill。 所以在不能原生支持symbol类型的环境[浏览器]中，不应该使用 symbol 类型。

  <a name="1.2"></a>
  <a name="types--complex"></a>
  - [1.2](#types--complex)  复杂类型: 复杂类型赋值是获取到他的引用的值。 相当于传引用
    + `object`
    + `array`
    + `function`

    ```javascript
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[回到顶部](#javascript-编码规范)**

## 赋值

  <a name="2.1"></a>
  <a name="references--prefer-const"></a>
  - [2.1](#references--prefer-const) 所有的赋值都用`const`，避免使用`var`. eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html)

    > Why? 因为这个确保你不会改变你的初始值，重复引用会导致bug和代码难以理解

    ```javascript
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

  <a name="2.2"></a>
  <a name="references--disallow-var"></a>
  - [2.2](#references--disallow-var) 如果你一定要对参数重新赋值，那就用`let`，而不是`var`. eslint: [`no-var`](http://eslint.org/docs/rules/no-var.html)

    > Why? 因为`let`是块级作用域，而`var`是函数级作用域

    ```javascript
    // bad
    var count = 1;
    if (true) {
      count += 1;
    }

    // good, use the let.
    let count = 1;
    if (true) {
      count += 1;
    }
    ```

  <a name="2.3"></a>
  <a name="references--block-scope"></a>
  - [2.3](#references--block-scope) 注意： `let`、`const`都是块级作用域

    ```javascript
    // const 和 let 都只存在于它定义的那个块级作用域
    {
      let a = 1;
      const b = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    ```

**[回到顶部](#javascript-编码规范)**

## 对象

  <a name="3.1"></a>
  <a name="objects--no-new"></a>
  - [3.1](#objects--no-new) 使用字面值创建对象. eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html)

    ```javascript
    // bad
    const item = new Object();

    // good
    const item = {};
    ```

  <a name="3.2"></a>
  <a name="es6-computed-properties"></a>
  - [3.2](#es6-computed-properties) 当创建一个带有动态属性名的对象时，用计算后属性名

    > Why? 这可以使你将定义的所有属性放在对象的一个地方.

    ```javascript

    function getKey(k) {
      return `a key named ${k}`;
    }

    // bad
    const obj = {
      id: 5,
      name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good getKey('enabled')是动态属性名
    const obj = {
      id: 5,
      name: 'San Francisco',
      [getKey('enabled')]: true,
    };
    ```

  <a name="3.3"></a>
  <a name="es6-object-shorthand"></a>
  - [3.3](#es6-object-shorthand) 用对象方法简写. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

    ```javascript
    // bad
    const atom = {
      value: 1,

      addValue: function (value) {
        return atom.value + value;
      },
    };

    // good
    const atom = {
      value: 1,

      // 对象的方法
      addValue(value) {
        return atom.value + value;
      },
    };
    ```

  <a name="3.4"></a>
  <a name="es6-object-concise"></a>
  - [3.4](#es6-object-concise) 用属性值缩写. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

    > Why? 这样写的更少且更可读

    ```javascript
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
    };
    ```

  <a name="3.5"></a>
  <a name="objects--grouped-shorthand"></a>
  - [3.5](#objects--grouped-shorthand) 将你的所有缩写放在对象声明的开始.

    > Why? 这样也是为了更方便的知道有哪些属性用了缩写.

    ```javascript
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };
    ```

  <a name="3.6"></a>
  <a name="objects--quoted-props"></a>
  - [3.6](#objects--quoted-props) 只对那些无效的标示使用引号 `''`. eslint: [`quote-props`](http://eslint.org/docs/rules/quote-props.html)

    > Why? 通常我们认为这种方式主观上易读。他优化了代码高亮，并且页更容易被许多JS引擎压缩。

    ```javascript
    // bad
    const bad = {
      'foo': 3,
      'bar': 4,
      'data-blah': 5,
    };

    // good
    const good = {
      foo: 3,
      bar: 4,
      'data-blah': 5,
    };
    ```

  <a name="3.7"></a>
  <a name="objects--prototype-builtins"></a>
  - [3.7](#objects--prototype-builtins) 不要直接调用`Object.prototype`上的方法，如`hasOwnProperty`, `propertyIsEnumerable`, `isPrototypeOf`。

    > Why? 在一些有问题的对象上， 这些方法可能会被屏蔽掉 - 如：`{ hasOwnProperty: false }` - 或这是一个空对象`Object.create(null)`

    ```javascript
    // bad
    console.log(object.hasOwnProperty(key));

    // good
    console.log(Object.prototype.hasOwnProperty.call(object, key));

    // best
    const has = Object.prototype.hasOwnProperty; // 在模块作用内做一次缓存
    /* or */
    import has from 'has'; // https://www.npmjs.com/package/has
    // ...
    console.log(has.call(object, key));
    ```

  <a name="3.8"></a>
  <a name="objects--rest-spread"></a>
  - [3.8](#objects--rest-spread) 对象浅拷贝时，更推荐使用扩展运算符[就是`...`运算符]，而不是[`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)。获取对象指定的几个属性时，用对象的rest解构运算符[也是`...`运算符]更好。
    + 这一段不太好翻译出来， 大家看下面的例子就懂了。^.^

  ```javascript
  // very bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
  delete copy.a; // so does this

  // bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

  // good es6扩展运算符 ...
  const original = { a: 1, b: 2 };
  // 浅拷贝
  const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

  // rest 赋值运算符
  const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

**[回到顶部](#javascript-编码规范)**

## 数组

  <a name="4.1"></a>
  <a name="arrays--literals"></a>
  - [4.1](#arrays--literals) 用字面量赋值。 eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

    ```javascript
    // bad
    const items = new Array();

    // good
    const items = [];
    ```

  <a name="4.2"></a>
  <a name="arrays--push"></a>
  - [4.2](#arrays--push) 用[Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 代替直接向数组中添加一个值。

    ```javascript
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  <a name="4.3"></a>
  <a name="es6-array-spreads"></a>
  - [4.3](#es6-array-spreads) 用扩展运算符做数组浅拷贝，类似上面的对象浅拷贝

    ```javascript
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i += 1) {
      itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];
    ```

  <a name="4.4"></a>
  <a name="arrays--from-iterable"></a>
  - [4.4](#arrays--from-iterable) 用 `...` 运算符而不是[`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)来将一个可迭代的对象转换成数组。

    ```javascript
    const foo = document.querySelectorAll('.foo');

    // good
    const nodes = Array.from(foo);

    // best
    const nodes = [...foo];
    ```

  <a name="4.5"></a>
  <a name="arrays--from-array-like"></a>
  - [4.5](#arrays--from-array-like) 用 [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 去将一个类数组对象转成一个数组。

    ```javascript
    const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

    // bad
    const arr = Array.prototype.slice.call(arrLike);

    // good
    const arr = Array.from(arrLike);
    ```

  <a name="4.6"></a>
  <a name="arrays--mapping"></a>
  - [4.6](#arrays--mapping) 用 [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 而不是 `...` 运算符去做map遍历。 因为这样可以避免创建一个临时数组。

    ```javascript
    // bad
    const baz = [...foo].map(bar);

    // good
    const baz = Array.from(foo, bar);
    ```

  <a name="4.7"></a>
  <a name="arrays--callback-return"></a>
  - [4.7](#arrays--callback-return) 在数组方法的回调函数中使用 return 语句。 如果函数体由一条返回一个表达式的语句组成， 并且这个表达式没有副作用， 这个时候可以忽略return，详见 [8.2](#arrows--implicit-return). eslint: [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return)

    ```javascript
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });

    // good 函数只有一个语句
    [1, 2, 3].map(x => x + 1);

    // bad - 没有返回值， 因为在第一次迭代后acc 就变成undefined了
    [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
      const flatten = acc.concat(item);
      acc[index] = flatten;
    });

    // good
    [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
      const flatten = acc.concat(item);
      acc[index] = flatten;
      return flatten;
    });

    // bad
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      } else {
        return false;
      }
    });

    // good
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      }

      return false;
    });
    ```

  <a name="4.8"></a>
  <a name="arrays--bracket-newline"></a>
  - [4.8](#arrays--bracket-newline) 如果一个数组有很多行，在数组的 `[` 后和 `]` 前断行。 请看下面示例

    ```javascript
    // bad
    const arr = [
      [0, 1], [2, 3], [4, 5],
    ];

    const objectInArray = [{
      id: 1,
    }, {
      id: 2,
    }];

    const numberInArray = [
      1, 2,
    ];

    // good
    const arr = [[0, 1], [2, 3], [4, 5]];

    const objectInArray = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];

    const numberInArray = [
      1,
      2,
    ];
    ```

**[回到顶部](#javascript-编码规范)**

## 解构赋值

  <a name="5.1"></a>
  <a name="destructuring--object"></a>
  - [5.1](#destructuring--object) 用对象的解构赋值来获取和使用对象某个或多个属性值。 eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

    > Why? 解构保存了这些属性的临时值/引用

    ```javascript
    // bad
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
    ```

  <a name="5.2"></a>
  <a name="destructuring--array"></a>
  - [5.2](#destructuring--array) 用数组解构.

    ```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

  <a name="5.3"></a>
  <a name="destructuring--object-over-array"></a>
  - [5.3](#destructuring--object-over-array) 多个返回值用对象的解构，而不是数据解构。

    > Why? 你可以在后期添加新的属性或者变换变量的顺序而不会打破原有的调用

    ```javascript
    // bad
    function processInput(input) {
      // 然后就是见证奇迹的时刻
      return [left, right, top, bottom];
    }

    // 调用者需要想一想返回值的顺序
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
      // oops， 奇迹又发生了
      return { left, right, top, bottom };
    }

    // 调用者只需要选择他想用的值就好了
    const { left, top } = processInput(input);
    ```


**[回到顶部](#javascript-编码规范)**

## 字符串

  <a name="6.1"></a>
  <a name="strings--quotes"></a>
  - [6.1](#strings--quotes) 对string用单引号 `''` 。 eslint: [`quotes`](https://eslint.org/docs/rules/quotes.html)

    ```javascript
    // bad
    const name = "Capt. Janeway";

    // bad - 样例应该包含插入文字或换行
    const name = `Capt. Janeway`;

    // good
    const name = 'Capt. Janeway';
    ```

  <a name="6.2"></a>
  <a name="strings--line-length"></a>
  - [6.2](#strings--line-length) 超过100个字符的字符串不应该用string串联成多行。
    > Why? 被折断的字符串工作起来是糟糕的而且使得代码更不易被搜索。

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    ```

  <a name="6.3"></a>
  <a name="es6-template-literals"></a>
  - [6.3](#es6-template-literals) 用字符串模板而不是字符串拼接来组织可编程字符串。 eslint: [`prefer-template`](https://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](https://eslint.org/docs/rules/template-curly-spacing)

    > Why? 模板字符串更具可读性、语法简洁、字符串插入参数。

    ```javascript
    // bad
    function sayHi(name) {
      return 'How are you, ' + name + '?';
    }

    // bad
    function sayHi(name) {
      return ['How are you, ', name, '?'].join();
    }

    // bad
    function sayHi(name) {
      return `How are you, ${ name }?`;
    }

    // good
    function sayHi(name) {
      return `How are you, ${name}?`;
    }
    ```

  <a name="6.4"></a>
  <a name="strings--eval"></a>
  - [6.4](#strings--eval) 永远不要在字符串中用`eval()`，他就是潘多拉盒子。 eslint: [`no-eval`](https://eslint.org/docs/rules/no-eval)

  <a name="6.5"></a>
  <a name="strings--escaping"></a>
  - [6.5](#strings--escaping) 不要使用不必要的转义字符。eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)

    > Why? 反斜线可读性差，所以他们只在必须使用时才出现哦

    ```javascript
    // bad
    const foo = '\'this\' \i\s \"quoted\"';

    // good
    const foo = '\'this\' is "quoted"';

    //best
    const foo = `my name is '${name}'`;
    ```

**[回到顶部](#javascript-编码规范)**


## 函数

  <a name="7.2"></a>
  <a name="functions--iife"></a>
  - [7.2](#functions--iife) 把立即执行函数包裹在圆括号里。 eslint: [`wrap-iife`](http://eslint.org/docs/rules/wrap-iife.html)

    > Why? immediately invoked function expression = IIFE
    > Why? 一个立即调用的函数表达式是一个单元 - 把它和他的调用者（圆括号）包裹起来，在括号中可以清晰的地表达这些。
    > Why? 注意：在模块化世界里，你几乎用不着 IIFE

    ```javascript
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());
    ```

  <a name="7.3"></a>
  <a name="functions--in-blocks"></a>
  - [7.3](#functions--in-blocks) 不要在非函数块（if、while等等）内声明函数。把这个函数分配给一个变量。浏览器会允许你这样做，但浏览器解析方式不同，这是一个坏消息。【详见`no-loop-func`】 eslint: [`no-loop-func`](http://eslint.org/docs/rules/no-loop-func.html)

  <a name="7.4"></a>
  <a name="functions--note-on-blocks"></a>
  - [7.4](#functions--note-on-blocks) **Note:** 在ECMA-262中 [块 `block`] 的定义是： 一系列的语句； 但是函数声明不是一个语句。 函数表达式是一个语句。

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.');
      };
    }
    ```

  <a name="7.5"></a>
  <a name="functions--arguments-shadow"></a>
  - [7.5](#functions--arguments-shadow) 不要用`arguments`命名参数。他的优先级高于每个函数作用域自带的 `arguments` 对象， 这会导致函数自带的 `arguments` 值被覆盖

    ```javascript
    // bad
    function foo(name, options, arguments) {
      // ...
    }

    // good
    function foo(name, options, args) {
      // ...
    }
    ```

  <a name="7.6"></a>
  <a name="es6-rest"></a>
  - [7.6](#es6-rest) 不要使用`arguments`，用rest语法`...`代替。 eslint: [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params)

    > Why? `...`明确你想用那个参数。而且rest参数是真数组，而不是类似数组的`arguments`

    ```javascript
    // bad
    function concatenateAll() {
      const args = Array.prototype.slice.call(arguments);
      return args.join('');
    }

    // good
    function concatenateAll(...args) {
      return args.join('');
    }
    ```

  <a name="7.7"></a>
  <a name="es6-default-parameters"></a>
  - [7.7](#es6-default-parameters) 用默认参数语法而不是在函数里对参数重新赋值。

    ```javascript
    // really bad
    function handleThings(opts) {
      // 不， 我们不该改arguments
      // 第二： 如果 opts 的值为 false, 它会被赋值为 {}
      // 虽然你想这么写， 但是这个会带来一些细微的bug
      opts = opts || {};
      // ...
    }

    // still bad
    function handleThings(opts) {
      if (opts === void 0) {
        opts = {};
      }
      // ...
    }

    // good
    function handleThings(opts = {}) {
      // ...
    }
    ```

  <a name="7.8"></a>
  <a name="functions--default-side-effects"></a>
  - [7.8](#functions--default-side-effects) 默认参数避免副作用

    > Why? 他会令人迷惑不解， 比如下面这个， a到底等于几， 这个需要想一下。

    ```javascript
    let b = 1;
    // bad
    function count(a = b++) {
      console.log(a);
    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3
    ```

  <a name="7.9"></a>
  <a name="functions--defaults-last"></a>
  - [7.9](#functions--defaults-last) 把默认参数赋值放在最后

    ```javascript
    // bad
    function handleThings(opts = {}, name) {
      // ...
    }

    // good
    function handleThings(name, opts = {}) {
      // ...
    }
    ```

  <a name="7.10"></a>
  <a name="functions--constructor"></a>
  - [7.10](#functions--constructor) 不要用函数构造器创建函数。 eslint: [`no-new-func`](http://eslint.org/docs/rules/no-new-func)

    > Why? 以这种方式创建函数将类似于字符串 eval()，这会打开漏洞。

    ```javascript
    // bad
    const add = new Function('a', 'b', 'return a + b');

    // still bad
    const subtract = Function('a', 'b', 'return a - b');
    ```

  <a name="7.11"></a>
  <a name="functions--signature-spacing"></a>
  - [7.11](#functions--signature-spacing) 函数签名部分要有空格。eslint: [`space-before-function-paren`](http://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks)

    > Why? 统一性好，而且在你添加/删除一个名字的时候不需要添加/删除空格

    ```javascript
    // bad
    const f = function(){};
    const g = function (){};
    const h = function() {};

    // good
    const x = function () {};
    const y = function a() {};
    ```

  <a name="7.12"></a>
  <a name="functions--spread-vs-apply"></a>
  - [7.12](#functions--spread-vs-apply) 用`spread`操作符`...`去调用多变的函数更好。 eslint: [`prefer-spread`](http://eslint.org/docs/rules/prefer-spread)

    > Why? 这样更清晰，你不必提供上下文，而且你不能轻易地用`apply`来组成`new`

    ```javascript
    // bad
    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);

    // good
    const x = [1, 2, 3, 4, 5];
    console.log(...x);

    // bad
    new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

    // good
    new Date(...[2016, 8, 5]);
    ```


**[回到顶部](#javascript-编码规范)**

## 箭头函数

  <a name="8.1"></a>
  <a name="arrows--use-them"></a>
  - [8.1](#arrows--use-them) 当你一定要用函数表达式（在回调函数里）的时候就用箭头表达式吧。 eslint: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing.html)

    > Why? 他创建了一个`this`的当前执行上下文的函数的版本，这通常就是你想要的；而且箭头函数是更简洁的语法

    > Why? 什么时候不用箭头函数： 如果你有一个相当复杂的函数，你可能会把这个逻辑移出到他自己的函数声明里。

    ```javascript
    // bad
    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```

  <a name="8.2"></a>
  <a name="arrows--implicit-return"></a>
  - [8.2](#arrows--implicit-return) 如果函数体由一个没有副作用的[表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)语句组成，删除大括号和return。否则，继续用大括号和 `return` 语句。 eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style.html)

    > Why? 语法糖，当多个函数链在一起的时候好读

    ```javascript
    // bad
    [1, 2, 3].map(number => {
      const nextNumber = number + 1;
      `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map(number => `A string containing the ${number}.`);

    // good
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number, index) => ({
      [index]: number
    }));

    // 表达式有副作用就不要用隐式return
    function foo(callback) {
      const val = callback();
      if (val === true) {
        // Do something if callback returns true
      }
    }

    let bool = false;

    // bad
    // 这种情况会return bool = true, 不好
    foo(() => bool = true);

    // good
    foo(() => {
      bool = true;
    });
    ```

  <a name="8.3"></a>
  <a name="arrows--paren-wrap"></a>
  - [8.3](#arrows--paren-wrap) 万一表达式涉及多行，把他包裹在圆括号里更可读。

    > Why? 这样清晰的显示函数的开始和结束

    ```js
    // bad
    ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod
      )
    );

    // good
    ['get', 'post', 'put'].map(httpMethod => (
      Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod
      )
    ));
    ```

  <a name="8.4"></a>
  <a name="arrows--one-arg-parens"></a>
  - [8.4](#arrows--one-arg-parens) 如果你的函数只有一个参数，就删除圆括号。否则，参数总是放在圆括号里。 注意： 一直用圆括号也是没问题，只需要配置 [“always” option](https://eslint.org/docs/rules/arrow-parens#always) for eslint. eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html)

    > Why? 这样少一些混乱， 其实没啥语法上的讲究，就保持一个风格。

    ```js
    // bad
    [1, 2, 3].map((x) => x * x);

    // good
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].map(number => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));
    ```

  <a name="8.5"></a>
  <a name="arrows--confusing"></a>
  - [8.5](#arrows--confusing) 避免箭头函数(`=>`)和比较操作符（`<=, >=`）混淆. eslint: [`no-confusing-arrow`](http://eslint.org/docs/rules/no-confusing-arrow)

    ```js
    // bad
    const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

    // good
    const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

    // good
    const itemHeight = (item) => {
      const { height, largeSize, smallSize } = item;
      return height > 256 ? largeSize : smallSize;
    };
    ```

  <a name="8.6"></a>
  <a name="whitespace--implicit-arrow-linebreak"></a>
  - [8.6](#whitespace--implicit-arrow-linebreak) 在隐式return中强制约束函数体的位置， 就写在箭头后面。 eslint: [`implicit-arrow-linebreak`](https://eslint.org/docs/rules/implicit-arrow-linebreak)

    ```javascript
    // bad
    (foo) =>
      bar;

    (foo) =>
      (bar);

    // good
    (foo) => bar;
    (foo) => (bar);
    (foo) => (
       bar
    )
    ```

**[回到顶部](#javascript-编码规范)**


## 类和构造函数

  <a name="9.1"></a>
  <a name="constructors--use-class"></a>
  - [9.1](#constructors--use-class) 常用`class`，避免直接操作`prototype`

    > Why? `class`语法更简洁更易理解

    ```javascript
    // bad
    function Queue(contents = []) {
      this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    };


    // good
    class Queue {
      constructor(contents = []) {
        this.queue = [...contents];
      }
      pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
      }
    }
    ```

  <a name="9.2"></a>
  <a name="constructors--extends"></a>
  - [9.2](#constructors--extends) 用`extends`实现继承

    > Why? 它是一种内置的方法来继承原型功能而不打破`instanceof`

    ```javascript
    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
      Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
      return this._queue[0];
    }

    // good
    class PeekableQueue extends Queue {
      peek() {
        return this._queue[0];
      }
    }
    ```

  <a name="9.3"></a>
  <a name="constructors--chaining"></a>
  - [9.3](#constructors--chaining) 方法可以返回`this`来实现方法链

    ```javascript
    // bad
    Jedi.prototype.jump = function () {
      this.jumping = true;
      return true;
    };

    Jedi.prototype.setHeight = function (height) {
      this.height = height;
    };

    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    class Jedi {
      jump() {
        this.jumping = true;
        return this;
      }

      setHeight(height) {
        this.height = height;
        return this;
      }
    }

    const luke = new Jedi();

    luke.jump()
      .setHeight(20);
    ```


  <a name="9.4"></a>
  <a name="constructors--tostring"></a>
  - [9.4](#constructors--tostring) 写一个定制的toString()方法是可以的，只要保证它是可以正常工作且没有副作用的

    ```javascript
    class Jedi {
      constructor(options = {}) {
        this.name = options.name || 'no name';
      }

      getName() {
        return this.name;
      }

      toString() {
        return `Jedi - ${this.getName()}`;
      }
    }
    ```

  <a name="9.5"></a>
  <a name="constructors--no-useless"></a>
  - [9.5](#constructors--no-useless) 如果没有具体说明，类有默认的构造方法。一个空的构造函数或只是代表父类的构造函数是不需要写的。 eslint: [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor)

    ```javascript
    // bad
    class Jedi {
      constructor() {}

      getName() {
        return this.name;
      }
    }

    // bad
    class Rey extends Jedi {
      // 这种构造函数是不需要写的
      constructor(...args) {
        super(...args);
      }
    }

    // good
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
        this.name = 'Rey';
      }
    }
    ```

  <a name="9.6"></a>
  <a name="classes--no-duplicate-members"></a>
  - [9.6](#classes--no-duplicate-members) 避免重复类成员。 eslint: [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)

    > Why? 重复类成员会默默的执行最后一个 —— 重复本身也是一个bug

    ```javascript
    // bad
    class Foo {
      bar() { return 1; }
      bar() { return 2; }
    }

    // good
    class Foo {
      bar() { return 1; }
    }

    // good
    class Foo {
      bar() { return 2; }
    }
    ```

**[回到顶部](#javascript-编码规范)**

## 模块

  <a name="10.1"></a>
  <a name="modules--use-them"></a>
  - [10.1](#modules--use-them) 用(`import`/`export`) 模块而不是无标准的模块系统。你可以随时转到你喜欢的模块系统。

    > Why? 模块化是未来，让我们现在就开启未来吧。

    ```javascript
    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;

    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;

    // best
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

  <a name="10.2"></a>
  <a name="modules--no-wildcard"></a>
  - [10.2](#modules--no-wildcard) 不要用import通配符， 就是 `*` 这种方式

    > Why? 这确保你有单个默认的导出

    ```javascript
    // bad
    import * as AirbnbStyleGuide from './AirbnbStyleGuide';

    // good
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    ```

  <a name="10.3"></a>
  <a name="modules--no-export-from-import"></a>
  - [10.3](#modules--no-export-from-import) 不要直接从import中直接export

    > Why? 虽然一行是简洁的，有一个明确的方式进口和一个明确的出口方式来保证一致性。

    ```javascript
    // bad
    // filename es6.js
    export { es6 as default } from './AirbnbStyleGuide';

    // good
    // filename es6.js
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

  <a name="10.4"></a>
  <a name="modules--no-duplicate-imports"></a>
  - [10.4](#modules--no-duplicate-imports) 一个路径只 import 一次。
 eslint: [`no-duplicate-imports`](http://eslint.org/docs/rules/no-duplicate-imports)
    > Why? 从同一个路径下import多行会使代码难以维护

    ```javascript
    // bad
    import foo from 'foo';
    // … some other imports … //
    import { named1, named2 } from 'foo';

    // good
    import foo, { named1, named2 } from 'foo';

    // good
    import foo, {
      named1,
      named2,
    } from 'foo';
    ```

  <a name="10.5"></a>
  <a name="modules--no-mutable-exports"></a>
  - [10.5](#modules--no-mutable-exports) 不要输出可变的变量
 eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)
    > Why? 变化通常都是需要避免，特别是当你要输出可变的绑定。虽然在某些场景下可能需要这种技术，但总的来说应该导出常量。

    ```javascript
    // bad
    let foo = 3;
    export { foo }

    // good
    const foo = 3;
    export { foo }
    ```

  <a name="10.6"></a>
  <a name="modules--prefer-default-export"></a>
  - [10.6](#modules--prefer-default-export) 在一个单一导出模块里，用 `export default` 更好。
 eslint: [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

    > Why? 鼓励使用更多文件，每个文件只做一件事情并导出，这样可读性和可维护性更好。

    ```javascript
    // bad
    export function foo() {}

    // good
    export default function foo() {}
    ```

  <a name="10.7"></a>
  <a name="modules--imports-first"></a>
  - [10.7](#modules--imports-first) `import` 放在其他所有语句之前。
 eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)
    > Why? 让`import`放在最前面防止意外行为。

    ```javascript
    // bad
    import foo from 'foo';
    foo.init();

    import bar from 'bar';

    // good
    import foo from 'foo';
    import bar from 'bar';

    foo.init();
    ```

  <a name="10.8"></a>
  - [10.8](#108) 当 import 引入的变量过多，一行放不下，这时要像多行数组一样进行换行。

    > Why?  花括号与样式指南中每个其他花括号块遵循相同的缩进规则，逗号也是。

    ```javascript
    // good
    import {
      longNameA,
      longNameB,
      longNameC,
      longNameD,
      longNameE,
    } from 'path';
    ```

  <a name="10.9"></a>
  <a name="modules--no-webpack-loader-syntax"></a>
  - [10.9](#modules--no-webpack-loader-syntax) 在import语句里不允许Webpack loader语法
 eslint: [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)
    > Why? 一旦用Webpack语法在import里会把代码耦合到模块绑定器。最好是在`webpack.config.js`里写webpack loader语法

    ```javascript
    // bad
    import fooSass from 'css!sass!foo.scss';
    import barCss from 'style!css!bar.css';

    // good
    import fooSass from 'foo.scss';
    import barCss from 'bar.css';
    ```

**[回到顶部](#javascript-编码规范)**

## 迭代器和生成器
  <a name="11.1"></a>
  <a name="generators--spacing"></a>
  - [11.1](#generators--spacing) 如果你要用生成器，请确保它们的函数签名空格是得当的。 eslint: [`generator-star-spacing`](http://eslint.org/docs/rules/generator-star-spacing)

    > Why? `function` 和 `*` 是同一概念关键字 - `*`不是`function`的修饰符，`function*`是一个和`function`不一样的独特结构

    ```js
    // bad
    function * foo() {
      // ...
    }

    // bad
    const bar = function * () {
      // ...
    }

    // bad
    const baz = function *() {
      // ...
    }

    // bad
    const quux = function*() {
      // ...
    }

    // bad
    function*foo() {
      // ...
    }

    // bad
    function *foo() {
      // ...
    }

    // very bad
    function
    *
    foo() {
      // ...
    }

    // very bad
    const wat = function
    *
    () {
      // ...
    }

    // good
    function* foo() {
      // ...
    }

    // good
    const foo = function* () {
      // ...
    }
    ```

**[回到顶部](#javascript-编码规范)**


## 属性

  <a name="12.1"></a>
  <a name="properties--dot"></a>
  - [12.1](#properties--dot) 访问属性时使用点符号. eslint: [`dot-notation`](http://eslint.org/docs/rules/dot-notation.html)

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;
    ```

  <a name="12.2"></a>
  <a name="properties--bracket"></a>
  - [12.2](#properties--bracket) 当获取的属性是变量时用方括号`[]`取

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    function getProp(prop) {
      return luke[prop];
    }

    const isJedi = getProp('jedi');
    ```

  <a name="12.3"></a>
  <a name="es2016-properties--exponentiation-operator"></a>
  - [12.3](#es2016-properties--exponentiation-operator) 做幂运算时用幂操作符 `**` 。 eslint: [`no-restricted-properties`](https://eslint.org/docs/rules/no-restricted-properties).

    ```javascript
    // bad
    const binary = Math.pow(2, 10);

    // good
    const binary = 2 ** 10;
    ```

**[回到顶部](#javascript-编码规范)**


## 变量

  <a name="13.1"></a>
  <a name="variables--const"></a>
  - [13.1](#variables--const)  用`const`或`let`声明变量。不这样做会导致全局变量。 我们想要避免污染全局命名空间。 eslint: [`no-undef`](http://eslint.org/docs/rules/no-undef) [`prefer-const`](http://eslint.org/docs/rules/prefer-const)

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();
    ```

  <a name="13.2"></a>
  <a name="variables--one-const"></a>
  - [13.2](#variables--one-const) 每个变量都用一个 `const` 或 `let `。 eslint: [`one-var`](http://eslint.org/docs/rules/one-var.html)

    > Why? 这种方式很容易去声明新的变量，你不用去考虑把`;`调换成`,`，或者引入一个只有标点的不同的变化。这种做法也可以是你在调试的时候单步每个声明语句，而不是一下跳过所有声明。

    ```javascript
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';
    ```

  <a name="13.3"></a>
  <a name="variables--const-let-group"></a>
  - [13.3](#variables--const-let-group) `const`放一起，`let`放一起

    > Why? 在你需要分配一个新的变量， 而这个变量依赖之前分配过的变量的时候，这种做法是有帮助的

    ```javascript
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```

  <a name="13.4"></a>
  <a name="variables--define-where-used"></a>
  - [13.4](#variables--define-where-used) 在你需要的地方声明变量，但是要放在合理的位置

    > Why? `let` 和 `const` 都是块级作用域而不是函数级作用域

    ```javascript
    // bad - unnecessary function call
    function checkName(hasName) {
      const name = getName();

      if (hasName === 'test') {
        return false;
      }

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }

    // good
    function checkName(hasName) {
      if (hasName === 'test') {
        return false;
      }

      // 在需要的时候分配
      const name = getName();

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }
    ```
  <a name="13.5"></a>
  <a name="variables--no-chain-assignment"></a>
  - [13.5](#variables--no-chain-assignment) 不要使用链接变量分配。 eslint: [`no-multi-assign`](https://eslint.org/docs/rules/no-multi-assign)

    > Why? 链接变量分配创建隐式全局变量。

    ```javascript
    // bad
    (function example() {
      // JavaScript 将这一段解释为
      // let a = ( b = ( c = 1 ) );
      // let 只对变量 a 起作用; 变量 b 和 c 都变成了全局变量
      let a = b = c = 1;
    }());

    console.log(a); // undefined
    console.log(b); // 1
    console.log(c); // 1

    // good
    (function example() {
      let a = 1;
      let b = a;
      let c = a;
    }());

    console.log(a); // undefined
    console.log(b); // undefined
    console.log(c); // undefined

    // `const` 也是如此
    ```


  <a name="13.7"></a>
  <a name="variables--linebreak"></a>
  - [13.7](#variables--linebreak) 在赋值的时候避免在 `=` 前/后换行。 如果你的赋值语句超出 [`max-len`](https://eslint.org/docs/rules/max-len.html)， 那就用小括号把这个值包起来再换行。 eslint [`operator-linebreak`](https://eslint.org/docs/rules/operator-linebreak.html).

    > Why? 在 `=` 附近换行容易混淆这个赋值语句。

    ```javascript
    // bad
    const foo =
      superLongLongLongLongLongLongLongLongFunctionName();

    // bad
    const foo
      = 'superLongLongLongLongLongLongLongLongString';

    // good
    const foo = (
      superLongLongLongLongLongLongLongLongFunctionName()
    );

    // good
    const foo = 'superLongLongLongLongLongLongLongLongString';
    ```

  <a name="13.8"></a>
  <a name="variables--no-unused-vars"></a>
  - [13.8](#variables--no-unused-vars) 不允许有未使用的变量。 eslint: [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars)

    > Why? 一个声明了但未使用的变量更像是由于重构未完成产生的错误。这种在代码中出现的变量会使阅读者迷惑。

    ```javascript
    // bad

    var some_unused_var = 42;

    // 写了没用
    var y = 10;
    y = 5;

    // 变量改了自己的值，也没有用这个变量
    var z = 0;
    z = z + 1;

    // 参数定义了但未使用
    function getX(x, y) {
        return x;
    }

    // good
    function getXPlusY(x, y) {
      return x + y;
    }

    let x = 1;
    let y = a + 2;

    alert(getXPlusY(x, y));

    // 'type' 即使没有使用也可以可以被忽略， 因为这个有一个 rest 取值的属性。
    // 这是从对象中抽取一个忽略特殊字段的对象的一种形式
    const { type, ...coords } = data;
    // 'coords' 现在就是一个没有 'type' 属性的 'data' 对象
    ```

**[回到顶部](#javascript-编码规范)**

## 提升

  <a name="14.1"></a>
  <a name="hoisting--about"></a>
  - [14.1](#hoisting--about) `var`声明会被提前到他的作用域的最前面，它分配的值还没有提前。`const` 和 `let`被赋予了新的调用概念[时效区 —— Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let)。  重要的是要知道为什么 [typeof不再安全](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).

    ```javascript
    // 我们知道这个不会工作，假设没有定义全局的notDefined
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }

    // 在你引用的地方之后声明一个变量，他会正常输出是因为变量作用域上升。
    // 注意： declaredButNotAssigned的值没有上升
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }

    // 解释器把变量声明提升到作用域最前面，
    // 可以重写成如下例子， 二者意义相同
    function example() {
      let declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }

    // 用 const， let就不一样了
    function example() {
      console.log(declaredButNotAssigned); // => throws a ReferenceError
      console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
      const declaredButNotAssigned = true;
    }
    ```

  <a name="14.2"></a>
  <a name="hoisting--anon-expressions"></a>
  - [14.2](#hoisting--anon-expressions) 匿名函数表达式和 `var` 情况相同

    ```javascript
    function example() {
      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function () {
        console.log('anonymous function expression');
      };
    }
    ```

  - 详情请见[JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) by [Ben Cherry](http://www.adequatelygood.com/).

**[回到顶部](#javascript-编码规范)**


## 比较运算符

  <a name="15.1"></a>
  <a name="comparison--eqeqeq"></a>
  - [15.1](#comparison--eqeqeq) 用 `===` 和 `!==` 而不是 `==` 和 `!=`. eslint: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)

  <a name="15.2"></a>
  <a name="comparison--if"></a>
  - [15.2](#comparison--if) 条件语句如'if'语句使用强制`ToBoolean'抽象方法来评估它们的表达式，并且始终遵循以下简单规则：

    + **Objects**   计算成 **true**
    + **Undefined** 计算成 **false**
    + **Null**      计算成 **false**
    + **Booleans**  计算成 **the value of the boolean**
    + **Numbers**
      + **+0, -0, or NaN** 计算成 **false**
      + 其他 **true**
    + **Strings**
      + `''` 计算成 **false**
      + 其他 **true**

    ```javascript
    if ([0] && []) {
      // true
      // 数组（即使是空数组）是对象，对象会计算成true
    }
    ```

  <a name="15.3"></a>
  <a name="comparison--shortcuts"></a>
  - [15.3](#comparison--shortcuts) 布尔值用缩写，而字符串和数字要明确比较对象

    ```javascript
    // bad
    if (isValid === true) {
      // ...
    }

    // good
    if (isValid) {
      // ...
    }

    // bad
    if (name) {
      // ...
    }

    // good
    if (name !== '') {
      // ...
    }

    // bad
    if (collection.length) {
      // ...
    }

    // good
    if (collection.length > 0) {
      // ...
    }
    ```

  <a name="15.4"></a>
  <a name="comparison--moreinfo"></a>
  - [15.4](#comparison--moreinfo) 更多信息请见Angus Croll的[真理、平等和JavaScript —— Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)



  <a name="15.6"></a>
  <a name="comparison--nested-ternaries"></a>
  - [15.6](#comparison--nested-ternaries) 三元表达式不应该嵌套，通常是单行表达式。

    eslint rules: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html).

    ```javascript
    // bad
    const foo = maybe1 > maybe2
      ? "bar"
      : value1 > value2 ? "baz" : null;

    // better
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2
      ? 'bar'
      : maybeNull;

    // best
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

  <a name="15.7"></a>
  <a name="comparison--unneeded-ternary"></a>
  - [15.7](#comparison--unneeded-ternary) 避免不需要的三元表达式

    eslint rules: [`no-unneeded-ternary`](http://eslint.org/docs/rules/no-unneeded-ternary.html).

    ```javascript
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;

    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;
    ```

  <a name="15.8"></a>
  <a name="comparison--no-mixed-operators"></a>
  - [15.8](#comparison--no-mixed-operators) 用圆括号来混合这些操作符。 只有当标准的算术运算符(`+`, `-`, `*`, & `/`)， 并且它们的优先级显而易见时，可以不用圆括号括起来。 eslint: [`no-mixed-operators`](https://eslint.org/docs/rules/no-mixed-operators.html)

    > Why? 这提高了可读性，并且明确了开发者的意图

    ```javascript
    // bad
    const foo = a && b < 0 || c > 0 || d + 1 === 0;

    // bad
    const bar = a ** b - 5 % d;

    // bad
    // 别人会陷入(a || b) && c 的迷惑中
    if (a || b && c) {
      return d;
    }

    // good
    const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

    // good
    const bar = (a ** b) - (5 % d);

    // good
    if (a || (b && c)) {
      return d;
    }

    // good
    const bar = a + b / c * d;
    ```

**[回到顶部](#javascript-编码规范)**


## 语句块

  <a name="16.1"></a>
  <a name="blocks--braces"></a>
  - [16.1](#blocks--braces) 用大括号包裹多行代码块。  eslint: [`nonblock-statement-body-position`](https://eslint.org/docs/rules/nonblock-statement-body-position)

    ```javascript
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
      return false;
    }

    // bad
    function foo() { return false; }

    // good
    function bar() {
      return false;
    }
    ```

  <a name="16.2"></a>
  <a name="blocks--cuddled-elses"></a>
  - [16.2](#blocks--cuddled-elses) `if`表达式的`else`和`if`的关闭大括号在一行。 eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style.html)

    ```javascript
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```

  <a name="16.3"></a>
  <a name="blocks--no-else-return"></a>
  - [16.3](#blocks--no-else-return) 如果 `if` 语句中总是需要用 `return` 返回， 那后续的 `else` 就不需要写了。 `if` 块中包含 `return`， 它后面的 `else if` 块中也包含了 `return`， 这个时候就可以把 `return` 分到多个 `if` 语句块中。 eslint: [`no-else-return`](https://eslint.org/docs/rules/no-else-return)

    ```javascript
    // bad
    function foo() {
      if (x) {
        return x;
      } else {
        return y;
      }
    }

    // bad
    function cats() {
      if (x) {
        return x;
      } else if (y) {
        return y;
      }
    }

    // bad
    function dogs() {
      if (x) {
        return x;
      } else {
        if (y) {
          return y;
        }
      }
    }

    // good
    function foo() {
      if (x) {
        return x;
      }

      return y;
    }

    // good
    function cats() {
      if (x) {
        return x;
      }

      if (y) {
        return y;
      }
    }

    // good
    function dogs(x) {
      if (x) {
        if (z) {
          return y;
        }
      } else {
        return z;
      }
    }
    ```

**[回到顶部](#javascript-编码规范)**

## 控制语句

  <a name="17.1"></a>
  <a name="control-statements"></a>
  - [17.1](#control-statements) 当你的控制语句(`if`, `while` 等)太长或者超过最大长度限制的时候， 把每一个(组)判断条件放在单独一行里。 逻辑操作符放在行首。

    > Why? 把逻辑操作符放在行首是让操作符的对齐方式和链式函数保持一致。这提高了可读性，也让复杂逻辑更容易看清楚。

    ```javascript
    // bad
    if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      thing1();
    }

    // bad
    if (foo === 123 &&
      bar === 'abc') {
      thing1();
    }

    // bad
    if (foo === 123
      && bar === 'abc') {
      thing1();
    }

    // bad
    if (
      foo === 123 &&
      bar === 'abc'
    ) {
      thing1();
    }

    // good
    if (
      foo === 123
      && bar === 'abc'
    ) {
      thing1();
    }

    // good
    if (
      (foo === 123 || bar === 'abc')
      && doesItLookGoodWhenItBecomesThatLong()
      && isThisReallyHappening()
    ) {
      thing1();
    }

    // good
    if (foo === 123 && bar === 'abc') {
      thing1();
    }
    ```

  <a name="17.2"></a>
  <a name="control-statements--value-selection"></a>
  - [17.2](#control-statements--value-selection) 不要用选择操作符代替控制语句。

    ```javascript
    // bad
    !isRunning && startRunning();

    // good
    if (!isRunning) {
      startRunning();
    }
    ```

**[回到顶部](#javascript-编码规范)**

## 注释

  <a name="18.1"></a>
  <a name="comments--multiline"></a>
  - [18.1](#comments--multiline) 多行注释用 `/** ... */`

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {

      // ...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }
    ```

  <a name="18.2"></a>
  <a name="comments--singleline"></a>
  - [18.2](#comments--singleline) 单行注释用`//`，将单行注释放在被注释区域上面。如果注释不是在第一行，那么注释前面就空一行

    ```javascript
    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

    // good
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

    // also good
    function getType() {
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }
    ```

  <a name="18.3"></a>
  <a name="comments--spaces"></a>
  - [18.3](#comments--spaces) 所有注释开头空一个，方便阅读。 eslint: [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment)

    ```javascript
    // bad
    //is current tab
    const active = true;

    // good
    // is current tab
    const active = true;

    // bad
    /**
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }
    ```

  <a name="18.4"></a>
  <a name="comments--actionitems"></a>
  - [18.4](#comments--actionitems) 在你的注释前使用`FIXME'或`TODO'前缀， 这有助于其他开发人员快速理解你指出的需要重新访问的问题， 或者您建议需要实现的问题的解决方案。 这些不同于常规注释，因为它们是可操作的。 动作是`FIXME： - 需要计算出来`或`TODO： - 需要实现`。

  <a name="18.5"></a>
  <a name="comments--fixme"></a>
  - [18.5](#comments--fixme) 用`// FIXME:`给问题做注释

    ```javascript
    class Calculator extends Abacus {
      constructor() {
        super();

        // FIXME: shouldn't use a global here
        total = 0;
      }
    }
    ```

  <a name="18.6"></a>
  <a name="comments--todo"></a>
  - [18.6](#comments--todo) 用`// TODO:`去注释问题的解决方案

    ```javascript
    class Calculator extends Abacus {
      constructor() {
        super();

        // TODO: total should be configurable by an options param
        this.total = 0;
      }
    }
    ```
    **类型定义**
    | 类型定义 | 语法示例 | 解释 |
    | ------- | ------- | --- |
    |String|{string}|--|
    |Number|{number}|--|
    |Boolean|{boolean}|--|
    |Object|{Object}|--|
    |Function|{Function}|--|
    |RegExp|{RegExp}|--|
    |Array|{Array}|--|
    |Date|{Date}|--|
    |单一类型集合|{Array.&lt;string&gt;}|string 类型的数组|
    |多类型|{(number｜boolean)}|可能是 number 类型, 也可能是 boolean 类型|
    |允许为null|{?number}|可能是 number, 也可能是 null|
    |不允许为null|{!Object}|Object 类型, 但不是 null|
    |Function类型|{function(number, boolean)}|函数, 形参类型|
    |Function带返回值|{function(number, boolean):string}|函数, 形参, 返回值类型|
    |Promise|Promise.&lt;resolveType, rejectType&gt;|Promise，成功返回的数据类型，失败返回的错误类型|
    |参数可选|@param {string=} name|可选参数, =为类型后缀|
    |可变参数|@param {...number} args|变长参数,  ...为类型前缀|
    |任意类型|{*}|任意类型|
    |可选任意类型|@param {*=} name|可选参数，类型不限|
    |可变任意类型|@param {...*} args|变长参数，类型不限|
  
  <a name="18.7"></a>
  <a name="comments--function"></a>
  - [18.7](#comments--function) 函数/方法注释

    当 `return` 关键字仅作退出函数/方法使用时，无须对返回值作注释标识。

    参数和返回值注释必须包含类型信息，且不允许省略参数的说明。

    当函数是内部函数，外部不可访问时，可以使用 `@inner` 标识。

    示例：

    ```javascript
    /**
     * 函数描述
     *
     * @param {string} p1 参数1的说明
     * @param {string} p2 参数2的说明，比较长
     *     那就换行了.
     * @param {number=} p3 参数3的说明（可选）
     * @return {Object} 返回值描述
     */
    function foo(p1, p2, p3) {
        p3 = p3 || 10;
        return {
            p1: p1,
            p2: p2,
            p3: p3
        };
    }
    ```
    
  <a name="18.8"></a>
  <a name="comments--file"></a>
  - [18.8](#comments--file) 文件注释

    ```javascript
    /**
     * @file Describe the file
     * @author author-name(mail-name@domain.com)
     *         author-name2(mail-name2@domain.com)
     */
    ```
#### 注意事项
注释应该着重描述“做了什么”或“为什么这么做”而不是“怎么做”。
```js
function objToUrlParam(obj = {}) {
    let param = ''
    for (let key in obj) {
        param += '&' + key + '=' + obj[key]
    }
    
    return param? '?' + param.substr(1) : ''
}
```
例如上面这个函数，你可以这样写注释：“将对象转化为 URL 参数”。也可以这样写：“首先遍历对象，获取每一个键值对，将它们拼在一起，最后在前面补个问号，变成 URL 参数”。

第一个注释描述做了什么（这么简单的函数可以不用注释）。第二个注释则描述了怎么做，事实上，这是一种多余的注释，或者说是垃圾注释。

**[回到顶部](#javascript-编码规范)**


## 空格

  <a name="19.1"></a>
  <a name="whitespace--spaces"></a>
  - [19.1](#whitespace--spaces) tab用4个空格. eslint: [`indent`](http://eslint.org/docs/rules/indent.html)

    ```javascript
    // good
    function foo() {
    ∙∙∙∙const name;
    }
    ```

  <a name="19.2"></a>
  <a name="whitespace--before-blocks"></a>
  - [19.2](#whitespace--before-blocks) 在大括号前空一格。 eslint: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html)

    ```javascript
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```

  <a name="19.3"></a>
  <a name="whitespace--around-keywords"></a>
  - [19.3](#whitespace--around-keywords) 在控制语句(`if`, `while` 等)的圆括号前空一格。在函数调用和定义时，参数列表和函数名之间不空格。 eslint: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing.html)

    ```javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log('Swooosh!');
    }
    ```

  <a name="19.4"></a>
  <a name="whitespace--infix-ops"></a>
  - [19.4](#whitespace--infix-ops) 用空格来隔开运算符。 eslint: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html)

    ```javascript
    // bad
    const x=y+5;

    // good
    const x = y + 5;
    ```


  <a name="19.6"></a>
  <a name="whitespace--chains"></a>
  - [19.6](#whitespace--chains) 当出现长的方法链（>2个）时用缩进。用点开头强调该行是一个方法调用，而不是一个新的语句。eslint: [`newline-per-chained-call`](http://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](http://eslint.org/docs/rules/no-whitespace-before-property)

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led').data(data);
    ```

  <a name="19.7"></a>
  <a name="whitespace--after-blocks"></a>
  - [19.7](#whitespace--after-blocks) 在一个代码块后下一条语句前空一行。

    ```javascript
    // bad
    if (foo) {
      return bar;
    }
    return baz;

    // good
    if (foo) {
      return bar;
    }

    return baz;

    // bad
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;

    // good
    const obj = {
      foo() {
      },

      bar() {
      },
    };

    return obj;

    // bad
    const arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;

    // good
    const arr = [
      function foo() {
      },

      function bar() {
      },
    ];

    return arr;
    ```

  <a name="19.8"></a>
  <a name="whitespace--padded-blocks"></a>
  - [19.8](#whitespace--padded-blocks) 不要用空白行填充块。 eslint: [`padded-blocks`](http://eslint.org/docs/rules/padded-blocks.html)

    ```javascript
    // bad
    function bar() {

      console.log(foo);

    }

    // also bad
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // good
    function bar() {
      console.log(foo);
    }

    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }
    ```

  <a name="19.9"></a>
  <a name="whitespace--in-parens"></a>
  - [19.9](#whitespace--in-parens) 圆括号里不要加空格。 eslint: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html)

    ```javascript
    // bad
    function bar( foo ) {
      return foo;
    }

    // good
    function bar(foo) {
      return foo;
    }

    // bad
    if ( foo ) {
      console.log(foo);
    }

    // good
    if (foo) {
      console.log(foo);
    }
    ```

  <a name="19.10"></a>
  <a name="whitespace--in-brackets"></a>
  - [19.10](#whitespace--in-brackets) 方括号里不要加空格。看示例。 eslint: [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html)

    ```javascript
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good， 逗号分隔符还是要空格的
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```


  <a name="19.12"></a>
  <a name="whitespace--max-len"></a>
  - [19.12](#whitespace--max-len) 避免一行代码超过120个字符（包含空格）。
  - 注意： 对于[上面——strings--line-length](#strings--line-length)，长字符串不受此规则限制，不应分解。 eslint: [`max-len`](http://eslint.org/docs/rules/max-len.html)

    > Why? 这样确保可读性和可维护性

    ```javascript
    // bad
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

    // bad
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

    // good
    const foo = jsonData
      && jsonData.foo
      && jsonData.foo.bar
      && jsonData.foo.bar.baz
      && jsonData.foo.bar.baz.quux
      && jsonData.foo.bar.baz.quux.xyzzy;

    // good
    $.ajax({
      method: 'POST',
      url: 'https://airbnb.com/',
      data: { name: 'John' },
    })
      .done(() => console.log('Congratulations!'))
      .fail(() => console.log('You have failed this city.'));
    ```



  <a name="19.14"></a>
  <a name="whitespace--comma-spacing"></a>
  - [19.14](#whitespace--comma-spacing) `,` 前不要空格， `,` 后需要空格。 eslint: [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)

    ```javascript
    // bad
    var foo = 1,bar = 2;
    var arr = [1 , 2];

    // good
    let foo = 1, bar = 2;
    let arr = [1, 2];
    ```

 

  <a name="19.16"></a>
  <a name="whitespace--func-call-spacing"></a>
  - [19.16](#whitespace--func-call-spacing) 调用函数时，函数名和小括号之间不要空格。 eslint: [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)

    ```javascript
    // bad
    func ();

    func
    ();

    // good
    func();
    ```

 

  <a name="19.18"></a>
  <a name="whitespace--no-trailing-spaces"></a>
  - [19.18](#whitespace--no-trailing-spaces) 行末不要空格。 eslint: [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)

  <a name="19.19"></a>
  <a name="whitespace--no-multiple-empty-lines"></a>
  - [19.19](#whitespace--no-multiple-empty-lines) 避免出现多个空行。 在文件末尾只允许空一行。 eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)

    <!-- markdownlint-disable MD012 -->
    ```javascript
    // bad
    let x = 1;



    let y = 2;

    // good
    let x = 1;

    let y = 2;
    ```
    <!-- markdownlint-enable MD012 -->

**[回到顶部](#javascript-编码规范)**

## 逗号

  <a name="20.1"></a>
  <a name="commas--leading-trailing"></a>
  - [20.1](#commas--leading-trailing) 不要前置逗号。 eslint: [`comma-style`](http://eslint.org/docs/rules/comma-style.html)

    ```javascript
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
      once,
      upon,
      aTime,
    ];

    // bad
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // good
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```

  <a name="20.2"></a>
  <a name="commas--dangling"></a>
  - [20.2](#commas--dangling) 额外结尾逗号: **要** eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html)

    > Why? 这导致git diffs更清洁。 此外，像Babel这样的转换器会删除转换代码中的额外的逗号，这意味着你不必担心旧版浏览器中的[结尾逗号问题](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas)。

    ```diff
    // bad - 没有结尾逗号的 git diff
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // good - 有结尾逗号的 git diff
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };
    ```

    ```javascript
    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    const heroes = [
      'Batman',
      'Superman'
    ];

    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    const heroes = [
      'Batman',
      'Superman',
    ];

    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }

    // good
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }

    // good (note that a comma must not appear after a "rest" element)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }

    // bad
    createHero(
      firstName,
      lastName,
      inventorOf
    );

    // good
    createHero(
      firstName,
      lastName,
      inventorOf,
    );

    // good (note that a comma must not appear after a "rest" element)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    )
    ```

**[回到顶部](#javascript-编码规范)**

## 分号
代码不允许使用分号，但如果代码是以 `(` 或 `[` 开头的，则需要加分号，否则会解析报错。
```js
// good
const appleNum = 1

// good
;[1, 2, 3].forEach(// ...)
```

**[回到顶部](#javascript-编码规范)**

## 类型转换

  <a name="22.1"></a>
  <a name="coercion--explicit"></a>
  - [22.1](#coercion--explicit) 在语句开始执行强制类型转换。

  <a name="22.2"></a>
  <a name="coercion--strings"></a>
  - [22.2](#coercion--strings)  Strings: eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

    ```javascript
    // => this.reviewScore = 9;

    // bad
    const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

    // bad
    const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

    // bad
    const totalScore = this.reviewScore.toString(); // 不保证返回string

    // good
    const totalScore = String(this.reviewScore);
    ```

  <a name="22.3"></a>
  <a name="coercion--numbers"></a>
  - [22.3](#coercion--numbers) Numbers: 用 `Number` 做类型转换。 eslint: [`radix`](http://eslint.org/docs/rules/radix)

    ```javascript
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // good
    const val = Number(inputValue);
    ```

  <a name="22.4"></a>
  <a name="coercion--comment-deviations"></a>
  - [22.4](#coercion--comment-deviations) 请在注释中解释为什么要用移位运算和你在做什么。无论你做什么狂野的事，比如由于 `parseInt` 是你的性能瓶颈导致你一定要用移位运算。 请说明这个是因为[性能原因](https://jsperf.com/coercion-vs-casting/3),

    ```javascript
    // good
    /**
     * parseInt是代码运行慢的原因
     * 用Bitshifting将字符串转成数字使代码运行效率大幅增长
     */
    const val = inputValue >> 0;
    ```

  <a name="22.5"></a>
  <a name="coercion--bitwise"></a>
  - [22.5](#coercion--bitwise) **注意:** 用移位运算要小心. 数字使用[64-位](https://es5.github.io/#x4.3.19)表示的，但移位运算常常返回的是32为整形[source](https://es5.github.io/#x11.7))。移位运算对大于32位的整数会导致意外行为。[Discussion](https://github.com/airbnb/javascript/issues/109). 最大的32位整数是 2,147,483,647:

    ```javascript
    2147483647 >> 0 //=> 2147483647
    2147483648 >> 0 //=> -2147483648
    2147483649 >> 0 //=> -2147483647
    ```

  <a name="22.6"></a>
  <a name="coercion--booleans"></a>
  - [22.6](#coercion--booleans) 布尔:

    ```javascript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // best
    const hasAge = !!age;
    ```

**[回到顶部](#javascript-编码规范)**


## 命名规则

  <a name="23.1"></a>
  <a name="naming--descriptive"></a>
  - [23.1](#naming--descriptive) 避免用一个字母命名，让你的命名可描述。 eslint: [`id-length`](http://eslint.org/docs/rules/id-length)

    ```javascript
    // bad
    function q() {
      // ...
    }

    // good
    function query() {
      // ...
    }
    ```

  <a name="23.2"></a>
  <a name="naming--camelCase"></a>
  - [23.2](#naming--camelCase) 用小驼峰式命名你的对象、函数、实例。 eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase.html)

    ```javascript
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```

  <a name="23.3"></a>
  <a name="naming--PascalCase"></a>
  - [23.3](#naming--PascalCase) 用大驼峰式命名类。 eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap.html)

    ```javascript
    // bad
    function user(options) {
      this.name = options.name;
    }

    const bad = new user({
      name: 'nope',
    });

    // good
    class User {
      constructor(options) {
        this.name = options.name;
      }
    }

    const good = new User({
      name: 'yup',
    });
    ```

  <a name="23.4"></a>
  <a name="naming--leading-underscore"></a>
  - [23.4](#naming--leading-underscore) 不要用前置或后置下划线。 eslint: [`no-underscore-dangle`](http://eslint.org/docs/rules/no-underscore-dangle.html)

    > Why? JavaScript 没有私有属性或私有方法的概念。尽管前置下划线通常的概念上意味着“private”，事实上，这些属性是完全公有的，因此这部分也是你的API的内容。这一概念可能会导致开发者误以为更改这个不会导致崩溃或者不需要测试。 如果你想要什么东西变成“private”，那就不要让它在这里出现。

    ```javascript
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    this._firstName = 'Panda';

    // good
    this.firstName = 'Panda';
    ```

  <a name="23.5"></a>
  <a name="naming--self-this"></a>
  - [23.5](#naming--self-this) 不要保存引用`this`， 用箭头函数或[函数绑定——Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

    ```javascript
    // bad
    function foo() {
      const self = this;
      return function () {
        console.log(self);
      };
    }

    // bad
    function foo() {
      const that = this;
      return function () {
        console.log(that);
      };
    }

    // good
    function foo() {
      return () => {
        console.log(this);
      };
    }
    ```



  <a name="22.9"></a>
  <a name="naming--Acronyms-and-Initialisms"></a>
  - [22.9](#naming--Acronyms-and-Initialisms) 简称和缩写应该全部大写或全部小写。

    > Why? 名字都是给人读的，不是为了适应电脑的算法的。

    ```javascript
    // bad
    import SmsContainer from './containers/SmsContainer';

    // bad
    const HttpRequests = [
      // ...
    ];

    // good
    import SMSContainer from './containers/SMSContainer';

    // good
    const HTTPRequests = [
      // ...
    ];

    // best
    import TextMessageContainer from './containers/TextMessageContainer';

    // best
    const Requests = [
      // ...
    ];
    ```

**[回到顶部](#javascript-编码规范)**


## 访问器

  <a name="24.1"></a>
  <a name="accessors--not-required"></a>
  - [24.1](#accessors--not-required) 不需要使用属性的访问器函数。

  <a name="24.2"></a>
  <a name="accessors--no-getters-setters"></a>
  - [24.2](#accessors--no-getters-setters) 不要使用JavaScript的getters/setters，因为他们会产生副作用，并且难以测试、维护和理解。相反的，你可以用 getVal()和setVal('hello')去创造你自己的accessor函数

    ```javascript
    // bad
    class Dragon {
      get age() {
        // ...
      }

      set age(value) {
        // ...
      }
    }

    // good
    class Dragon {
      getAge() {
        // ...
      }

      setAge(value) {
        // ...
      }
    }
    ```

  <a name="24.3"></a>
  <a name="accessors--boolean-prefix"></a>
  - [24.3](#accessors--boolean-prefix) 如果属性/方法是`boolean`， 用 `isVal()` 或 `hasVal()`

    ```javascript
    // bad
    if (!dragon.age()) {
      return false;
    }

    // good
    if (!dragon.hasAge()) {
      return false;
    }
    ```

  <a name="24.4"></a>
  <a name="accessors--consistent"></a>
  - [24.4](#accessors--consistent) 用get()和set()函数是可以的，但是要一起用

    ```javascript
    class Jedi {
      constructor(options = {}) {
        const lightsaber = options.lightsaber || 'blue';
        this.set('lightsaber', lightsaber);
      }

      set(key, val) {
        this[key] = val;
      }

      get(key) {
        return this[key];
      }
    }
    ```

**[回到顶部](#javascript-编码规范)**


## 事件

  <a name="25.1"></a>
  <a name="events--hash"></a>
  - [25.1](#events--hash) 通过哈希而不是原始值向事件装载数据时(不论是DOM事件还是像Backbone事件的很多属性)。 这使得后续的贡献者（程序员）想这个事件装载更多的数据时不用去找或者更新每个处理器。例如：

    ```javascript
    // bad
    $(this).trigger('listingUpdated', listing.id);

    ...

    $(this).on('listingUpdated', (e, listingId) => {
      // do something with listingId
    });
    ```

    prefer:

    ```javascript
    // good
    $(this).trigger('listingUpdated', { listingId: listing.id });

    ...

    $(this).on('listingUpdated', (e, data) => {
      // do something with data.listingId
    });
    ```

  **[回到顶部](#javascript-编码规范)**


## 测试

   - 建议使用 [Jest](https://jestjs.io/zh-Hans/docs/getting-started) 进行测试。
   - 尽量去写很多小而美的纯函数，减少突变的发生
   - 100% 测试覆盖率是我们努力的目标，即便实际上很少达到。
   - 每当你修了一个bug， 都要写一个回归测试。 一个bug修复了，没有回归测试，很可能以后会再次出问题。

#### 单元测试应该怎么写呢？

1. 根据正确性写测试，即正确的输入应该有正常的结果。
2. 根据错误性写测试，即错误的输入应该是错误的结果。

下面看一个简单的示例，现在我们要对一个取绝对值的函数 `abs()` 写测试，它要求输入 `1,2`，结果应该与输入相同；输入 `-1,-2`，结果应该与输入相反。如果输入非数字，例如 `"abc"`，应该抛出一个类型错误。
```js
// main.js
function abs(a) {
    if (typeof a != 'number') {
        throw new TypeError('参数必须为数值型')
    }

    if (a < 0) return -a
    return a
}

// test.spec.js
test('abs', () => {
    expect(abs(1)).toBe(1)
    expect(abs(0)).toBe(0)
    expect(abs(-1)).toBe(1)
    expect(() => abs('abc')).toThrow(TypeError) // 类型错误
})
```

**[回到顶部](#javascript-编码规范)**
