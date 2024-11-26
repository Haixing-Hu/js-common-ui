////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2017 - 2024.
//    Nanjing Smart Medical Investment Operation Service Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 获取不同类型对话框对应的 Font Awesome 图标。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的 Font Awesome 图标，以HTML代码形式表示。
 * @author 胡海星
 */
function getFontAwesomeDialogIcon(type) {
  switch (type) {
    case 'warn':
      return '<i class="fa-solid fa-triangle-exclamation fa-lg" style="color: #F2C037"></i>';
    case 'error':
      return '<i class="fa-solid fa-circle-xmark fa-lg" style="color: #C10015"></i>';
    case 'success':
      return '<i class="fa-solid fa-circle-check fa-lg" style="color: #21BA45"></i>';
    case 'debug':
      return '<i class="fa-solid fa-bug-slash fa-lg" style="color: #9C27B0"></i>';
    case 'question':
      return '<i class="fa-solid fa-circle-question fa-lg" style="color: #1976D2"></i>';
    case 'info':
    default:
      return '<i class="fa-solid fa-circle-info fa-lg" style="color: #1976D2"></i>';
  }
}

export default getFontAwesomeDialogIcon;
