import { LOCAL_STORE, themes } from '@src/utils/const';
import { markdownParserResume } from "@utils/helper";
import { renderPlugin, colorPlugin } from '@src/utils/plugins';
import { getTheme } from "@utils/changeThemes";

export let mdEditorRef: any = null;
export let globalEditorCount = Number(localStorage.getItem(LOCAL_STORE.MD_COUNT)) || 0;

interface HistoryInfo {
    md: string
    theme: string
    color: string
}

export type HistoryLocalInfo = HistoryInfo & {time: number}

export function setMdHistory(value: HistoryInfo) {
    const { MD_HISTORY } = LOCAL_STORE;
    const historyStr = localStorage.getItem(MD_HISTORY);
    let historyObject: HistoryLocalInfo[] = [];
    if (historyStr) {
        historyObject = JSON.parse(historyStr);
    }
    if (historyObject.length === 8) {
        historyObject.shift();
    }
    historyObject.push({
        ...value,
        time: Date.now()
    });
    localStorage.setItem(MD_HISTORY, JSON.stringify(historyObject));
}

export function setMdEditorRef(editor: any) {
    mdEditorRef = editor;
}

export function globalEditorCountIncrease() {
    globalEditorCount++;
}

export function setHtmlView(color: string) {
    const content = mdEditorRef && mdEditorRef.getValue();
    return renderPlugin(markdownParserResume.render(content), {
        plugins: [{
            fn: colorPlugin,
            params: {
                color,
            }
        }]
    })
}

// 用户更新 html
export function renderViewStyle(color: string) {
    const rsViewer = document.querySelector(".rs-view") as HTMLElement;
    rsViewer.innerHTML = setHtmlView(color);
    rsViewer.style.height = 'auto';
}
// 更换模板
export async function updateTempalte(theme: string, color:string, setColor: (color: string) => void) {
    const curObj = themes.find(item => item.id === theme);
    if (curObj) {
        // 拉取主题
        await getTheme(theme);
        document.body.style.setProperty("--bg", curObj.defaultColor);
        // 设置当前主题颜色
        setColor(curObj.defaultColor);
        // 渲染html
        renderViewStyle(color);
        // 持久化
        localStorage.setItem(LOCAL_STORE.MD_THEME, curObj.id);
        localStorage.setItem(LOCAL_STORE.MD_COLOR, curObj.defaultColor);
        
    }
}
