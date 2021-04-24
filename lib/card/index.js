import AileCard from './src/Card';

AileCard.install = function(Vue, option = {}) {
  const defaultOption = { shadow: 'hover' };

  if ({}.toString.call(option.config) !== '[object Object]') {
    option.config = {};
  }

  Vue.prototype.$aileCard = {
    ...defaultOption,
    ...option
  };
  Vue.component(AileCard.name, AileCard);
};

export default AileCard;
