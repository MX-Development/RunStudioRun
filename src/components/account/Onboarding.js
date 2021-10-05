import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { auth, provider } from '../../config/firebase'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useSpring, animated } from 'react-spring'

import GoogleLogo from './google-logo.svg'

import './Onboarding.css'

import {
  Link
} from "react-router-dom";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 435}px,${y / 8 + 430}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 + 250}px,${y / 6 + 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5 + 800}px,${y / 3.5 + 200}px,0)`

function Onboarding() {

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  const signIn = (e) => {
    e.preventDefault()
    auth.signInWithPopup(provider).catch((error) => {
      alert(error.message)
    })
  }
  
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))

  return (
    <LoginContainer>
      <div class="container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <animated.div class="card1" style={{ transform: props.xy.interpolate(trans1) }} />
        <animated.div class="card2" style={{ transform: props.xy.interpolate(trans2) }} />
        <animated.div class="card3" style={{ transform: props.xy.interpolate(trans3) }} />
        <animated.div class="card4" style={{ transform: props.xy.interpolate(trans4) }} />
      </div>
        <LoginModal>
          <ModalHeader>
            <h1>
              Run<br/>
              Studio<br/>
              Run
            </h1>
          </ModalHeader>
          <ModalBody>
            <h3>Create your account</h3>
            <GoogleButton onClick={signIn}>
              <img src={GoogleLogo} alt="google logo" /> Continue with Google
            </GoogleButton>
            <Divider>
              <span>Or</span>
            </Divider>



            <form onSubmit={handleSubmit(onSubmit)}>

              <Grid container spacing={1}> 

                <Grid item xs={12} sm={12}>
                  <FormGroup>
                    <FormControl variant="outlined">
                      <TextField
                        id="email"
                        placeholder="Enter email"
                        variant="outlined"
                        style={{ background: '#fff' }}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormGroup>
                    <FormControl variant="outlined">
                      <TextField
                        type="password"
                        id="password"
                        placeholder="Password"
                        variant="outlined"
                        style={{ background: '#fff' }}
                      />
                    </FormControl>
                    <FormHelperText id="outlined-weight-helper-text">Password strength: strong</FormHelperText>
                  </FormGroup>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControl variant="outlined">
                      <TextField
                        type="first_name"
                        id="first_name"
                        placeholder="First name"
                        variant="outlined"
                        style={{ background: '#fff' }}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControl variant="outlined">
                      <TextField
                        type="last_name"
                        id="last_name"
                        placeholder="Last name"
                        variant="outlined"
                        style={{ background: '#fff' }}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <p style={{ fontSize: '12px', textAlign: 'center', margin: '8px 0' }}>By clicking below, you agree to our Terms and Privacy Policy.</p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <button type="submit" className="btn btn-gold btn-right" style={{ color: '#292724', width: '100%', padding: '10px', marginBottom: '8px' }}>Agree</button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <p style={{ fontSize: '16px', textAlign: 'center', fontWeight: 'bold' }}>
                    <span style={{ color: '#fff' }}>30 DAY FREE TRIAL</span> NO CREDIT CARD REQUIRED</p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <p style={{ fontSize: '12px', textAlign: 'center', margin: '8px 0', width: '80%', display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: '10px' }}>This site is protected by reCAPTACHA and the Google Privacy Policy and Terms of Service apply.</p>
                </Grid>

              </Grid>
            </form>
          </ModalBody>
        </LoginModal>
      </LoginContainer>
  )
}

export default Onboarding

const LoginContainer = styled.div`
  position: relative;
  height: 100vh;
`

const LoginModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 550px;
  width: 100%;
  border-radius: 2px;
`

const ModalHeader = styled.div`
  padding: 15px;
  background: #fff; 
  border-radius: 2px 2px 0 0;

  > h1 {
    font-weight: 900;
    text-transform: uppercase;
    line-height: .85;
    font-size: 40px;
  }
`

const ModalBody = styled.div`
  background: #DDDBD7;
  padding: 25px 15px;
  border-radius: 0 0 2px 2px;

  > .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > h3 {
    font-size: 28px;
    font-weight: 300;
    color: #fff;
    margin-bottom: 20px;
  }

  a {
    font-size: 12px;
    text-decoration: none;
    color: inherit;
    display: block;
  }
`

const ModalFooter = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 15px;

  > p a {
    text-decoration: none;
    color: inherit;
  }
`

const GoogleButton = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 7.5px;
  border-radius: 2px;

  :hover {
    cursor: pointer;
  }

  > img {
    margin-right: 7.5px;
  }
`

const Divider = styled.div`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  margin: 10px 0;

  :before {
    content: '';
    width: 20px;
    height: 1px;
    background: #fff;
    position: relative;
    top: 6px;
    margin-right: 10px;
  }

  :after {
    content: '';
    width: 20px;
    height: 1px;
    background: #fff;
    position: relative;
    top: 6px;
    margin-left: 10px;
  }
`
