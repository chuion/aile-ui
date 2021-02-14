import AileTable from './src/Table';

/* istanbul ignore next */
AileTable.install = function(Vue, option = {}) {
  const defaultOption = {
    colAlign: null,
    colHeaderAlign: null,
    pagerOffset: 0,
    tablePadding: 0,
    colEmptyText: '',
    customClassName: '',
    colShowOverflowTooltip: false
  };
  Vue.prototype.$aileTable = {
    ...defaultOption,
    ...option
  };
  Vue.component(AileTable.name, AileTable);
};

export default AileTable;
