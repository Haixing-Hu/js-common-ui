////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getBootstrapIcon from '../src/get-bootstrap-icon';

describe('getBootstrapIcon', () => {
  test('应该返回警告图标', () => {
    expect(getBootstrapIcon('warn')).toBe('bi bi-exclamation-triangle-fill');
  });

  test('应该返回错误图标', () => {
    expect(getBootstrapIcon('error')).toBe('bi bi-x-circle-fill');
  });

  test('应该返回成功图标', () => {
    expect(getBootstrapIcon('success')).toBe('bi bi-check-circle-fill');
  });

  test('应该返回调试图标', () => {
    expect(getBootstrapIcon('debug')).toBe('bi bi-bug-fill');
  });

  test('应该返回问题图标', () => {
    expect(getBootstrapIcon('question')).toBe('bi bi-question-circle-fill');
  });

  test('应该返回信息图标', () => {
    expect(getBootstrapIcon('info')).toBe('bi bi-info-circle-fill');
  });

  test('应该返回默认图标', () => {
    expect(getBootstrapIcon('unknown')).toBe('bi bi-chat-left-dots');
  });

  test('未提供类型时应该返回默认图标', () => {
    expect(getBootstrapIcon()).toBe('bi bi-chat-left-dots');
  });
}); 