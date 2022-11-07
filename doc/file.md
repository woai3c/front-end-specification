## 文件组织
大多数页面都可能会用到的组件或函数需要放在公共目录；如果只是单个页面使用的组件，则放在该页面下。示例：
```bash
- src
    - utils # 工具函数目录，放置所有的工具函数
    - components # 这是个公共组件目录，所有的组件都会在多个页面上使用
        - Header.vue
        - Footer.vue
    - pages
        - home
            - index.vue
            - Button.vue # 只用于该页面的组件放在该页面目录下
        - list.vue
```
## 文件命名
文件命名使用小驼峰式命名，类文件、组件文件等使用大驼峰式命名。文件名要跟文件里导出的唯一对象（或默认导出对象）相同。
```js
// 文件名为 add.js
export default function add(a, b) {
    return a + b
}
```
```js
// 文件名为 Apple.js
export default class Apple {
    // ...
}
```
如果组件、类的代码过于庞大，需要进行拆分，可以创建几个小文件，并放在一个以大驼峰命名的文件夹里。
```js
- components
    - Editor
        - index.vue
        - Header.vue
        - Main.vue
```

一些特殊的文件可保持不变，例如执行 `npm init -y` 命令默认生成的 `package-lock.json` 文件。
```
package-lock.json
```
## 目录命名
目录统一使用 `aaa-bbb` 格式命名，如果一个组件太大，需要拆分成多个小组件的，可以把目录改为组件名，即大驼峰式全名：
```bash
- Home
    - index.vue
    - Button.vue
    - Main.vue
    - Header.vue
    - Footer.vue
```

## 复数与缩写
当你的目录有多个子文件时，需要用复数形式，示例：
```bash
- tests # 测试文件目录，有多个测试文件
    - a.spec.js
    - b.spec.js
```
但如果你的目录命名为缩写，则不要使用复数形式，示例：
```bash
- src
    - a.js
    - b.js
- lib
    - axios
    - jquery
```
