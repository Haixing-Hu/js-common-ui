////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2017 - 2024.
//    Nanjing Smart Medical Investment Operation Service Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 获取不同类型对话框对应的 Material Symbol 图标。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的 Material Symbol 图标，以HTML代码形式表示。
 * @author 胡海星
 */
function getMaterialSymbolDialogIcon(type) {
  const baseStyle = "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;";
  switch (type) {
    case 'warning':
      return `<i class="material-symbols-rounded" style="${baseStyle} color: #F2C037;">warning</i>`;
    case 'error':
      return `<i class="material-symbols-rounded" style="${baseStyle} color: #C10015;">cancel</i>`;
    case 'success':
      return `<i class="material-symbols-rounded" style="${baseStyle} color: #21BA45;">check_circle</i>`;
    case 'debug':
      return `<i class="material-symbols-rounded" style="${baseStyle} color: #9C27B0;">bug_report</i>`;
    case 'question':
      return `<i class="material-symbols-rounded" style="${baseStyle} color: #1976D2;">help</i>`;
    case 'info':
    default:
      return `<i class="material-symbols-rounded" style="${baseStyle} color: #1976D2;">info</i>`;
  }
}

export default getMaterialSymbolDialogIcon;
