import HighlightBoxEditing from './highlightboxediting';
import HighlightBoxUI from './highlightboxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class HighlightBox extends Plugin {
  static get requires() {
    return [HighlightBoxEditing, HighlightBoxUI];
  }
}
