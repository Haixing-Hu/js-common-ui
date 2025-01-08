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
 * 获取不同类型对话框对应的 Material Symbol 图标。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的 Material Symbol 图标，以HTML代码形式表示。
 * @author 胡海星
 */
function getMaterialSymbolDialogIcon(type) {
  const baseStyle = "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48";
  switch (type) {
    case 'warn':
      return `<i class="material-symbols-rounded" style="${baseStyle}; font-size: ${ICON_SIZE}; color: ${ICON_COLOR_WARN};">warning</i>`;
    case 'error':
      return `<i class="material-symbols-rounded" style="${baseStyle}; font-size: ${ICON_SIZE}; color: ${ICON_COLOR_ERROR};">cancel</i>`;
    case 'success':
      return `<i class="material-symbols-rounded" style="${baseStyle}; font-size: ${ICON_SIZE}; color: ${ICON_COLOR_SUCCESS};">check_circle</i>`;
    case 'debug':
      return `<i class="material-symbols-rounded" style="${baseStyle}; font-size: ${ICON_SIZE}; color: ${ICON_COLOR_DEBUG};">bug_report</i>`;
    case 'question':
      return `<i class="material-symbols-rounded" style="${baseStyle}; font-size: ${ICON_SIZE}; color: ${ICON_COLOR_QUESTION};">help</i>`;
    case 'info':
    default:
      return `<i class="material-symbols-rounded" style="${baseStyle}; font-size: ${ICON_SIZE}; color: ${ICON_COLOR_INFO};">info</i>`;
  }
}

export default getMaterialSymbolDialogIcon;
