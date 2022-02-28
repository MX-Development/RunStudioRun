import React from 'react'
import styled from 'styled-components'

function PhaseTitle({ data }) {
  return (
    <Container small={false}>

      <Info>
        <Top>
          <div className="title">
            <h3>{ data.title }</h3>
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

export default PhaseTitle

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

const Item = styled.div`
  flex: ${props => props.width};

  > h6 {
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  > span {
    font-size: 16px;
  }

  .MuiOutlinedInput-input {
    border: none !important;
    outline: none;
    padding: 0 !important;
    font-size: 18px !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  .MuiFormLabel-root {
    font-size: 0.67em;
    margin-bottom: 2px;
    text-transform: uppercase;
    font-weight: 600 !important;
  }

  .MuiFormControl-marginNormal {
    margin: 0;
    top: -5px;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    opacity: 0;
  }

  .MuiOutlinedInput-adornedStart {
    padding-left: 0;
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
`
