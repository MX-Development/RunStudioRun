import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"

import QuickbooksLogo from '../../assets/logos/quickbooks.svg';
import MYOBLogo from '../../assets/logos/myob.svg';
import XeroLogo from '../../assets/logos/xero.svg';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function AccountingIntegrations() {

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  const [integrationStep, setIntegrationStep] = useState(1);
  const [selected, setSelected] = useState(null);

  const handleClick = (id) => {
    setSelected(id);
  };

  const integrations = [
    {
      "id": 1,
      "title": "quickbooks",
      "logo": QuickbooksLogo
    },
    {
      "id": 2,
      "title": "myob",
      "logo": MYOBLogo
    },
    {
      "id": 3,
      "title": "xero",
      "logo": XeroLogo
    }
  ]

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
      width: '550px',
      overflow: 'visible'
    },
  };

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
    setIntegrationStep(1);
  }

  function openIntegrations() {
    console.log('Open integrations...');
    setIsOpen(true);
  }

  const selectIntegration = (id) => {
    console.log(id);
    setIntegrationStep(2);
  }

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
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontWeight: '400' }}>Integrate your Accounting Software</h2>
            <p style={{ margin: '10px 0' }}>
              Connect your accounting software to send your invoices and to help you track your business performance.
            </p>
          </div>
          {
            integrationStep === 1 ?
            <>
              { integrations.map(item => {
                return (
                  <Item>
                    <Checkbox
                      name={`integration[${item.id}]`}
                      checked={selected === item.id ? true : false}
                      onClick={() => handleClick(item.id)}
                    />
                    <img src={item.logo} alt={item.title} />
                  </Item>
                )
              })}
              <div className="modal-footer" style={{ marginTop: '20px' }}>
                <div className="btn-group">
                  <div className="btn-left">
                    <button className="btn btn-light-gray btn-left btn-lg" onClick={closeModal}>Cancel</button>
                  </div>
                  <div className="btn-right">
                    <button className="btn btn-gold btn-right btn-lg" onClick={(id) => selectIntegration(selected)}>Next</button>
                  </div>
                </div>
              </div>
            </>
            :
            integrations.map(item => {
              if (item.id === selected) {
                return (
                  <>
                    <Item large>
                      <img src={item.logo} alt={item.title} />
                    </Item>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1}> 

                        <Grid item xs={12} sm={12}>
                          <FormGroup>
                            <FormControl variant="outlined">
                              <TextField
                                id="username"
                                placeholder="Username"
                                variant="outlined"
                                style={{ background: 'var(--white)' }}
                                {...register("username")}
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <FormGroup>
                            <FormControl variant="outlined">
                              <TextField
                                type="password"
                                id="password"
                                placeholder="Password"
                                variant="outlined"
                                style={{ background: 'var(--white)' }}
                                {...register("password")}
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>

                      </Grid>
                      <div className="modal-footer" style={{ marginTop: '20px' }}>
                        <div className="btn-group">
                          <div className="btn-left">
                            <button className="btn btn-light-gray btn-left btn-lg" onClick={closeModal}>Cancel</button>
                          </div>
                          <div className="btn-right">
                            <button className="btn btn-gold btn-right btn-lg" type="submit">Connect</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )
              }
            })
          }
        </div>
      </Modal>

      <Integrations>
        <div className="top">
          <p>Quickbooks Online Connected</p>
        </div>
        <div className="bottom" onClick={() => openIntegrations()}>
          <h3 style={{ fontWeight: 'bold' }}>ACCOUNTING INTEGRATIONS</h3>
          <svg id="right-arrow-button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <circle id="Ellipse_412" data-name="Ellipse 412" cx="16" cy="16" r="16" fill="#fff"/>
            <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H0V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(8 8)" fill="#b1b0af"/>
          </svg>
        </div>
      </Integrations>
    </>
  )
}

export default AccountingIntegrations

const Integrations = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > .top {
    width: 30%;
    margin: 15px 0 auto 15px;
  }

  > .bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > svg {
      margin-left: 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }
`

const Item = styled.div`
  background: rgba(60, 60, 60, 0.05);
  padding: ${props => props.large ? "45px 30px" : "20px 30px"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;

  > .MuiCheckbox-root {
    position: absolute;
    left: 20px;
  }
`
