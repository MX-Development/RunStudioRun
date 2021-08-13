import React from 'react'
import styled from 'styled-components'

function JobScroll() {

  return (
    <Blocks>
      <Block>
        <div className="top">
          <div className="info">
            <h6>Planned hours</h6>
            <span>10hr</span>
          </div>
          <div className="info">
            <h6>Used</h6>
            <span>1hr/9hr</span>
          </div>
        </div>
        <div className="bottom" style={{ background: '#8A8A8A'}}>
          <span className="bar" first></span>
        </div>
      </Block>
      <Block>
        <div className="top">
          <div className="info">
            <h6>Planned hours</h6>
            <span>10hr</span>
          </div>
          <div className="info">
            <h6>Used</h6>
            <span>1hr/9hr</span>
          </div>
        </div>
        <div className="bottom" style={{ background: '#8A8A8A'}}>
          <span className="bar "></span>
        </div>
      </Block>
      <Block>
        <div className="top">
          <div className="info">
            <h6>Planned hours</h6>
            <span>10hr</span>
          </div>
          <div className="info">
            <h6>Used</h6>
            <span>1hr/9hr</span>
          </div>
        </div>
        <div className="bottom" style={{ background: '#8A8A8A'}}>
          <span className="bar" first></span>
        </div>
      </Block>
    </Blocks>
  )
}

export default JobScroll

const Block = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;

  :first {
    background: blue !important;
  }

  > .top {

    > .info {
      display: flex;
      flex-direction: column;
      padding: 10px 20px;
      background: red;
      color: #fff;

      > span {
        font-size: 1.5em;
      }
    }
  }

  > h6 {
    text-transform: uppercase;
    font-weight: bold;
  }

  > .bottom {
    position: relative;
    width: 100%;
    height: 55px;

    > .bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 60%;
      background: #E0BC77;
    }
  }
`

const Blocks = styled.div`
  display: flex;
  justify-content: space-between;
  
  ${Block}:nth-child(1) .info {
    background: #3C3C3C;
  }
  
  ${Block}:nth-child(2) .info {
    background: #DDDBD7;
  }
  
  ${Block}:nth-child(3) .info {
    background: #FFFFFF;
  }
`
