# CSS 编码规范
1. [空格](#空格)
1. [行长度](#行长度)
1. [选择器](#选择器)
1. [属性](#属性)
1. [清除浮动](#清除浮动)
1. [!important](#important)
1. [文本](#文本)
1. [数值](#数值)
1. [url()](#url)
1. [长度](#长度)
1. [颜色](#颜色)
1. [位置](#位置)
1. [字体族](#字体族)
1. [字重](#字重)
1. [行高](#行高)
1. [变换与动画](#变换与动画)
1. [响应式](#响应式)


## 空格
#### 使用 `4` 个空格做为一个缩进层级，不允许使用 `2` 个空格 或 `tab` 字符。

```css
.selector {
    margin: 0;
    padding: 0;
}
```



#### `选择器` 与 `{` 之间必须包含空格。


```css
.selector {
}
```

#### `属性名` 与之后的 `:` 之间不允许包含空格， `:` 与 `属性值` 之间必须包含空格。



```css
margin: 0;
```

#### `列表型属性值` 书写在单行时，`,` 后必须跟一个空格。



```css
font-family: Arial, sans-serif;
```

**[回到顶部](#css-编码规范)**

## 行长度


#### 每行不得超过 `120` 个字符，除非单行不可分割。

解释：

常见不可分割的场景为URL超长。


#### 对于超长的样式，在样式值的 `空格` 处或 `,` 后换行，建议按逻辑分组。



```css
/* 不同属性值按逻辑分组 */
background:
    transparent url(aVeryVeryVeryLongUrlIsPlacedHere)
    no-repeat 0 0;

/* 可重复多次的属性，每次重复一行 */
background-image:
    url(aVeryVeryVeryLongUrlIsPlacedHere)
    url(anotherVeryVeryVeryLongUrlIsPlacedHere);

/* 类似函数的属性值可以根据函数调用的缩进进行 */
background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.04, rgb(88,94,124)),
    color-stop(0.52, rgb(115,123,162))
);
```

**[回到顶部](#css-编码规范)**

## 选择器


#### 当一个 rule 包含多个 selector 时，每个选择器声明必须独占一行。



```css
/* good */
.post,
.page,
.comment {
    line-height: 1.5;
}

/* bad */
.post, .page, .comment {
    line-height: 1.5;
}
```

#### `>`、`+`、`~` 选择器的两边各保留一个空格。



```css
/* good */
main > nav {
    padding: 10px;
}

label + input {
    margin-left: 5px;
}

input:checked ~ button {
    background-color: #69C;
}

/* bad */
main>nav {
    padding: 10px;
}

label+input {
    margin-left: 5px;
}

input:checked~button {
    background-color: #69C;
}
```

#### 属性选择器中的值必须用双引号包围。

解释：

不允许使用单引号，不允许不使用引号。




```css
/* good */
article[character="juliet"] {
    voice-family: "Vivien Leigh", victoria, female;
}

/* bad */
article[character='juliet'] {
    voice-family: "Vivien Leigh", victoria, female;
}
```


#### 如无必要，不得为 `id`、`class` 选择器添加类型选择器进行限定。

解释：

在性能和维护性上，都有一定的影响。





```css
/* good */
#error,
.danger-message {
    font-color: #c00;
}

/* bad */
dialog#error,
p.danger-message {
    font-color: #c00;
}
```

#### 选择器的嵌套层级应不大于 `4` 级，位置靠后的限定条件应尽可能精确。



```css
/* good */
#username input {}
.comment .avatar {}

/* bad */
.page .header .login #username input {}
.comment div * {}
```


**[回到顶部](#css-编码规范)**

## 属性


#### 属性定义必须另起一行。



```css
/* good */
.selector {
    margin: 0;
    padding: 0;
}

/* bad */
.selector { margin: 0; padding: 0; }
```

#### 属性定义后必须以分号结尾。



```css
/* good */
.selector {
    margin: 0;
}

/* bad */
.selector {
    margin: 0
}
```



#### 在可以使用缩写的情况下，尽量使用属性缩写。



```css
/* good */
.post {
    font: 12px/1.5 arial, sans-serif;
}

/* bad */
.post {
    font-family: arial, sans-serif;
    font-size: 12px;
    line-height: 1.5;
}
```

#### 使用 `border` / `margin` / `padding` 等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。

解释：

`border` / `margin` / `padding` 等缩写会同时设置多个属性的值，容易覆盖不需要覆盖的设定。如某些方向需要继承其他声明的值，则应该分开设置。




```css
/* centering <article class="page"> horizontally and highlight featured ones */
article {
    margin: 5px;
    border: 1px solid #999;
}

/* good */
.page {
    margin-right: auto;
    margin-left: auto;
}

.featured {
    border-color: #69c;
}

/* bad */
.page {
    margin: 5px auto; /* introducing redundancy */
}

.featured {
    border: 1px solid #69c; /* introducing redundancy */
}
```


#### 同一 rule set 下的属性在书写时，应按功能进行分组，并以 **Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果）** 的顺序书写，以提高代码的可读性。

解释：

- Formatting Model 相关属性包括：`position` / `top` / `right` / `bottom` / `left` / `float` / `display` / `overflow` 等
- Box Model 相关属性包括：`border` / `margin` / `padding` / `width` / `height` 等
- Typographic 相关属性包括：`font` / `line-height` / `text-align` / `word-wrap` 等
- Visual 相关属性包括：`background` / `color` / `transition` / `list-style` 等

另外，如果包含 `content` 属性，应放在最前面。




```css
.sidebar {
    /* formatting model: positioning schemes / offsets / z-indexes / display / ...  */
    position: absolute;
    top: 50px;
    left: 0;
    overflow-x: hidden;

    /* box model: sizes / margins / paddings / borders / ...  */
    width: 200px;
    padding: 5px;
    border: 1px solid #ddd;

    /* typographic: font / aligns / text styles / ... */
    font-size: 14px;
    line-height: 20px;

    /* visual: colors / shadows / gradients / ... */
    background: #f5f5f5;
    color: #333;
    -webkit-transition: color 1s;
       -moz-transition: color 1s;
            transition: color 1s;
}
```


**[回到顶部](#css-编码规范)**

## 清除浮动

#### 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 `clear` 或触发 `BFC` 的方式进行 `clearfix`。尽量不使用增加空标签的方式。

解释：

触发 BFC 的方式很多，常见的有：

* float 非 none
* position 非 static
* overflow 非 visible

如希望使用更小副作用的清除浮动方法，参见 [A new micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/) 一文。

另需注意，对已经触发 BFC 的元素不需要再进行 clearfix。


**[回到顶部](#css-编码规范)**

## !important


#### 尽量不使用 `!important` 声明。


#### 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 `!important` 定义样式。

解释：

必须注意的是，仅在设计上 `确实不允许任何其它场景覆盖样式` 时，才使用内联的 `!important` 样式。通常在第三方环境的应用中使用这种方案。下面的 `z-index` 章节是其中一个特殊场景的典型样例。


**[回到顶部](#css-编码规范)**


## z-index



#### 将 `z-index` 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理。

解释：

同层的多个元素，如多个由用户输入触发的 Dialog，在该层级内使用相同的 `z-index` 或递增 `z-index`。

建议每层包含100个 `z-index` 来容纳足够的元素，如果每层元素较多，可以调整这个数值。


#### 在可控环境下，期望显示在最上层的元素，`z-index` 指定为 `999999`。

解释：

可控环境分成两种，一种是自身产品线环境；还有一种是可能会被其他产品线引用，但是不会被外部第三方的产品引用。

不建议取值为 `2147483647`。以便于自身产品线被其他产品线引用时，当遇到层级覆盖冲突的情况，留出向上调整的空间。


#### 在第三方环境下，期望显示在最上层的元素，通过标签内联和 `!important`，将 `z-index` 指定为 `2147483647`。

解释：

第三方环境对于开发者来说完全不可控。在第三方环境下的元素，为了保证元素不被其页面其他样式定义覆盖，需要采用此做法。




**[回到顶部](#css-编码规范)**

## 文本


#### 文本内容必须用双引号包围。

解释：

文本类型的内容可能在选择器、属性值等内容中。




```css
/* good */
html[lang|="zh"] q:before {
    font-family: "Microsoft YaHei", sans-serif;
    content: "“";
}

html[lang|="zh"] q:after {
    font-family: "Microsoft YaHei", sans-serif;
    content: "”";
}

/* bad */
html[lang|=zh] q:before {
    font-family: 'Microsoft YaHei', sans-serif;
    content: '“';
}

html[lang|=zh] q:after {
    font-family: "Microsoft YaHei", sans-serif;
    content: "”";
}
```

**[回到顶部](#css-编码规范)**

## 数值


#### 当数值为 0 - 1 之间的小数时，省略整数部分的 `0`。



```css
/* good */
panel {
    opacity: .8;
}

/* bad */
panel {
    opacity: 0.8;
}
```

**[回到顶部](#css-编码规范)**

## url()


#### `url()` 函数中的路径不加引号。



```css
body {
    background: url(bg.png);
}
```


#### `url()` 函数中的绝对路径可省去协议名。




```css
body {
    background: url(//baidu.com/img/bg.png) no-repeat 0 0;
}
```


**[回到顶部](#css-编码规范)**

## 长度


#### 长度为 `0` 时须省略单位。 (也只有长度单位可省)



```css
/* good */
body {
    padding: 0 5px;
}

/* bad */
body {
    padding: 0px 5px;
}
```


**[回到顶部](#css-编码规范)**

## 颜色


#### RGB颜色值必须使用十六进制记号形式 `#rrggbb`。不允许使用 `rgb()`。 

解释：

带有alpha的颜色信息可以使用 `rgba()`。使用 `rgba()` 时每个逗号后必须保留一个空格。




```css
/* good */
.success {
    box-shadow: 0 0 2px rgba(0, 128, 0, .3);
    border-color: #008000;
}

/* bad */
.success {
    box-shadow: 0 0 2px rgba(0,128,0,.3);
    border-color: rgb(0, 128, 0);
}
```

#### 颜色值可以缩写时，必须使用缩写形式。



```css
/* good */
.success {
    background-color: #aca;
}

/* bad */
.success {
    background-color: #aaccaa;
}
```

#### 颜色值不允许使用命名色值。



```css
/* good */
.success {
    color: #90ee90;
}

/* bad */
.success {
    color: lightgreen;
}
```

#### 颜色值中的英文字符采用小写。如不用小写也需要保证同一项目内保持大小写一致。




```css
/* good */
.success {
    background-color: #aca;
    color: #90ee90;
}

/* good */
.success {
    background-color: #ACA;
    color: #90EE90;
}

/* bad */
.success {
    background-color: #ACA;
    color: #90ee90;
}
```


**[回到顶部](#css-编码规范)**

## 位置


#### 2D 位置必须同时给出水平和垂直方向的位置。

解释：

2D 位置初始值为 `0% 0%`，但在只有一个方向的值时，另一个方向的值会被解析为 center。为避免理解上的困扰，应同时给出两个方向的值。[background-position属性值的定义](http://www.w3.org/TR/CSS21/colors.html#propdef-background-position)




```css
/* good */
body {
    background-position: center top; /* 50% 0% */
}

/* bad */
body {
    background-position: top; /* 50% 0% */
}
```





**[回到顶部](#css-编码规范)**


## 字体族


#### `font-family` 属性中的字体族名称应使用字体的英文 `Family Name`，其中如有空格，须放置在引号中。

解释：

所谓英文 Family Name，为字体文件的一个元数据，常见名称如下：

字体 | 操作系统 | Family Name
-----|----------|------------
宋体 (中易宋体) | Windows | SimSun
黑体 (中易黑体) | Windows | SimHei
微软雅黑 | Windows | Microsoft YaHei
微软正黑 | Windows | Microsoft JhengHei
华文黑体 | Mac/iOS | STHeiti
冬青黑体 | Mac/iOS | Hiragino Sans GB
文泉驿正黑 | Linux | WenQuanYi Zen Hei
文泉驿微米黑 | Linux | WenQuanYi Micro Hei




```css
h1 {
    font-family: "Microsoft YaHei";
}
```


#### `font-family` 按「西文字体在前、中文字体在后」、「效果佳 (质量高/更能满足需求) 的字体在前、效果一般的字体在后」的顺序编写，最后必须指定一个通用字体族( `serif` / `sans-serif` )。

解释：

更详细说明可参考[本文](http://www.zhihu.com/question/19911793/answer/13329819)。



```css
/* Display according to platform */
.article {
    font-family: Arial, sans-serif;
}

/* Specific for most platforms */
h1 {
    font-family: "Helvetica Neue", Arial, "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft YaHei", sans-serif;
}
```

#### `font-family` 不区分大小写，但在同一个项目中，同样的 `Family Name` 大小写必须统一。



```css
/* good */
body {
    font-family: Arial, sans-serif;
}

h1 {
    font-family: Arial, "Microsoft YaHei", sans-serif;
}

/* bad */
body {
    font-family: arial, sans-serif;
}

h1 {
    font-family: arial, "Microsoft YaHei", sans-serif;
}
```

**[回到顶部](#css-编码规范)**

## 字重


#### `font-weight` 属性必须使用数值方式描述。

解释：

CSS 的字重分 100 – 900 共九档，但目前受字体本身质量和浏览器的限制，实际上支持 `400` 和 `700` 两档，分别等价于关键词 `normal` 和 `bold`。

浏览器本身使用一系列[启发式规则](http://www.w3.org/TR/CSS21/fonts.html#propdef-font-weight)来进行匹配，在 `<700` 时一般匹配字体的 Regular 字重，`>=700` 时匹配 Bold 字重。

但已有浏览器开始支持 `=600` 时匹配 Semibold 字重 (见[此表](http://justineo.github.io/slideshows/font/#/3/15))，故使用数值描述增加了灵活性，也更简短。



```css
/* good */
h1 {
    font-weight: 700;
}

/* bad */
h1 {
    font-weight: bold;
}
```

**[回到顶部](#css-编码规范)**

## 行高


#### `line-height` 在定义文本段落时，应使用数值。

解释：

将 `line-height` 设置为数值，浏览器会基于当前元素设置的 `font-size` 进行再次计算。在不同字号的文本段落组合中，能达到较为舒适的行间间隔效果，避免在每个设置了 `font-size` 都需要设置 `line-height`。

当 `line-height` 用于控制垂直居中时，还是应该设置成与容器高度一致。




```css
.container {
    line-height: 1.5;
}
```



**[回到顶部](#css-编码规范)**

## 变换与动画



#### 使用 `transition` 时应指定 `transition-property`。



```css
/* good */
.box {
    transition: color 1s, border-color 1s;
}

/* bad */
.box {
    transition: all 1s;
}
```

#### 尽可能在浏览器能高效实现的属性上添加过渡和动画。

解释：

见[本文](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)，在可能的情况下应选择这样四种变换：

* `transform: translate(npx, npx);`
* `transform: scale(n);`
* `transform: rotate(ndeg);`
* `opacity: 0..1;`

典型的，可以使用 `translate` 来代替 `left` 作为动画属性。



```css
/* good */
.box {
    transition: transform 1s;
}
.box:hover {
    transform: translate(20px); /* move right for 20px */
}

/* bad */
.box {
    left: 0;
    transition: left 1s;
}
.box:hover {
    left: 20px; /* move right for 20px */
}
```




**[回到顶部](#css-编码规范)**

## 响应式



#### `Media Query` 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。



```css
@media
(-webkit-min-device-pixel-ratio: 2), /* Webkit-based browsers */
(min--moz-device-pixel-ratio: 2),    /* Older Firefox browsers (prior to Firefox 16) */
(min-resolution: 2dppx),             /* The standard way */
(min-resolution: 192dpi) {           /* dppx fallback */
    /* Retina-specific stuff here */
}
```

#### 尽可能给出在高分辨率设备 (Retina) 下效果更佳的样式。

**[回到顶部](#css-编码规范)**
