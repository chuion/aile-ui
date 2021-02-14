## aile-ui/dialog

### Intro 简介

`aile-ui/dialog` 是一款对话框组件，基于 `vue` 和 `element-ui` 进行的二次封装。
- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `element-ui` 中的 `Dialog` 文档，上手快。
- 支持安装时个性化配置

### Install 安装

通过 `npm` 或者 `yarn` 安装项目，项目提供全组件安装和按需安装，建议使用全组件安装

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入ElementUI组件后方可正常使用

```bash
npm i element-ui aile-ui

# 或者
yarn add element-ui aile-ui
```

### Options 配置项

#### 全局配置项

配置项内容可在全局引入时设置，或者直接使用 `<aile-dialog {...options} />` ，需注意：直接使用的优先级高于全局配置
下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|        参数        | 数据类型 | 默认值 |   可选值   |                说明                |
| :----------------: | :------: | :----: | :--------: | :--------------------------------: |
|       width        |  String  | '50%'  |     -      |            Dialog 宽度             |
|    appendToBody    | Boolean  | false  | true/false | Dialog 自身是否插入至 body 元素上  |
| modalAppendToBody  | Boolean  |  true  | true/false |    遮罩层是否插入至 body 元素上    |
| closeOnClickModal  | Boolean  |  true  | true/false | 是否可以通过点击 modal 关闭 Dialog |
| closeOnPressEscape | Boolean  |  true  | true/false |  是否可以通过按下 ESC 关闭 Dialog  |
|     **config**     |  Object  |   -    |     -      |         详细配置见下方表格         |

#### config 配置项

|      参数       | 数据类型 | 默认值 |      可选值       |         说明         |
| :-------------: | :------: | :----: | :---------------: | :------------------: |
|   showConfirm   | Boolean  | false  |    true/false     | 是否展示【确定】按钮 |
|   showCancel    | Boolean  |  true  |    true/false     | 是否展示【关闭】按钮 |
| confirmLoading  | Boolean  | false  |    true/false     | 【确定】按钮加载状态 |
| confirmDisabled | Boolean  | false  |    true/false     | 【确定】按钮禁用状态 |
|   confirmText   |  String  |  确定  |         -         | 【确定】按钮文字内容 |
|   cancelText    |  String  |  关闭  |         -         | 【关闭】按钮文字内容 |
|   hideFooter    | Boolean  | false  |    true/false     | 是否隐藏底部按钮区域 |
|   footerAlign   |  String  | right  | left/center/right | 底部按钮区域对齐方式 |

### Attributes/Props 属性

**支持 `ElementUI` 中 [Dialog](https://element.eleme.cn/#/zh-CN/component/Dialog) 的所有属性：`visible` / `title` / `width` / `fullscreen` / `top` / `modal` / `modal-append-to-body` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |

### Slot 插槽

**支持 `ElementUI` 中 [Dialog](https://element.eleme.cn/#/zh-CN/component/Dialog) 的所有插槽**

### Events 事件

支持全部 `el-dialog` 方法，仅展示新增事件，其余事件详见 [Element Doc Dialog #Dialog Events](https://element.eleme.cn/#/zh-CN/component/dialog)

| 事件名  |         说明         | 参数  |
| :-----: | :------------------: | :---: |
| confirm | 点击【确定】按钮事件 |  无   |
| cancel  | 点击【关闭】按钮事件 |  无   |

### Quick Start 快速开始

- 引入模块并初始化配置

```ts
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/libs/theme-chalk/index.css'
Vue.use(ElementUI)

// 全量引入
import AileUI from 'aile-ui'
Vue.use(AileUI, {
  Dialog: {
    appendToBody: false,  // Dialog 自身是否插入至 body 元素上
    modalAppendToBody: true,  // 遮罩层是否插入至 body 元素上
    closeOnClickModal: true,  // 是否可以通过点击 modal 关闭 Dialog
    closeOnPressEscape: true,  // 是否可以通过按下 ESC 关闭 Dialog
    config: {
      footerAlign: 'center'
    }
  }
})

// or 按需引入
import AileDialog from 'aile-ui/lib/dialog'
Vue.use(AileDialog, {
  appendToBody: false,  // Dialog 自身是否插入至 body 元素上
  modalAppendToBody: true,  // 遮罩层是否插入至 body 元素上
  closeOnClickModal: true,  // 是否可以通过点击 modal 关闭 Dialog
  closeOnPressEscape: true,  // 是否可以通过按下 ESC 关闭 Dialog
  config: {
    footerAlign: 'center'
  }
})
```

- 标准使用方式

```ts
/**
 * template使用示例
*/
<aile-dialog
  title='示例弹窗标题'
  :config="{
    showConfirm: true,
    confirmText: 'Confirm',
    showCancel: true,
    cancelText: 'Cancel',
    footerAlign: 'center'
  }"
  @confirm="handleConfirm"
/>

/**
 * jsx使用示例
*/
<aile-dialog
  title='示例弹窗标题'
  config={{
    showConfirm: true,
    confirmText: 'Confirm',
    showCancel: true,
    cancelText: 'Cancel',
    footerAlign: 'center'
  }}
  onConfirm={() => {
    console.log('confirm')
  }}
/>
```
