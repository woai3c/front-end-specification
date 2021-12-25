## 代码验证及自动格式化
规范制订下来了，那怎么确保它被严格执行呢？目前有两个方法：
1. 使用工具校验代码格式。
2. 利用 code review 审查变量命名、注释。

下面让我们来看一下，如何使用工具来校验代码格式。

#### ESLint
>ESLint最初是由Nicholas C. Zakas 于2013年6月创建的开源项目。它的目标是提供一个插件化的javascript代码检测工具。


1. 下载依赖
```
// eslint-config-airbnb-base 使用 airbnb 代码规范
npm i -D babel-eslint eslint eslint-config-airbnb-base eslint-plugin-import
```
2. 配置 `.eslintrc` 文件
```
{
    "parserOptions": {
        "ecmaVersion": 2019
    },
    "env": {
        "es6": true,
    },
    "parser": "babel-eslint",
    "extends": "airbnb-base",
}
```
3. 在 `package.json` 的 `scripts` 加上这行代码 `"lint": "eslint --ext .js test/ src/"`。然后执行 `npm run lint` 即可开始验证代码。代码中的 `test/ src/` 是要进行校验的代码目录，这里指明了要检查 `test`、`src` 目录下的代码。

不过这样检查代码效率太低，每次都得手动检查。并且报错了还得手动修改代码。

为了改善以上缺点，我们可以使用 VSCode。使用它并加上适当的配置可以在每次保存代码的时候，自动验证代码并进行格式化，省去了动手的麻烦（下一节讲如何使用 VSCode 自动格式化代码）。

#### Stylelint
Stylelint 是一个开源的、用于检查 CSS 代码格式的开源工具。具体如何使用请看下一节。

### 使用 VSCode 自动格式化代码
#### 格式化 JavaScript 代码
安装 VSCode，然后安装插件 ESLint。

![](https://img-blog.csdnimg.cn/img_convert/b4af668deae95fe6f00e8ce9a2b651bf.png)

选择 `File` -> `Preference`-> `Settings`（如果装了中文插件包应该是 文件 -> 选项 -> 设置），搜索 eslint，点击 `Edit in setting.json`。

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/9820d5a2ec912c0fa232908174911424.png)

将以下选项添加到配置文件

```js
"editor.codeActionsOnSave": {
    "source.fixAll": true,
},
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
],
"eslint.alwaysShowStatus": true,
"stylelint.validate": [
    "css",
    "less",
    "postcss",
    "scss",
    "vue",
    "sass"
],
```
同时要确保 VSCode 右下角的状态栏 ESlint 是处于工作状态的。如果右下角看不到 Eslint 的标识，请按照上面讲过的步骤打开 `setting.json`，加上这行代码：
```js
"eslint.alwaysShowStatus": true,
```

![image](https://img-blog.csdnimg.cn/img_convert/e80a254f238a3505aa3531fe30aa9f5c.png)

配置完之后，VSCode 会根据你当前项目下的 `.eslintrc` 文件的规则来验证和格式化代码。

![](https://img-blog.csdnimg.cn/img_convert/2124694cc6805a78697657ba790f69a0.gif)

#### TypeScript
下载插件
```
npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
在 `.eslintrc` 配置文件，添加以下两个配置项：
```json
"parser": "@typescript-eslint/parser",
"plugins": [
    "@typescript-eslint"
],
```
在根目录下的 `package.json` 文件的 `scripts` 选项里添加以下配置项：
```json
"scripts": {
  "lint": "eslint --ext .js,.ts,.tsx test/ src/",
},
```
`test/` `src/` 是你要校验的目录。修改完后，现在 ts 文件也可以自动格式化了。

![](https://img-blog.csdnimg.cn/img_convert/e990512dbf4bbf446017ec810b878ec1.gif)

如果你使用 `Vue-CLI` 创建项目，并且想要格式化 TypeScript 的代码，则需要在 `.eslintrc.js` 文件添加或修改以下几项：
```js
parser: 'vue-eslint-parser',
plugins: [
    '@typescript-eslint',
],
parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
},
```
这样就可以格式化 `.js` `.ts` `.vue` 文件了。
#### 格式化 CSS 代码
下载依赖
```
npm install --save-dev stylelint stylelint-config-standard
```
在项目根目录下新建一个 `.stylelintrc.json` 文件，并输入以下内容：
```json
{
    "extends": "stylelint-config-standard"
}
```
VSCode 添加 `stylelint` 插件：

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/afa020a625f5c5aee5fa304d35eb6682.png)

然后就可以看到效果了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/6156343f2a04454fa1d843f8bdecd07e.gif)

如果你想修改插件的默认规则，可以看[官方文档](https://github.com/stylelint/stylelint/blob/5a8465770b4ec17bb1b47f359d1a17132a204a71/docs/user-guide/rules/list.md)，它提供了 170 项规则修改。例如我想要用 4 个空格作为缩进，可以这样配置：
```json
{
    "extends": "stylelint-config-standard",
    "rules": {
        "indentation": 4
    }
}
```

如果你想格式化 `sass` `scss` 文件，则需要下载 `stylelint-scss` 插件：
```
npm i -D stylelint-scss
```
然后就可以格式化 scss 文件了。

#### 扩展
如何格式化 HTML、Vue（或其他后缀） 文件中的 HTML 代码？

`.vue` 文件的 HTML 代码可以使用 `eslint-plugin-vue` 插件来进行格式化：
```js
extends: [
    'plugin:vue/recommended', // 在 .eslintrc.js 文件中加上这一行代码
    '@vue/airbnb',
],
```

其他的 HTML 文件需要利用 VSCode 自带的格式化，快捷键是 `shift + alt + f`。假设当前 VSCode 已经打开了一个 HTML 文件，按下 `shift + alt + f` 会提示你选择一种格式化规范。如果没提示，那就是已经有默认的格式化规范了，然后 HTML 文件的所有代码都会格式化，并且格式化规则还可以自己配置。

#### 疑难问题
##### `Unknown word (CssSyntaxError)` 错误
解决方案为降级安装 VSCode 的 `stylelint` 插件，点击插件旁边的小齿轮，再点 `Install Another Version`，选择其他版本进行安装。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e79df36c850a499e8dde006f4d2dc62a~tplv-k3u1fbpfcp-watermark.image?)

选 `0.87.6` 版本安装就可以了，这时 css 自动格式化功能恢复正常。
##### 忽略 `.vue` 文件中的 HTML 模板验证规则无效
举个例子，如果你将 HTML 模板每行的代码文本长度设为 100，当超过这个长度后 eslint 将会报错。此时如果你还是想超过这个长度，可以选择忽略这个规则：
```js
/* eslint-disable max-len */
```
注意，以上这行忽略验证的代码是不会生效的，因为这个注释是 JavaScript 注释，我们需要将注释改为 HTML 格式，这样忽略验证才会生效：
```html
<!-- eslint-disable max-len -->
```
## git commit message 验证
利用 [git hook](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90) 能在特定的重要动作发生时触发自定义脚本。

验证 commit message 也不例外，我们需要通过 git 的 `pre-commit` 钩子函数来进行。当然，你还需要下载一个辅助插件 husky 来帮助你进行验证。

>pre-commit 钩子在键入提交信息前运行，它用于检查即将提交的快照。

husky 是一个开源的工具，使用它我们可以在 `package.json` 里配置 `git hook` 脚本。下面让我们看一下如何使用：

下载
```
npm i -D husky
```
在 `package.json` 加上下面的代码：
```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "FORCE_COLOR=1 node script/verify-commit.js",
    "pre-push": "npm test"
  }
}
```
然后在你项目根目录下新建一个文件夹 `script`，并在下面新建一个文件 `verify-commit.js`，输入以下代码：
```js
const chalk = require('chalk')

const msgPath = process.env.HUSKY_GIT_PARAMS
const userEmail = process.env.GIT_AUTHOR_EMAIL
const msg = require('fs')
.readFileSync(msgPath, 'utf-8')
.trim()

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,80}/

if (!commitRE.test(msg)) {
    console.log()
    console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        '不合法的 commit 消息格式',
    )}\n\n`
        + chalk.red(
            '  请使用正确的提交格式:\n\n',
        )
        + `    ${chalk.green('feat: add \'comments\' option')}\n`
        + `    ${chalk.green('fix: handle events on blur (close #28)')}\n\n`
        + chalk.blue('  请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md。\n'),
    )

    process.exit(1)
}
```
现在来解释下各个钩子的含义：
1. `"pre-commit": "npm run lint"`，在 `git commit` 前执行 `npm run lint` 检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在 `git commit` 时执行脚本 `verify-commit.js` 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行 `git push` 将代码推送到远程仓库前，执行 `npm test` 进行测试。如果测试失败，将不会执行这次推送。

通过工具，我们可以很好的管理团队成员的 git commit 格式，无需使用人力来检查，大大提高了开发效率。 

**注意事项**：如果 husky 不起作用，请卸载 husky，然后重新下载 4.2.3 版本的 husky，就可以解决此问题。
```bash
npm i -D husky@4.2.3
```

#### lint-staged
使用 `lint-staged` 可以只对 git 暂存区上的文件进行校验，不需要对所有的文件进行 lint 检查。

安装
```
npm i -D lint-staged
```
将原来 `package.json` 文件中的代码：
```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
},
```
改为：
```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
},
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": "eslint",
  "test/**/*.{js,jsx,ts,tsx}": "eslint"
},
```
文件过滤说明：
```json
{
    "*.js": "项目下所有的 js 文件（不包含子文件夹）",
    "**/*.js": "项目下所有的 js 文件",
    "src/*.js": "src 目录所有的 js 文件（不包含子文件夹）",
    "src/**/*.js": "src 目录所有的 js 文件",
}
```
多个后缀匹配：
```json
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": "eslint",
  },
```

### 参考资料
* [husky](https://github.com/typicode/husky)
* [stylelint](https://github.com/stylelint/stylelint/blob/5a8465770b4ec17bb1b47f359d1a17132a204a71/docs/user-guide/rules/list.md)
* [eslint](https://eslint.bootcss.com/)
