import React, { useState, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdownParserResume } from "@utils/helper";
import debounce from "lodash-es/debounce";
import { useStores } from "@src/store";
import { setMdEditorRef, globalEditorCountIncrease, globalEditorCount } from "@src/utils/global";

interface Props {
  setViewHtml: React.Dispatch<React.SetStateAction<string>>;
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
  const { setViewHtml } = props;

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
        console.log(globalEditorCount, 'globalEditorCount==');
        if (globalEditorCount >= 2) {
          localStorage.setItem('md-count', '999');
        } else if (globalEditorCount === 1 || globalEditorCount === 0) {
          globalEditorCountIncrease();
        }
        const content = editor.getValue();
        setViewHtml(markdownParserResume.render(content));
        if (!timerSave) {
          timerSave = window.setTimeout(() => {
            templateStore.setMdContent(content);
            localStorage.setItem("md-resume", content);
            if (timerSave) {
              clearTimeout(timerSave);
              timerSave = null;
            }
          }, 1 * 1000);
        } else {
          clearTimeout(timerSave);
          timerSave = window.setTimeout(() => {
            templateStore.setMdContent(content);
            localStorage.setItem("md-resume", content);
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
