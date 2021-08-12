import React from 'react'
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

function Subscription() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of 

  return (
    <>
      <PageTitle title={'Subscription'} />

      <BlockContainer>
        <StackedBlocks>

          <Block>
            <MemberAvatar>
              <Avatar alt="" src="">
                MM
              </Avatar>
              <MemberInfo>
                <h5>Full Name</h5>
                <span>Position</span> 
              </MemberInfo>
            </MemberAvatar>
          </Block>

          <Block>
            <h3>Payment</h3>
            <p>
              <strong>You currently have 5 subscriptions and to add more please select an option below, proceed to payment and then assign to your user.</strong>
            </p>
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
                  <a href="#">What’s this</a>
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
            <PaymentHistory />
          </Block>

        </StackedBlocks>
        <StackedBlocks>

          <Block background={'#DDDBD7'}>
            <div style={{ padding: '10px' }}>
              <h3 style={{ marginBottom: '10px' }}>30 Days Free Trial</h3>
              <h3 style={{ fontWeight: 'lighter' }}>6 Dec 2020 - 6 Jan 2021</h3>
              <h4 style={{ color: 'white' }}>28 Days Remaining</h4>
            </div>

            <img src={OutlineHound} style={{ position: 'absolute', right: '30px', top: '0', height: '100%' }} />
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
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > span {
    font-size: 12px;
  }
`
