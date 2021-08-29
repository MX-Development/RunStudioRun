import React from 'react'
import styled from 'styled-components'

function LoadingDots() {
  return (
    <Dots>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </Dots>
  )
}

export default LoadingDots

const Dots = styled.div`
  display: flex;
  margin-top: 25px;
`

const Dot = styled.div`
  width: 15px;
  height: 15px;
  background: var(--gold);
  border-radius: 50px;
  opacity: 0.5;
  animation: fader .5s ease-in-out infinite;

  :not(:last-child) {
    margin-right: 12.5px;
  }

  :nth-child(1) {
    animation-delay: 0s;
  }

  :nth-child(2) {
    animation-delay: .15s;
  }

  :nth-child(3) {
    animation-delay: .3s;
  }

  :nth-child(4) {
    animation-delay: .45s;
  }
  
  @keyframes fader { 100% { opacity: 1; } }
`
