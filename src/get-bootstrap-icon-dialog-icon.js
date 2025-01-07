////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  ICON_SIZE,
  ICON_COLOR_WARN,
  ICON_COLOR_ERROR,
  ICON_COLOR_SUCCESS,
  ICON_COLOR_DEBUG,
  ICON_COLOR_QUESTION,
  ICON_COLOR_INFO,
} from './impl/icon-config';

/**
 * 获取不同类型对话框对应的 Bootstrap Icon 图标。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的 Bootstrap Icon 图标，以HTML代码形式表示。
 * @author 胡海星
 */
function getBootstrapIconDialogIcon(type) {
  switch (type) {
    case 'warn':
      return `<i class="bi bi-exclamation-triangle-fill" style="font-size: ${ICON_SIZE}; color: ${ICON_COLOR_WARN}"></i>`;
    case 'error':
      return `<i class="bi bi-x-circle-fill" style="font-size: ${ICON_SIZE}; color: ${ICON_COLOR_ERROR}"></i>`;
    case 'success':
      return `<i class="bi bi-check-circle-fill" style="font-size: ${ICON_SIZE}; color: ${ICON_COLOR_SUCCESS}"></i>`;
    case 'debug':
      return `<i class="bi bi-bug-fill" style="font-size: ${ICON_SIZE}; color: ${ICON_COLOR_DEBUG}"></i>`;
    case 'question':
      return `<i class="bi bi-question-circle-fill" style="font-size: ${ICON_SIZE}; color: ${ICON_COLOR_QUESTION}"></i>`;
    case 'info':
    default:
      return `<i class="bi bi-info-circle-fill" style="font-size: ${ICON_SIZE}; color: ${ICON_COLOR_INFO}"></i>`;
  }
}

export default getBootstrapIconDialogIcon;
