////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getCssColor from '../src/get-css-color';

describe('getCssColor', () => {
  test('应该返回警告颜色', () => {
    expect(getCssColor('warn')).toBe('#F2C037');
  });

  test('应该返回错误颜色', () => {
    expect(getCssColor('error')).toBe('#C10015');
  });

  test('应该返回成功颜色', () => {
    expect(getCssColor('success')).toBe('#21BA45');
  });

  test('应该返回调试颜色', () => {
    expect(getCssColor('debug')).toBe('#9C27B0');
  });

  test('应该返回问题颜色', () => {
    expect(getCssColor('question')).toBe('#1976D2');
  });

  test('应该返回信息颜色', () => {
    expect(getCssColor('info')).toBe('#1976D2');
  });

  test('应该返回默认颜色', () => {
    expect(getCssColor('unknown')).toBe('#616161');
  });

  test('未提供类型时应该返回默认颜色', () => {
    expect(getCssColor()).toBe('#616161');
  });
}); 