# Input 输入框

通过鼠标或键盘输入字符

:::tip 简介
`aile-ui/input` 是一款 **Input** 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，使用组件时，在原 `ElInput` 属性的基础上新增 `config` 属性，增强 Input 的功能。
:::

## 基础用法

支持 `element-ui` 中的 [Input文档板块](https://element.eleme.io/#/zh-CN/component/input) 的所有使用方式，包括Props/Methods/Slots/Events等，你可以认为：`<aile-input />` 就是 `<el-input />`。

## 清除前后空格

:::demo 开启 `config.lazyTrim` 会在 `aile-input` 触发 `change` 事件前进行前后空格的清理
```html
<el-row class="demo-input demo-input-rows">
  <el-col :span="8">
    <div class="sub-title">普通输入框</div>
    <aile-input class="inline-input" v-model="value1" />
  </el-col>
  <el-col :span="8">
    <div class="sub-title">使用 trim 修饰符</div>
    <aile-input class="inline-input" v-model.trim="value2" />
  </el-col>
  <el-col :span="8">
    <div class="sub-title">开启 config.lazyTrim</div>
    <aile-input
      v-model="value3"
      class="inline-input"
      :config="config"
    />
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      value1: '你好',
      value2: '美丽新世界',
      value3: '爱了',
      config: {
        lazyTrim: true
      }
    }
  }
}
</script>
```
:::

## 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileInput` 配置如下属性：

|           参数           | 数据类型 | 默认值 |     说明      |
| :----------------------: | :------: | :----: | :-----------: |
| [config](#config-配置项) |  Object  |   {}   |    配置项     |
|          attrs           |  Object  |   {}   | ElInput Props |

#### config 配置项

|   参数   | 数据类型 | 默认值 |   可选值   |                  说明                   |
| :------: | :------: | :----: | :--------: | :-------------------------------------: |
|  width   |  string  |   -    |     -      |          输入框宽度（如 100%）          |
| lazyTrim | boolean  | false  | true/false | 是否在Input触发change事件前进行trim处理 |
