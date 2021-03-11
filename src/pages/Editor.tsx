import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdownParserResume } from "@utils/helper";
import debounce from "lodash-es/debounce";
import { useStores } from "@src/store";

interface Props {
  setViewHtml: React.Dispatch<React.SetStateAction<string>>;
}

type TimerSave = number | null;

let timerSave: TimerSave = null;

const Editor: React.FC<Props> = (props) => {
  const { templateStore } = useStores();
  const { setViewHtml } = props;

  return (
    <CodeMirror
      value={templateStore.mdContent}
      options={{
        theme: "github-light",
        mode: "markdown",
        lineWrapping: true,
        lineNumbers: false,
        extraKeys: {},
      }}
      onChange={debounce((editor) => {
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
