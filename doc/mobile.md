# 移动端适配规范
首先有一个共识是我们要知道的，那就是**更大的屏幕应该看到更多的内容，而不是看到更大的内容**。因此，不推荐使用 rem、%、vw 等计量单位来作为字体大小（屏幕越大，字体越大）。

只在需要响应式的地方使用 %、vw 来作为计量单位。或者说整体布局使用 %、vw，字体大小使用 px。下面看一个使用 rem 作为字体大小的反例：

**适配手机的页面**

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020112112523771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3E0MTEwMjAzODI=,size_16,color_FFFFFF,t_70#pic_center)

**放到平板下就乱了**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201121125328211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3E0MTEwMjAzODI=,size_16,color_FFFFFF,t_70#pic_center)

## 栅格布局
基于**更大的屏幕应该看到更多的内容，而不是看到更大的内容**这个原则，很多展示内容的地方都可以使用栅格布局。比如同样的页面在手机和 PC 应该分别展示不同数量的列，具体示例如下：

**分辨率较大时的页面**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201121154641400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3E0MTEwMjAzODI=,size_16,color_FFFFFF,t_70#pic_center)

**分辨率较小时的页面**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201121154707760.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3E0MTEwMjAzODI=,size_16,color_FFFFFF,t_70#pic_center)

## 尽量使用移动端专用的 UI 组件库
PC 端的 UI 组件库在移动端上会有很多样式问题，如非必要，不要使用。

## 媒体查询
在使用以上条件仍不能满足业务需求的情况下，可以使用媒体查询条件（@media screen），强制页面内容在不同的设备宽度下使用不同的样式。

## 其他一些需要了解的术语
关于移动端开发、设计，有很多相关的术语：
```
CSS像素、物理分辨率、逻辑分辨率、设备像素比、PPI、DPI、DPR、DIP、Viewport
```
但是这些术语我们不需要全都记住，对于开发来说，只需要了解三个概念。
1. 物理分辨率，就是设备上标称的分辨率。
2. 逻辑分辨率，开发时所用的分辨率。
3. 设备像素比，物理分辨率和逻辑分辨率之比。

例如 iphone 6，它的物理分辨率是 `750 x 1334`，逻辑分辨率是 `375 x 667`，设备像素比是 2（`750 / 375`）。打开 chrome 控制台，切换到 device toolbar， 选择 iphone 6 设备就能看到它的逻辑分辨率。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201121110407618.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3E0MTEwMjAzODI=,size_16,color_FFFFFF,t_70#pic_center)

平时所说的 UI 设计稿 2 倍图、3 倍图。这个倍就是指设备像素比。例如设计稿是 2 倍图，里面的字体是 24 px，那我们用 `24 / 2` 就可以得出开发要用的像素为 12 px。

### 知道物理分辨率
如果你知道物理分辨率，那可以通过 `window.devicePixelRatio` 获取设备像素比。然后再通过公式得出逻辑分辨率。
```js
逻辑分辨率 = 物理分辨率 / 设备像素比
```
例如 PC 上的设备像素比就是 1。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201121111155948.png#pic_center)

开发 PC 页面是很简单的，设计稿上的像素是多少，开发就写多少。

### 兜底方案
在页面建立一个刚好铺满全屏的 div 元素，然后获取它的宽高，这个宽高就是该设备的逻辑分辨率。
```css
.test-div {
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: red;
}
```
```js
document.querySelector('test-div').clientWidth // 宽
document.querySelector('test-div').clientHeight // 高
```
为什么不使用 `window.screen.width` 或 `window.screen.height` 来获取逻辑分辨率呢？请看 MDN 的解释：
>注意，该属性返回的高度值并不是全部对浏览器窗口可用。小工具（Widgets），如任务栏或其他特殊的程序窗口，可能会减少浏览器窗口和其他应用程序能够利用的空间。

也就是说，返回来的高度有一部分可能会被其他程序占用。

**PS**：如果 app 在移动设备上不需要全屏展示，那么在 chrome 上模拟设备大小时要减去设备状态栏的高度。