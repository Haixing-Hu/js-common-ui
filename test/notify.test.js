////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import notify from '../src/notify';
import NotifyImpl from '../src/notify-impl';
import loading from '../src/loading';
import LoadingImpl from '../src/loading-impl';

// 创建一个模拟的NotifyImpl实现
class MockNotifyImpl extends NotifyImpl {
  constructor() {
    super();
    this.calls = [];
  }

  show(type, message, options) {
    this.calls.push({ type, message, options });
  }
}

// 创建一个模拟的LoadingImpl实现
class MockLoadingImpl extends LoadingImpl {
  constructor() {
    super();
    this.showCalls = [];
    this.hideCalls = 0;
  }

  show(message) {
    this.showCalls.push(message);
  }

  hide() {
    this.hideCalls += 1;
  }
}

describe('Notify', () => {
  let mockImpl;
  let mockLoadingImpl;

  beforeEach(() => {
    // 每个测试前重置实现对象
    mockImpl = new MockNotifyImpl();
    notify.setImpl(mockImpl);
    notify.enable();
    
    // 初始化loading模块
    mockLoadingImpl = new MockLoadingImpl();
    loading.setImpl(mockLoadingImpl);
    loading.enable();
  });

  afterEach(() => {
    // 清理
    jest.clearAllMocks();
  });

  test('应该正确初始化', () => {
    expect(notify.isEnabled()).toBe(true);
    expect(notify.getImpl()).toBe(mockImpl);
  });

  test('enable/disable方法应该正确工作', () => {
    notify.disable();
    expect(notify.isEnabled()).toBe(false);
    
    notify.enable();
    expect(notify.isEnabled()).toBe(true);
  });

  test('enableDebug/disableDebug方法应该正确工作', () => {
    notify.enableDebug();
    expect(notify.isDebugEnabled()).toBe(true);
    
    notify.disableDebug();
    expect(notify.isDebugEnabled()).toBe(false);
  });

  test('show方法应该正确调用实现对象', () => {
    const type = 'info';
    const message = '测试消息';
    const options = { duration: 3000 };
    
    notify.show(type, message, options);
    
    expect(mockImpl.calls.length).toBe(1);
    expect(mockImpl.calls[0].type).toBe(type);
    expect(mockImpl.calls[0].message).toBe(message);
    expect(mockImpl.calls[0].options).toMatchObject({
      duration: 3000,
      position: 'top-right',
      closeable: true,
      showDetail: false,
      detailLabel: '详情'
    });
    expect(typeof mockImpl.calls[0].options.closeAction).toBe('function');
    expect(typeof mockImpl.calls[0].options.detailAction).toBe('function');
    expect(mockLoadingImpl.hideCalls).toBe(1); // 确认clear被调用
  });

  test('show方法应该支持默认类型', () => {
    // 测试默认类型（不在case条件中的类型）
    notify.show('unknown-type', '测试消息');
    
    expect(mockImpl.calls.length).toBe(1);
    expect(mockImpl.calls[0].type).toBe('unknown-type');
  });

  test('info方法应该正确调用show方法', () => {
    notify.info('信息消息', { duration: 3000 });
    
    expect(mockImpl.calls.length).toBe(1);
    expect(mockImpl.calls[0].type).toBe('info');
    expect(mockImpl.calls[0].message).toBe('信息消息');
    expect(mockImpl.calls[0].options).toMatchObject({
      duration: 3000,
      position: 'top-right'
    });
  });

  test('warn方法应该正确调用show方法', () => {
    notify.warn('警告消息');
    
    expect(mockImpl.calls.length).toBe(1);
    expect(mockImpl.calls[0].type).toBe('warn');
    expect(mockImpl.calls[0].message).toBe('警告消息');
    expect(mockImpl.calls[0].options).toMatchObject({
      position: 'top-right',
      duration: 3000
    });
  });

  test('error方法应该正确调用show方法', () => {
    notify.error('错误消息');
    
    expect(mockImpl.calls.length).toBe(1);
    expect(mockImpl.calls[0].type).toBe('error');
    expect(mockImpl.calls[0].message).toBe('错误消息');
  });

  test('success方法应该正确调用show方法', () => {
    notify.success('成功消息');
    
    expect(mockImpl.calls.length).toBe(1);
    expect(mockImpl.calls[0].type).toBe('success');
    expect(mockImpl.calls[0].message).toBe('成功消息');
  });

  test('debug方法应该正确调用show方法', () => {
    // 需要确保debug功能已启用
    notify.enableDebug();
    notify.debug('调试消息');
    
    expect(mockImpl.calls.length).toBe(1);
    expect(mockImpl.calls[0].type).toBe('debug');
    expect(mockImpl.calls[0].message).toBe('调试消息');
  });

  test('禁用调试模式时debug方法不应该调用实现对象', () => {
    // 确保debug功能已禁用
    notify.disableDebug();
    notify.debug('调试消息');
    
    expect(mockImpl.calls.length).toBe(0);
  });

  test('禁用时show方法不应该调用实现对象', () => {
    notify.disable();
    notify.show('info', '测试消息');
    
    expect(mockImpl.calls.length).toBe(0);
  });

  test('禁用时各类型方法不应该调用实现对象', () => {
    notify.disable();
    
    notify.info('信息消息');
    notify.warn('警告消息');
    notify.error('错误消息');
    notify.success('成功消息');
    notify.debug('调试消息');
    
    expect(mockImpl.calls.length).toBe(0);
  });

  test('未设置实现对象时应该抛出错误', () => {
    notify.impl = null;
    
    expect(() => notify.show('info', '测试消息')).toThrow('未设置`Notify`类的具体实现对象');
    expect(() => notify.info('信息消息')).toThrow('未设置`Notify`类的具体实现对象');
  });

  test('setImpl方法应该验证参数类型', () => {
    expect(() => notify.setImpl({})).toThrow('参数`impl`必须是`NotifyImpl`的子类的实例');
    expect(() => notify.setImpl(null)).toThrow('参数`impl`必须是`NotifyImpl`的子类的实例');
  });

  test('show方法的options参数应该正确合并默认值', () => {
    const customOptions = {
      position: 'bottom-left',
      icon: 'custom-icon',
      showDetail: true,
      detailLabel: '查看详情'
    };
    
    notify.show('info', '测试消息', customOptions);
    
    expect(mockImpl.calls.length).toBe(1);
    expect(mockImpl.calls[0].options).toMatchObject({
      position: 'bottom-left',
      duration: 3000, // 默认值
      icon: 'custom-icon',
      closeable: true, // 默认值
      showDetail: true,
      detailLabel: '查看详情'
    });
    expect(typeof mockImpl.calls[0].options.closeAction).toBe('function');
    expect(typeof mockImpl.calls[0].options.detailAction).toBe('function');
  });

  test('closeAction 和 detailAction 应该是可调用的函数', () => {
    notify.show('info', '测试消息');
    
    const { closeAction, detailAction } = mockImpl.calls[0].options;
    
    // 验证这些是可调用的函数
    expect(() => closeAction()).not.toThrow();
    expect(() => detailAction()).not.toThrow();
  });
}); 