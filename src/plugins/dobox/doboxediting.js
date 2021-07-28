import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertDoBoxCommand from './insertdoboxcommand';

export default class DoBoxEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('insertDoBox', new InsertDoBoxCommand(this.editor));
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register('doBox', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register('doBoxContent', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'doBox',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith('doBoxContent') && childDefinition.name == 'doBox') {
        return false;
      }
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    // doBox
    conversion.for('upcast').elementToElement({
      model: 'doBox',
      view: {
        name: 'div',
        classes: ['card-container', 'do-box-container'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'doBox',
      view: {
        name: 'div',
        classes: ['card-container', 'do-box-container'],
        styles: 'font-size:13px;line-height: normal;',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'doBox',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'card-container do-box-container',
        });

        return toWidget(div, viewWriter, {
          label: 'do box widget',
        });
      },
    });

    // doBoxContent
    conversion.for('upcast').elementToElement({
      model: 'doBoxContent',
      view: {
        name: 'div',
        classes: ['card', 'do-box'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'doBoxContent',
      view: {
        name: 'div',
        classes: ['card', 'do-box'],
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'doBoxContent',
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement('div', {
          class: 'card do-box',
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
