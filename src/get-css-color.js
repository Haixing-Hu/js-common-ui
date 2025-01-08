////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 获取不同类型消息对应的 CSS 颜色。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     不同类型消息对应的 CSS 颜色。
 * @author 胡海星
 */
function getCssColor(type) {
  switch (type) {
    case 'warn':
      return '#F2C037';
    case 'error':
      return '#C10015';
    case 'success':
      return '#21BA45';
    case 'debug':
      return '#9C27B0';
    case 'question':
      return '#1976D2';
    case 'info':
      return '#1976D2';
    default:
      return '#616161';
  }
}

export default getCssColor;
