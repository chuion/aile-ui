<template>
  <el-table-column
    v-bind="$attrs"
    :prop="column.prop"
    :label="column.label"
    :type="column.type"
    :index="column.index"
    :column-key="column.columnKey"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :sortable="column.sortable || false"
    :sort-method="column.sortMethod"
    :sort-by="column.sortBy"
    :sort-orders="column.sortOrders"
    :resizable="column.resizable || true"
    :formatter="column.formatter"
    :show-overflow-tooltip="calcShowOverflowTooltip"
    :align="calcAlignForCols"
    :header-align="calcHeaderAlignForCols"
    :class-name="column.className"
    :label-class-name="column.labelClassName"
    :selectable="column.selectable"
    :reserve-selection="column.reserveSelection || false"
    :filters="column.filters"
    :filter-placement="column.filterPlacement"
    :filter-multiple="column.filterMultiple"
    :filter-method="column.filterMethod"
    :filtered-value="column.filteredValue"
    v-on="$listeners"
  >
    <template
      slot="header"
      slot-scope="scope"
    >
      <aile-render
        v-if="column.renderHeader"
        :scope="scope"
        :render="column.renderHeader"
      />
      <span v-else>{{ scope.column.label }}</span>
    </template>

    <template slot-scope="scope">
      <aile-render
        :scope="scope"
        :render="column.render"
      />
    </template>

    <template v-if="column.children">
      <aile-column
        v-for="(col, index) in column.children"
        :key="index"
        :column="col"
      />
    </template>
  </el-table-column>
</template>

<script>
import AileRender from './Render';
// import forced from './forced.js';
export default {
  name: 'AileColumn',

  components: { AileRender },
  inheritAttrs: false,
  props: {
    column: {
      type: Object,
      default: () => ({})
    },
    colEmptyText: {
      type: String,
      default: '-'
    },
    colAlign: {
      type: String,
      default: ''
    },
    colHeaderAlign: {
      type: String,
      default: ''
    },
    colShowOverflowTooltip: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    calcAlignForCols() {
      return (
        this.column.align ||
        this.colAlign ||
        this.$aileTable.colAlign ||
        'center'
      );
    },
    calcHeaderAlignForCols() {
      return (
        this.column.headerAlign ||
        this.colHeaderAlign ||
        this.$aileTable.colHeaderAlign ||
        this.calcAlignForCols
      );
    },
    calcEmptyTextForCols() {
      return this.colEmptyText || this.$aileTable.colEmptyText;
    },
    calcShowOverflowTooltip() {
      return (
        this.column.showOverflowTooltip ||
        this.colShowOverflowTooltip ||
        this.$aileTable.colShowOverflowTooltip
      );
    }
  },
  watch: {
    column: {
      handler() {
        this.setColumn();
      },
      immediate: true
    }
  },
  methods: {
    setColumn() {
      if (this.column.type) {
        this.column.renderHeader = this.getColumnByType(
          this.column.type
        ).renderHeader;
        this.column.render =
          this.column.render ||
          this.getColumnByType(this.column.type).renderCell;
      }
      if (this.column.formatter) {
        this.column.render = (h, scope) => {
          let value = scope.column.formatter(
            scope.row,
            scope.column,
            scope.$index
          );
          if (!value && value !== 0) {
            value = this.calcEmptyTextForCols;
          }
          return <span>{value}</span>;
        };
      }
      if (!this.column.render) {
        this.column.render = (h, scope) => {
          let value = scope.row[scope.column.property];
          if (!value && value !== 0) {
            value = this.calcEmptyTextForCols;
          }
          return <span>{value}</span>;
        };
      }
    },
    getColumnByType(type) {
      switch (type) {
        case 'selection':
          return {
            renderHeader: (h, { store }) => (
              <el-checkbox
                disabled={store.states.data && store.states.data.length === 0}
                indeterminate={
                  store.states.selection.length > 0 &&
                  !store.states.isAllSelected
                }
                nativeOn-click={store.toggleAllSelection}
                value={store.states.isAllSelected}
              />
            ),
            renderCell: (h, { row, column, store, $index }) => (
              <el-checkbox
                nativeOn-click={event => event.stopPropagation()}
                value={store.isSelected(row)}
                disabled={
                  column.selectable
                    ? !column.selectable.call(null, row, $index)
                    : false
                }
                on-input={() => {
                  store.commit('rowSelectedChanged', row);
                }}
              />
            ),
            sortable: false,
            resizable: false
          };
        case 'index':
          return {
            renderHeader: (h, { store }) => (
              <el-checkbox
                disabled={store.states.data && store.states.data.length === 0}
                indeterminate={
                  store.states.selection.length > 0 &&
                  !store.states.isAllSelected
                }
                nativeOn-click={store.toggleAllSelection}
                value={store.states.isAllSelected}
              />
            ),
            renderCell: (h, { row, column, store, $index }) => (
              <el-checkbox
                nativeOn-click={event => event.stopPropagation()}
                value={store.isSelected(row)}
                disabled={
                  column.selectable
                    ? !column.selectable.call(null, row, $index)
                    : false
                }
                on-input={() => {
                  store.commit('rowSelectedChanged', row);
                }}
              />
            ),
            sortable: false,
            resizable: false
          };
        case 'expand':
          return {
            renderHeader: (h, scope) => <span>{scope.column.label || ''}</span>,
            renderCell: (h, { row, store }, proxy) => {
              const expanded = store.states.expandRows.indexOf(row) > -1;
              return (
                <div
                  class={
                    'el-table__expand-icon ' +
                    (expanded ? 'el-table__expand-icon--expanded' : '')
                  }
                  on-click={e => proxy.handleExpandClick(row, e)}
                >
                  <i class='el-icon el-icon-arrow-right' />
                </div>
              );
            },
            sortable: false,
            resizable: false,
            className: 'el-table__expand-column'
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
