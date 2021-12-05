import React, { useState } from 'react'
import styled from 'styled-components'

import QuickbooksLogo from '../../assets/logos/quickbooks.svg';
import MYOBLogo from '../../assets/logos/myob.svg';
import XeroLogo from '../../assets/logos/xero.svg';

import Checkbox from '@material-ui/core/Checkbox';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function AccountingIntegrations() {

  const [selected, setSelected] = useState([]);

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

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
  }

  function openIntegrations() {
    console.log('Open integrations...');
    setIsOpen(true);
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
        <div style={{ background: '#fff', position: 'relative' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontWeight: '400' }}>Integrate your Accounting Software</h2>
            <p style={{ margin: '10px 0' }}>
              Connect your accounting software to send your invoices and to help you track your business performance.
            </p>
          </div>
          {
            integrations.map(item => {
              const isItemSelected = isSelected(item.id);
              return (
                <Item>
                  <Checkbox
                    name={`integration[${item.id}]`}
                    checked={isItemSelected}
                    onClick={() => handleClick(item.id)}
                  />
                  <img src={item.logo} alt={item.title} />
                </Item>
              )
            })
          }
        </div>
        <div className="modal-footer" style={{ marginTop: '20px' }}>
          <div className="btn-group">
            <div className="btn-left">
              <button className="btn btn-light-gray btn-left btn-lg">Cancel</button>
            </div>
            <div className="btn-right">
              <button className="btn btn-gold btn-right btn-lg">Next</button>
            </div>
          </div>
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
  padding: 20px 30px;
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
