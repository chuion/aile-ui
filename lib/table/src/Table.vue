<template>
  <div
    ref="aileTableRef"
    class="aile-table"
    :class="[calcCustomClassName]"
  >
    <section
      class="aile-table__main"
      :class="[calcCustomClassName && calcCustomClassName + '__main']"
      :style="{ padding: calcTablePadding + 'px' }"
    >
      <el-table
        ref="elTable"
        v-bind="tableAttrs"
        :height="tableHeight"
        :data="data"
        :span-method="merge ? mergeMethod : spanMethod"
        @current-change="handleTableCurrentChange"
        v-on="$listeners"
      >
        <template v-for="(item, index) in column">
          <aile-column
            v-if="!item.show || item.show()"
            :key="index"
            v-bind="$attrs"
            :column="item"
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
      :class="[calcCustomClassName && calcCustomClassName + '__footer']"
      :style="{ marginTop: calcPagerOffsetHeight + 'px' }"
    >
      <el-pagination
        v-bind="$attrs"
        :layout="layout"
        @current-change="handleCurrentPageChange"
        v-on="$listeners"
      >
        <template>
          <slot name="pagination" />
        </template>
      </el-pagination>
    </section>
  </div>
</template>

<script>
import AileColumn from './Column';
import debounce from './debounce';

const PAGER_HEIGHT = 40;

export default {
  name: 'AileTable',

  components: { AileColumn },
  inheritAttrs: false,
  props: {
    column: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    spanMethod: {
      type: Function,
      default: function() {}
    },
    pagination: {
      type: Boolean,
      default: false
    },
    merge: {
      type: Array,
      default: () => []
    },
    layout: {
      type: String,
      default: '->,prev,pager,next,total'
    },
    pagerOffset: {
      type: Number,
      default: 0
    },
    tablePadding: {
      type: Number,
      default: undefined
    },
    customClassName: {
      type: String,
      default: ''
    },
    heightMode: {
      type: String,
      default: 'height'
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
    dataLength() {
      return this.data ? this.data.length : 0;
    },
    calcPagerTotalHeight() {
      return this.pagination ? PAGER_HEIGHT + this.calcPagerOffsetHeight + this.calcTablePadding * 2 : this.calcTablePadding * 2;
    },
    calcTablePadding() {
      if (this.tablePadding === undefined) {
        return this.$aileTable.tablePadding || 0;
      }
      return this.tablePadding || 0;
    },
    calcPagerOffsetHeight() {
      return this.pagerOffset || this.$aileTable.pagerOffset;
    },
    calcCustomClassName() {
      return this.customClassName || this.$aileTable.customClassName;
    },
    calcHeightMode() {
      return this.heightMode || this.$aileTable.heightMode;
    },
    tableAttrs() {
      return {
        ...this.$attrs,
        [this.calcHeightMode]: this.tableHeight
      };
    }
  },
  watch: {
    merge() {
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
    this.$once('hook:beforeDestroy', function() {
      window.removeEventListener('resize', this.resize);
    });
  },
  methods: {
    resize(immediate) {
      const _resizeHeight = () => {
        this.tableHeight = this.$refs.aileTableRef.clientHeight - this.calcPagerTotalHeight;
      };
      if (immediate === true) {
        _resizeHeight();
        return;
      }
      debounce(() => {
        _resizeHeight();
      }, 700)();
    },
    clearSelection() {
      this.$refs.elTable.clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row);
    },
    clearSort() {
      this.$refs.elTable.clearSort();
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey);
    },
    doLayout() {
      this.$refs.elTable.doLayout();
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order);
    },
    getMergeArr(tableData, merge) {
      if (!merge) return;
      this.mergeLine = {};
      this.mergeIndex = {};
      merge.forEach(item => {
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
      const index = this.merge.indexOf(column.property);
      if (index > -1) {
        const _row = this.mergeIndex[this.merge[index]][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    handleCurrentPageChange(page) {
      this.$refs.elTable.bodyWrapper.scrollTop = 0;
      this.$refs.elTable.setCurrentRow();
      this.$emit('page-change', page);
    },
    handleTableCurrentChange(row, oldRow) {
      this.$emit('table-current-change', row, oldRow);
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
