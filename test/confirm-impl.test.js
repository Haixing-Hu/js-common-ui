////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import ConfirmImpl from '../src/confirm-impl';

describe('ConfirmImpl', () => {
  test('基类的show方法应该抛出错误', () => {
    const confirmImpl = new ConfirmImpl();
    const type = 'info';
    const title = '测试标题';
    const message = '测试消息';
    const okLabel = '确认';
    const cancelLabel = '取消';
    
    expect(() => confirmImpl.show(type, title, message, okLabel, cancelLabel))
      .toThrow(`方法 ConfirmImpl.show() 需要被子类覆盖实现: ${type} - ${title} - ${message} - ${okLabel} - ${cancelLabel}`);
  });
  
  test('继承的子类应该能够正确实现show方法', () => {
    class CustomConfirmImpl extends ConfirmImpl {
      show(type, title, message, okLabel, cancelLabel) {
        return Promise.resolve();
      }
    }
    
    const customConfirmImpl = new CustomConfirmImpl();
    expect(() => customConfirmImpl.show('info', '测试标题', '测试消息', '确认', '取消')).not.toThrow();
  });
}); 