import AileAvatar from './src/Avatar';

AileAvatar.install = function(Vue, option = {}) {
  const defaultOption = {
    fit: 'cover',
    shape: 'circle'
  };

  if ({}.toString.call(option.config) !== '[object Object]') {
    option.config = {};
  }

  Vue.prototype.$aileAvatar = {
    ...defaultOption,
    ...option
  };

  Vue.component(AileAvatar.name, AileAvatar);
};

export default AileAvatar;
