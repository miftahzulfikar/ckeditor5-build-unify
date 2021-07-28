import DontBoxEditing from './dontboxediting';
import DontBoxUI from './dontboxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class DontBox extends Plugin {
  static get requires() {
    return [DontBoxEditing, DontBoxUI];
  }
}
