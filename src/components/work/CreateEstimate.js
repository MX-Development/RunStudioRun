import React, { useState } from 'react'
import styled from 'styled-components'

import AddIcon from '../assets/icons/AddIcon.svg'
import ProjectEstimates from './projects/dragAndDrop/ProjectEstimates';

import EyeIcon from '../assets/icons/EyeIcon.svg'

function CreateEstimate({ id }) {

  const [adding, setAdding] = useState(false)
  const [openModal, setOpenModal] = useState(false)

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

          <ProjectEstimates estimateID={null} itemType={'estimate'} />

          <DividerWithIcon onClick={showPDF}>
            <img src={EyeIcon} alt="" />
            {/* <ModalBox modalOpened={openModal}>
              PDF
            </ModalBox> */}
          </DividerWithIcon>
        </>
        :
        <Inner>
          <h3 style={{ color: 'var(--gold)', fontWeight: '600' }}>CONGRATULATIONS ON STARTING A NEW PROJECT</h3>
  
          <img src={AddIcon} alt="add icon" onClick={AddEstimate} />
  
          <h3 style={{ color: '#B1B0AF', fontWeight: '600' }}>CREATE A NEW JOB ESTIMATE</h3>
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
