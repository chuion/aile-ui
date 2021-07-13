# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

:::tip 简介
`aile-ui/select` 是一款 **Select** 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，使用组件时，在原 `ElSelect` 属性的基础上新增 `config` 属性，增强 Select 的功能。当然，你也可以像使用 `<el-select>` 那样通过插槽放入 `<el-option>` 来使用，It's up to you!
:::

## 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的`el-option`的 value 属性值
```html
<template>
  <aile-select 
    :config="config"
    v-model="value" 
    placeholder="请选择" 
  />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          data: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        value: ''
      }
    }
  }
</script>
```
:::

## 有禁用选项

:::demo 在`config.data`中，设定`disabled`值为 true，即可禁用该选项
```html
<template>
  <aile-select 
    :config="config"
    v-model="value" 
    placeholder="请选择" 
  />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          data: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶',
            disabled: true
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        value: ''
      }
    }
  }
</script>
```
:::

## 禁用状态

选择器不可用状态

:::demo 为`el-select`设置`disabled`属性，则整个选择器不可用
```html
<template>
  <aile-select 
    :config="config"
    disabled
    v-model="value" 
    placeholder="请选择" 
  />
</template>
  
<script>
  export default {
    data() {
      return {
        config: {
          data: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        value: ''
      }
    }
  }
</script>
```
:::

## 可清空单选

包含清空按钮，可将选择器清空为初始状态

:::demo 为`el-select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。
```html
<template>
  <aile-select 
    :config="config"
    v-model="value" 
    clearable
    placeholder="请选择" 
  />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          data: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        value: ''
      }
    }
  }
</script>
```
:::

## 基础多选

适用性较广的基础多选，用 Tag 展示已选项

:::demo 为`el-select`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`collapse-tags`属性将它们合并为一段文字。
```html
<template>
  <aile-select 
    :config="config"
    v-model="value1" 
    multiple
    placeholder="请选择" 
  />

  <aile-select 
    :config="config"
    v-model="value2" 
    multiple
    collapse-tags
    placeholder="请选择" 
  />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          data: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        value1: [],
        value2: []
      }
    }
  }
</script>
```
:::

## 自定义模板

可以自定义备选项，采用原生方案，后续将推出AileUI配置化方案。

:::demo `<aile-select>` 可以和 `<el-select>` 一样，将自定义的 HTML 模板插入`el-option`的 slot 中即可。
```html
<template>
  <aile-select v-model="value" placeholder="请选择">
    <template #default>
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </template>
  </aile-select>
</template>

<script>
  export default {
    data() {
      return {
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

## 分组

备选项进行分组展示，采用原生方案，后续将推出AileUI配置化方案。

:::demo 使用`el-option-group`对备选项进行分组，它的`label`属性为分组名
```html
<template>
  <aile-select v-model="value" placeholder="请选择">
    <template #default>
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-option-group>
    </template>
  </aile-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        value: ''
      }
    }
  }
</script>
```
:::

## 可搜索

可以利用搜索功能快速查找选项

:::demo 为`aile-select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filter-method`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```html
<template>
  <aile-select 
    :config="config"
    v-model="value" 
    filterable
    placeholder="请选择" 
  />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          data: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        value: ''
      }
    }
  }
</script>
```
:::

## 远程搜索：原生版

从服务器搜索数据，输入关键字进行查找
:::demo 为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。`remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。需要注意的是，如果`el-option`是通过`v-for`指令渲染出来的，此时需要为`el-option`添加`key`属性，且其值需具有唯一性，比如此例中的`item.value`。
```html
<template>
  <aile-select
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </aile-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [],
        value: [],
        list: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"]
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return (item.label || '').toLowerCase()
                .indexOf((query || '').toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    }
  }
</script>
```
:::

## 远程搜索：加强版

:::demo 这里通过remoteMethod模拟了远程请求，通常remoteMethod是一个异步请求函数，在 `config` 中可以通过丰富的配置，实现远程搜索的目的，同时通过 `config.scrollable = true` 可以开启 **滚动加载**。
```html
<template>
  <aile-select
    v-model="value1"
    multiple
    filterable
    :config="config1"
    reserve-keyword
    placeholder="请输入关键词"
  />

  <aile-select
    v-model="value2"
    multiple
    filterable
    :config="config2"
    reserve-keyword
    placeholder="请输入关键词"
  />
</template>

<script>
  export default {
    data() {
      return {
        config1: {
          remoteMethod: this.remoteMethod1
        },
        config2: {
          remoteMethod: this.remoteMethod2,
          scrollable: true,
          pageField: 'page',
          sizeField: 'size',
          pageSize: 10,
          respDataField: 'data',
          restTotalField: 'total',
          respFormatter: this.respFormatter,
          queryField: 'keyword'
        },
        value1: [],
        value2: [],
        list: [],
        states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"]
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
    },
    methods: {
      remoteMethod1(query) {
        return new Promise(resolve => {
          if (query.keyword) {
            setTimeout(() => {
              const data = this.list.filter(item => {
                return (item.label || '').toLowerCase()
                  .indexOf((query.keyword || '').toLowerCase()) > -1;
              });
              resolve({
                data,
                total: this.list.length
              })
            }, 200);
          } else {
            resolve([]);
          }
        })
      },
      remoteMethod2(query) {
        return new Promise(resolve => {
          if (query.keyword) {
            console.log('query: ', query)
            const list = this.states.filter(item => item.includes(query.keyword))
            setTimeout(() => {
              resolve({
                data: list.slice((query.page - 1) * query.size, query.page * query.size),
                total: list.length
              })
            }, 200);
          } else {
            resolve([]);
          }
        })
      },
      respFormatter(list) {
        return list.map(item => ({
          label: item,
          value: item
        }))
      }
    }
  }
</script>
```
:::

## 创建条目
可以创建并选中选项中不存在的条目
:::demo 使用`allow-create`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为真。本例还使用了`default-first-option`属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。
```html
<template>
  <aile-select
    v-model="value"
    :config="config"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签"
  />
</template>

<script>
  export default {
    data() {
      return {
        config: {
          data: [{
            value: 'HTML',
            label: 'HTML'
          }, {
            value: 'CSS',
            label: 'CSS'
          }, {
            value: 'JavaScript',
            label: 'JavaScript'
          }]
        },
        value: []
      }
    }
  }
</script>
```
:::

:::tip
如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。
:::

## 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileSelect` 配置如下属性：

|    参数    | 数据类型 |                   说明                   |
| :--------: | :------: | :--------------------------------------: |
| **attrs**  |  Object  | 全局属性配置，支持 `ElSelect` 的所有属性 |
| **config** |  Object  |    支持全局设置 AileSelect config 属性     |

#### config 配置项

|       参数       |            数据类型            |   默认值   |       可选值        |                                                 说明                                                  |
| :--------------: | :----------------------------: | :--------: | :-----------------: | :---------------------------------------------------------------------------------------------------: |
|       data       | Array[String] / Array[Obuject] |     []     |          -          |                           静态无需请求时的备选列表（与 remoteMethod 互斥）                            |
|     isClear      |            Boolean             |   false    |     true/false      |                                           是否清空选项列表                                            |
|      label       |        String/Function         |     —      |          —          |                             设置 el-option 的 label,不传则使用遍历项本身                              |
|      value       |        String/Function         |     —      |          —          |                             设置 el-option 的 value,不传则使用遍历项本身                              |
|     disabled     |        String/Function         |     —      |          —          |                                 判断是否禁用的字段名，默认为 disabled                                 |
|   showTooltip    |        Boolean/Function        |   false    |          —          |                                   设置el-option是否需要显示tooltip                                    |
| tooltipComponent |             String             |   false    |          —          |     设置tooltip采用的组件名称, 默认采用 AileTooltip，如果是按需加载，则需手动配置为 'el-tooltip'      |
|   remoteMethod   |            Function            |     —      |          —          | 请求 API，传入后组件 remote、filterable 将置 true，remote-method 方法将使用该请求 API（与 data 互斥） |
|     nonEmpty     |            Boolean             |   false    |     true/false      |                                         请求参数是否不得为空                                          |
|    scrollable    |            Boolean             |    true    |     true/false      |                                      是否需要无限滚动加载可选项                                       |
|   onceRequest    |            Boolean             |   false    |     true/false      |                                          只初始请求一次数据                                           |
|    queryField    |             String             |     —      |          —          |                                          请求时的动态字段名                                           |
|    pageField     |             String             | page_index |          —          |                                            分页页码参数名                                             |
|    sizeField     |             String             | page_size  |          —          |                                      分页每页显示条目个数参数名                                       |
|     pageSize     |             Number             |     20     |          —          |                                         分页每页显示条目个数                                          |
|  requestParams   |             Object             |     —      |          —          |                                           请求时的静态参数                                            |
|  respDataField   |             String             |    data    |          -          |                                   设置请求返回结果的数据项字段名称                                    |
|  respTotalField  |             String             |   total    |          -          |                                   设置请求返回结果的总数项字段名称                                    |
|  respFormatter   |            Function            |     —      |          —          |                                  请求成功后的回调函数，用于组装数据                                   |
| showEachLoading  |            Boolean             |   false    |     true/false      |                    所有请求均展示loading效果，默认为false，仅展示初次加载的loading                    |

### Attributes/Props 属性

**支持 `ElementUI` 中 [Select](https://element.eleme.io/#/zh-CN/component/select) 的所有属性：`value / v-model` / `multiple` / `disabled` / `clearable` / `collapse-tags` / `multiple-limit` / `filterable` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |

> 注意： 当使用了默认 slot 的可选项时，config 配置无效，组件与 el-select 一般无二

### Slot 插槽

**支持 `ElementUI` 中 [Select](https://element.eleme.io/#/zh-CN/component/select) 的所有插槽**，此处仅展示新增插槽：

|  name  |        说明         |
| :----: | :-----------------: |
|   —    |   Option 组件列表   |
| empty  |   无选项时的列表    |
| prefix | Select 组件头部内容 |

### Events 事件

**支持 `ElementUI` 中 [Select](https://element.eleme.io/#/zh-CN/component/select) 的所有事件**，此处仅展示新增事件：

| 事件名 |          说明          |            参数            |
| :----: | :--------------------: | :------------------------: |
| select |  选中值发生变化时触发  |       目前的选中对象       |
| inited | 首次远程请求结束时出发 | 首次加载完成的下拉列表数组 |

### Methods 方法

**支持 `ElementUI` 中 [Select](https://element.eleme.io/#/zh-CN/component/select) 的所有方法**