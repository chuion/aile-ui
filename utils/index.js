/** 检测数据类型 */
export function checkType(data) {
  const type = Object.prototype.toString.call(data);
  return type.slice(8, -1).toLowerCase();
}

/** 检测数据是否为空 */
export function isEmpty(data) {
  const dataType = checkType(data);
  switch (dataType) {
    case 'array':
      return !data.length;
    case 'object':
      return !Object.keys(data).length;
    case 'map':
    case 'set':
      return !data.size;
    case 'boolean':
    case 'number':
    case 'symbol':
    case 'function':
      return false;
    default:
      return !data;
  }
}

/** 合并class */
export function mergeClass(...classList) {
  const res = [];
  classList.forEach(item => {
    switch (checkType(item)) {
      case 'string':
        res.push(item);
        break;
      case 'array':
        res.push(...item);
        break;
      case 'object':
        Object.keys(item).forEach(key => {
          if (item[key]) {
            res.push(key);
          }
        });
        break;
      default:
    }
  });
  return res.filter(item => !!item).join(' ');
}

/** 合并attrs */
export function mergeAttrs(...args) {
  const res = {};
  args.forEach(source => {
    Object.keys(source).forEach(key => {
      res[parse2CamelCase(key)] = source[key];
    });
  });
  return res;
}

/** 命名转换：小驼峰 */
export function parse2CamelCase(name) {
  const snakeRegex = /[-_]/giu;
  return name
    .split(snakeRegex)
    .filter(a => a)
    .map((s, i) => (i === 0 ? s[0].toLowerCase() + s.substr(1) : s[0].toUpperCase() + s.substr(1)))
    .join('');
}

/** 命名转换：kebab-case */
export function parse2KebabCase(name) {
  const upperCaseRegex = /([A-Z][a-z]+)/gu;
  return name
    .replace('_', '-')
    .split(upperCaseRegex)
    .filter(a => a)
    .map(item => item.toLowerCase())
    .join('-')
    .replace(/--+/gu, '-');
}
