////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import PromptImpl from '../src/prompt-impl';

describe('PromptImpl', () => {
  test('基类的show方法应该抛出错误', () => {
    const promptImpl = new PromptImpl();
    const type = 'info';
    const title = '测试标题';
    const message = '测试消息';
    const okLabel = '确认';
    const cancelLabel = '取消';
    
    expect(() => promptImpl.show(type, title, message, okLabel, cancelLabel))
      .toThrow(`方法 PromptImpl.show() 需要被子类覆盖实现: ${type} - ${title} - ${message} - ${okLabel} - ${cancelLabel}`);
  });
  
  test('继承的子类应该能够正确实现show方法', () => {
    class CustomPromptImpl extends PromptImpl {
      show(type, title, message, okLabel, cancelLabel) {
        return Promise.resolve('测试输入数据');
      }
    }
    
    const customPromptImpl = new CustomPromptImpl();
    expect(() => customPromptImpl.show('info', '测试标题', '测试消息', '确认', '取消')).not.toThrow();
  });
  
  test('继承的子类应该能够返回Promise', async () => {
    class CustomPromptImpl extends PromptImpl {
      show(type, title, message, okLabel, cancelLabel) {
        return Promise.resolve('测试输入数据');
      }
    }
    
    const customPromptImpl = new CustomPromptImpl();
    const result = await customPromptImpl.show('info', '测试标题', '测试消息', '确认', '取消');
    expect(result).toBe('测试输入数据');
  });
}); 