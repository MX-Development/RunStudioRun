import React from 'react'
import styled from 'styled-components'

function StackedBlocks({ children }) {
  return (
    <Container>
      { children }
    </Container>
  )
}

export default StackedBlocks

const Container = styled.div`
  width: 40%;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`
