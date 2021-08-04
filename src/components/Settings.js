import React from 'react'
import styled from 'styled-components'

import PageTitle from './layout/PageTitle'

function Settings() {
  return (
    <>
      <PageTitle title={'Settings'} />

      <ColumnsOuter>
        <Column>
          <Block>
            <h3>Column</h3>
            <p>Column</p>
          </Block>
          <Block>
            <h3>Column</h3>
            <p>Column</p>
          </Block>
        </Column>
        <Column>
          <Block>
            <h3>Column</h3>
            <p>Column</p>
          </Block>
        </Column>
      </ColumnsOuter>
    </>
  )
}

export default Settings

const ColumnsOuter = styled.div`
  display: flex;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.3%;
`

const Block = styled.div`
  display: flex;
  background: #fff;
  padding: 20px;
  margin: 0 20px 20px 0;

  > h3 {
    font-weight: bold;
    font-size: 22px;
  }
`
