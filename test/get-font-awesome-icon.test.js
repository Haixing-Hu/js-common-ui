////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getFontAwesomeIcon from '../src/get-font-awesome-icon';

describe('getFontAwesomeIcon', () => {
  test('应该返回警告图标', () => {
    expect(getFontAwesomeIcon('warn')).toBe('fa-solid fa-triangle-exclamation');
  });

  test('应该返回错误图标', () => {
    expect(getFontAwesomeIcon('error')).toBe('fa-solid fa-circle-xmark');
  });

  test('应该返回成功图标', () => {
    expect(getFontAwesomeIcon('success')).toBe('fa-solid fa-circle-check');
  });

  test('应该返回调试图标', () => {
    expect(getFontAwesomeIcon('debug')).toBe('fa-solid fa-bug-slash');
  });

  test('应该返回问题图标', () => {
    expect(getFontAwesomeIcon('question')).toBe('fa-solid fa-circle-question');
  });

  test('应该返回信息图标', () => {
    expect(getFontAwesomeIcon('info')).toBe('fa-solid fa-circle-info');
  });

  test('应该返回默认图标', () => {
    expect(getFontAwesomeIcon('unknown')).toBe('fa-solid fa-circle-info');
  });

  test('未提供类型时应该返回默认图标', () => {
    expect(getFontAwesomeIcon()).toBe('fa-solid fa-circle-info');
  });
}); 