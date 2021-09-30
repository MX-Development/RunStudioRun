import React, { useState } from 'react'
import styled from 'styled-components'

import SavingDraft from './SavingDraft.svg'

import LoadingDots from '../../LoadingDots'

import {
  Link
} from "react-router-dom"

import TimelineIcon from '../../assets/icons/TimelineIcon.svg'
import BookIcon from '../../assets/icons/BookIcon.svg'
import DiscIcon from '../../assets/icons/DiscIcon.svg'
import EyeIcon from '../../assets/icons/EyeIcon.svg'

import Modal from 'react-modal';
Modal.setAppElement('#root');

const styling = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none'
  },
};

function NavIcons({ id }) {

  const [openModal, setOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const [activeNav, setActiveNav] = useState(null)

  const saveDraft = () => {
    console.log('Saving draft...')
    // Show draft modal
    setModalContent(Draft)
    setOpenModal(true)

    // Close draft modal after 3 seconds
    setTimeout(() => {
      setOpenModal(false)
    }, 3000);
  }

  const showPDF = () => {
    console.log('Show PDF...')
    setModalContent(PDF)
    setOpenModal(!openModal)
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setOpenModal(false)
    setModalContent(null)
  }

  const PDF = (
    <h1>PDF</h1>
  )

  const Draft = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={SavingDraft} alt="saving draft" />
      <LoadingDots />
    </div>
  )
  
  return (
    <>
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={styling}
        contentLabel="Example Modal"
      >
        { modalContent }
      </Modal>

      {/* <ModalBox modalOpened={openDraftModal} styling={styling}>
        <img src={SavingDraft} alt="saving draft" />
      </ModalBox> */}
      {/* <ModalBox modalOpened={openPDFModal}>
        PDF
      </ModalBox> */}
      <Icons>
        <Link to={`/projects/${id}/timeline`} onClick={(e) => setActiveNav('timeline')} className={activeNav === 'timeline' ? 'active' : ''}>
          <img src={TimelineIcon} alt="timeline icon" />
        </Link>
        <Link to={`/projects/${id}/book`} onClick={(e) => setActiveNav('book')} className={activeNav === 'book' ? 'active' : ''}>
          <img src={BookIcon} alt="book icon" />
        </Link>
        <Link to={`/projects/${id}`} onClick={(e) => {
          // Set the button to active and run the saving draft function
          setActiveNav('disc')
          saveDraft()
        }} className={activeNav === 'disc' ? 'active' : ''}>
          <img src={DiscIcon} alt="disc icon" />
        </Link>
        <Link to={`/projects/${id}`} onClick={(e) => {
          setActiveNav('eye')
          showPDF()
        }} className={activeNav === 'eye' ? 'active' : ''}>
          <img src={EyeIcon} alt="eye icon" />
        </Link>
      </Icons>
    </>
  )
}

export default NavIcons

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  > a {
    margin-left: 10px;
  }

  > a.active img {
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
  }
`
