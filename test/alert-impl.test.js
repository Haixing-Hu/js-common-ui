////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import AlertImpl from '../src/alert-impl';

describe('AlertImpl', () => {
  test('基类的show方法应该抛出错误', () => {
    const alertImpl = new AlertImpl();
    const type = 'info';
    const title = '测试标题';
    const message = '测试消息';
    
    expect(() => alertImpl.show(type, title, message))
      .toThrow(`方法 AlertImpl.show() 需要被子类覆盖实现: ${type} - ${title} - ${message}`);
  });
  
  test('继承的子类应该能够正确实现show方法', () => {
    class CustomAlertImpl extends AlertImpl {
      show(type, title, message) {
        return Promise.resolve();
      }
    }
    
    const customAlertImpl = new CustomAlertImpl();
    expect(() => customAlertImpl.show('info', '测试标题', '测试消息')).not.toThrow();
  });
}); 