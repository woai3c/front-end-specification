# Vue 编码规范
1. [组件命名](#组件命名)
1. [组件使用](#组件使用)
1. [options API 选项的顺序](#options-api-选项的顺序)
1. [v-for](#v-for)
1. [scoped](#scoped)
1. [单文件组件顶级元素标签的顺序](#单文件组件顶级元素标签的顺序)
1. [空行](#空行)
1. [JSX](#jsx)

## 组件命名
为了和其他业务页面进行区分，Vue 组件必须使用大驼峰命名方式。
```bash
- Button.vue # 按钮组件
- Radio.vue # 单选框组件
```

**[回到顶部](#vue-编码规范)**

## 组件使用
为了区分自己开发的组件和第三方库组件，在命名方式上需要有所不同。

使用第三方库组件时，需要用小写字母。
```html
<!-- element -->
<el-input></el-input>

<!-- vant -->
<van-button type="primary">主要按钮</van-button>
```
使用自己开发的组件，则需要使用大驼峰式命名。
```html
<!-- 自己开发的 Button 组件 -->
<Button>按钮</Button>
```

**[回到顶部](#vue-编码规范)**

## options API 选项的顺序

**组件/实例的选项应该有统一的顺序。**

这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新 property 应该放到哪里。

1. **副作用** (触发组件外的影响)
  - `el`

2. **全局感知** (要求组件以外的知识)
  - `name`
  - `parent`

3. **组件类型** (更改组件的类型)
  - `functional`

4. **模板修改器** (改变模板的编译方式)
  - `delimiters`
  - `comments`

5. **模板依赖** (模板内使用的资源)
  - `components`
  - `directives`
  - `filters`

6. **组合** (向选项里合并 property)
  - `extends`
  - `mixins`

7. **接口** (组件的接口)
  - `inheritAttrs`
  - `model`
  - `props`/`propsData`

8. **本地状态** (本地的响应式 property)
  - `data`
  - `computed`

9. **事件** (通过响应式事件触发的回调)
  - `watch`
  - 生命周期钩子 (按照它们被调用的顺序)
    - `beforeCreate`
    - `created`
    - `beforeMount`
    - `mounted`
    - `beforeUpdate`
    - `updated`
    - `activated`
    - `deactivated`
    - `beforeDestroy`
    - `destroyed`

10. **非响应式的 property** (不依赖响应系统的实例 property)
  - `methods`

11. **渲染** (组件输出的声明式描述)
  - `template`/`render`
  - `renderError`

**[回到顶部](#vue-编码规范)**

## v-for
出于性能考虑，必须为 `v-for` 设置 `key` 属性。`key` 的取值必须是唯一的，一般是使用 `id` 的值。
只有在找不到唯一值的情况下才允许使用 `index` 作为 `key`。

**[回到顶部](#vue-编码规范)**

## scoped
业务页面的 `style` 需要添加 `scoped` 属性来限制作用域。在开发组件时，为了方便在其他页面覆盖组件的样式，所以不建议添加 `scoped` 属性。

**[回到顶部](#vue-编码规范)**

## 单文件组件顶级元素标签的顺序
```html
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

**[回到顶部](#vue-编码规范)**

## 空行
在多个方法之间添加一个空行，可以增加可读性（避免拥挤）。
```js
methods: {
    getName() {

    },

    getAge() {

    },
}
```

**[回到顶部](#vue-编码规范)**

## JSX
尽量使用单文件组件来开发业务页面，而不是 JSX，因为单文件组件可读性更强。只有在开发组件并且需要进行大量判断的情况下才建议使用 JSX（自由性更强）。

**[回到顶部](#vue-编码规范)**
