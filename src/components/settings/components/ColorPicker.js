import React, { useState } from 'react'
import styled from 'styled-components'
import { HexColorPicker } from "react-colorful";

function Picker({ position }) {

  if (position) {
    console.log(position);
  }

  const [color, setColor] = useState("#aabbcc");
  const [pickerOpen, setPickerOpen] = useState(false);

  function openPicker() {
    setPickerOpen(!pickerOpen);
  }

  return (
    <ColorPicker>
      <PickerContainer className={pickerOpen ? 'active' : ''} pickerPosition={position}>
        <HexColorPicker color={color} onChange={setColor} />
      </PickerContainer>
      <span>Your Colour</span>
      <PickedColor color={color} onClick={openPicker} />
    </ColorPicker>
  )
}

export default Picker

const ColorPicker = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  span {
    margin-right: 8px;
    font-size: 12px;
    font-weight: 100;
  }
`

const PickedColor = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: ${props => props.color ? `${props.color}` : "#FCDB6E"};

  &:hover {
    cursor: pointer;
  }
`

const PickerContainer = styled.div`
  position: absolute;
  left: ${props => props.pickerPosition === 'bottom' ? `-50%` : `0`};
  bottom: ${props => props.pickerPosition === 'bottom' ? `0` : `auto`};
  top: ${props => props.pickerPosition === 'bottom' ? `auto` : `0`};
  transform: ${props => props.pickerPosition === 'bottom' ? `translate(calc(-10% - 15%), calc(100% + 15px))` : `translate(-10%, calc(-100% - 15px))`};
  z-index: 5;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  &.active {
    opacity: 1;
  }
`
