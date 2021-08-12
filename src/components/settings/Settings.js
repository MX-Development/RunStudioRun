import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PageTitle from '../layout/PageTitle'

import StackedBlocks from './StackedBlocks'
import Block from './Block'
import BlockContainer from './BlockContainer'

import BusinessLogo from '../assets/img/business-logo.svg'
import TimeBlocks from './TimeBlocks'
import PaymentTerms from './PaymentTerms'

import LineArrow from '../assets/icons/LineArrow.svg'
import BusinessInformation from './BusinessInformation'
import DisplayModes from './DisplayModes';

function Settings() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <PageTitle title={'Settings'} />

      <BlockContainer>
        <StackedBlocks>

          <Block>
            <BusinessInformation />
          </Block>

          <Block title={'Display Modes'}>
            <DisplayModes />
          </Block>

          <Block title={'Don’t go!'}> 
            <p>Once you go you go, and all your data is deleted and no longer available.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-gold">Delete</button>
            </div>
          </Block>

          <Block title={'Export your data sets'}> 
            <p>EXPORT DATA CSV</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-gold">Export</button>
            </div>
          </Block>

        </StackedBlocks>

        <StackedBlocks>

          <Block background={'#DDDBD7'}>
            <Integrations>
              <div className="top">
                <p>Quickbooks Online Connected</p>
              </div>
              <div className="bottom">
                <h3>ACCOUNTING INTEGRATIONS</h3>
                <svg id="right-arrow-button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <circle id="Ellipse_412" data-name="Ellipse 412" cx="16" cy="16" r="16" fill="#fff"/>
                  <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H0V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(8 8)" fill="#b1b0af"/>
                </svg>
              </div>
            </Integrations>
          </Block>

          <Block title={'Terms & Conditions'}>
            {/* TODO: Create buttons */}
            <TermButton>Estimates</TermButton>
            <TermButton>Invoices</TermButton>
            <TermButton>Custom Payment Advice</TermButton>
          </Block>

          <Block title={'Job Numbers + Time Blocks'}>
            <TimeBlocks />
          </Block>

          <Block title={'Payment Terms'}>
            <PaymentTerms />
          </Block>

        </StackedBlocks>
      </BlockContainer>
    </>
  )
}

export default Settings

const Integrations = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > .top {
    width: 30%;
    margin-bottom: auto;
  }

  > .bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > svg {
      margin-left: 10px;
    }
  }
`

const TermButton = styled.div`
  padding: 15px;
  border: 1px solid #DDDBD7;
  border-radius: 2px;
  position: relative;

  :not(:last-child) {
    margin-bottom: 7.5px;
  }

  :after {
    content: url(${LineArrow});
    position: absolute;
    right: 0;
    top: -3.5px;
    height: 100%;
  }
`
