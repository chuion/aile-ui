# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

:::tip 简介
`aile-ui/dialog` 是一款 **Dialog** 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，使用组件时，在原 `ElDialog` 属性的基础上新增 `config` 属性，增强 Dialog 的功能。
:::

## 基本用法

支持 `element-ui` 中的 [Dialog文档板块](https://element.eleme.io/#/zh-CN/component/dialog) 的所有使用方式，包括Props/Methods/Slots/Events等，你可以认为：`<aile-dialog />` 就是 `<el-dialog />`。

## 默认效果
可通过初始化配置对默认展示效果进行调整（使用方式：[插件安装](/components/#快速开始)）

:::demo 
```html
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<aile-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
</aile-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
```
:::

## 配置底部操作栏
通过配置 `config` 可以快速设置常用的【确定】及【关闭】按钮，并支持设置 **禁用**，**Loading**等效果

:::demo
```html
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<aile-dialog
  title="听海"
  :visible.sync="dialogVisible"
  width="30%"
  :config="config"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <el-button @click="handleLoading" size="mini" type="warning">
    {{ config.confirmLoading ? '假装请求结束了' : '假装有一个请求' }}
  </el-button>
  <el-button @click="handleDisabled" size="mini" type="danger">
    {{ config.confirmDisabled ? '解除封印' : '封印！' }}
  </el-button>
</aile-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        config: {
          showConfirm: true,
          confirmText: '愉快的决定',
          confirmLoading: false,
          confirmDisabled: false,
          confirmType: 'success',
          showCancel: true,
          cancelText: '我走！',
          cancelType: 'info',
        }
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleLoading() {
        this.config.confirmLoading = !this.config.confirmLoading;
      },
      handleDisabled() {
        this.config.confirmDisabled = !this.config.confirmDisabled;
      },
      handleConfirm(done) {
        this.config.confirmLoading = true
        this.config.confirmDisabled = true
        this.$message.info('假装有一个请求发送出去了')
        setTimeout(() => {
          const isSuccess = Math.random() > 0.5
          if (isSuccess) {
            this.$message.success('假装请求成功了')
            done()
          } else {
            this.$message.error('假装请求失败了')
          }
          this.config.confirmLoading = false
          this.config.confirmDisabled = false
        }, 1000)
      },
      handleCancel(done) {
        this.$message('你不爱我')
        done()
      }
    }
  };
</script>
```
:::

## 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileDialog` 配置如下属性：

|    参数    | 数据类型 | 默认值 | 可选值 |                                说明                                 |
| :--------: | :------: | :----: | :----: | :-----------------------------------------------------------------: |
| **config** |  Object  |   -    |   -    |                   [Config 配置项](#config-配置项)                   |
| **attrs**  |  Object  |   -    |   -    | [ElDialog Props](https://element.eleme.io/#/zh-CN/component/dialog) |


### config 配置项

|      参数       | 数据类型 | 默认值 |               可选值                |         说明         |
| :-------------: | :------: | :----: | :---------------------------------: | :------------------: |
|   showConfirm   | Boolean  | false  |             true/false              | 是否展示【确定】按钮 |
|   showCancel    | Boolean  |  true  |             true/false              | 是否展示【关闭】按钮 |
| confirmLoading  | Boolean  | false  |             true/false              | 【确定】按钮加载状态 |
| confirmDisabled | Boolean  | false  |             true/false              | 【确定】按钮禁用状态 |
|   confirmText   |  String  |  确定  |                  -                  | 【确定】按钮文字内容 |
|   confirmType   |  String  | right  | primary/success/default/danger/info | 【确定】按钮样式类型 |
|   cancelText    |  String  |  关闭  |                  -                  | 【关闭】按钮文字内容 |
|   cancelType    |  String  | right  | primary/success/default/danger/info | 【关闭】按钮样式类型 |
|   hideFooter    | Boolean  | false  |             true/false              | 是否隐藏底部按钮区域 |
|   footerAlign   |  String  | right  |          left/center/right          | 底部按钮区域对齐方式 |

## Attributes/Props 属性

**支持 `ElementUI` 中 [Dialog](https://element.eleme.io/#/zh-CN/component/Dialog) 的所有属性：`visible` / `title` / `width` / `fullscreen` / `top` / `modal` / `modal-append-to-body` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |              说明               |
| :----: | :------: | :----: | :-----------------------------: |
| config |  object  |   -    | [Config 配置项](#config-配置项) |

## Slot 插槽

**支持 `ElementUI` 中 [Dialog](https://element.eleme.io/#/zh-CN/component/Dialog) 的所有插槽**

## Events 事件

支持全部 `el-dialog` 方法，仅展示新增事件，其余事件详见 [Element Doc Dialog #Dialog Events](https://element.eleme.io/#/zh-CN/component/dialog)

| 事件名  |         说明         |               使用方式               |
| :-----: | :------------------: | :----------------------------------: |
| confirm | 点击【确定】按钮事件 | function(done)，done 用于关闭 Dialog |
| cancel  | 点击【关闭】按钮事件 | function(done)，done 用于关闭 Dialog |