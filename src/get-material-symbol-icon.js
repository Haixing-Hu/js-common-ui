////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
/**
 * 获取不同类型对话框对应的 Material Symbol 图标的名称。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的 Material Symbol 图标，以图标名称表示。
 * @author 胡海星
 */
function getMaterialSymbolIcon(type) {
  switch (type) {
    case 'warn':
      return 'warning';
    case 'error':
      return 'cancel';
    case 'success':
      return 'check_circle';
    case 'debug':
      return 'bug_report';
    case 'question':
      return 'help';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
}

export default getMaterialSymbolIcon;
