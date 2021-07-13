<template>
  <div
    ref="aileTableRef"
    class="aile-table"
  >
    <section
      class="aile-table__main"
      :style="{ padding: mergeConfig.tablePadding + 'px' }"
    >
      <el-table
        ref="elTable"
        v-bind="mergeTableAttrs"
        :data="data"
        :span-method="mergeConfig.merge ? mergeMethod : mergeTableAttrs.spanMethod"
        v-on="$listeners"
      >
        <template v-for="(item, index) in columns">
          <aile-column
            v-if="!item.show || item.show()"
            :key="index"
            :column="item"
            :table-column="tableColumn"
            :merge-config="mergeConfig"
          />
        </template>
        <template #append>
          <slot name="append" />
        </template>
        <template #empty>
          <slot name="empty" />
        </template>
      </el-table>
    </section>
    <section
      v-if="pagination"
      class="aile-table__footer"
      :style="{ marginTop: mergeConfig.paginationMarginTop + 'px' }"
    >
      <el-pagination
        ref="elPagination"
        v-bind="mergePaginationAttrs"
        v-on="$listeners"
        @current-change="onPaginationCurrentChange"
      >
        <slot name="pagination" />
      </el-pagination>
    </section>
  </div>
</template>

<script>
import AileColumn from './Column.vue';
import debounce from './debounce';

import {
  DefaultConfig,
  DefaultPaginationAttrs,
  DefaultTableAttrs
} from './config.js';
import { mergeAttrs } from '../../../utils';

export default {
  name: 'AileTable',
  components: { AileColumn },

  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    // aile-table 配置项
    config: {
      type: Object,
      default: () => ({})
    },
    // el-table 属性
    table: {
      type: Object,
      default: () => ({})
    },
    // el-table-column 属性
    tableColumn: {
      type: Object,
      default: () => ({})
    },
    // el-pagination 属性
    pagination: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      mergeLine: {},
      mergeIndex: {},
      tableHeight: null
    };
  },
  computed: {
    // 配置项
    mergeConfig() {
      return {
        ...DefaultConfig,
        ...this.$aileTable.config,
        ...this.config
      };
    },

    // el-table 属性
    mergeTableAttrs() {
      const res = mergeAttrs(
        DefaultTableAttrs, // 默认属性
        (this.$aileTooltip.table || {}), // 全局属性
        this.$attrs,
        (this.table || {}) // 组件属性
      );
      const userAttrs = mergeAttrs(this.$attrs);
      if (userAttrs.height || userAttrs.maxHeight) {
        return res;
      }
      return {
        ...res,
        [this.mergeConfig.heightMode]: this.tableHeight + 'px' // 计算表格高度
      };
    },

    // el-pagination 属性
    mergePaginationAttrs() {
      return mergeAttrs(
        DefaultPaginationAttrs, // 默认属性
        (this.$aileTooltip.pagination || {}), // 全局属性
        this.$attrs,
        (this.pagination || {}) // 组件属性
      );
    },

    dataLength() {
      return this.data ? this.data.length : 0;
    }
  },
  watch: {
    'mergeConfig.merge'() {
      this.getMergeArr(this.data, this.merge);
    },
    dataLength() {
      this.getMergeArr(this.data, this.merge);
    },
    pagination() {
      this.resize(true);
    }
  },
  created() {
    this.getMergeArr(this.data, this.merge);
  },
  mounted() {
    this.resize(true);
    window.addEventListener('resize', this.resize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    /** 调整表格高度 */
    resize(immediate) {
      // 计算表格实际高度
      const _resizeHeight = () => {
        const userAttrs = mergeAttrs(this.$attrs);
        if (userAttrs.height || userAttrs.maxHeight) {
          this.tableHeight = userAttrs.height || userAttrs.maxHeight;
          return;
        }
        const total = (this.$refs.aileTableRef || {}).clientHeight; // 容器总高度
        const inside = this.mergeConfig.tablePadding * 2; // 表格上下padding之和
        let result = total - inside;
        if (this.pagination) {
          const pagination = 40 + this.mergeConfig.paginationMarginTop; // 分页器高度
          result -= pagination;
        }
        this.tableHeight = result;
      };

      // 立即执行
      if (immediate === true) {
        _resizeHeight();
        return;
      }

      // 或者防抖执行
      debounce(() => {
        _resizeHeight();
      }, 700)();
    },

    /** 监听 <el-pagination /> 的 current-change 事件，因与 <el-table /> 存在相同事件，所以调整事件名称 */
    onPaginationCurrentChange(currentPage) {
      this.$refs.elTable.$el.scrollTop = 0;
      this.$refs.elTable.setCurrentRow();
      this.$emit('page-current-change', currentPage);
    },

    /** 以下方法为动态合并表格功能
     * ————————————————————————————————————————————————
     */

    getMergeArr(tableData) {
      if (!this.mergeConfig.merge) return;
      this.mergeLine = {};
      this.mergeIndex = {};
      this.mergeConfig.merge.forEach(item => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            this.mergeIndex[item] = this.mergeIndex[item] || [];
            this.mergeIndex[item].push(1);
            this.mergeLine[item] = 0;
          } else if (data[item] === tableData[i - 1][item]) {
            this.mergeIndex[item][this.mergeLine[item]] += 1;
            this.mergeIndex[item].push(0);
          } else {
            this.mergeIndex[item].push(1);
            this.mergeLine[item] = i;
          }
        });
      });
    },
    mergeMethod({ column, rowIndex }) {
      const index = this.mergeConfig.merge.indexOf(column.property);
      if (index > -1) {
        const _row = this.mergeIndex[this.mergeConfig.merge[index]][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },

    /**
     * 以下为ElTable原生方法的快捷入口
     * 可以通过 $refs.aileTable[方法名]直接调用
     * 也可以直接 $refs.aileTable.$refs.elTable[方法名]调用
     * ________________________________________________
     */

    clearSelection() {
      return this.$refs.elTable.clearSelection();
    },
    toggleRowSelection(row, selected) {
      return this.$refs.elTable.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      return this.$refs.elTable.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      return this.$refs.elTable.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      return this.$refs.elTable.setCurrentRow(row);
    },
    clearSort() {
      return this.$refs.elTable.clearSort();
    },
    clearFilter(columnKey) {
      return this.$refs.elTable.clearFilter(columnKey);
    },
    doLayout() {
      return this.$refs.elTable.doLayout();
    },
    sort(prop, order) {
      return this.$refs.elTable.sort(prop, order);
    }
  }
};
</script>

<style scoped>
.aile-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.aile-table__main {
  width: 100%;
}
.aile-table__footer {
  width: 100%;
  height: 40px;
  background-color: #fff;
  padding: 5px 10px;
  box-sizing: border-box;
}
</style>
