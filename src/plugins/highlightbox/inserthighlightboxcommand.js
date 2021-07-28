import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertHighlightBoxCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      this.editor.model.insertContent(createHighlightBox(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'highlightBox');

    this.isEnabled = allowedIn !== null;
  }
}

function createHighlightBox(writer) {
  const highlightBox = writer.createElement('highlightBox');
  const highlightBoxContent = writer.createElement('highlightBoxContent');

  writer.append(highlightBoxContent, highlightBox);

  writer.appendElement('paragraph', highlightBoxContent);

  return highlightBox;
}
