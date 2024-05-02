import initEditor from "./modules/initEditor.js";
import onElementAvailable from "./modules/onElementAvailable.js";
import getCodeMirrorInstance from "./modules/getCodeMirrorInstance.js";

onElementAvailable("#sidebar", () => {
    const editorBtn = document.createElement("div");
    editorBtn.id = "simplepagebuilder-btn";
    editorBtn.innerHTML = /* html */ `
        <button id="open-editor" label="Page builder" class="css-1bh24qg">
            Page builder
        </button>
    
    `;
    document.querySelector("#sidebar div:nth-of-type(3)").after(editorBtn);



    document.getElementById("open-editor").addEventListener("click", async (ev) => {
        const editor = document.createElement("div");
        editor.id = "simplepagebuilder";

        editor.style.position = "fixed";
        editor.style.width = "100%";
        editor.style.height = "100%";

        document.body.appendChild(editor);
        initEditor("#simplepagebuilder");

        console.log("DEBUGGGG", document.querySelector('.CodeMirror').CodeMirror);

// setTimeout(async () => {
//     const codeMirror = await getCodeMirrorInstance();

//     console.log("codeMirror", codeMirror);
//     if (codeMirror){
//         const htmlCode = codeMirror.getValue();
//         console.log("htmlCode", htmlCode);
//     } else {
//         console.log("bollocks...");
//     }
// }, 5000)


    });

});


