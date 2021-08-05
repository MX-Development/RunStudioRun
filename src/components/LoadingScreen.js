import React from 'react'
import styled from 'styled-components'

import LoadingImage from './assets/loading-img.svg'

function LoadingScreen() {
  return (
    <LoadingContainer>
      <img src={LoadingImage} alt="Loading illustration" />
    </LoadingContainer>
  )
}

export default LoadingScreen

const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
  }

  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`
