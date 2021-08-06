import React from 'react'
import styled from 'styled-components'

import DragIcon from './assets/icons/DragIcon.svg'

function DragabbleRow() {
  return (
    <RowContainer>
      <DragButton>
        <img src={DragIcon} alt="drag icon" />
      </DragButton>
      <Item>
        <TopRow>
          <h3>Add an expense</h3>
        </TopRow>
        <BottomRow>
          <h6>Test</h6>
        </BottomRow>
      </Item>
      <Description>
        <p>
          This description is the default text added in the ITEMS settings. The user can add or edit to this text that may better describe the scope of work to the client. This may be multiple lines entry, perhaps the area expands as text is added.
        </p>
      </Description>
    </RowContainer>
  )
}

export default DragabbleRow

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const DragButton = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`

const Description = styled.div`
  flex: 0.5;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
`

const TopRow = styled.div`
  display: flex;
`

const BottomRow = styled.div`
  display: flex;
`
