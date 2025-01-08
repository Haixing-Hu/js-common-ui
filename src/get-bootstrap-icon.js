////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 获取不同类型对话框对应的 Bootstrap Icon 图标的 CSS 类名。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的 Bootstrap Icon 图标，以 CSS 类名表示。
 * @author 胡海星
 */
function getBootstrapIcon(type) {
  switch (type) {
    case 'warn':
      return 'bi bi-exclamation-triangle-fill';
    case 'error':
      return 'bi bi-x-circle-fill';
    case 'success':
      return 'bi bi-check-circle-fill';
    case 'debug':
      return 'bi bi-bug-fill';
    case 'question':
      return 'bi bi-question-circle-fill';
    case 'info':
      return 'bi bi-info-circle-fill';
    default:
      return 'bi bi-chat-left-dots';
  }
}

export default getBootstrapIcon;
