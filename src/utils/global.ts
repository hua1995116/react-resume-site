import { LOCAL_STORE } from '@src/utils/const';

export let mdEditorRef: any = null;
export let globalEditorCount = Number(localStorage.getItem(LOCAL_STORE.MD_COUNT)) || 0;

export function setMdEditorRef(editor: any) {
    mdEditorRef = editor;
}

export function globalEditorCountIncrease() {
    globalEditorCount++;
}
