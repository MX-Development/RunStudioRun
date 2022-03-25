import React from 'react'
import styled from 'styled-components'

function PageTitle({ title, buttons }) {
  return (
    <Title>
      <h1>{ title }</h1> 
      <Actions>
        { 
          buttons ?
            buttons.map((button, index) => (
              <button key={index} className="btn btn-grey" type="button" onClick={button.action}>{ button.label }</button>
            ))
          : null
        }
      </Actions>
    </Title>
  )
}

export default PageTitle

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7.5px;
`

const Actions = styled.div`
  display: flex;

  > button {
    margin-left: .5rem;
  }
`
