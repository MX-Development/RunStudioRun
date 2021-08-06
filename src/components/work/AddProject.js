import React from 'react'
import styled from 'styled-components'

function AddProject() {
  return (
    <Columns>
      <Column>Test</Column>
      <Column>Test</Column>
      <Column>Test</Column>
    </Columns>
  )
}

export default AddProject

const Columns = styled.div`
  display: flex;
  justify-content: space-between;
`

const Column = styled.div`
  flex: 0.3;
`
