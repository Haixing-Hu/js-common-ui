////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Logger } from '@qubit-ltd/logging';
import loading from './loading';
import PromptImpl from './prompt-impl';

const DEFAULT_OK_LABEL = '确认';
const DEFAULT_CANCEL_LABEL = '取消';

/**
 * 此类封装了一个弹出式输入对话框。
 *
 * 这个类的功能是在页面上弹出一个简单的弹出式输入对话框，让用户填写输入。
 *
 * 不同的UI框架应为此类提供不同的实现对象，参见`PromptImpl`类。
 *
 * @author 胡海星
 * @see PromptImpl
 * @see setImpl
 */
class Prompt {
  /**
   * 表示此对象的功能是否启用。
   */
  enabled = true;

  /**
   * `Prompt`类的具体实现对象。
   *
   * @type {PromptImpl}
   */
  impl = null;

  /**
   * 禁用此对象，即调用其show方法将不起任何作用。
   */
  disable() {
    this.enabled = false;
  }

  /**
   * 启用此对象，即调用其show方法将弹出一个对话框。
   */
  enable() {
    this.enabled = true;
  }

  /**
   * 返回此对象的功能是否启用。
   *
   * @return {boolean}
   *     如果此对象的功能启用，则返回`true`；否则返回`false`。
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * 返回`Prompt`类的具体实现类。
   *
   * @return {PromptImpl}
   *     `Prompt`类的具体实现类。
   */
  getImpl() {
    return this.impl;
  }

  /**
   * 设置`Prompt`类的具体实现类。
   *
   * 这个方法用于注入在不同的UI框架中实现的不同的`AlertImpl`类。
   *
   * 注意：这个方法必须在应用初始化时调用一次，且仅需调用一次。
   *
   * @param {PromptImpl} impl
   *     `Prompt`类的具体实现对象。这个参数必须是一个`PromptImpl`类的子类的实例，不同的
   *     `PromptImpl`类的实例可以实现不同的UI框架的弹出式确认对话框功能。
   */
  setImpl(impl) {
    if (!(impl instanceof PromptImpl)) {
      throw new Error('参数`impl`必须是`PromptImpl`的子类的实例');
    }
    this.impl = impl;
  }

  /**
   * 显示一个弹出式输入对话框。
   *
   * @param {string} type
   *     对话框的消息类型，可取值为：`'info'`, `'success'`, `'warn'`, `'error'`, `'debug'`。
   * @param {string} title
   *     对话框的标题。
   * @param {string} message
   *     对话框中的文字内容。
   * @param {string} okLabel
   *     可选参数，表示确认按钮的文字。
   * @param {string} cancelLabel
   *     可选参数，表示放弃按钮的文字。
   * @return {Promise<string>}
   *     一个`Promise`对象，当用户点击对话框的确认按键后，则Promise resolve，可以接着
   *     `then`继续下一步操作，`then`接受一个函数，其参数为用户输入的数据；当用户点击对话
   *     框的放弃按键后，则Promise reject，可以接着`catch`继续下一步操作。如果此对象被禁用，
   *     则返回一个`rejected`状态的`Promise`对象。
   */
  show(type, title, message, okLabel = DEFAULT_OK_LABEL, cancelLabel = DEFAULT_CANCEL_LABEL) {
    if (!this.enabled) {
      // 如果没有启用此对象，则不显示对话框，但应该返回一个rejected状态的Promise对象
      return Promise.reject(new Error('Prompt功能已被禁用'));
    }
    loading.clear();
    if (!this.impl) {
      return Promise.reject(new Error('未设置`Prompt`类的具体实现对象，请调用`prompt.setImpl()`方法设置'));
    }
    const logger = Logger.getLogger('prompt');
    switch (type) {
      case 'info':
        logger.info(message);
        break;
      case 'warn':
        logger.warn(message);
        break;
      case 'error':
        logger.error(message);
        break;
      case 'success':
        logger.info(message);
        break;
      case 'debug':
        logger.debug(message);
        break;
      default:
        logger.info(message);
        break;
    }
    return this.impl.show(type, title, message, okLabel, cancelLabel);
  }

  /**
   * 弹出一个显示一般信息的确认对话框。
   *
   * @param {string} title
   *     对话框的标题。
   * @param {string} message
   *     对话框中的文字内容。
   * @param {string} okLabel
   *     确认按钮的文字，默认值为`'确认'`。
   * @param {string} cancelLabel
   *     放弃按钮的文字，默认值为`'取消'`。
   * @return {Promise<string>}
   *     一个`Promise`对象，当用户点击对话框的确认按键后，则Promise resolve，可以接着
   *     `then`继续下一步操作，`then`接受一个函数，其参数为用户输入的数据；当用户点击对话
   *     框的放弃按键后，则Promise reject，可以接着`catch`继续下一步操作。如果此对象被禁用，
   *     则返回一个`rejected`状态的`Promise`对象。
   */
  info(title, message, okLabel = DEFAULT_OK_LABEL, cancelLabel = DEFAULT_CANCEL_LABEL) {
    return this.show('info', title, message, okLabel, cancelLabel);
  }

  /**
   * 弹出一个显示警告信息的确认对话框。
   *
   * @param {string} title
   *     对话框的标题。
   * @param {string} message
   *     对话框中的文字内容。
   * @param {string} okLabel
   *     确认按钮的文字，默认值为`'确认'`。
   * @param {string} cancelLabel
   *     放弃按钮的文字，默认值为`'取消'`。
   * @return {Promise<string>}
   *     一个`Promise`对象，当用户点击对话框的确认按键后，则Promise resolve，可以接着
   *     `then`继续下一步操作，`then`接受一个函数，其参数为用户输入的数据；当用户点击对话
   *     框的放弃按键后，则Promise reject，可以接着`catch`继续下一步操作。如果此对象被禁用，
   *     则返回一个`rejected`状态的`Promise`对象。
   */
  warn(title, message, okLabel = DEFAULT_OK_LABEL, cancelLabel = DEFAULT_CANCEL_LABEL) {
    return this.show('warn', title, message, okLabel, cancelLabel);
  }

  /**
   * 弹出一个显示错误信息的确认对话框。
   *
   * @param {string} title
   *     对话框的标题。
   * @param {string} message
   *     对话框中的文字内容。
   * @param {string} okLabel
   *     确认按钮的文字，默认值为`'确认'`。
   * @param {string} cancelLabel
   *     放弃按钮的文字，默认值为`'取消'`。
   * @return {Promise<string>}
   *     一个`Promise`对象，当用户点击对话框的确认按键后，则Promise resolve，可以接着
   *     `then`继续下一步操作，`then`接受一个函数，其参数为用户输入的数据；当用户点击对话
   *     框的放弃按键后，则Promise reject，可以接着`catch`继续下一步操作。如果此对象被禁用，
   *     则返回一个`rejected`状态的`Promise`对象。
   */
  error(title, message, okLabel = DEFAULT_OK_LABEL, cancelLabel = DEFAULT_CANCEL_LABEL) {
    return this.show('error', title, message, okLabel, cancelLabel);
  }

  /**
   * 弹出一个显示操作成功信息的确认对话框。
   *
   * @param {string} title
   *     对话框的标题。
   * @param {string} message
   *     对话框中的文字内容。
   * @param {string} okLabel
   *     确认按钮的文字，默认值为`'确认'`。
   * @param {string} cancelLabel
   *     放弃按钮的文字，默认值为`'取消'`。
   * @return {Promise<string>}
   *     一个`Promise`对象，当用户点击对话框的确认按键后，则Promise resolve，可以接着
   *     `then`继续下一步操作，`then`接受一个函数，其参数为用户输入的数据；当用户点击对话
   *     框的放弃按键后，则Promise reject，可以接着`catch`继续下一步操作。如果此对象被禁用，
   *     则返回一个`rejected`状态的`Promise`对象。
   */
  success(title, message, okLabel = DEFAULT_OK_LABEL, cancelLabel = DEFAULT_CANCEL_LABEL) {
    return this.show('success', title, message, okLabel, cancelLabel);
  }
}

const prompt = new Prompt();

export default prompt;
