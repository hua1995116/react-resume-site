export let mdEditorRef: any = null;
export let globalEditorCount = Number(localStorage.getItem('md-count')) || 0;

export function setMdEditorRef(editor: any) {
    mdEditorRef = editor;
}

export function globalEditorCountIncrease() {
    globalEditorCount++;
}
