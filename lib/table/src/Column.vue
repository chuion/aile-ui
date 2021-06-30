<template>
  <el-table-column v-bind="mergeAttrs" v-on="$listeners">
    <template #header="slotProps">
      <aile-render
        v-if="column.renderHeader"
        :scope="slotProps"
        :render="column.renderHeader"
        :cellEmptyText="mergeConfig.cellEmptyText"
      />
      <span v-else>{{ slotProps.column.label }}</span>
    </template>

    <template #default="slotProps">
      <aile-render
        :scope="slotProps"
        :render="column.render"
        :cellEmptyText="mergeConfig.cellEmptyText"
      />
      <template v-if="column.children">
        <aile-column
          v-for="(col, index) in column.children"
          :key="index"
          :column="col"
          :table-column="tableColumn"
        />
      </template>
    </template>
  </el-table-column>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
import AileRender from './Render';
import { DefaultTableColumnAttrs } from './config.js';
import { isEmpty } from '../../../utils/index.js';

const cellForced = {
  selection: {
    renderHeader: ({ store }) => {
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0;
      }
      return (
        <el-checkbox
          disabled={isDisabled()}
          indeterminate={
            store.states.selection.value.length > 0 &&
            !store.states.isAllSelected.value
          }
          onUpdate:modelValue={store.toggleAllSelection}
          modelValue={store.states.isAllSelected.value}
        />
      );
    },
    renderCell: ({ row, column, store, $index }) => {
      if (!store) return;
      return (
        <el-checkbox
          modelValue={store.isSelected(row)}
          disabled={
            column.selectable
              ? !column.selectable.call(null, row, $index)
              : false
          }
          onChange={() => {
            store.commit('rowSelectedChanged', row);
          }}
          onClick={event => event.stopPropagation()}
        />
      );
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: ({ column }) => column.label || '#',
    renderCell: function({ column, $index }) {
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }
      return <div>{i}</div>;
    },
    sortable: false,
    resizable: false
  },
  expand: {
    renderHeader: ({ column }) => column.label || '',
    renderCell: ({ row, store }) => {
      if (!store) return;
      const classes = ['el-table__expand-icon'];
      if (store.states.expandRows.value.indexOf(row) > -1) {
        classes.push('el-table__expand-icon--expanded');
      }
      const callback = function(e) {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      return (
        <div class={classes} onClick={callback}>
          <i class='el-icon el-icon-arrow-right' />
        </div>
      );
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
};

export default {
  name: 'AileColumn',

  components: { AileRender },
  inheritAttrs: false,
  props: {
    // <aile-table /> 配置项
    mergeConfig: {
      type: Object,
      default: () => ({})
    },
    // 当前列
    column: {
      type: Object,
      default: () => ({})
    },
    // <el-table-column /> 属性
    tableColumn: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 需要挂载到 <el-table-column /> 上的属性
    mergeAttrs() {
      const res = {
        ...DefaultTableColumnAttrs, // 默认属性
        ...this.$aileTable.tableColumn, // 全局属性
        ...this.tableColumn, // 表格设置的列属性
        ...this.column // 列属性
      };
      ['render', 'renderHeader', 'formatter', 'show'].forEach(key => {
        delete res[key];
      });
      return res;
    }
  },
  watch: {
    column: {
      handler() {
        this.generateRender();
      },
      immediate: true
    }
  },
  methods: {
    /** ElTable原生函数：获取当前cell对应的数据 */
    getPropByPath(obj, path, strict) {
      let tempObj = obj;
      path = path.replace(/\[(\w+)\]/ug, '.$1');
      path = path.replace(/^\./u, '');

      const keyArr = path.split('.');
      let i = 0;
      for (i; i < keyArr.length - 1; i++) {
        if (!tempObj && !strict) break;
        const key = keyArr[i];

        if (key in tempObj) {
          tempObj = tempObj[key];
        } else {
          if (strict) {
            throw new Error('please transfer a valid prop path to form item!');
          }
          break;
        }
      }
      return {
        o: tempObj,
        k: keyArr[i],
        v: (tempObj || {})[keyArr[i]]
      };
    },

    /** 构建render函数 */
    generateRender() {
      // 存在特殊类型，采用预设的render
      if (this.column.type) {
        this.column.renderHeader = cellForced[this.column.type].renderHeader;
        this.column.render = this.column.render || cellForced[this.column.type].renderCell;
        return;
      }

      // 存在formatter，构建相应render函数
      if (this.column.formatter) {
        this.column.render = scope => {
          const { row, column, $index } = scope;
          if (isEmpty(column)) return;
          const property = column.property;
          const cellValue = property && this.getPropByPath(row, property, false).v;

          let value = this.column.formatter(row, column, cellValue, $index);
          if (isEmpty(value)) {
            value = this.mergeConfig.cellEmptyText;
          }
          return <span class='aile-table-cell__formatter'>{value}</span>;
        };
        return;
      }

      // 不存在render，构建包含默认文字的render函数
      if (!this.column.render) {
        this.column.render = scope => {
          let value = scope.row[scope.column.property];
          if (isEmpty(value)) {
            value = this.mergeConfig.cellEmptyText;
          }
          return <span>{value}</span>;
        };
      }
    }
  }
};
</script>

<style>
.aile-table .el-table__body-wrapper .cell.el-tooltip span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  white-space: nowrap;
}
</style>
