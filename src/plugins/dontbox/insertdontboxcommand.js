import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDontHighlightBoxCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      this.editor.model.insertContent(createDontBox(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'dontBox');

    this.isEnabled = allowedIn !== null;
  }
}

function createDontBox(writer) {
  const dontBox = writer.createElement('dontBox');
  const dontBoxContent = writer.createElement('dontBoxContent');

  writer.append(dontBoxContent, dontBox);

  writer.appendElement('paragraph', dontBoxContent);

  return dontBox;
}
