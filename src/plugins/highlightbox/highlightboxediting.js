import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertHighlightBoxCommand from './inserthighlightboxcommand';

export default class HighlightBoxEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('insertHighlightBox', new InsertHighlightBoxCommand(this.editor));
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register('highlightBox', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register('highlightBoxContent', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'highlightBox',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith('highlightBoxContent') && childDefinition.name == 'highlightBox') {
        return false;
      }
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    // highlightBox
    conversion.for('upcast').elementToElement({
      model: 'highlightBox',
      view: {
        name: 'div',
        classes: ['card-container', 'highlight-container'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'highlightBox',
      view: {
        name: 'div',
        classes: ['card-container', 'highlight-container'],
        styles: 'font-size:13px;line-height: normal;',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'highlightBox',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'card-container highlight-container',
        });

        return toWidget(div, viewWriter, {
          label: 'highlight box widget',
        });
      },
    });

    // highlightBoxContent
    conversion.for('upcast').elementToElement({
      model: 'highlightBoxContent',
      view: {
        name: 'div',
        classes: ['card', 'card-highlight'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'highlightBoxContent',
      view: {
        name: 'div',
        classes: ['card', 'card-highlight'],
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'highlightBoxContent',
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement('div', {
          class: 'card card-highlight',
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
