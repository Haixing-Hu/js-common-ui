////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import prompt from '../src/prompt';
import PromptImpl from '../src/prompt-impl';
import loading from '../src/loading';
import LoadingImpl from '../src/loading-impl';

// 创建一个模拟的PromptImpl实现
class MockPromptImpl extends PromptImpl {
  constructor() {
    super();
    this.showCalls = [];
    this.lastResolve = null;
    this.lastReject = null;
  }

  show(type, title, message, okLabel, cancelLabel) {
    this.showCalls.push({ type, title, message, okLabel, cancelLabel });
    return new Promise((resolve, reject) => {
      this.lastResolve = resolve;
      this.lastReject = reject;
    });
  }

  // 辅助测试方法 - 模拟用户点击"确认"
  resolveLastCall(data) {
    if (this.lastResolve) {
      this.lastResolve(data);
      return true;
    }
    return false;
  }

  // 辅助测试方法 - 模拟用户点击"取消"
  rejectLastCall(error) {
    if (this.lastReject) {
      this.lastReject(error || new Error('用户取消'));
      return true;
    }
    return false;
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

describe('Prompt', () => {
  let mockImpl;
  let mockLoadingImpl;
  const DEFAULT_OK_LABEL = '确认';
  const DEFAULT_CANCEL_LABEL = '取消';

  beforeEach(() => {
    // 每个测试前重置实现对象
    mockImpl = new MockPromptImpl();
    prompt.setImpl(mockImpl);
    prompt.enable();
    
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
    expect(prompt.isEnabled()).toBe(true);
    expect(prompt.getImpl()).toBe(mockImpl);
  });

  test('enable/disable方法应该正确工作', () => {
    prompt.disable();
    expect(prompt.isEnabled()).toBe(false);
    
    prompt.enable();
    expect(prompt.isEnabled()).toBe(true);
  });

  test('info方法应该正确调用实现对象', async () => {
    const promise = prompt.info('测试标题', '测试消息');
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toEqual({
      type: 'info',
      title: '测试标题',
      message: '测试消息',
      okLabel: DEFAULT_OK_LABEL,
      cancelLabel: DEFAULT_CANCEL_LABEL
    });
    
    mockImpl.resolveLastCall('测试输入');
    const result = await promise;
    expect(result).toBe('测试输入');
  });

  test('warn方法应该正确调用实现对象', async () => {
    const promise = prompt.warn('警告标题', '警告消息');
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toEqual({
      type: 'warn',
      title: '警告标题',
      message: '警告消息',
      okLabel: DEFAULT_OK_LABEL,
      cancelLabel: DEFAULT_CANCEL_LABEL
    });
    
    mockImpl.resolveLastCall('警告输入');
    const result = await promise;
    expect(result).toBe('警告输入');
  });

  test('error方法应该正确调用实现对象', async () => {
    const promise = prompt.error('错误标题', '错误消息');
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toEqual({
      type: 'error',
      title: '错误标题',
      message: '错误消息',
      okLabel: DEFAULT_OK_LABEL,
      cancelLabel: DEFAULT_CANCEL_LABEL
    });
    
    mockImpl.resolveLastCall('错误输入');
    const result = await promise;
    expect(result).toBe('错误输入');
  });

  test('success方法应该正确调用实现对象', async () => {
    const promise = prompt.success('成功标题', '成功消息');
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toEqual({
      type: 'success',
      title: '成功标题',
      message: '成功消息',
      okLabel: DEFAULT_OK_LABEL,
      cancelLabel: DEFAULT_CANCEL_LABEL
    });
    
    mockImpl.resolveLastCall('成功输入');
    const result = await promise;
    expect(result).toBe('成功输入');
  });

  test('show方法应该支持debug类型', async () => {
    const promise = prompt.show('debug', '调试标题', '调试消息');
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0].type).toBe('debug');
    expect(mockImpl.showCalls[0].title).toBe('调试标题');
    expect(mockImpl.showCalls[0].message).toBe('调试消息');
    
    mockImpl.resolveLastCall('调试输入');
    const result = await promise;
    expect(result).toBe('调试输入');
  });

  test('show方法应该支持默认类型', async () => {
    // 测试默认类型（不在case条件中的类型）
    const promise = prompt.show('unknown-type', '测试标题', '测试消息');
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0].type).toBe('unknown-type');
    
    mockImpl.resolveLastCall('默认输入');
    const result = await promise;
    expect(result).toBe('默认输入');
  });

  test('info方法应该支持自定义按钮文本', async () => {
    const promise = prompt.info('测试标题', '测试消息', '是', '否');
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toEqual({
      type: 'info',
      title: '测试标题',
      message: '测试消息',
      okLabel: '是',
      cancelLabel: '否'
    });
    
    mockImpl.resolveLastCall('自定义按钮输入');
    const result = await promise;
    expect(result).toBe('自定义按钮输入');
  });

  test('当用户点击确认按钮时Promise应该resolve', async () => {
    const promise = prompt.info('测试标题', '测试消息');
    
    mockImpl.resolveLastCall('用户输入');
    await expect(promise).resolves.toBe('用户输入');
  });

  test('当用户点击取消按钮时Promise应该reject', async () => {
    const promise = prompt.info('测试标题', '测试消息');
    
    mockImpl.rejectLastCall(new Error('用户取消'));
    await expect(promise).rejects.toThrow('用户取消');
  });

  test('禁用时show方法应该返回rejected Promise', async () => {
    prompt.disable();
    
    await expect(prompt.show('info', '测试标题', '测试消息'))
      .rejects
      .toThrow('Prompt功能已被禁用');
    
    expect(mockImpl.showCalls.length).toBe(0); // 不应该调用实现
  });

  test('未设置实现对象时show方法应该返回rejected Promise', async () => {
    prompt.impl = null;
    
    await expect(prompt.show('info', '测试标题', '测试消息'))
      .rejects
      .toThrow('未设置`Prompt`类的具体实现对象');
  });

  test('setImpl方法应该验证参数类型', () => {
    expect(() => prompt.setImpl({})).toThrow('参数`impl`必须是`PromptImpl`的子类的实例');
    expect(() => prompt.setImpl(null)).toThrow('参数`impl`必须是`PromptImpl`的子类的实例');
  });

  test('show方法应该调用loading.clear', () => {
    prompt.show('info', '测试标题', '测试消息');
    
    expect(mockLoadingImpl.hideCalls).toBe(1);
  });
}); 