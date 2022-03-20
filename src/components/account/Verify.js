import React from 'react'
import styled from 'styled-components'

import RunStudioRunLogo from '../assets/img/logo-hound-blurred.svg'

function Verify() {

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
            <h1>Great, check your inbox</h1>
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
                    
            <button type="submit" className="btn btn-gold gray-text" onClick={resendEmail}>Resend email</button>

            <br/>

            <p>
              <small>
                <strong>Need to change your email address?</strong>
                <br/>
                <span>You’ll need a <a href="/sign-up">sign up again</a></span>
              </small>
            </p>

          </ModalBody>
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
    margin-bottom: 40px;
    font-size: 32px;
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
    margin: 32px 0;
  }

  small {
    span {
    text-align: center;
    justify-content: center;
    }
  }
`
