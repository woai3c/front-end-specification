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
    id: string,
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
