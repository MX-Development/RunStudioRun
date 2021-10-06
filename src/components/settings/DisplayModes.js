import React, { useState } from 'react'
import styled from 'styled-components'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import LightHound from '../assets/img/light-hound.svg'
import DarkHound from '../assets/img/dark-hound.svg'

function DisplayModes() {

  const [state, setState] = useState({
    light: true,
    dark: false 
  });

  const handleChange = (event) => {
    setState({
      light: false,
      dark: false
    })
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <FormGroup>
        { state.type }
        <FormControlLabel
          control={<Checkbox checked={state.light} onChange={handleChange} name="light" />}
          label="Light"
        />
      </FormGroup>

      <ModeContainer>
        <img src={DarkHound} style={{ height: '145px' }} alt="dark hound" />
        <img src={LightHound} style={{ height: '155px' }} alt="light hound" />
      </ModeContainer>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={state.dark} onChange={handleChange} name="dark" />}
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
