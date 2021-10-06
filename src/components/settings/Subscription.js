import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import Checkbox from '@material-ui/core/Checkbox'

import PageTitle from '../layout/PageTitle'

import StackedBlocks from './StackedBlocks'
import Block from './Block'
import BlockContainer from './BlockContainer'

import Avatar from '@material-ui/core/Avatar';
import PaymentHistory from './PaymentHistory'

import OutlineHound from '../assets/img/outline-hound.svg'
import Users from './Users'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import StripeElement from './StripeElement'

function Subscription() {

  const [activeType, setActiveType] = useState(null);

  const [user] = useAuthState(auth)

  const { register, handleSubmit, watch } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of 

  const uploadAvatar = () => {
    console.log('Upload an avatar...')
  }

  return (
    <>
      <PageTitle title={'Subscription'} />

      <BlockContainer>
        <StackedBlocks>

          <Block style={{ minHeight: 'none' }}>
            <MemberAvatar>
              <AvatarContainer>
                <Avatar alt={ user?.displayName } src={ user?.photoURL }>
                  { user?.displayName.charAt(0) } 
                </Avatar>
                <Overlay onClick={(e) => uploadAvatar()}>
                  <span>Upload</span>
                </Overlay>
              </AvatarContainer>
              <MemberInfo>
                <h5>Full Name</h5>
                <p>Position</p> 
              </MemberInfo>
            </MemberAvatar>
          </Block>

          <Block>
            <h2 style={{ fontWeight: '400', marginBottom: '8px' }}>Payment</h2>

            {/* <StripeElement /> */}

            <p style={{ marginBottom: '16px' }}>
              <strong>You currently have <span style={{ color: '#E0BC77' }}>5 subscriptions</span> and to add more please select an option below, proceed to payment and then assign to your user.</strong>
            </p>

            <SubscriptionTypes>
              <Option className={activeType === 1 ? 'active' : ''} onClick={() => setActiveType(1)}>
                <h1>$10</h1>
                <h4>USD</h4>
                <h5>Per Month</h5>
                <Button>Select</Button>
              </Option>
              <Option className={activeType === 2 ? 'active' : ''} onClick={() => setActiveType(2)}>
                <h1>$100</h1>
                <h4>USD</h4>
                <h5>Per Year</h5>
                <Button>Select</Button>
              </Option>
            </SubscriptionTypes>

            <Total>
              <span>Total</span>
              <span>${ activeType === 2 ? '100.00' : '10.00' }</span>
            </Total>

            <Helper>Inc TAX (GST/VAT)</Helper>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input className="form-control" placeholder="Name as appears on your card" id="name" {...register("name")} />
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Card Number" id="name" {...register("name")} />
              </div>
              <div className="form-row" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="form-group" style={{ width: '20%' }}>
                  <input className="form-control" placeholder="MM /YY" id="name" {...register("name")} />
                </div>
                <div className="form-group" style={{ width: '20%' }}>
                  <input className="form-control" placeholder="CVC" id="name" {...register("name")} />
                </div>
                <div className="form-group">
                  <a href="/whats-this">What’s this</a>
                </div>
              </div>
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              I agree with the Terms & Conditions
            </form>
            <small>
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              <br/><br/>
              Your billing statement may display Katsionis Pty Ltd trading as Run Studio Run. We are located in Melbourne, Australia.
              <br/><br/>
              Your credit card issuer may charge foreign transaction or cross-border fees in addition to the total price above.
            </small>
          </Block>

          <Block>
            <div style={{ maxHeight: '350px', overflowY: 'scroll' }}>
              <PaymentHistory />
            </div>
          </Block>

        </StackedBlocks>
        <StackedBlocks>

          <Block background={'#DDDBD7'}>
            <div style={{ padding: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '22px', fontWeight: 'bold' }}>30 Days Free Trial</h3>
              <h3 style={{ fontWeight: 'lighter', marginBottom: '8px' }}>6 Dec 2020 - 6 Jan 2021</h3>
              <h4 style={{ color: 'white' }}>28 Days Remaining</h4>
            </div>

            <img src={OutlineHound} style={{ position: 'absolute', right: '30px', top: '0', height: '100%' }} alt="outline hound" />
          </Block>

          <Block>
            <Users />
          </Block>

        </StackedBlocks>
      </BlockContainer>
    </>
  )
}

export default Subscription

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
`

const AvatarContainer = styled.div`
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  border-radius: 50%;
  transition: opacity .25s ease-in-out;
  z-index: 5;
  color: #fff;

  > span {
    font-size: 14px;
  }

  :hover {
    opacity: 1;
    cursor: pointer;
  }
  
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  > h5 {
    font-weight: bold;
    margin-bottom: 5px;
  }
`

const SubscriptionTypes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  border: 1px solid #DDDBD7;
  border-radius: 4px;
  padding: 20px;

  > h4 {
    font-size: 18px;
    margin-top: 2px;
  }

  > h5 {
    font-weight: bold;
    margin-top: 2px;
  }

  &:first-child {
    margin-right: 20px;
  }

  &:hover {
    cursor: pointer;
  }

  &.active {
    border-color: #E0BC77;

    > div {
      background: #E0BC77; 
      border-color: #E0BC77;
      color: #fff;
    }
  }
`

const Button = styled.div`
  border: 1px solid #B1B0AF;
  color: #B1B0AF;
  font-weight: 500;
  border-radius: 2px;
  padding: 5px 10px;
  text-transform: uppercase;
  font-size: 12px;
  margin-top: 10px;
`

const Total = styled.div`
  color: #292724;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-weight: bold;
  border-bottom: 1px solid #E0BC77;
  margin-bottom: 8px;
`

const Helper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-size: 12px;
  margin-bottom: 16px;
`
