import React from 'react'
import styled from 'styled-components'

function Block({ background, title, children }) {
  return (
    <Container bgColor={background}>
      { title ? ( <h4 className="gutterBottom" style={{ fontWeight: '600', marginTop: '0' }}>{ title }</h4> ) : null}
      { children }
    </Container>
  )
}

export default Block

const Container = styled.div`
  background: ${props => props.bgColor ? props.bgColor : "var(--white)"};
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all .5s ease-in-out;
`