import React from 'react'
import styled from 'styled-components'
import './Labels.css'

function Label({ defaultValue, background, color, border }) {
  return (
    <Item defaultValue={defaultValue} style={{ background: background, color: color, border: border }} />
  )
}

export default Label

const Item = styled.input.attrs({ type: 'text' })`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  padding: 5px 0;
  text-align: center;
  border-radius: 2px;
  margin-bottom: 8px;
  border: none;
  width: 100%;
  outline: none !important;
`
