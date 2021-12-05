import React, { useState } from 'react'
import styled from 'styled-components'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import LightHound from '../assets/img/light-hound.svg'
import DarkHound from '../assets/img/dark-hound.svg'

function DisplayModes() {

  const [selectedState, setSelectedState] = useState('light');
  const handleClick = (id) => {
    setSelectedState(id);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox 
              checked={selectedState === 'light' ? true : false} 
              onClick={() => handleClick('light')} 
              name="light" 
            />
          }
          label="Light"
        />
      </FormGroup>

      <ModeContainer>
        <img src={DarkHound} style={{ height: '145px' }} alt="dark hound" />
        <img src={LightHound} style={{ height: '155px' }} alt="light hound" />
      </ModeContainer>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox 
            checked={selectedState === 'dark' ? true : false} 
              onClick={() => handleClick('dark')} 
              name="dark" 
            />
          }
          label="Dark"
        />
      </FormGroup>
    </div>
  )
}

export default DisplayModes

const ModeContainer = styled.div`
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`
