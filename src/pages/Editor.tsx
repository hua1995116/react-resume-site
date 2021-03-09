import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdownParserResume } from '@utils/helper';
import debounce from 'lodash-es/debounce';
import { INIT_CONTENT } from '@src/utils/global';

interface Props {
  setViewHtml: React.Dispatch<React.SetStateAction<string>>
}

type TimerSave = (number | null)

let timerSave: TimerSave = null;

const localContent = localStorage.getItem('md-resume');

const defaultContent = localContent || INIT_CONTENT;

const Editor: React.FC<Props> = (props) => {
  const { setViewHtml } = props;
  const [content] = useState(defaultContent);

  return (
    <CodeMirror
      value={content}
      options={{
        theme: "github-light",
        mode: "markdown",
        lineWrapping: true,
        lineNumbers: false,
        extraKeys: {},
      }}
      onChange={debounce((editor) => {
        const content = editor.getValue();
        setViewHtml(markdownParserResume.render(content))
        if (!timerSave) {
          timerSave = window.setTimeout(() => {
            localStorage.setItem('md-resume', content);
            if (timerSave) {
              clearTimeout(timerSave);
              timerSave = null;
            }
          }, 1 * 1000);
        } else {
          clearTimeout(timerSave);
          timerSave = window.setTimeout(() => {
            localStorage.setItem('md-resume', content);
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
