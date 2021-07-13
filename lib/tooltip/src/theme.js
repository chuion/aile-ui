import { isEmpty, parse2KebabCase } from '../../../utils';

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
export function registerTheme(themeList) {
  if (isEmpty(themeList)) return;

  // 添加css变量与样式
  let cssText = '';
  const styleElement = window.document.createElement('style');
  const head = window.document.getElementsByTagName('head')[0];

  themeList.forEach(theme => {
    let bodyStyle = 'transform-style: preserve-3d;';

    if (theme.bodyStyle) {
      Object.keys(theme.bodyStyle).forEach(key => {
        bodyStyle += `${parse2KebabCase(key)}:${theme.bodyStyle[key]};`;
      });
      cssText += `body .aile-tooltip__popper.is-${theme.name} {${bodyStyle}}`;
    }

    const arrow = {
      backgroundColor: theme.arrowStyle.background || theme.arrowStyle.backgroundColor || theme.bodyStyle.background || theme.bodyStyle.backgroundColor,
      borderColor: theme.arrowStyle.borderColor || theme.bodyStyle.background || theme.bodyStyle.backgroundColor
    };

    if (arrow.backgroundColor) {
      ['top', 'bottom', 'left', 'right'].forEach(placement => {
        cssText += `
        body .el-tooltip__popper.is-${theme.name}[x-placement^=${placement}] .popper__arrow::after {
          border-${placement}-color: ${arrow.backgroundColor} !important;
        }`;
      });
    }

    if (arrow.borderColor) {
      ['top', 'bottom', 'left', 'right'].forEach(placement => {
        cssText += `
        body .el-tooltip__popper.is-${theme.name}[x-placement^=${placement}] .popper__arrow {
          border-${placement}-color: ${arrow.borderColor} !important;
        }
      `;
      });
    }
  });
  const textNode = window.document.createTextNode(cssText);
  styleElement.appendChild(textNode);
  head.appendChild(styleElement);
}

