////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import LoadingImpl from '../src/loading-impl';

describe('LoadingImpl', () => {
  test('基类的show方法应该抛出错误', () => {
    const loadingImpl = new LoadingImpl();
    const message = '测试消息';
    
    expect(() => loadingImpl.show(message))
      .toThrow(`方法 LoadingImpl.show() 需要被子类覆盖实现: ${message}`);
  });
  
  test('基类的hide方法应该抛出错误', () => {
    const loadingImpl = new LoadingImpl();
    
    expect(() => loadingImpl.hide())
      .toThrow('方法 LoadingImpl.hide() 需要被子类覆盖实现');
  });
  
  test('继承的子类应该能够正确实现所有方法', () => {
    class CustomLoadingImpl extends LoadingImpl {
      show(message) {
        // 自定义实现
      }
      
      hide() {
        // 自定义实现
      }
    }
    
    const customLoadingImpl = new CustomLoadingImpl();
    expect(() => customLoadingImpl.show('测试消息')).not.toThrow();
    expect(() => customLoadingImpl.hide()).not.toThrow();
  });
}); 