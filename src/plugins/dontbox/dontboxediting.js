import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertDontBoxCommand from './insertdontboxcommand';

export default class DontBoxEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('insertDontBox', new InsertDontBoxCommand(this.editor));
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register('dontBox', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register('dontBoxContent', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'dontBox',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith('dontBoxContent') && childDefinition.name == 'dontBox') {
        return false;
      }
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    // dontBox
    conversion.for('upcast').elementToElement({
      model: 'dontBox',
      view: {
        name: 'div',
        classes: ['card-container', 'dont-box-container'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'dontBox',
      view: {
        name: 'div',
        classes: ['card-container', 'dont-box-container'],
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'dontBox',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'card-container dont-box-container',
        });

        return toWidget(div, viewWriter, {
          label: 'dont box widget',
        });
      },
    });

    // dontBoxContent
    conversion.for('upcast').elementToElement({
      model: 'dontBoxContent',
      view: {
        name: 'div',
        classes: ['card', 'dont-box'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'dontBoxContent',
      view: {
        name: 'div',
        classes: ['card', 'dont-box'],
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'dontBoxContent',
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement('div', {
          class: 'card dont-box',
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
