import React, { useEffect, useState } from "react";
import Editor from './Editor';
import View from './View';
import './Main.less';
import SplitPane from 'react-split-pane';

const Main = () => {
  const [viewHtml, setViewHtml] = useState<string>('');
  return (
    <div className="rs-container">
      <SplitPane split="vertical" minSize={400}>
        <Editor setViewHtml={setViewHtml}></Editor>
        <View viewHtml={viewHtml}></View>
      </SplitPane>
    </div>
  );
};

export default Main;
