import React, { useState, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import debounce from "lodash-es/debounce";
import { useStores } from "@src/store";
import { setMdEditorRef, globalEditorCountIncrease, globalEditorCount, setHtmlView } from "@src/utils/global";
import { LOCAL_STORE } from '@src/utils/const';


interface Props {

}

type TimerSave = number | null;

let timerSave: TimerSave = null;

const Editor: React.FC<Props> = (props) => {
  const { templateStore } = useStores();
  const editorRef = useRef<CodeMirror>(null);
  useEffect(() => {
    // 由于子元素是 useEffect 中初始化，因此正常无法获取，需要延迟
    setTimeout(() => {
      setMdEditorRef(editorRef.current?.editor);
    })
  }, []);

  return (
    <CodeMirror
      ref={editorRef}
      value={templateStore.mdContent}
      options={{
        theme: "github-light",
        mode: "markdown",
        lineWrapping: true,
        lineNumbers: false,
        extraKeys: {},
      }}
      onChange={debounce((editor: any) => {
        // 用于计算是否修改，减少游客直接下载而对后端的压力
        if (globalEditorCount >= 2) {
          localStorage.setItem(LOCAL_STORE.MD_COUNT, '999');
        } else if (globalEditorCount === 1 || globalEditorCount === 0) {
          globalEditorCountIncrease();
        }
        templateStore.setHtml(setHtmlView(templateStore.color));
        // 防止本地存储过于频繁存储
        if (!timerSave) {
          timerSave = window.setTimeout(() => {
            const content = editor.getValue();
            templateStore.setMdContent(content);
            localStorage.setItem(LOCAL_STORE.MD_RESUME, content);
            if (timerSave) {
              clearTimeout(timerSave);
              timerSave = null;
            }
          }, 1 * 1000);
        } else {
          clearTimeout(timerSave);
          timerSave = window.setTimeout(() => {
            const content = editor.getValue();
            templateStore.setMdContent(content);
            localStorage.setItem(LOCAL_STORE.MD_RESUME, content);
            if (timerSave) {
              clearTimeout(timerSave);
              timerSave = null;
            }
          }, 1 * 1000);
        }
      }, 300)}
    ></CodeMirror>
  );
};

export default React.memo(Editor);
