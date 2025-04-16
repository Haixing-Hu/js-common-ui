////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getMaterialSymbolIcon from '../src/get-material-symbol-icon';

describe('getMaterialSymbolIcon', () => {
  test('应该返回警告图标', () => {
    expect(getMaterialSymbolIcon('warn')).toBe('warning');
  });

  test('应该返回错误图标', () => {
    expect(getMaterialSymbolIcon('error')).toBe('cancel');
  });

  test('应该返回成功图标', () => {
    expect(getMaterialSymbolIcon('success')).toBe('check_circle');
  });

  test('应该返回调试图标', () => {
    expect(getMaterialSymbolIcon('debug')).toBe('bug_report');
  });

  test('应该返回问题图标', () => {
    expect(getMaterialSymbolIcon('question')).toBe('help');
  });

  test('应该返回信息图标', () => {
    expect(getMaterialSymbolIcon('info')).toBe('info');
  });

  test('应该返回默认图标', () => {
    expect(getMaterialSymbolIcon('unknown')).toBe('info');
  });

  test('未提供类型时应该返回默认图标', () => {
    expect(getMaterialSymbolIcon()).toBe('info');
  });
}); 