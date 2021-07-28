import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import dontboxIcon from './dontboxIcon.svg';

export default class DontBoxUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    // The "dontBox" button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('dontBox', (locale) => {
      // The state of the button will be bound to the widget command.
      const command = editor.commands.get('insertDontBox');

      // The button will be an instance of ButtonView.
      const buttonView = new ButtonView(locale);

      buttonView.set({
        // The t() function helps localize the editor. All strings enclosed in t() can be
        // translated and change when the language of the editor changes.
        label: t('Dont Box'),
        icon: dontboxIcon,
        withText: true,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () => editor.execute('insertDontBox'));

      return buttonView;
    });
  }
}
