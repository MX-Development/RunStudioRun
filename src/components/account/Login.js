import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { auth, provider } from '../../config/firebase'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Hound from '../assets/img/logo-hound-blurred.svg';

import { useSpring, animated } from 'react-spring'

import GoogleLogo from '../assets/logos/google-logo.svg'

import './Login.css'

import {
  Link
} from "react-router-dom";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 435}px,${y / 8 + 430}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 + 250}px,${y / 6 + 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5 + 800}px,${y / 3.5 + 200}px,0)`

function Login() {

  const { handleSubmit } = useForm();
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
    <div className="container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <animated.div className="card1" style={{ transform: props.xy.interpolate(trans1) }} />
      <animated.div className="card2" style={{ transform: props.xy.interpolate(trans2) }} />
      <animated.div className="card3" style={{ transform: props.xy.interpolate(trans3) }} />
      <animated.div className="card4" style={{ transform: props.xy.interpolate(trans4) }} />
    </div>
      <LoginModal>
        <ModalHeader>
          <h1>
            Run<br/>
            Studio<br/>
            Run
          </h1>
          <img src={Hound} alt="" />
        </ModalHeader>
        <ModalBody>
          <h3>Log in to your account</h3>



          <form onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={1}> 

              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <FormControl variant="outlined">
                    <TextField
                      id="email"
                      placeholder="Enter email"
                      variant="outlined"
                      style={{ background: 'var(--white)' }}
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
                      style={{ background: 'var(--white)' }}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className="form-footer">
                  <div className="btn-group">
                    <div className="btn-left">
                      <Link to="/forgot-password" style={{ marginBottom: '5px' }}>
                        Forgot password?
                      </Link>
                      <Link to="/sign-up">
                        Sign up for an account
                      </Link>
                    </div>
                    <div className="btn-right">
                      <button type="submit" className="btn btn-gold gray-text btn-lg btn-right">Log in</button>
                    </div>
                  </div>
                </div>
              </Grid>

            </Grid>
          </form>

          <Divider>
            <span>Or</span>
          </Divider>
          <GoogleButton onClick={signIn}>
            <img src={GoogleLogo} alt="google logo" /> Continue with Google
          </GoogleButton>
        </ModalBody>
        <ModalFooter>
          <p>2021 © Run Studio Run | <Link to="/terms">Terms</Link> | <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/help">Need Help?</Link></p>
        </ModalFooter>
      </LoginModal>
    </LoginContainer>
  )
}

export default Login

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
  padding: 30px 15px;
  background: var(--white); 
  border-radius: 2px 2px 0 0;
  position: relative;

  > h1 {
    font-weight: 900;
    text-transform: uppercase;
    line-height: .825;
    font-size: 32px;
  }

  > img {
    height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    padding-right: 30px;
    padding-top: 15px;
  }
`

const ModalBody = styled.div`
  background: #DDDBD7;
  padding: 15px;
  border-radius: 0 0 2px 2px;

  > .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > h3 {
    font-size: 28px;
    font-weight: 300;
    color: var(--white);
    margin-bottom: 20px;
  }

  a {
    font-size: 12px;
    text-decoration: underline;
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
  background: var(--white);
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
    background: var(--white);
    position: relative;
    top: 6px;
    margin-right: 10px;
  }

  :after {
    content: '';
    width: 20px;
    height: 1px;
    background: var(--white);
    position: relative;
    top: 6px;
    margin-left: 10px;
  }
`
