## aile-ui/table

### Intro 简介

`aile-ui/table` 是一款表格组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，无需繁琐的模板代码，所有的表格列配置项均可通过属性传递，使你的代码更干净。

- 通过 `columns` 属性来实现表格列的配置，灵活的 `JSX` 语法便于高度自定义表格组件；
- 支持全局配置属性，包括 `config`、`table`、`column`、`pagination`；
- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `ElementUI` 中的 `Table` `Pagination` 文档板块，包含自定义 `slot` 插槽，上手更快；
- `column` 每列配置，最低限度仅传递 `prop` 和 `label` 属性，就可实现标准值输出，也可以使用 `formatter` 或 `render` 属性进行格式化输出；

### Install 安装

通过 `npm` 或者 `yarn` 安装项目

```bash
npm i aile-ui

# 或者
yarn add aile-ui
```

### Options 配置项

配置项内容可在全局引入时设置，或者直接使用 `<aile-table {...options} />` ，需注意：直接使用的优先级高于全局配置

|    参数     | 数据类型 | 默认值 |                                    说明                                     |
| :---------: | :------: | :----: | :-------------------------------------------------------------------------: |
|   config    |  Object  |   {}   |                       [Config配置项](#config-配置项)                        |
|    table    |  Object  |   {}   |      [ElTable Props](https://element.eleme.io/#/zh-CN/component/table)      |
| tableColumn |  Object  |   {}   |   [ElTabelColumn Props](https://element.eleme.io/#/zh-CN/component/table)   |
| pagination  |  Object  |   {}   | [ElPagination Props](https://element.eleme.io/#/zh-CN/component/pagination) |

### Config 配置项

|        参数         | 数据类型 |   默认值    |      可选值      |                    说明                    |
| :-----------------: | :------: | :---------: | :--------------: | :----------------------------------------: |
|    cellEmptyText    |  String  |     '-'     |        -         |      表格单元数据为空时显示的文本内容      |
| paginationMarginTop |  Number  |      0      |        -         |     设置分页器与表格的间距，单位是'px'     |
|    tablePadding     |  Number  |      0      |        -         |   Table 的 Padding 值，计算表格高度会用    |
|     heightMode      |  String  | 'maxHeight' | height/maxHeight |              自适应高度的选择              |
|        merge        |  Array   |      -      |        -         | 自动合并，值为需要合并的column中prop的数组 |

### Table Attributes 表格属性

仅展示必填项和新增项，其余参数见 [Element Doc Table #Table-column Attributes](https://element.eleme.io/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.io/#/zh-CN/component/pagination)

|    参数     | 数据类型 | 是否必须 | 默认值 |                                                      说明                                                       |
| :---------: | :------: | :------: | :----: | :-------------------------------------------------------------------------------------------------------------: |
|    data     |  Array   |    是    |   []   |                                                    表格数据                                                     |
|   columns   |  Array   |    是    |   []   |                                        表格列配置项，具体内容见下方说明                                         |
|   config    |  Number  |    否    |   {}   |                                         [Config配置项](#config-配置项)                                          |
| pagination  |  Object  |    否    |  null  |                   [ElPagination Props](https://element.eleme.io/#/zh-CN/component/pagination)                   |
|    table    |  Object  |    否    |   {}   |                        [ElTabe Props](https://element.eleme.io/#/zh-CN/component/table)                         |
| tableColumn |  Object  |    否    |   {}   | [ElTabelColumn Props](https://element.eleme.io/#/zh-CN/component/table) 针对该表格下的所有ElTableColumn进行设置 |

### Table Events 表格事件

仅展示新增事件，其余事件见 [Element Doc Table #Table Events](https://element.eleme.io/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.io/#/zh-CN/component/pagination)

注意：由于 ElPagination 和 ElTable 具有相同的事件：`current-change`，所以对 `ElPagination` 进行调整：

|       事件名        |                说明                |    参数     |
| :-----------------: | :--------------------------------: | :---------: |
| page-current-change | 同 el-pagination 的 current-change | currentPage |
### Table Methods 表格方法

支持全部 `el-table` 和 `el-pagination` 方法，详见 [Element Doc Table #Table Methods](https://element.eleme.io/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.io/#/zh-CN/component/pagination)

### Table Slot 表格插槽

|    name    |                                   说明                                   |
| :--------: | :----------------------------------------------------------------------: |
|   append   | 插入至表格最后一行之后的内容。若表格有合计行，该 slot 会位于合计行之上。 |
|   empty    |                         空数据时显示的文本内容。                         |
| pagination |             分页器中的自定义内容，需要在 layout 中列出 slot              |

### Column 列配置项

仅展示必填项和新增项，其余参数见 [Element Doc Table #Table-column Attributes](https://element.eleme.io/#/zh-CN/component/table)

|     参数     |         数据类型         | 是否必须 |               说明                |
| :----------: | :----------------------: | :------: | :-------------------------------: |
|    render    | Function(context)/VNode  |    否    |   自定义渲染内容,可选返回 VNode   |
| renderHeader | Function(context)/VNode  |    否    | 自定义表头渲染内容,可选返回 VNode |
|  formatter   | Function(context)/string |    否    |  自定义渲染内容，可选返回字符串   |
|     show     |    Function()/boolean    |    否    |      是否渲染该列，默认渲染       |

### Quick Start 快速开始

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入 ElementUI 组件后方可正常使用

引入模块并初始化配置

```ts
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/libs/theme-chalk/index.css';
Vue.use(ElementUI);

// 全量引入
import AileUI from 'aile-ui';
Vue.use(AileUI, {
  table: {
    config: {
      cellEmptyText: 'No Data'
    },
    table: {
      stripe: true,
      rowClassName: 'kitty-row'
    },
    column: {
      align: 'center',
      headerAlign: 'center'
    },
    pagination: {
      layout: '->,prev,pager,next,total'
    }
  }
});

// or 按需引入
import AileTable from 'aile-ui/lib/table';
Vue.use(AileTable, {
  config: {
    cellEmptyText: 'No Data'
  },
  table: {
    stripe: true,
    rowClassName: 'kitty-row'
  },
  column: {
    align: 'center',
    headerAlign: 'center'
  },
  pagination: {
    layout: '->,prev,pager,next,total'
  }
});
```

标准使用方式

```ts
<template>
  <div style="width: 100vw; height: 100vh">
    <aile-table
      :data="tableData"
      :columns="tableColumns"
      :config="{
        merge: ['gender'],
      }"
      :table="{
        stripe: true,
        highlightCurrentRow: true,
      }"
      :table-column="{
        align: 'center',
        headerAlign: 'center',
      }"
      :pagination="{
        layout: 'slot, -> , prev, pager, next, jumper, sizes, total',
        total,
        pageSize,
      }"
      @current-change="handleCurrentChange"
      @page-current-change="handlePageChange"
      @size-change="handleSizeChange"
      v-model:currentPage="currentPage"
    >
      <template #pagination>
        <span>Guess Page Game</span>
      </template>
      <template #empty>
        <span>Guess Page Game</span>
      </template>
    </aile-table>
  </div>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      customHeader: "年龄",
      cache: {},
    };
  },
  computed: {
    tableData() {
      const res = [];
      for (let idx = 0; idx < 30; idx++) {
        res.push({
          name: "aile" + idx,
          age: idx,
          gender: idx < 10 ? "male" : "female",
          hobby: ["html", "css", "js"],
          isEdit: false,
        });
      }
      return res;
    },
    total() {
      return this.tableData.length;
    },
    tableColumns() {
      return [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "custom_hidden",
          label: "自定义隐藏",
          show: () => false,
        },
        {
          prop: "age",
          formatter: (row, column, value) => {
            if (value || value === 0) {
              return value + "岁";
            }
          },
          renderHeader: (ctx) => {
            return <el-input v-model={this.customHeader} size="mini" />;
          },
        },
        {
          prop: "gender",
          label: "性别",
          render: (ctx) => {
            const genderNameMap = { male: "男生", female: "女生" };
            if (ctx.row.gender) {
              return (
                <el-tag
                  type={ctx.row.gender === "male" ? "danger" : "success"}
                  size="mini"
                >
                  {genderNameMap[ctx.row.gender]}
                </el-tag>
              );
            }
          },
        },
        {
          prop: "hobby",
          label: "兴趣",
          render: (ctx) => {
            if (ctx.row.isEdit) {
              const options = [
                {
                  name: "前端",
                  id: "front",
                  children: [
                    {
                      name: "HTML",
                      id: "html",
                    },
                    {
                      name: "JavaScript",
                      id: "js",
                    },
                    {
                      name: "CSS",
                      id: "css",
                    },
                  ],
                },
                {
                  name: "后端",
                  id: "back",
                  children: [
                    {
                      name: "JAVA",
                      id: "java",
                    },
                    {
                      name: "Golang",
                      id: "golang",
                    },
                    {
                      name: "Python",
                      id: "python",
                    },
                  ],
                },
              ];
              const cascaderProps = {
                options,
                props: {
                  checkStrictly: true,
                  label: "name",
                  value: "id",
                  multiple: true,
                  emitPath: false,
                },
                clearable: true,
                filterable: true,
              };
              return (
                <el-cascader
                  {...{ props: cascaderProps }}
                  v-model={ctx.row.hobby}
                />
              );
            }

            if (!ctx.row.hobby || !ctx.row.hobby.length) return;

            const hobbyList = ctx.row.hobby.map((item) => (
              <el-tag size="mini" style="margin-right: 5px;">
                {item}
              </el-tag>
            ));
            return <div>{hobbyList}</div>;
          },
        },
        {
          prop: "operate",
          label: "操作",
          align: "center",
          headerAlign: "center",
          render: (ctx) => {
            const handleEdit = () => {
              this.cache[ctx.row.name] = JSON.parse(JSON.stringify(ctx.row));
              ctx.row.isEdit = true;
            };
            const handleCancel = () => {
              Object.assign(ctx.row, this.cache[ctx.row.name]);
              ctx.row.isEdit = false;
            };
            const handleConfirm = () => {
              setTimeout(() => {
                console.log("修改成功");
                ctx.row.isEdit = false;
              });
            };
            if (!ctx.row.isEdit) {
              return (
                <el-button type="primary" size="mini" onClick={handleEdit}>
                  编辑
                </el-button>
              );
            }
            return (
              <el-button-group>
                <el-button type="success" size="mini" onClick={handleConfirm}>
                  保存
                </el-button>
                <el-button type="info" size="mini" onClick={handleCancel}>
                  取消
                </el-button>
              </el-button-group>
            );
          },
        },
      ];
    },
  },
  methods: {
    handleCurrentChange(val, old) {
      console.log("row", val, old);
    },
    handlePageChange(val) {
      console.log("page: ", val);
    },
    handleSizeChange(val) {
      console.log("size: ", val);
      this.pageSize = val;
      this.currentPage = 1;
    },
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>

```
