import React from "react";
import { observer } from "mobx-react";
import { useStores } from "@src/store";
import FeedBack from "../FeedBack";
import "./index.less";

const menu = [
  {
    url: "#/",
    title: "编辑器",
  },
  {
    url: "#/square",
    title: "模板中心",
  },
];

const HeaderCommonBar = observer(() => {
  const { globalStore } = useStores();
  const { curTab, setCurTab } = globalStore;

  return (
    <div className="rsC-header">
      <div className="rsC-header__logo">
        <h1>
          <a href="/">
            <img src="https://s3.qiufeng.blue/muji/muji-logo-v2.jpg" alt="" />
            <span>木及简历</span>
          </a>
        </h1>
      </div>
      <div className="rsC-header__menu">
        <ul>
          {menu.map((item) => {
            return (
              <li
                key={item.url}
                className={`nav-li ${curTab === item.url ? "current" : ""}`}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setCurTab(item.url);
                    window.location.href = item.url;
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
          <li className="nav-li">
            <FeedBack></FeedBack>
          </li>
          {/* <li className={`nav-li ${curTab === '#/square' ? 'current' : ""}`}><a href="#/square" onClick={(e) => {
          e.preventDefault();
        }}>模板中心</a></li>
          <li className={`nav-li ${curTab === '#/' ? 'current' : ""}`}><a href="#/">编辑器</a></li>
          <li className="nav-li">
            <FeedBack></FeedBack>
          </li> */}
        </ul>
      </div>
    </div>
  );
});

export default HeaderCommonBar;
