import AileLink from './src/Link';

AileLink.install = function(Vue, option = {}) {
  const defaultOption = {
    underline: false,
    config: {}
  };

  if ({}.toString.call(option.config) !== '[object Object]') {
    option.config = {};
  }

  Vue.prototype.$aileLink = {
    ...defaultOption,
    ...option
  };
  Vue.component(AileLink.name, AileLink);
};

export default AileLink;
