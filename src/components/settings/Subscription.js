import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import Checkbox from '@material-ui/core/Checkbox'

import PageTitle from '../layout/PageTitle'

import StackedBlocks from './StackedBlocks'
import Block from './Block'
import BlockContainer from './BlockContainer'

import PaymentHistory from './PaymentHistory'

import OutlineHound from '../assets/img/outline-hound.svg'
import PaymentIcons from '../assets/img/payment-icons.svg'
import Users from './subscription/components/Users'
import StripeElement from './StripeElement'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Select } from '@material-ui/core'
import ProfileBadge from './components/ProfileBadge'

function Subscription() {

  const [activeType, setActiveType] = useState(null);

  const { register, handleSubmit, watch } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of 

  return (
    <>
      <PageTitle title={'Subscription'} />

      <BlockContainer>
        <StackedBlocks>

          <Block style={{ minHeight: 'none' }}>
            <ProfileBadge />
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
                <ButtonCustom>Select</ButtonCustom>
              </Option>
              <Option className={activeType === 2 ? 'active' : ''} onClick={() => setActiveType(2)}>
                <h1>$100</h1>
                <h4>USD</h4>
                <h5>Per Year</h5>
                <ButtonCustom>Select</ButtonCustom>
              </Option>
            </SubscriptionTypes>

            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>  

                <Grid item xs={12} sm={12}>
                  <FormGroup>
                    <FormControl variant="outlined">
                      <Select
                        value={'Quantity'}
                        style={{ width: '100%', marginBottom: '1rem' }}
                      >
                        <MenuItem value="Quantity">
                          <em>Quantity</em>
                        </MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </FormGroup>
                </Grid>
                
              </Grid>
            </Grid>

            <Total>
              <span>Total</span>
              <span>${ activeType === 2 ? '100.00' : '10.00' }</span>
            </Total>

            <Helper>Inc TAX (GST/VAT)</Helper>

            <SmallText style={{ marginBottom: '1rem' }}>
              All data is transmitted encrypted via a secure TLS connection
            </SmallText>

            <form onSubmit={handleSubmit(onSubmit)}>

              <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>  

                  <Grid item xs={12} sm={12}>
                    <FormGroup>
                      <FormControl variant="outlined">
                        <TextField
                          id="text"
                          placeholder="Name as appears on your card"
                          variant="outlined"
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormGroup>
                      <FormControl variant="outlined">
                        <TextField
                          id="text"
                          placeholder="Card Number"
                          variant="outlined"
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormGroup>
                      <FormControl variant="outlined">
                        <TextField
                          id="text"
                          placeholder="MM /YY"
                          variant="outlined"
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormGroup>
                      <FormControl variant="outlined">
                        <TextField
                          id="text"
                          placeholder="CVC"
                          variant="outlined"
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={4} style={{ display: 'flex' }} alignItems={"center"}>
                    <a href="#" style={{ color: '#3C3C3C' }}>What’s this</a>
                  </Grid>

                </Grid>
              </Grid>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
                <SmallText>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  I agree with the <a href="#" style={{ color: '#3C3C3C' }}>Terms & Conditions</a>
                </SmallText>
                <img src={ PaymentIcons } alt="payment icons" style={{ width: '50%' }} />
              </div>
            </form>
            <SmallText>
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              <br/><br/>
              Your billing statement may display Katsionis Pty Ltd trading as Run Studio Run. We are located in Melbourne, Australia.
              <br/><br/>
              Your credit card issuer may charge foreign transaction or cross-border fees in addition to the total price above.
            </SmallText>
          </Block>

          <Block>
            <BlockHeading>
              <h3 style={{ fontWeight: '400', marginBottom: '8px', color: '#E0BC77', fontWeight: 'bold', fontSize: '18px' }}>Payment History</h3>
              <button className="btn btn-light-gray">Export</button>
            </BlockHeading>
            <div style={{ maxHeight: '350px', overflowY: 'scroll', paddingRight: '15px' }}>
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

const ButtonCustom = styled.div`
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

const SmallText = styled.div`
  font-size: 0.7em;
  font-family: 'Roboto', sans-serif;
`

const BlockHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
