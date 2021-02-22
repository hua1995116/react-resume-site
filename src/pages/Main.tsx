import React, { useState } from "react";
import SplitPane from 'react-split-pane';
import Editor from './Editor';
import View from './View';
import './Main.less';
import ColorPicker from './ColorPicker';

const Main = () => {
  const [viewHtml, setViewHtml] = useState<string>('');
  return (
    <div className="rs-container">
      <SplitPane split="vertical" minSize={400}>
        <Editor setViewHtml={setViewHtml}></Editor>
        <View viewHtml={viewHtml}></View>
      </SplitPane>
      <ColorPicker></ColorPicker>
    </div>
  );
};

export default Main;
