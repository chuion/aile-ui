
/**
 * @param {Array} tooltipTheme
 * @description 注册tooltip皮肤
 * 规则：
 * [
 *  // effect: 'custom' 采用的样式
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
export function registerTheme(tooltipTheme) {
  if (tooltipTheme && tooltipTheme.length > 0) {
    // 添加css变量与样式
    let cssText = '';
    const styleElement = document.createElement('style');
    const head = document.getElementsByTagName('head')[0];
    styleElement.type = 'text/css';
    tooltipTheme.forEach(it => {
      cssText += `
      body .aile-tooltip__popper.is-${it.name} {
        --color: ${it.styles.color};
        --background: ${it.styles.background};
        --borderColor: ${it.styles.borderColor};
        --padding: ${it.styles.padding};
        --fontSize: ${it.styles.fontSize};
        color: var(--color);
        background: var(--background);
        border: 1px solid var(--borderColor);
        padding: var(--padding);
        font-size: var(--fontSize);
      }
      .aile-tooltip__popper.is-${it.name}[x-placement^=top] .popper__arrow {
        border-top-color: var(--borderColor);
      }
      .aile-tooltip__popper.is-${it.name}[x-placement^=top] .popper__arrow::after {
        border-top-color: var(--borderColor);
      }
      .aile-tooltip__popper.is-${it.name}[x-placement^=right] .popper__arrow {
        border-right-color: var(--borderColor);
      }
      .aile-tooltip__popper.is-${it.name}[x-placement^=right] .popper__arrow::after {
        border-right-color: var(--borderColor);
      }
      .aile-tooltip__popper.is-${it.name}[x-placement^=bottom] .popper__arrow {
        border-bottom-color: var(--borderColor);
      }
      .aile-tooltip__popper.is-${it.name}[x-placement^=bottom] .popper__arrow::after {
        border-bottom-color: var(--borderColor);
      }
      .aile-tooltip__popper.is-${it.name}[x-placement^=left] .popper__arrow {
        border-left-color: var(--borderColor);
      }
      .aile-tooltip__popper.is-${it.name}[x-placement^=left] .popper__arrow::after {
        border-left-color: var(--borderColor);
      }
    `;
    });
    const textNode = document.createTextNode(cssText);
    styleElement.appendChild(textNode);
    head.appendChild(styleElement);
  }
}
