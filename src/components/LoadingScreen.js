import React from 'react'
import styled from 'styled-components'

import LoadingImage from './assets/loading-img.svg'
import LoadingDots from './LoadingDots'

function LoadingScreen() {
  return (
    <LoadingContainer>
      <img src={LoadingImage} alt="Loading illustration" />
      <LoadingDots />
    </LoadingContainer>
  )
}

export default LoadingScreen

const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`