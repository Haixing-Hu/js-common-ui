////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import loading from '../src/loading';
import LoadingImpl from '../src/loading-impl';

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

describe('Loading', () => {
  let mockImpl;

  beforeEach(() => {
    // 每个测试前重置实现对象
    mockImpl = new MockLoadingImpl();
    loading.setImpl(mockImpl);
    loading.enable();
  });

  afterEach(() => {
    // 清理
    jest.clearAllMocks();
  });

  test('应该正确初始化', () => {
    expect(loading.isEnabled()).toBe(true);
    expect(loading.getImpl()).toBe(mockImpl);
  });

  test('enable/disable方法应该正确工作', () => {
    loading.disable();
    expect(loading.isEnabled()).toBe(false);
    
    loading.enable();
    expect(loading.isEnabled()).toBe(true);
  });

  test('show方法应该正确调用实现对象', () => {
    loading.show('测试消息');
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toBe('测试消息');
  });

  test('clear方法应该正确调用实现对象的hide方法', () => {
    loading.clear();
    
    expect(mockImpl.hideCalls).toBe(1);
  });

  test('禁用时show方法不应该调用实现对象', () => {
    loading.disable();
    loading.show('测试消息');
    
    expect(mockImpl.showCalls.length).toBe(0);
  });

  test('禁用时clear方法不应该调用实现对象', () => {
    loading.disable();
    loading.clear();
    
    expect(mockImpl.hideCalls).toBe(0);
  });

  test('未设置实现对象时show方法应该抛出错误', () => {
    loading.impl = null;
    
    expect(() => loading.show('测试消息')).toThrow('未设置`Loading`类的具体实现对象');
  });

  test('未设置实现对象时clear方法应该抛出错误', () => {
    loading.impl = null;
    
    expect(() => loading.clear()).toThrow('未设置`Loading`类的具体实现对象');
  });

  test('showGetting方法应该使用正确的消息', () => {
    loading.showGetting();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在获取数据');
  });

  test('showAdding方法应该使用正确的消息', () => {
    loading.showAdding();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在添加数据');
  });

  test('showUpdating方法应该使用正确的消息', () => {
    loading.showUpdating();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在更新数据');
  });

  test('showDeleting方法应该使用正确的消息', () => {
    loading.showDeleting();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在删除数据');
  });

  test('showRestoring方法应该使用正确的消息', () => {
    loading.showRestoring();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在恢复数据');
  });

  test('showPurging方法应该使用正确的消息', () => {
    loading.showPurging();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在清除已删除的数据');
  });

  test('showErasing方法应该使用正确的消息', () => {
    loading.showErasing();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在清除数据');
  });

  test('showUploading方法应该使用正确的消息', () => {
    loading.showUploading();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在上传');
  });

  test('showDownloading方法应该使用正确的消息', () => {
    loading.showDownloading();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在下载');
  });

  test('showImporting方法应该使用正确的消息', () => {
    loading.showImporting();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在导入');
  });

  test('showExporting方法应该使用正确的消息', () => {
    loading.showExporting();
    
    expect(mockImpl.showCalls.length).toBe(1);
    expect(mockImpl.showCalls[0]).toContain('正在导出');
  });

  test('setImpl方法应该验证参数类型', () => {
    expect(() => loading.setImpl({})).toThrow('参数`impl`必须是`LoadingImpl`的子类的实例');
    expect(() => loading.setImpl(null)).toThrow('参数`impl`必须是`LoadingImpl`的子类的实例');
  });
}); 