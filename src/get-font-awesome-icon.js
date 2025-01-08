////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 获取不同类型对话框对应的 Font Awesome 图标的 CSS 类名。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的 Font Awesome 图标，以 CSS 类名表示。
 * @author 胡海星
 */
function getFontAwesomeIcon(type) {
  switch (type) {
    case 'warn':
      return 'fa-solid fa-triangle-exclamation';
    case 'error':
      return 'fa-solid fa-circle-xmark';
    case 'success':
      return 'fa-solid fa-circle-check';
    case 'debug':
      return 'fa-solid fa-bug-slash';
    case 'question':
      return 'fa-solid fa-circle-question';
    case 'info':
      return 'fa-solid fa-circle-info';
    default:
      return 'fa-solid fa-circle-info';
  }
}

export default getFontAwesomeIcon;
