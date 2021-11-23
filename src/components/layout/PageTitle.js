import React from 'react'
import styled from 'styled-components'

function PageTitle({ title }) {
  return (
    <Title>
      <h1>{ title }</h1>
    </Title>
  )
}

export default PageTitle

const Title = styled.div`
  display: flex;
  margin-bottom: 7.5px;
`
