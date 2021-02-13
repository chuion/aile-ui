import AileSelect from './src/Select';

AileSelect.install = function(Vue, option = {}) {
  const defaultOption = {
    remote: false,
    filterable: false,
    popperAppendToBody: false,
    defaultFirstOption: true,
    config: {}
  };

  if ({}.toString.call(option.config) !== '[object Object]') {
    option.config = {};
  }

  Vue.prototype.$aileSelect = {
    ...defaultOption,
    ...option
  };
  Vue.component(AileSelect.name, AileSelect);
};

export default AileSelect;
