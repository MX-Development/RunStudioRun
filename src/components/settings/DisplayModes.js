import React, { useState } from 'react'

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

      <div style={{ position: 'absolute', top: '31px', left: '10%' }}>
        <img src={DarkHound} style={{ width: '35%' }} alt="dark hound" />
        <img src={LightHound} style={{ width: '38%' }} alt="light hound" />
      </div>

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
