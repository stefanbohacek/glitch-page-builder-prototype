const initEditor = (editorSelector) => {
  const editorEl = document.createElement("div");
  editorEl.id = "simplepagebuilder";
  editorEl.style.position = "fixed";
  editorEl.style.width = "100%";
  editorEl.style.height = "100%";
  document.body.appendChild(editorEl);

  const editor = grapesjs.init({
    container: editorSelector,
    storageManager: {
      autosave: false,
      autoload: false
    },  
    plugins: [
      "grapesjs-preset-webpage",
      "gjs-blocks-basic",
      "grapesjs-custom-code",
      "grapesjs-touch",
    ],
    autorender: false,
    pluginsOpts: {
      "gjs-blocks-basic": {},
      "grapesjs-preset-webpage": {
        textCleanCanvas: "Are you sure you want to remove everything?",
      },
      "grapesjs-custom-code": {},
      "grapesjs-touch": {},
    },
  });

  /* Hide buttons. */

  [
    ["views", "open-layers"],
    // ["views", "open-tm"],
    ["options", "sw-visibility"],
    ["options", "fullscreen"],
    ["options", "gjs-open-import-webpage"],
    // ["options", "export-template"]
  ].forEach((item) => {
    const btn = editor.Panels.getButton(item[0], item[1]);
    btn.collection.remove(btn);
  });

  // editor.Panels.addButton("options", [
  //   {
  //     id: "save",
  //     label: "Save",
  //     className: "fa fa-question icon-blank",
  //     command: (editor, sender) => {
  //       // console.log(
  //       //   document.querySelector(".CodeMirror").CodeMirror.getValue()
  //       // );
  //       // console.log(editor.getHtml());
  //       // const codeMirror = getCodeMirrorInstance(".CodeMirror");
  //       // codeMirror.setValue(editor.getHtml());
  //       // codeMirror.setValue("editor.getHtml()");
  //       // console.log(codeMirror.getValue());
  //       alert("SAVED!");
  //     },
  //     attributes: { title: "Help" },
  //   },
  // ]);

  editor.Panels.addButton("options", [
    {
      id: "close",
      label: "Close",
      className: "fa fa-question icon-blank",
      command: (editor, sender) => {
        let codeMirror;
        const html = editor.getHtml();
        const css = editor.getCss();

        document.getElementById("simplepagebuilder").remove();

        document.querySelector('[title="index.html"]').click();
        setTimeout(() => {
          codeMirror = getCodeMirrorInstance(".CodeMirror");
          codeMirror.setValue(
            html_beautify(/* html */ `<!DOCTYPE html>
            <html lang="en">
              <head>
                <!-- 
                  This is an HTML comment
                  You can write text in a comment and the content won't be visible in the page
                -->
            
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="https://glitch.com/favicon.ico" />
            
                <!--
                  This is the page head - it contains info the browser uses
                  Like the title, which appears on the browser tab but not inside the page
                  Further down you'll see the content that displays in the page
                -->
                <title>Hello World!</title>
            
                <!-- The website stylesheet -->
                <link rel="stylesheet" href="/style.css" />
            
                <!-- The website JavaScript file -->
                <script src="/script.js" defer></script>
              </head>
              ${html}
            </html>
            `)
          );

          document.querySelector('[title="style.css"]').click();

          setTimeout(() => {
            codeMirror = getCodeMirrorInstance(".CodeMirror");
            codeMirror.setValue(cssbeautify(css));
            alert("SAVED!");
          }, 100);
        }, 100);
      },
      attributes: { title: "Close" },
    },
  ]);

  // const importBtn = editor.Panels.getButton(
  //   "options",
  //   "gjs-open-import-webpage"
  // );

  // importBtn.set({
  //   className: "fa fa-upload icon-blank",
  //   label: "",
  // });

  editor.on("load", async () => {

    editor.Panels.getButton("views", "open-blocks").set("active", true);
    document.querySelector('[title="index.html"]').click();

    setTimeout(() => {
      codeMirror = getCodeMirrorInstance(".CodeMirror");
      const htmlCode = codeMirror.getValue();
      const matched = htmlCode.match(/<body[^>]*>([\w|\W]*)<\/body>/im);
      editor.setComponents(matched[1]);
  
      document.querySelector('[title="style.css"]').click();
      setTimeout(() => {
        codeMirror = getCodeMirrorInstance(".CodeMirror");
        const cssCode = codeMirror.getValue();
        console.log("debug cssCode", cssCode);
        editor.setStyle(cssCode);
      }, 100);
  
    }, 100);
  });

  // const bm = editor.Blocks;
  // const imageBlock = bm.get('image');

  // imageBlock.set({
  //   label: 'Updated block',
  // });

  // bm.add('image2', {
  //   // category,
  //   // select: true,
  //   // activate: true,
  //   label: "IMAGE2",
  //   media: `<svg viewBox="0 0 24 24">
  //     <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
  //   </svg>`,
  //   content: {
  //     style: { color: 'black' },
  //     type: 'image',
  //   }
  // });
  editor.render();
  // pageEditor.setStyle(css);
};
