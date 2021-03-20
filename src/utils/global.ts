import { LOCAL_STORE } from '@src/utils/const';
import { markdownParserResume } from "@utils/helper";
import { renderPlugin, colorPlugin } from '@src/utils/plugins';

export let mdEditorRef: any = null;
export let globalEditorCount = Number(localStorage.getItem(LOCAL_STORE.MD_COUNT)) || 0;

export function setMdEditorRef(editor: any) {
    mdEditorRef = editor;
}

export function globalEditorCountIncrease() {
    globalEditorCount++;
}

export function setHtmlView(color: string) {
    const content = mdEditorRef.getValue();
    return renderPlugin(markdownParserResume.render(content), {
        plugins: [{
            fn: colorPlugin,
            params: {
                color,
            }
        }]
    })
}
