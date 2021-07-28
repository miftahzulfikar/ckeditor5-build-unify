import DoBoxEditing from './doboxediting';
import DoBoxUI from './doboxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class DoBox extends Plugin {
  static get requires() {
    return [DoBoxEditing, DoBoxUI];
  }
}
