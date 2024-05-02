const getCodeMirrorInstance = (selector) => {
    const codeMirrorEl = document.querySelector(selector);
    return codeMirrorEl?.CodeMirror ? codeMirrorEl.CodeMirror : false;
}
