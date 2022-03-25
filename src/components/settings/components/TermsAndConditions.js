import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import axios from 'axios';

import { useForm, Controller } from "react-hook-form"

import LineArrow from '../../assets/icons/LineArrow.svg'
import EyeIconBorder from '../../assets/icons/EyeIconBorder.svg'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function TermsAndConditions() {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [openTab, setOpenTab] = useState(null);
  const centerModal = {
    content: {
      top: '50%',
      left: '50%',
      border: 'none',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '425px',
      overflow: 'visible'
    },
  };

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
  }

  const changeTabs = (tabID) => {
    setOpenTab(tabID)

    tabID === 1 ? 
      setModalContent(estimateBody)
    :
      setModalContent(invoiceBody)
  }

  // Fetch data from JSON files
  const fetchData = async () => {
    try {
      await axios.get(`/json/settings/companySettings/terms_and_conditions.json`)
        .then(res => {
          setSelectedData(res.data)
          console.log(res.data);
        })

    } catch (err) {
      // An error has occurred
      console.trace(err);
    }
  }

  // Fetch data on page load - when history changes
  useEffect(() => {
    fetchData()
  }, []);

  const { handleSubmit, control } = useForm();

  // Initialize empty data state
  const [selectedData, setSelectedData] = useState(null)

  // On change input fields
  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value 
    });
  }

  // On submit form
  const onSubmit = () => { 
    console.log('Form data: ', selectedData)
  }

  const estimateBody = (
    <> 
      <ModalBody>
        <p style={{ margin: '15px 0' }}>
          Custom Terms & Conditions
        </p>
        <img src={EyeIconBorder} alt="" />
      </ModalBody>

      <FormGroup>
        <FormControl variant="outlined">
          <Controller
            render={({ field }) => (
              <TextField
                placeholder="Paste text here..."
                variant="outlined"
                {...field}
                multiline
                minRows={20}
                value={selectedData?.estimates}
                onChange={handleChange}
              />
            )}
            control={control}
            name="estimates"
            defaultValue=""
          />
        </FormControl>
      </FormGroup>
    </>
  )

  const invoiceBody = (
    <>
      <ModalBody>
        <p style={{ margin: '15px 0' }}>
          Custom Terms & Conditions
        </p>
        <img src={EyeIconBorder} alt="" />
      </ModalBody>

      <FormGroup> 
        <FormControl variant="outlined">
          <Controller
            render={({ field }) => (
              <TextField
                placeholder="Paste text here..."
                variant="outlined"
                {...field}
                multiline
                minRows={20}
                value={selectedData?.invoices}
                onChange={handleChange}
              />
            )}
            control={control}
            name="invoices"
            defaultValue=""
          />
        </FormControl>
      </FormGroup>
    </>
  )

  const customFooterBody = (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
        <div>
          <h2 style={{ fontWeight: '400' }}>Footer text</h2>
          <p style={{ margin: '10px 0 0' }}>
            Custom footer info such as payment advice.
          </p>
        </div>
        <img src={EyeIconBorder} alt="" />
      </div>

      <FormGroup>
        <FormControl variant="outlined">
          <Controller
            render={({ field }) => (
              <TextField
                placeholder="Paste text here..."
                variant="outlined"
                {...field}
                multiline
                minRows={20}
                value={selectedData?.footer}
                onChange={handleChange}
              />
            )}
            control={control}
            name="footer"
            defaultValue=""
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
        <div style={{ background: 'var(--white)', position: 'relative' }}>
          <ModalHeader>
            { openTab !== null ? 
              <>
                <Tab onClick={(tabID) => changeTabs(1)}
                    className={openTab === 1 ? 'active' : ''}
                  >
                  <h2>Estimates</h2>
                </Tab>
                <Tab onClick={(tabID) => changeTabs(2)}
                    className={openTab === 2 ? 'active' : ''}
                  >
                  <h2>Invoices</h2>
                </Tab>
              </>
            : null
            }
          </ModalHeader>
    <form onSubmit={handleSubmit(onSubmit)}>
          { modalContent }
          <div className="modal-footer">
            <div className="btn-group">
              <div className="btn-left">
                <button className="btn btn-light-gray btn-left">Cancel</button>
              </div>
              <div className="btn-right">
                <button className="btn btn-dark-gray btn-right">Delete</button>
                <button type="submit" className="btn btn-gold btn-right">Save</button>
              </div>
            </div>
          </div>
          </form>
        </div>
      </Modal>

      {/* TODO: Create buttons */}
      <TermButton onClick={() => {
        setModalContent(estimateBody)
        setIsOpen(true)
        setOpenTab(1)
        
      }}>Estimates</TermButton>
      <TermButton onClick={() => {
        setModalContent(invoiceBody)
        setIsOpen(true)
        setOpenTab(2)
      }}>Invoices</TermButton>
      <TermButton onClick={() => {
        setModalContent(customFooterBody)
        setIsOpen(true)
        setOpenTab(null)
      }}>Custom Payment Advice</TermButton>
    </>
  )
}

export default TermsAndConditions

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

const ModalBody = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalHeader = styled.div`
  display: flex;
  position: absolute;
  top: -21px;
  left: -20px;
  width: calc(100% + 40px);
  background: #999;
`

const Tab = styled.div`
  border-radius: 4px 4px 0 0;
  width: 50%;
  padding: 10px 15px;
  background: rgba(255,255,255,0.5);

  > h2 {
    font-size: 24px;
    font-weight: 400;
  }

  &:hover {
    cursor: pointer;
  }

  &.active {
    background: var(--white);
  }
`