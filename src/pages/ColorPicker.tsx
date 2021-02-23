import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import "./ColorPicker.less";

const PickerColor = () => {
  const [displayPick, setDisplayPicker] = useState(false);
  const [color, setColor] = useState('#39393a');

  const collapse =(e:any) => {
    const colorWrapper = document.querySelector('.rs-color-wrapper')
    if(!colorWrapper?.contains(e.target) && displayPick) {
      setDisplayPicker(false);
    }
  }

  document.addEventListener('click', collapse, false)

  return (
    <div className="rs-color-wrapper">
      <div className="rs-color-btn" style={{ background: color }} onClick={() => { setDisplayPicker(!displayPick) }}></div>
      { displayPick && <ChromePicker color={color} onChangeComplete={(color) => {
        setColor(color.hex);
        document.body.style.setProperty('--bg', color.hex);
        // setDisplayPicker(false);
      }}></ChromePicker>}
    </div>
  )
}

export default PickerColor;
