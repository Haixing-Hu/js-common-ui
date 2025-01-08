////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  COLOR_WARN,
  COLOR_ERROR,
  COLOR_SUCCESS,
  COLOR_DEBUG,
  COLOR_QUESTION,
  COLOR_INFO,
  COLOR_DEFAULT,
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
function getColor(type) {
  switch (type) {
    case 'warn':
      return COLOR_WARN;
    case 'error':
      return COLOR_ERROR;
    case 'success':
      return COLOR_SUCCESS;
    case 'debug':
      return COLOR_DEBUG;
    case 'question':
      return COLOR_QUESTION;
    case 'info':
      return COLOR_INFO;
    default:
      return COLOR_DEFAULT;
  }
}

export default getColor;
