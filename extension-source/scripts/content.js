ready(() => {
  onElementAvailable("#sidebar", async () => {
    const editorBtn = document.createElement("div");
    editorBtn.id = "simplepagebuilder-btn";
    editorBtn.innerHTML = /* html */ `
            <button id="open-editor" label="Page builder" class="css-1bh24qg">
                <img data-module="Icon" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e6.svg" class="css-bjuv3u">
                Page builder
            </button>
        
        `;
    document.querySelector("#sidebar div:nth-of-type(3)").after(editorBtn);

    document
      .getElementById("open-editor")
      .addEventListener("click", async (ev) => {
        initEditor("#simplepagebuilder");
      });
  });
});
