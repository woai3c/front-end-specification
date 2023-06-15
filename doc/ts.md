# TypeScript 编码规范

## 非必要情况下不能使用 any

```ts
// bad
const data: any = {
    name: 'name',
    age: 18,
    address: 'beijing',
}

interface ListItem {
    name: string
    age: number
    address: string
}

// good
const data: ListItem = {
    name: 'name',
    age: 18,
    address: 'beijing',
}
```

如果一个对象有多层嵌套，并且数据过多，不确定性太大。可以使用 `AnyObject` 来代替 `any`。

```ts
type AnyObject = Record<string, any>
```

## 接口 API 返回值需要使用 interface 进行声明

```ts
interface Params {
    id: string
    name: string
}

interface ListItem {
    name: string
    age: number
    address: string
}

export function getListData(params: Params): Promise<ListItem[]> {
    return request({
        url: '/people/list',
        params,
    })
}
```

## 函数/方法注释

在使用 TypeScript 的情况下，函数的参数和返回值已经有类型定义了，所以注释不再需要标明参数和返回值的类型。

不建议使用的用法：

```ts
/**
 * 加法函数
 * @param a
 * @param b
 * @returns
 */
function sum(a: number, b: number) {
    return a + b
}

```

建议使用的用法：

```ts
/**
 * 加法函数
 */
function sum(a: number, b: number) {
    return a + b
}
```
