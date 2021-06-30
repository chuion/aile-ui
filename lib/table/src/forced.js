export default {
  selection: {
    renderHeader: (h, { store }) => h('el-checkbox', {
      prop: {
        disabled: store.states.data && store.states.data.length === 0,
        indeterminate: store.states.selection.length > 0 && !store.states.isAllSelected,
        value: store.states.isAllSelected
      },
      nativeOn: { click: store.toggleAllSelection }
    }),
    renderCell: (h, { row, column, store, $index }) => h('el-checkbox', {
      prop: {
        value: store.isSelected(row),
        disabled: column.selectable ? !column.selectable.call(null, row, $index) : false
      },
      nativeOn: { click: event => event.stopPropagation() },
      on: {
        input: () => {
          store.commit('rowSelectedChanged', row);
        }
      }
    }),
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: (h, scope) => h('span', scope.column.label || '#'),
    renderCell: (h, { $index, column }) => {
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }

      return h('div', i);
    },
    sortable: false
  },
  expand: {
    renderHeader: (h, scope) => h('span', scope.column.label || ''),
    renderCell: (h, { row, store }, proxy) => {
      const expanded = store.states.expandRows.indexOf(row) > -1;
      return h('div', {
        class: {
          'el-table__expand-icon': true,
          'el-table__expand-icon--expanded': !!expanded
        },
        on: { click: e => proxy.handleExpandClick(row, e) }
      }, [
        h('i', {
          class: {
            'el-icon': true,
            'el-icon-arrow-right': true
          }
        })
      ]);
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
};
