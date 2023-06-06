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


下载插件
```
npm i -D eslint eslint-config-airbnb-vue3-ts
```
添加 `.eslintrc` 文件，具体配置项为：
```js
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    extends: ['eslint-config-airbnb-vue3-ts'],
    rules: {
        
    },
}

```
在根目录下的 `package.json` 文件的 `scripts` 选项里添加以下配置项：
```json
"scripts": {
  "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
},
```
修改完后，现在 js ts vue 文件都可以自动格式化了。

![](https://img-blog.csdnimg.cn/img_convert/e990512dbf4bbf446017ec810b878ec1.gif)
#### stylelint 格式化代码
下载依赖
```
npm i -D sass stylelint stylelint-config-standard-scss stylelint-scss
```
在项目根目录下新建一个 `.stylelintrc.js` 文件，并输入以下内容：
```js
module.exports = {
    extends: [
        'stylelint-config-standard-scss',
    ],
    rules: {
        indentation: 4,
        'media-feature-range-notation': null,
        'alpha-value-notation': ['number'],
        'color-function-notation': ['legacy'],
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
        'selector-type-no-unknown': null,
        'at-rule-no-unknown': null,
        'no-duplicate-selectors': null,
        'no-empty-source': null,
        'selector-class-pattern': null,
        'selector-pseudo-class-no-unknown': [
            true,
            { ignorePseudoClasses: ['global', 'deep'] },
        ],
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind'],
            },
        ],
    },
};

```
VSCode 添加 `stylelint` 插件：

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/afa020a625f5c5aee5fa304d35eb6682.png)

然后就可以看到效果了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/6156343f2a04454fa1d843f8bdecd07e.gif)

如果你想修改插件的默认规则，可以看[官方文档](https://github.com/stylelint/stylelint/blob/5a8465770b4ec17bb1b47f359d1a17132a204a71/docs/user-guide/rules/list.md)，它提供了 170 项规则修改。
#### 扩展

如何格式化 HTML 文件中的代码？这需要利用 VSCode 自带的格式化，快捷键是 `shift + alt + f`。假设当前 VSCode 已经打开了一个 HTML 文件，按下 `shift + alt + f` 会提示你选择一种格式化规范。如果没提示，那就是已经有默认的格式化规范了，然后 HTML 文件的所有代码都会格式化，并且格式化规则还可以自己配置。

#### 踩坑
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

验证 git commit 规范也不例外，我们需要通过 git 的 `pre-commit` 钩子函数来进行。当然，你还需要下载一个辅助插件 husky 来帮助你进行验证。

>pre-commit 钩子在键入提交信息前运行，它用于检查即将提交的快照。

husky 是一个开源的工具，使用它我们可以配置相关的 `git hook` 脚本。下面让我们看一下如何使用：

下载
```
npm i -D husky
```
第一次使用需要执行 `husky install` 初始化，但是为了方便，最好把命令写到 `package.json` 里，以后每次重新安装依赖都会自动初始化：
```
npm set-script prepare "husky install"
npm run prepare
```
初始化后，根目录下会生成一个 `.husky` 目录（这个一般情况下不需要动）。接下来就可以自己添加需要监听的 git 相关钩子了。
```
npx husky add .husky/pre-commit "npm run lint"
```
这行命令会成一个 `pre-commit` 文件（文件内容为 `npm run lint`），在 git 的 `pre-commit` 钩子触发时，就会去执行这个文件的代码。
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
```

这里介绍一下比较常用的三个钩子的含义：
1. `pre-commit`，在 `git commit` 提交消息前执行，一般用来执行 lint，校验代码格式。
2. `commit-msg`，在 `git commit` 提交消息时执行，一般用来验证消息是否符合规范。
3. `pre-push`，在推送前执行，一般用于执行测试。

现在我们来实践一下，创建一个 `commit-msg` 钩子文件。

首先在项目根目录下新建一个文件夹 `scripts`，并在下面新建一个文件 `verify-commit.js`，输入以下代码：
```js
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk')

const msgPath = process.argv[2]
const msg = require('fs')
.readFileSync(msgPath, 'utf-8')
.trim()

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|release)(\(.+\))?: .{1,50}/

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
          + chalk.red('  请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md。\n'),
    )

    process.exit(1)
}
```
然后再创建 `commit-msg` 钩子文件
```
npx husky add .husky/commit-msg "FORCE_COLOR=1 node scripts/verify-commit.js $1"
```
这样每次提交消息的时候，都会执行 `FORCE_COLOR=1 node scripts/verify-commit.js $1` 去验证消息格式了（FORCE_COLOR=1 是为了在终端让文字可以显示颜色，$1 是 git commit msg 的文件地址）。

通过工具，我们可以很好的管理团队成员的 git commit 格式，无需使用人力来检查，大大提高了开发效率。 

另外，我提供了一个简单的工程化 [DEMO](https://github.com/woai3c/front-end-engineering-demo)。它包含了自动格式化代码和 git 验证，如果看完文章还是不知道如何配置，可以参考一下。
#### lint-staged
使用 `lint-staged` 可以只对 git 暂存区上的文件进行校验，不需要对所有的文件进行 lint 检查。

安装
```
npm i -D lint-staged
```
在 `package.json` 中加上这段代码：
```json
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": "eslint",
  "test/**/*.{js,jsx,ts,tsx}": "eslint"
},
```
然后把 `pre-commit` 文件中的 `npm run lint` 改为 `npx lint-staged`。

**文件过滤说明**：
```json
{
    "*.js": "项目下所有的 js 文件（不包含子文件夹）",
    "**/*.js": "项目下所有的 js 文件",
    "src/*.js": "src 目录所有的 js 文件（不包含子文件夹）",
    "src/**/*.js": "src 目录所有的 js 文件",
}
```
**多个后缀匹配**：
```json
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": "eslint",
  },
```

### 参考资料
* [husky](https://github.com/typicode/husky)
* [stylelint](https://github.com/stylelint/stylelint/blob/5a8465770b4ec17bb1b47f359d1a17132a204a71/docs/user-guide/rules/list.md)
* [eslint](https://eslint.bootcss.com/)
