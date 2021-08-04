import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { auth, provider } from '../../config/firebase'

import GoogleLogo from './google-logo.svg'

import {
  Link
} from "react-router-dom";

function Login() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const signIn = (e) => {
    e.preventDefault()
    auth.signInWithPopup(provider).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <LoginContainer>
      <LoginModal>
        <ModalHeader>
          <h1>
            Run<br/>
            Studio<br/>
            Run
          </h1>
        </ModalHeader>
        <ModalBody>
          <h3>Log in to your account</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input className="form-control" id="name" {...register("name")} placeholder="Enter email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="name" {...register("name")} placeholder="Password" />
            </div>
            <div className="form-footer">
              <div className="btn-group">
                <div className="btn-left">
                  <Link to="/forgot-password">
                    Forgot password?
                  </Link>
                  <Link to="/sign-up">
                    Sign up for an account
                  </Link>
                </div>
                <div className="btn-right">
                  <button type="submit" className="btn btn-gold btn-right">Log in</button>
                </div>
              </div>
            </div>
          </form>
          <Divider>
            <span>Or</span>
          </Divider>
          <GoogleButton onClick={signIn}>
            <img src={GoogleLogo} /> Sign in with Google
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
