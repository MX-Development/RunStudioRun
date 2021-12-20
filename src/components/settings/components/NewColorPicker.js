import React, { useState } from 'react'
import styled from 'styled-components'
import { SketchPicker } from 'react-color';

function NewColorPicker({ position }) {

  const [color, setColor] = useState("#aabbcc");
  const [pickerOpen, setPickerOpen] = useState(false);

  function openPicker() {
    setPickerOpen(!pickerOpen);
  }

  function handleChange(color) {
    setColor(color.hex);
  }

  return (
    <ColorContainer>
      <PickerContainer className={pickerOpen ? 'active' : ''} pickerPosition={position}>
        <SketchPicker color={color} onChange={handleChange} disableAlpha={true} />
      </PickerContainer>
      <span className="label">Your Colour</span>
      <PickedColor color={color} onClick={openPicker} />
    </ColorContainer>
  )
}

export default NewColorPicker

const ColorContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  span.label {
    margin-right: 8px;
    font-size: 12px;
    font-weight: 100;
  }

  > .color-button {
    border-radius: 50%;
    width: 30px;
    min-width: auto;
    height: 30px;
    padding: 0;
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
