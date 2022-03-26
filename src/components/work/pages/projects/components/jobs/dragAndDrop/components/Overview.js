import React from 'react'
import styled from 'styled-components'

function Overview({ data }) {
  return (
    <Container small={false}>

      <Info>
        <Top>
          <div className="title">
            <h3 style={{ fontWeight: 'bold' }}>{ data.title }</h3>
          </div>
        </Top>
      </Info>

      <Description small={false}>
        <p>
          { data.description }
        </p>
      </Description>
    </Container>
  )
}

export default Overview

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: ${props => props.small ? "50px" : "0"};
  width: 100%;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0.5;
  padding: 0 15px;
  background: #fff;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  > .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  > .title span {
    opacity: 0.5;
    font-style: italic;
    margin-left: 10px;
  }
`

const Description = styled.div`
  display: flex;
  flex: ${props => props.small ? "0.5525" : "0.5"};
  padding: 15px;
  font-size: 14px;
  background: #fff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`
