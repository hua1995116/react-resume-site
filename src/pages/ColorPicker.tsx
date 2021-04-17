import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useStores } from '@src/store';
import { useObserver } from "mobx-react";
import { LOCAL_STORE } from '@utils/const';
import "./ColorPicker.less";

const PickerColor = () => {
  const { templateStore } = useStores();
  const [displayPick, setDisplayPicker] = useState(false);

  const collapse =(e:any) => {
    const colorWrapper = document.querySelector('.rs-color-wrapper')
    if(!colorWrapper?.contains(e.target) && displayPick) {
      setDisplayPicker(false);
    }
  }

  document.addEventListener('click', collapse, false);

  return useObserver(() => (
    <div className="rs-color-wrapper">
      <div className="rs-color-btn" style={{ background: templateStore.color }} onClick={() => { setDisplayPicker(!displayPick) }}></div>
      { displayPick && <ChromePicker color={templateStore.color} onChangeComplete={(color) => {
        templateStore.setColor(color.hex);
        localStorage.setItem(LOCAL_STORE.MD_COLOR, color.hex);
        document.body.style.setProperty('--bg', color.hex);
        // setDisplayPicker(false);
      }}></ChromePicker>}
    </div>
  ));
}

export default PickerColor;
