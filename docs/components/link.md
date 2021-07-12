# Link 文字链接

文字超链接

:::tip 简介
`aile-ui/link` 是一款 **Link** 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，使用组件时，在原 `ElLink` 属性的基础上新增 `config` 属性，增强 Link 的功能。
:::

## 基本用法

支持 `element-ui` 中的 [Link文档板块](https://element.eleme.io/#/zh-CN/component/link) 的所有使用方式，包括Props/Methods/Slots/Events等，你可以认为：`<aile-link />` 就是 `<el-link />`。
:::demo
```html
<div>
  <aile-link href="https://element.eleme.io" target="_blank">默认链接</aile-link>
  <aile-link type="primary">主要链接</aile-link>
  <aile-link type="success" disabled>成功链接</aile-link>
  <aile-link type="warning" :underline="false">警告链接</aile-link>
  <aile-link type="danger" icon="el-icon-edit">危险链接</aile-link>
  <aile-link type="info">信息链接</aile-link>
</div>
```
:::

## 超出文字显示省略号

:::demo
```html
<div>
  <aile-link :config="config">{{ value }}</aile-link>
</div>

<script>
export default {
  data: () => ({
    value: 'Dolore commodo ullamco veniam dolore duis ex voluptate in aliquip.',
    config: {
      ellipsis: true,
      maxWidth: '200px',
    }
  })
}
</script>
```
:::

## Options 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileLink` 配置如下属性：

|    参数    | 数据类型 | 默认值 |   可选值   |               说明                |
| :--------: | :------: | :----: | :--------: | :-------------------------------: |
| underline  | Boolean  | false  | true/false |           是否有下划线            |
| **config** |  Object  |   -    |     -      | 支持全局设置 AileLink config 属性 |

### config 配置项

|     参数      | 数据类型 | 默认值 | 可选值 |                                                                              说明                                                                               |
| :-----------: | :------: | :----: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   ellipsis    | Boolean  | false  |   -    |                                                                   是否支持超出部分省略号显示                                                                    |
|   maxWidth    |  String  |  100%  |   -    |                                                                         Link 的最大宽度                                                                         |
| inputMaxWidth |  String  |  100%  |   -    | 自定义 inputInner 的最大宽度，不传则使用默认计算规则:<br>1. 无 icon 属性及 icon 插槽时，默认 100%<br>2. 加入 icon 属性减去 20px<br>3. 加入 icon 插槽再减去 20px |


## Attributes/Props 属性

**支持 `ElementUI` 中 [Link](https://element.eleme.io/#/zh-CN/component/link) 的所有属性：`type` / `underline` / `disabled` / `href` / `icon` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |
