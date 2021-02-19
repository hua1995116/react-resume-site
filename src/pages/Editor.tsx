import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdownParserResume } from '@utils/helper';
import debounce from 'lodash-es/debounce';

interface Props {
  setViewHtml: React.Dispatch<React.SetStateAction<string>>
}

const Editor: React.FC<Props> = (props) => {
  const { setViewHtml } = props;
  const [content, setContent] = useState("");

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
        console.log(markdownParserResume.render(content));
      }, 300)}
    ></CodeMirror>
  );
};

export default React.memo(Editor);
