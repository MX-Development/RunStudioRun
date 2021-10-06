import React from 'react'
import styled from 'styled-components'

function Block({ background, title, children }) {
  return (
    <Container style={{ background: background ? background : '#fff' }}>
      { title ? ( <h5>{ title }</h5> ) : null}
      { children }
    </Container>
  )
}

export default Block

const Container = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h5 {
    margin-bottom: 10px;
    font-weight: bold;
  }
`