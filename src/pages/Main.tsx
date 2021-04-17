import React, { useState } from "react";
import { Layout, Menu } from "antd";
import SplitPane from "react-split-pane";
import Editor from "./Editor";
import View from "./View";
import "./Main.less";
import ColorPicker from "./ColorPicker";
import Shortcuts from "@src/components/Shortcuts";
// import OnePage from '@src/components/OnePage';
// import Preview from "@src/components/Preview";
// import HeaderBar from "@src/components/HeaderBar/index";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Main = () => {
  return (
    <div className="rs-container">
      <SplitPane split="vertical" minSize={450}>
        <Editor></Editor>
        <View></View>
      </SplitPane>
      <ColorPicker></ColorPicker>
      {/* <Shortcuts></Shortcuts> */}
      {/* <OnePage></OnePage> */}
      {/* <Preview></Preview> */}
    </div>
  );
};

export default Main;
