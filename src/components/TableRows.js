import React from 'react'
import styled from 'styled-components'

function TableRows({ data }) {

  const rowData = data;

  return (
    rowData.map(row => (
      <Row>
        <span style={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
          <span>{ row.title }</span>
          <span>{ row.company }</span>
        </span>
        <Description>
          { row.description }
        </Description>
        <span style={{ width: '5%' }}>
          Team
        </span>
        <span style={{ width: '5%' }}>
          { row.dateEntered }
        </span>
        <span style={{ width: '5%' }}>
          { row.dueDate }
        </span>
        <span style={{ width: '5%' }}>
          Action
        </span>
        <span style={{ width: '10%' }}>
          { row.status }
        </span>
        <span style={{ width: '5%' }}>
          
        </span>
      </Row>
    ))
  )
}

export default TableRows

const Row = styled.div`
  display: flex;
  border-radius: 2px;
  background: var(--white);
  margin-bottom: 10px;
  padding: 10px 15px;
` 

const Description = styled.div`
  width: 35%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
` 
