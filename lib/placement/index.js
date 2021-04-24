import AilePlacement from './src/Placement';

AilePlacement.install = function(Vue, option = {}) {
  const defaultOption = {
    initText: '初始化中',
    emptyText: '暂无数据'
  };
  Vue.prototype.$ailePlacement = {
    ...defaultOption,
    ...option
  };
  Vue.component(AilePlacement.name, AilePlacement);
};

export default AilePlacement;
