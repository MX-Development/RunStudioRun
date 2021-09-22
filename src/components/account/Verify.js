import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../../config/firebase'

import {
  Link
} from "react-router-dom";

function Verify() {
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
            <h3>Great, check your inbox</h3>
            <p>
              We've emailed a verification link to:
            </p>
            <p>
              <strong>taso@runstudiorun.net</strong> 
            </p>
            <p>
              it will expire shortly, so verify soon.
            </p>

            <br/>

            <p>
            Remeber to check your spam folder.
            </p>
                    
            <button type="submit" className="btn btn-gold">Resend email</button>

            <br/>

            <p>
              <strong>Need to change your email address?</strong>
              <br/>
              You’ll need a <Link to="/sign-up">sign up again</Link>
            </p>

          </ModalBody>
          <ModalFooter>
            <p>2021 © Run Studio Run | <Link to="/terms">Terms</Link> | <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/help">Need Help?</Link></p>
          </ModalFooter>
        </LoginModal>
      </LoginContainer>
  )
}

export default Verify

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
  text-align: center;
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
