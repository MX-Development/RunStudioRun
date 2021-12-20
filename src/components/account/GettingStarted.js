import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

import {
  Link
} from "react-router-dom";

import RunStudioRunLogo from '../assets/img/logo-hound-blurred.svg'

function GettingStarted() {

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  function resendEmail() {
    console.log('Resending email...');
  }

  return (
    <LoginContainer>
        <LoginModal>
          <ModalHeader>
            <img src={RunStudioRunLogo} alt="Run Studio Run logo" />
            <h1>
              Run<br/>
              Studio<br/>
              Run
            </h1>
          </ModalHeader>
          <ModalBody>
            <h1>Jump right in!</h1>
            <h5>
              Set up your team or company
            </h5>

            <form onSubmit={handleSubmit(onSubmit)}>

              <Grid container spacing={1}> 

                <Grid item xs={12} sm={12}>
                  <FormGroup style={{ position: 'relative' }}>
                    <FormControl variant="outlined">
                      <TextField
                        id="email"
                        placeholder="your-company-name"
                        variant="outlined"
                        style={{ background: 'var(--white)' }}
                      />
                    </FormControl>
                    <span>.runstudiorun.net</span>
                  </FormGroup>

                </Grid>

              </Grid>
            </form>
                
            <Grid item xs={12} sm={12}>
              <button type="submit" className="btn btn-dark-gray btn-lg btn-right" style={{ color: '#292724', width: '100%', padding: '10px', marginBottom: '40px' }}>Continue</button>
            </Grid>

          </ModalBody>
        </LoginModal>
      </LoginContainer>
  )
}

export default GettingStarted

const LoginContainer = styled.div`
  position: relative;
  height: 100vh;
`

const LoginModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 425px;
  width: 100%;
  border-radius: 2px;
`

const ModalHeader = styled.div`
  padding: 45px 45px 0;
  background: var(--white); 
  display: flex;
  justify-content: center;
  align-items: center;

  > h1 {
    font-weight: 900;
    text-transform: uppercase;
    line-height: .85;
    font-size: 24px;
  }
`

const ModalBody = styled.div`
  text-align: center;
  background: var(--white);
  padding: 45px 15px 15px;
  border-radius: 0 0 2px 2px;

  > .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > h1 {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 32px;
  }

  > h5 {
    margin-bottom: 60px;
  }

  a {
    text-decoration: underline;
    color: inherit;
    margin-left: 3.5px;
  }

  p {
    margin-bottom: 8px;
  }

  button {
    margin: 16px 0;
  }

  form span {
    position: absolute;
    right: 10px;
    top: 25%;
    font-size: 14px;
    opacity: 0.5;
  }

  form .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  small {
    span {
    text-align: center;
    justify-content: center;
    }
  }
`
