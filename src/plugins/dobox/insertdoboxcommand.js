import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDoBoxCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      this.editor.model.insertContent(createDoBox(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'doBox');

    this.isEnabled = allowedIn !== null;
  }
}

function createDoBox(writer) {
  const doBox = writer.createElement('doBox');
  const doBoxContent = writer.createElement('doBoxContent');

  writer.append(doBoxContent, doBox);

  writer.appendElement('paragraph', doBoxContent);

  return doBox;
}
