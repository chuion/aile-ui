## aile-ui/table

### Intro 简介

`aile-ui/table` 是一款表格组件，基于 `vue` 和 `element-ui` 进行的二次封装，无需繁琐的模板代码，所有的表格列配置项均可通过属性传递，使你的代码更干净。

- 通过 `column` 属性来实现表格列的配置，灵活的 `JSX` 语法便于高度自定义表格组件；
- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `element-ui` 中的 `Table` 文档板块，包含自定义 `slot` 插槽，上手更快；
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

|          参数          | 数据类型 | 默认值 |      可选值       |                 说明                  |
| :--------------------: | :------: | :----: | :---------------: | :-----------------------------------: |
|        colAlign        |  String  | center | left/right/center |         设置表格列的对齐方式          |
|     colHeaderAlign     |  String  | center | left/right/center |          设置表头的对其方式           |
|      colEmptyText      |  String  |  '-'   |         -         |   表格单元数据为空时显示的文本内容    |
|      pagerOffset       |  Number  |   0    |         -         |  设置分页器与表格的间距，单位是'px'   |
|    customClassName     |  String  |   ''   |         -         |           自定义 class 名称           |
|      tablePadding      |  Number  |   0    |         -         | Table 的 Padding 值，计算表格高度会用 |
| colShowOverflowTooltip | Boolean  | false  |    true/false     |    当内容过长被隐藏时显示 tooltip     |
|       heightMode       |  String  | height | height/maxHeight  |           自适应高度的选择            |

### Table Attributes 表格属性

仅展示必填项和新增项，其余参数见 [Element Doc Table #Table-column Attributes](https://element.eleme.cn/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.cn/#/zh-CN/component/pagination)

|          参数          | 数据类型 | 是否必须 | 默认值 |      可选值       |                 说明                  |
| :--------------------: | :------: | :------: | :----: | :---------------: | :-----------------------------------: |
|          data          |  Array   |    是    |   -    |         -         |               表格数据                |
|         column         |  Array   |    是    |   -    |         -         |   表格列配置项，具体内容见下方说明    |
|       pagination       | Boolean  |    否    | false  |         -         |            是否显示分页器             |
|      pagerOffset       |  Number  |    否    |   0    |         -         |  设置分页器与表格的间距，单位是'px'   |
|        colAlign        |  String  |    否    | center | left/right/center |         设置表格列的对齐方式          |
|     colHeaderAlign     |  String  |    否    | center | left/right/center |          设置表头的对其方式           |
|      colEmptyText      |  String  |    否    |  '-'   |         -         |   表格单元数据为空时显示的文本内容    |
|    customClassName     |  String  |    否    |   -    |         -         |           自定义 class 名称           |
|      tablePadding      |  Number  |    否    |   0    |         -         | Table 的 Padding 值，计算表格高度会用 |
| colShowOverflowTooltip | Boolean  |    否    | false  |    true/false     |    当内容过长被隐藏时显示 tooltip     |
|       heightMode       |  String  |    否    | height | height/maxHeight  |           自适应高度的选择            |

### Table Events 表格事件

仅展示新增事件，其余事件见 [Element Doc Table #Table Events](https://element.eleme.cn/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.cn/#/zh-CN/component/pagination)

|        事件名        |                说明                |           参数            |
| :------------------: | :--------------------------------: | :-----------------------: |
|     page-change      | 同 el-pagination 的 current-change |        currentPage        |
| table-current-change |   同 el-table 的 current-change    | currentRow, oldCurrentRow |

### Table Methods 表格方法

支持全部 `el-table` 和 `el-pagination` 方法，详见 [Element Doc Table #Table Methods](https://element.eleme.cn/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.cn/#/zh-CN/component/pagination)

### Table Slot 表格插槽

|    name    |                                   说明                                   |
| :--------: | :----------------------------------------------------------------------: |
|   append   | 插入至表格最后一行之后的内容。若表格有合计行，该 slot 会位于合计行之上。 |
|   empty    |                         空数据时显示的文本内容。                         |
| pagination |             分页器中的自定义内容，需要在 layout 中列出 slot              |

### Column 列配置项

仅展示必填项和新增项，其余参数见 [Element Doc Table #Table-column Attributes](https://element.eleme.cn/#/zh-CN/component/table)

|   参数    |                    数据类型                    | 是否必须 |              说明              |
| :-------: | :--------------------------------------------: | :------: | :----------------------------: |
|   prop    |                     String                     |    是    |      设置表格列的对齐方式      |
|   label   |                     String                     |    是    |       设置表头的对其方式       |
|  render   |           Function(h, context)/VNode           |    否    | 自定义渲染内容,可选返回 VNode  |
| formatter | Function(row, column, cellValue, index)/string |    否    | 自定义渲染内容，可选返回字符串 |
|   show    |               Function()/boolean               |    否    |     是否渲染该列，默认渲染     |

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
  Table: {
    colEmptyText: 'No Data',
    customClassName: 'tt-table',
  },
});

// or 按需引入
import AileTable from 'aile-ui/lib/table';
Vue.use(AileTable, {
  colEmptyText: 'No Data',
  customClassName: 'tt-table',
});
```

标准使用方式

- 所有 `<el-table>` 接受的属性和事件， `<aile-table>` 都接受
- 由于 `<el-table>` 和 `<el-pagination>` 同时存在事件 @current-change , 建议使用 @table-current-change 和 @page-change 区分
- `<aile-table>` 接受一些新属性，见配置清单
- `<aile-table>` 中实现了 `<el-table>` 和 `<el-pagination>` 的所有 `<slot>`
- 需要注意：`<el-pagination>` 的自定义插槽在 `<aile-table>` 中为 `<slot name="pagination">`

```ts
<template>
  <aile-table
    :data="dataList"
    :column="column"
    stripe
    layout="slot, -> , prev, pager, next, jumper, sizes, total"
    :pagination="total / pageSize > 1"
    :total="total"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    highlight-current-row
    hide-on-single-page
    col-align="center"
    col-header-align="left"
    @page-change="handlePageChange"
    @size-change="handleSizeChange"
    @table-current-change="handleCurrentChange"
  >
    <template #pagination>
      <span>Guess Page Game</span>
    </template>
    <template #empty>
      <span>Guess Page Game</span>
    </template>
  </aile-table>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      customHeader: 'AileTable',
      cache: {}
    };
  },
  computed: {
    dataList() {
      const res = [];
      for (let idx = 0; idx < 30; idx++) {
        res.push({
          name: 'aile' + idx,
          // age: idx,
          gender: idx % 2 ? 'male' : 'female',
          hobby: ['html', 'css', 'js'],
          isEdit: false
        });
      }
      return res;
    },
    total() {
      return this.dataList.length;
    },
    column() {
      return [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'custom_hidden',
          label: '自定义隐藏',
          show: () => false
        },
        {
          prop: 'age',
          label: '年龄',
          formatter: (row, column, index) => {
            if (row[column.property]) {
              return row[column.property] + '岁';
            }
          },
          renderHeader: (h, ctx) => {
            return <el-input v-model={this.customHeader} size='mini' />;
          }
        },
        {
          prop: 'gender',
          label: '性别',
          render: (h, ctx) => {
            const genderNameMap = { male: '男生', female: '女生' };
            if (ctx.row.gender) {
              return (
                <el-tag
                  type={ctx.row.gender === 'male' ? 'danger' : 'success'}
                  size='mini'
                >
                  {genderNameMap[ctx.row.gender]}
                </el-tag>
              );
            }
          }
        },
        {
          prop: 'hobby',
          label: '兴趣',
          render: (h, ctx) => {
            if (!ctx.row.hobby || !ctx.row.hobby.length) return;

            if (!ctx.row.isEdit) {
              const hobbyList = ctx.row.hobby.map(item => (
                <el-tag size='mini' style='margin-right: 5px;'>
                  {item}
                </el-tag>
              ));
              return <div>{hobbyList}</div>;
            }

            const options = [
              {
                name: '前端',
                id: 'front',
                children: [
                  {
                    name: 'HTML',
                    id: 'html'
                  },
                  {
                    name: 'JavaScript',
                    id: 'js'
                  },
                  {
                    name: 'CSS',
                    id: 'css'
                  }
                ]
              },
              {
                name: '后端',
                id: 'back',
                children: [
                  {
                    name: 'JAVA',
                    id: 'java'
                  },
                  {
                    name: 'Golang',
                    id: 'golang'
                  },
                  {
                    name: 'Python',
                    id: 'python'
                  }
                ]
              }
            ];
            /**
             * 特别注意
             * 由于 el-cascader 需要传递名称为 'props' 的属性
             * 而在 vue 的 JSX 语法解析中，'props' 属性无法正常传递，所以这里需要特殊处理下
             * 详情可参考 https://www.yuque.com/zeka/vue/vu60wg
             */
            const cascaderProps = {
              options,
              props: {
                checkStrictly: true,
                label: 'name',
                value: 'id',
                multiple: true,
                emitPath: false
              },
              clearable: true,
              filterable: true
            };
            return (
              <el-cascader
                {...{ props: cascaderProps }}
                v-model={ctx.row.hobby}
              />
            );
          }
        },
        {
          prop: 'operate',
          label: '操作',
          align: 'center',
          headerAlign: 'center',
          render: (h, ctx) => {
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
                console.log('修改成功');
                ctx.row.isEdit = false;
              });
            };
            if (!ctx.row.isEdit) {
              return (
                <el-button type='primary' size='mini' onClick={handleEdit}>
                  编辑
                </el-button>
              );
            }
            return (
              <el-button-group>
                <el-button type='success' size='mini' onClick={handleConfirm}>
                  保存
                </el-button>
                <el-button type='info' size='mini' onClick={handleCancel}>
                  取消
                </el-button>
              </el-button-group>
            );
          }
        }
      ];
    }
  },
  methods: {
    handleCurrentChange(val, old) {
      console.log('row', val, old);
    },
    handlePageChange(val) {
      console.log('page: ', val);
    },
    handleSizeChange(val) {
      console.log('size: ', val);
      this.pageSize = val;
      this.currentPage = 1;
    }
  }
};
</script>
```
