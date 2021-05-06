import React, { useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import debounce from "lodash-es/debounce";
import { useStores } from "@src/store";
import { setMdHistory, setMdEditorRef, globalEditorCountIncrease, globalEditorCount, setHtmlView } from "@src/utils/global";
import { LOCAL_STORE } from '@src/utils/const';
import { observer } from "mobx-react";
import "./Editor.less"


interface Props {

}

type TimerSave = number | null;

let timerSave: TimerSave = null;

const Editor: React.FC<Props> = observer((props) => {
  const { templateStore } = useStores();
  const { isPreview, mdContent, setHtml } = templateStore;
  const editorRef = useRef<CodeMirror>(null);
  // console.log(color, theme, '===editor');
  useEffect(() => {
    // 由于子元素是 useEffect 中初始化，因此正常无法获取，需要延迟
    setTimeout(() => {
      setMdEditorRef(editorRef.current?.editor);
    }, 0)
  }, []);

  return (
    <>
      <div className="rs-editor-cover" style={{display: isPreview ? 'flex' : 'none'}}>预览中，不可编辑</div>
      <CodeMirror
        ref={editorRef}
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
