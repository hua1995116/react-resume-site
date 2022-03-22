import React, { useCallback } from "react";
import CodeMirror, { IEditorInstance } from "@uiw/react-codemirror";
import debounce from "lodash-es/debounce";
import { useStores } from "@src/store";
import { setMdHistory, setMdEditorRef, globalEditorCountIncrease, globalEditorCount, setHtmlView } from "@src/utils/global";
import { LOCAL_STORE } from '@src/utils/const';
import { observer } from "mobx-react";
import "./Editor.less"

type TimerSave = number | null;

let timerSave: TimerSave = null;

const Editor: React.FC = observer(() => {
  const { templateStore } = useStores();
  const { isPreview, mdContent, setHtml } = templateStore;

  const setRefCallback = useCallback((node: IEditorInstance) => {
    if (node?.editor) {
      setMdEditorRef(node.editor)
    }
  }, [])

  return (
    <>
      <div className="rs-editor-cover" style={{ display: isPreview ? 'flex' : 'none' }}>预览中，不可编辑</div>
      <CodeMirror
        ref={setRefCallback}
        value={mdContent}
        options={{
          theme: "github-light",
          mode: "markdown",
          lineWrapping: true,
          lineNumbers: false,
          extraKeys: {},
        }}
        onChange={debounce((editor: any) => {
          // 用于计算是否修改，减少游客直接下载而对后端的压力
          const color = localStorage.getItem(LOCAL_STORE.MD_COLOR) || "";
          const theme = localStorage.getItem(LOCAL_STORE.MD_THEME) || "";
          if (globalEditorCount >= 2) {
            localStorage.setItem(LOCAL_STORE.MD_COUNT, '999');
          } else if (globalEditorCount === 1 || globalEditorCount === 0) {
            globalEditorCountIncrease();
          }
          setHtml(setHtmlView(color));
          // 防止本地存储过于频繁存储
          if (timerSave) {
            clearTimeout(timerSave);
            timerSave = null;
          }
          timerSave = window.setTimeout(() => {
            const content = editor.getValue();
            templateStore.setMdContent(content);
            localStorage.setItem(LOCAL_STORE.MD_RESUME, content);
            setMdHistory({
              theme,
              color,
              md: content
            })
            if (timerSave) {
              clearTimeout(timerSave);
              timerSave = null;
            }
          }, 2 * 1000);
        }, 300)}
      ></CodeMirror>
    </>
  );
});

export default React.memo(Editor);
