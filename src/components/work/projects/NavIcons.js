import React, { useState } from 'react'
import styled from 'styled-components'

import ModalBox from '../../ModalBox'
import SavingDraft from './SavingDraft.svg'

import {
  Link
} from "react-router-dom"

import TimelineIcon from '../../assets/icons/TimelineIcon.svg'
import BookIcon from '../../assets/icons/BookIcon.svg'
import DiscIcon from '../../assets/icons/DiscIcon.svg'
import EyeIcon from '../../assets/icons/EyeIcon.svg'

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

  const [openDraftModal, setOpenDraftModal] = useState(true)
  const [openPDFModal, setOpenPDFModal] = useState(true)

  const [activeNav, setActiveNav] = useState(null)

  const saveDraft = () => {
    // Show draft modal
    setOpenDraftModal(true)

    // Close draft modal after 3 seconds
    setTimeout(() => {
      setOpenDraftModal(false)
    }, 3000);
  }

  const showPDF = () => {
    console.log('Show PDF...')
    setOpenPDFModal(!openPDFModal)
  }
  
  return (
    <>
      <ModalBox modalOpened={openDraftModal} styling={styling}>
        <img src={SavingDraft} alt="saving draft" />
      </ModalBox>
      <ModalBox modalOpened={openPDFModal}>
        PDF
      </ModalBox>
      <Icons>
        <Link to={`/projects/${id}/timeline`} onClick={(e) => setActiveNav('timeline')} className={activeNav === 'timeline' ? 'active' : ''}>
          <img src={TimelineIcon} alt="timeline icon" />
        </Link>
        <Link to={`/projects/${id}/book`} onClick={(e) => setActiveNav('book')} className={activeNav === 'book' ? 'active' : ''}>
          <img src={BookIcon} alt="book icon" />
        </Link>
        <Link to={`/projects/${id}/disc`} onClick={(e) => {
          // Set the button to active and run the saving draft function
          setActiveNav('disc')
          saveDraft()
        }} className={activeNav === 'disc' ? 'active' : ''}>
          <img src={DiscIcon} alt="disc icon" />
        </Link>
        <Link to={`/projects/${id}/eye`} onClick={(e) => {
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
    fill: red;
    background: black;
  }
`
