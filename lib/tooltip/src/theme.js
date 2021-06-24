import { isEmpty } from '../../../utils'

/**
 * @param {Array} tooltipTheme
 * @description 注册tooltip皮肤，使用方式 <aile-tooltip effect="custom" />
 * 规则：
 * [
      {
        name: 'custom',
        styles: {
          padding: '5px',
          background: '#eee',
          borderColor: 'red',
          color: 'skyblue',
          fontSize: '14px'
        }
      }
    ]
 */
export function registerTheme (themeList) {
  if (isEmpty(themeList)) return

  // 添加css变量与样式
  let cssText = ''
  const styleElement = document.createElement('style')
  const head = document.getElementsByTagName('head')[0]

  themeList.forEach(theme => {
    let bodyStyle = 'transform-style: preserve-3d;'
    if (theme.style) {
      Object.keys(theme.style).forEach(key => {
        bodyStyle += `${parseCamel2KebabCase(key)}:${theme.style[key]};`
      })
      cssText += `body .aile-tooltip__popper.is-${theme.name} {${bodyStyle}}`
    }
    if (theme.style.background || theme.style.backgroundColor) {
      cssText += `
          .aile-tooltip__popper .el-popper__arrow::before {
            background: ${
  theme.style.background || theme.style.backgroundColor
};
          }
        `
    }
  })
  const textNode = document.createTextNode(cssText)
  styleElement.appendChild(textNode)
  head.appendChild(styleElement)
}

/** 驼峰命名转kebabCase命名 */
function parseCamel2KebabCase (str) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}
