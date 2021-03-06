import React from 'react'
import { useForm } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Select } from '@material-ui/core'

import PageTitle from '../../../layout/pages/PageTitle'

import StackedBlocks from '../../components/StackedBlocks'
import Block from '../../components/Block'
import BlockContainer from '../../components/BlockContainer'

import TimeBlocks from './components/TimeBlocks'
import PaymentTerms from './components/PaymentTerms'

import BusinessInformation from './components/BusinessInformation'
import DisplayModes from '../../components/DisplayModes';

import Labels from '../../components/Labels';
import TermsAndConditions from '../../components/TermsAndConditions';
import AccountingIntegrations from './components/AccountingIntegrations';

function Settings() {

  const { watch } = useForm();

  console.log(watch("example")); // watch input value by passing the name of it

  return ( 
    <>

      <PageTitle title={'Company Settings'} />

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
            <FormGroup>
              <FormControl variant="outlined">
                <Select
                  value={'Export Data CSV'}
                  style={{ width: '100%' }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={'Export Data CSV'}>Export Data CSV</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-gold">Export</button>
            </div>
          </Block>

        </StackedBlocks>

        <StackedBlocks>

          <Block background={'#DDDBD7'}>
            <AccountingIntegrations />
          </Block>

          <Block title={'Terms & Conditions'}>
            <TermsAndConditions />
          </Block>

          <Block title={'Job Numbers + Time Blocks'}>
            <TimeBlocks />
          </Block>

          <Block title={'Payment Terms'}>
            <PaymentTerms />
          </Block>

          <Block title={'Labels'}>
            <Labels />
          </Block>

        </StackedBlocks>
      </BlockContainer>
    </>
  )
}

export default Settings
