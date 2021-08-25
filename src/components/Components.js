import React from 'react'
import styled from 'styled-components'

function Components() {
  return (
    <>
      <Heading>
        Colors
      </Heading>
      <Elements>
        <Color color={'var(--gold)'} />
        <Color color={'var(--light-gray)'} />
        <Color color={'var(--dark-gray)'} />
      </Elements>

      <Heading>
        Buttons
      </Heading>
      <Elements>
        <a href="#" className="btn btn-gold">Button</a>
        <a href="#" className="btn btn-dark-gray">Button</a>
        <a href="#" className="btn btn-light-gray">Button</a>
      </Elements>

      <Heading>
        Typography
      </Heading>
      <Elements>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </Elements>
    </>
  )
}

export default Components

const Heading = styled.div`
  display: flex;
  margin: 30px 0 15px;
`

const Elements = styled.div`
  > a {
    margin-right: 5px;
  }
`

const Color = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.color || "palevioletred"};
`
