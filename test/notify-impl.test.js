////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import NotifyImpl from '../src/notify-impl';

describe('NotifyImpl', () => {
  test('基类的show方法应该抛出错误', () => {
    const notifyImpl = new NotifyImpl();
    const type = 'info';
    const message = '测试消息';
    const options = { 
      position: 'top-right',
      duration: 3000,
      closeable: true
    };
    
    expect(() => notifyImpl.show(type, message, options))
      .toThrow(`方法 NotifyImpl.show() 需要被子类覆盖实现: ${type} - ${message} - ${JSON.stringify(options)}`);
  });
  
  test('继承的子类应该能够正确实现show方法', () => {
    class CustomNotifyImpl extends NotifyImpl {
      show(type, message, options) {
        // 自定义实现
      }
    }
    
    const customNotifyImpl = new CustomNotifyImpl();
    expect(() => customNotifyImpl.show('info', '测试消息', { duration: 3000 })).not.toThrow();
  });
  
  test('show方法应该包含所有参数的错误信息', () => {
    const notifyImpl = new NotifyImpl();
    const type = 'warn';
    const message = '<b>警告内容</b>';
    const options = {
      position: 'bottom-left',
      duration: 5000,
      icon: 'custom-icon',
      closeable: true,
      showDetail: true,
      detailLabel: '详情'
    };
    
    expect(() => notifyImpl.show(type, message, options))
      .toThrow(`方法 NotifyImpl.show() 需要被子类覆盖实现: ${type} - ${message} - ${JSON.stringify(options)}`);
  });
}); 