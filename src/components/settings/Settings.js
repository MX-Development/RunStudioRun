import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { MenuItem, Select } from '@material-ui/core'

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

import Modal from 'react-modal';
Modal.setAppElement('#root');

function Settings() {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const centerModal = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '425px'
    },
  };

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const estimateBody = (
    <> 
      <ModalHeader>
        <Tab onClick={() => {
              setModalContent(estimateBody)
              setIsOpen(true)
            }}>
          <h2>Estimates</h2>
        </Tab>
        <Tab onClick={() => {
              setModalContent(invoiceBody)
              setIsOpen(true)
            }}>
          <h2>Invoices</h2>
        </Tab>
      </ModalHeader>
      <h1>Estimate</h1>
      <p style={{ margin: '10px 0' }}>
        Custom Terms & Conditions
      </p>

      <FormGroup>
        <FormControl variant="outlined">
          <TextField
            id="content"
            placeholder="Paste text here..."
            variant="outlined"
            multiline
            minRows={20}
          />
        </FormControl>
      </FormGroup>
    </>
  )

  const invoiceBody = (
    <>
      <ModalHeader>
        <Tab onClick={() => {
              setModalContent(estimateBody)
              setIsOpen(true)
            }}>
          <h2>Estimates</h2>
        </Tab>
        <Tab onClick={() => {
              setModalContent(invoiceBody)
              setIsOpen(true)
            }}>
          <h2>Invoices</h2>
        </Tab>
      </ModalHeader>
      <h1>Invoice</h1>
      <p style={{ margin: '10px 0' }}>
        Custom Terms & Conditions
      </p>

      <FormGroup>
        <FormControl variant="outlined">
          <TextField
            id="content"
            placeholder="Paste text here..."
            variant="outlined"
            multiline
            minRows={20}
          />
        </FormControl>
      </FormGroup>
    </>
  )

  const customFooterBody = (
    <>
      <h2 style={{ fontWeight: '400' }}>Footer text</h2>
      <p style={{ margin: '10px 0' }}>
        Custom footer info such as payment advice.
      </p>

      <FormGroup>
        <FormControl variant="outlined">
          <TextField
            id="content"
            placeholder="Paste text here..."
            variant="outlined"
            multiline
            minRows={20}
          />
        </FormControl>
      </FormGroup>
    </>
  )

  return ( 
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={centerModal}
        contentLabel="Example Modal"
      >
        <div style={{ background: '#fff' }}>
          { modalContent }
          <div className="modal-footer">
            <div className="btn-group">
              <div className="btn-left">
                <button className="btn btn-light-gray btn-left">Cancel</button>
              </div>
              <div className="btn-right">
                <button type="submit" className="btn btn-dark-gray btn-right">Delete</button>
                <button className="btn btn-gold btn-right">Save</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
            <TermButton onClick={() => {
              setModalContent(estimateBody)
              setIsOpen(true)
            }}>Estimates</TermButton>
            <TermButton onClick={() => {
              setModalContent(invoiceBody)
              setIsOpen(true)
            }}>Invoices</TermButton>
            <TermButton onClick={() => {
              setModalContent(customFooterBody)
              setIsOpen(true)
            }}>Custom Payment Advice</TermButton>
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

  &:hover {
    cursor: pointer;
  }
`

const ModalHeader = styled.div`
  display: flex;
`

const Tab = styled.div`
  border-radius: 2px 2px 0 0;
  width: 50%;

  &:hover {
    cursor: pointer;
  }
`
