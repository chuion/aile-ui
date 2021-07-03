# Card 卡片

将信息聚合在卡片容器中展示，适合直接使用，或者作为二次开发的模板。

## 基础用法

包含标题，内容和操作。

:::demo Card 组件包括 `title`、`sub` 和 `body` 部分，`title`可通过prop的方式传入，也可通过具名插槽传入。
```html
<el-row class="demo-card" :gutter="10">
  <el-col :span="8">
    <aile-card title="人生海海">
      <h3>山山而川</h3>
    </aile-card>
  </el-col>
  <el-col :span="8">
    <aile-card title="蒹葭苍苍">
      <aile-link type="success" slot="sub">伊人在这</aile-link>
      <h3>白露为霜</h3>
    </aile-card>
  </el-col>
  <el-col :span="8">
    <aile-card title="人生海海" :loading="loading">
      <div slot="title">
        <i class="el-icon-edit"></i>
        <span>编辑</span>
      </div>
      <el-button :type="loading ? 'success' : 'primary'" size="mini" slot="sub" @click="onClickLoading">
        {{ loading ? '加载完成' : '开始加载' }}
      </el-button>
      <h3>风趣幽默</h3>
    </aile-card>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  methods: {
    onClickLoading() {
      this.loading = !this.loading
    }
  }
}
</script>

<style>
.demo-card .el-col {
  height: 200px;
}
</style>
```
:::

## 简单卡片和占位区域

卡片可以只有内容区域。

:::demo
```html
<el-row class="demo-card" :gutter="10">
  <el-col :span="8">
    <aile-card  body-class="demo-card-column">
      <h3>强者会赢</h3>
      <h3>仅此而已</h3>
    </aile-card>
  </el-col>
  <el-col :span="8">
    <aile-card title="普通的标题" :is-empty="true">
      <h3>不会显示我了 T.T</h3>
    </aile-card>
  </el-col>
  <el-col :span="8">
    <aile-card title="仍然是普通的标题" :is-empty="true">
      <h3>不会显示我了 T.T</h3>
      <div class="demo-card-empty" slot="empty">
        <i class="el-icon-sunset" />
        <span>没有数据啦~</span>
      </div>
    </aile-card>
  </el-col>
</el-row>

<style>
.demo-card-column {
  display: flex;
  flex-direction: column;
}
.demo-card-empty {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
```
:::

## 卡片阴影

可对阴影的显示进行配置。

:::demo 通过`shadow`属性设置卡片阴影出现的时机：`always`、`hover`或`never`。
```html
<el-row :gutter="12" class="demo-card">
  <el-col :span="8">
    <aile-card shadow="always" :body-style="{ 'justify-content': 'center' }">
      总是显示
    </aile-card>
  </el-col>
  <el-col :span="8">
    <aile-card shadow="hover" :body-style="{ 'justify-content': 'center' }">
      鼠标悬浮时显示
    </aile-card>
  </el-col>
  <el-col :span="8">
    <aile-card shadow="never" :body-style="{ 'justify-content': 'center' }">
      从不显示
    </aile-card>
  </el-col>
</el-row>


<style>
.demo-card .el-col {
  height: 200px;
}
</style>
```
:::

## 可切换Tab的卡片

卡片标题区域支持Tab切换

:::demo 当 `title` 的值为数组时，将渲染 `<el-tab>` 生成的标题，数组格式支持 `string` 和 `{label: string, value: any}`，切换标题会触发 `change` 事件，参数为当前选择的标签 `value`。设置 `active-title` 可以手动切换当前活跃的Tab页。另外，如果 `lazyLoad` 为 true，Card组件将不会自动渲染活跃页，需要等待开发者手动更改 `active-title` 的值才会渲染组件。
```html
<el-row class="demo-card" :gutter="10">
  <el-col :span="8">
    <aile-card :title="title1" @change="onChangeTitle1">
      <h3 v-show="activeTitle1 === '蒹葭苍苍'">白露为霜</h3>
      <h3 v-show="activeTitle1 === '所谓伊人'">在水一方</h3>
    </aile-card>
  </el-col>
  <el-col :span="8">
    <aile-card :title="title2" @change="onChangeTitle2" active-title="go">
      <h3 v-show="activeTitle2 === 'back'">道阻且长</h3>
      <h3 v-show="activeTitle2 === 'go'">宛在水中央</h3>
    </aile-card>
  </el-col>
  <el-col :span="8">
    <aile-card
      :title="title3"
      :lazy-load="true"
      :active-title="activeTitle3"
      @change="onChangeTitle3"
    >
      <el-button type="primary" size="mini" @click="onClick" slot="sub"
        >Who</el-button
      >
      <h3 v-show="activeTitle3 === '单身猫'">Tom</h3>
      <h3 v-show="activeTitle3 === '单身狗'">Snoopy</h3>
    </aile-card>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      title1: ['蒹葭苍苍', '所谓伊人'],
      title2: [
        {
          label: '溯洄从之',
          value: 'back'
        },
        {
          label: '溯游从之',
          value: 'go'
        }
      ],
      title3: ['单身猫', '单身狗'],
      activeTitle1: '',
      activeTitle2: '',
      activeTitle3: ''
    }
  },
  methods: {
    onChangeTitle1(value) {
      this.activeTitle1 = value
    },
    onChangeTitle2(value) {
      this.activeTitle2 = value
    },
    onChangeTitle3(value) {
      this.activeTitle3 = value
    },
    onClick() {
      this.activeTitle3 = this.title3[Math.round(Math.random())]
      console.log('>>> click active title: ', this.activeTitle3)
    }
  }
}
</script>


<style>
.demo-card .el-col {
  height: 200px;
}
</style>
```
:::

## 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileCard` 配置如下属性：

|  参数  | 数据类型 | 默认值 |              说明               |
| :----: | :------: | :----: | :-----------------------------: |
| config |  Object  |   {}   | [config 配置项](#config-配置项) |

### config 配置项

|    参数     |      数据类型       | 默认值 |         可选值         |         说明          |
| :---------: | :-----------------: | :----: | :--------------------: | :-------------------: |
|   shadow    |       string        | always | hover / always / never |   设置阴影显示时机    |
|    width    |       string        |  100%  |           -            |         宽度          |
|   height    |       string        |  100%  |           -            |         高度          |
|  minHeight  |       string        |  auto  |           -            |       最小高度        |
| headerClass | string/array/object |   ''   |           -            |   卡片 HEADER 类名    |
| headerStyle |       object        |   {}   |           -            | 卡片 HEADER 行内样式  |
|  bodyClass  | string/array/object |   ''   |           -            |   卡片 CONTENT 类名   |
|  bodyStyle  |       string        |   ''   |           -            | 卡片 CONTENT 行内样式 |

### Attributes/Props 属性

|    参数     |   数据类型   | 默认值 |                           说明                            |
| :---------: | :----------: | :----: | :-------------------------------------------------------: |
|   config    |    Object    |   {}   |              [config 配置项](#config-配置项)              |
|    title    | string/array |   -    |                       设置卡片标题                        |
|  lazyLoad   |   boolean    | false  | 当 title 为数组时，lazyLoad 如果为 true，则不设置活跃标题 |
|   isEmpty   |   boolean    | false  | isEmpty 为 true 时，显示`<slot name="empty"></slot>`内容  |
|   loading   |   boolean    | false  |     loading 为 true 时，卡片正文部分 v-loading="true"     |
| activeTitle |    string    |   -    |  当 title 为数组时，设置卡片活跃标题，值改变时会切换标题  |

:::tip
Config配置项可通过 Prop 的方式直接传入 AileCard 组件，**优先级高于在config中配置**
另外，`headerClass` `headerStyle` `bodyClass` `bodyStyle` 如果采用 Prop 的方式传入，会和 config 中的对应参数进行合并
:::

### Slot 插槽

| name  |               说明                |
| :---: | :-------------------------------: |
|   —   |           卡片正文内容            |
| title |          卡片左侧主标题           |
|  sub  |          卡片右侧副标题           |
| empty | 卡片 isEmpty 为 true 时展示的内容 |

### Events 事件

| 事件名 |             说明             | 参数  |
| :----: | :--------------------------: | :---: |
| change | 当前活跃的标签发生变化时触发 | title |