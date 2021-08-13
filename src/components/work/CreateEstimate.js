import React from 'react'
import styled from 'styled-components'

import AddIcon from '../assets/icons/AddIcon.svg'

function CreateEstimate() {

  const AddEstimate = () => {
    console.log('Adding an estimate')
  }

  return (
    <Container>
      <Inner>
        <h2 style={{ color: 'var(--gold)' }}>CONGRATULATIONS ON STARTING A NEW PROJECT</h2>

        <img src={AddIcon} alt="add icon" onClick={AddEstimate} />

        <h2 style={{ color: '#B1B0AF' }}>CREATE A NEW JOB ESTIMATE</h2>
        <h6 style={{ color: '#B1B0AF' }}>WHEN APPROVED A JOB WILL APPEAR HERE</h6>
      </Inner>
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
  margin-top: 90px;
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
