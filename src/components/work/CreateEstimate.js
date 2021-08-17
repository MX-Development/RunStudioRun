import React, { useState } from 'react'
import styled from 'styled-components'

import { useHistory } from "react-router-dom"

import AddIcon from '../assets/icons/AddIcon.svg'
import ProjectEstimates from './ProjectEstimates';
import ModalBox from '../ModalBox';

import EyeIcon from '../assets/icons/EyeIcon.svg'
import PlusIcon from '../assets/icons/PlusIcon.svg'
import AddNav from './projects/AddNav'

function CreateEstimate({ id }) {

  const history = useHistory();

  const [adding, setAdding] = useState(false)
  const [addNav, setAddNav] = useState(false)
  const [openModal, setOpenModal] = useState(true)

  const AddEstimate = () => {
    console.log('Adding an estimate')
    setAdding(true)
  }

  const showPDF = () => {
    console.log('Show PDF...')
    setOpenModal(!openModal)
  }

  return (
    <Container>
      { 
        adding ?
        <>
          <DividerWithIcon onClick={() => setAddNav(!addNav)}>
            <img src={PlusIcon} alt="" />
            <AddNav show={addNav ? true : false} />
          </DividerWithIcon>

          <ProjectEstimates />

          <DividerWithIcon onClick={() => showPDF()}>
            <img src={EyeIcon} alt="" />
            <ModalBox modalOpened={openModal}>
              PDF
            </ModalBox>
          </DividerWithIcon>
        </>
        :
        <Inner>
          <h2 style={{ color: 'var(--gold)' }}>CONGRATULATIONS ON STARTING A NEW PROJECT</h2>
  
          <img src={AddIcon} alt="add icon" onClick={AddEstimate} />
  
          <h2 style={{ color: '#B1B0AF' }}>CREATE A NEW JOB ESTIMATE</h2>
          <h6 style={{ color: '#B1B0AF' }}>WHEN APPROVED A JOB WILL APPEAR HERE</h6>
        </Inner>
      }
    </Container>
  )
}

export default CreateEstimate

const Container = styled.div`
  width: 100%%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Inner = styled.div`
  width: 30%;
  text-align: center;

  > img {
    margin: 30px 0;

    :hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }
`

const DividerWithIcon = styled.div`
  width: 100%;
  height: 1px;
  background: #DDDBD7;
  position: relative;
  margin: 30px 0;
  
  :hover {
    cursor: pointer;
  }

  > img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 32px;
  }
`
