# CKEditor 5 Unify editor build

The Unify custom build of CKEditor 5

## Quick start

First, install the build from npm:

```bash
npm install --save ckeditor5-build-unify
```

And use it in your website:

```html
<div id="editor">
  <p>This is the editor content.</p>
</div>
<script src="./node_modules/ckeditor5-build-unify/build/ckeditor.js"></script>
<script>
  ClassicEditor.create(document.querySelector("#editor"))
    .then((editor) => {
      window.editor = editor;
    })
    .catch((error) => {
      console.error("There was a problem initializing the editor.", error);
    });
</script>
```

Or in your JavaScript application:

```js
import ClassicEditor from "ckeditor5-build-unify";

// Or using the CommonJS version:
// const ClassicEditor = require( '@ckeditor/ckeditor5-build-classic' );

ClassicEditor.create(document.querySelector("#editor"))
  .then((editor) => {
    window.editor = editor;
  })
  .catch((error) => {
    console.error("There was a problem initializing the editor.", error);
  });
```

**Note:** If you are planning to integrate CKEditor 5 deep into your application, it is actually more convenient and recommended to install and import the source modules directly (like it happens in `ckeditor.js`). Read more in the [Advanced setup guide](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html).
