import React, { useState } from "react";
import SplitPane from 'react-split-pane';
import Editor from './Editor';
import View from './View';
import './Main.less';
import ColorPicker from './ColorPicker';
import Shortcuts from '@src/components/Shortcuts';
import Preview from '../components/Preview';

const Main = () => {
  const [viewHtml, setViewHtml] = useState<string>('');
  return (
    <div className="rs-container">
      <SplitPane split="vertical" minSize={450}>
        <Editor setViewHtml={setViewHtml}></Editor>
        <View viewHtml={viewHtml}></View>
      </SplitPane>
      <ColorPicker></ColorPicker>
      <Shortcuts></Shortcuts>
      <Preview></Preview>
    </div>
  );
};

export default Main;
