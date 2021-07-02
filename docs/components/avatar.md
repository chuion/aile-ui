# Avatar 头像

用图标、图片或者字符的形式展示用户或事物信息。

:::tip 简介
`aile-ui/avatar` 是一款 **Avatar** 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，使用组件时，在原 `ElAvatar` 属性的基础上新增 `config` 属性，增强 Avatar 的功能。
:::

## 基本用法

支持 `element-ui` 中的 [Avatar文档板块](https://element.eleme.io/#/zh-CN/component/avatar) 的所有使用方式，包括Props/Methods/Slots/Events等，你可以认为：`<aile-avatar />` 就是 `<el-avatar />`。

## 细化的尺寸设置
:::demo `config.size` 仅接受字符串
```html
<el-row class="demo-avatar">
  <el-col :span="8">
    <aile-avatar 
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      fit="cover"
      :config="{
        size: '40px'
      }"
    />
  </el-col>
  <el-col :span="8">
    <aile-avatar 
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      fit="cover"
      :config="{
        size: '50px'
      }"
    />
  </el-col>
  <el-col :span="8">
    <aile-avatar 
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      fit="cover"
      :config="{
        size: '60px'
      }"
    />
  </el-col>
</el-row>
```
:::

## 自定义图片地址处理函数

:::demo `config.srcFormatter` 可在全局设置，也可单独设置进行覆盖，可以根据实际情况增强src功能，比如支持 base64 编码的图片~
```html
<el-row class="demo-avatar">
  <el-col :span="8">
    <aile-avatar 
      src="/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      fit="cover"
      :config="config"
    />
  </el-col>
  <el-col :span="8">
    <aile-avatar 
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      fit="cover"
      :config="config"
    />
  </el-col>
  <el-col :span="8">
    <aile-avatar 
      fit="cover"
      :config="config"
    />
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      config: {
        srcFormatter: src => {
          if (!src) {
            return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          }
          if (src.startsWith('http')) {
            return src;
          }
          return 'https://cube.elemecdn.com' + src
        }
      }
    }
  }
}
</script>
```
:::

## 显示文字

:::demo
```html
<el-row class="demo-avatar">
  <el-col :span="8">
    <aile-avatar
      label="李狗蛋"
      fit="cover"
      :config="config"
    />
  </el-col>
  <el-col :span="8">
    <aile-avatar
      label="Scott"
      fit="cover"
      :config="config"
    />
  </el-col>
  <el-col :span="8">
    <aile-avatar 
      src="xoxo"
      fit="cover"
      :config="config"
    />
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      config: {
        labelFormatter: name => {
          return name.slice(0, 2).toUpperCase()
        },
        labelStyle: {
          fontSize: '16px',
          backgroundColor: '#3381D0'
        },
        labelPlaceholder: 'Unknown',
      }
    }
  }
}
</script>
```
:::

## 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileAvatar` 配置如下属性：

|           参数           | 数据类型 | 默认值 |                                说明                                 |
| :----------------------: | :------: | :----: | :-----------------------------------------------------------------: |
| [config](#config-配置项) |  Object  |   {}   |                               配置项                                |
|          attrs           |  Object  |   {}   | [ElAvatar Props](https://element.eleme.io/#/zh-CN/component/avatar) |

#### config 配置项

|       参数       | 数据类型 |                        默认值                        |               说明               |
| :--------------: | :------: | :--------------------------------------------------: | :------------------------------: |
| labelPlaceholder |  string  |                       Unknown                        |  当图片读取失败时显示的默认标签  |
|  labelFormatter  | function |        name => name.slice(0, 2).toUpperCase()        |          标签格式化函数          |
|    labelStyle    |  object  | { fontSize: '16px';<br> backgroundColor: '#3381D0' } |             标签样式             |
|   srcFormatter   | function |                         ...                          |          src格式化函数           |
|       size       |  string  |                          -                           | avatar尺寸，统一设置width/height |

### Attributes/Props 属性

**支持 `ElementUI` 中 [Avatar](https://element.eleme.io/#/zh-CN/component/Avatar) 的所有属性：`icon` / `size` / `shape` / `src` / `srcSet` / `all` / `fit` 等**，此处仅展示额外属性：

|           参数           | 数据类型 | 默认值 |                说明                |
| :----------------------: | :------: | :----: | :--------------------------------: |
|          label           |  string  |   -    |     当图片读取失败时显示的字符     |
|           src            |  string  |   -    |     图像来源，支持网址和base64     |
| [config](#config-配置项) |  object  |   -    | 配置项，字段同全局config配置项相同 |