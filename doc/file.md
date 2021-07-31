## 命名
文件命名使用全小写字母（特殊文件除外，例如 Vue 的组件命名），如果有多个单词则以 "-" 进行连接，示例：
```
package-lock.json
```

### 类文件
假设你的文件里就只有一个类，那么文件名要与类名一致。
```js
// 文件名为 Apple.js
export default class Apple {
    // ...
}
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
