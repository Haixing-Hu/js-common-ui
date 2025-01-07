////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  ICON_COLOR_WARN,
  ICON_COLOR_ERROR,
  ICON_COLOR_SUCCESS,
  ICON_COLOR_DEBUG,
  ICON_COLOR_QUESTION,
  ICON_COLOR_INFO,
} from './impl/icon-config';

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
      return `<i class="fa-solid fa-triangle-exclamation fa-lg" style="color: ${ICON_COLOR_WARN}"></i>`;
    case 'error':
      return `<i class="fa-solid fa-circle-xmark fa-lg" style="color: ${ICON_COLOR_ERROR}"></i>`;
    case 'success':
      return `<i class="fa-solid fa-circle-check fa-lg" style="color: ${ICON_COLOR_SUCCESS}"></i>`;
    case 'debug':
      return `<i class="fa-solid fa-bug-slash fa-lg" style="color: ${ICON_COLOR_DEBUG}"></i>`;
    case 'question':
      return `<i class="fa-solid fa-circle-question fa-lg" style="color: ${ICON_COLOR_QUESTION}"></i>`;
    case 'info':
    default:
      return `<i class="fa-solid fa-circle-info fa-lg" style="color: ${ICON_COLOR_INFO}"></i>`;
  }
}

export default getFontAwesomeDialogIcon;
