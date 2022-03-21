import React from 'react';
import styled from 'styled-components'

function InfoGraphics({ item }) {

  return (
    <JobContainer>
      <Block percentage={40}> 
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
        <div className="bottom">
          <span className="bar"></span>
        </div>
      </Block>
      <Block percentage={35}>
        <div className="top">
          <div className="info">
            <h6>Planned budget</h6>
            <span>10hr</span>
          </div>
          <div className="info">
            <h6>Used</h6>
            <span>$150/$1350</span>
          </div>
        </div>
        <div className="bottom">
          <span className="bar"></span>
        </div>
      </Block>
      <Block percentage={60}>
        <div className="top">
          <div className="info">
            <h6>Entered</h6>
            <span>8 SEP 2017</span>
          </div>
          <div className="info">
            <div className="sub">
              <div className="left">
                <h6>Start</h6>
                <span>1 SEP 2017</span>
              </div>
              <div className="right">
                <h6>Due date</h6>
                <span>30 SEP 2017</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span className="bar"></span>
        </div>
      </Block>
    </JobContainer>
  )
}

export default InfoGraphics;

const Block = styled.div`
  width: 31.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > .top {

    > .info {
      display: flex;
      flex-direction: column;
      padding: 7.5px;
      color: #fff;

      > span {
        font-size: 1.2em;
      }
    }
  }

  h6 {
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
      width: ${props => props.percentage || 0}%;
      background: var(--gold);
    }
  }
`

const JobContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  ${Block}:nth-child(1) {
    background: var(--text-gray);

    .bottom {
      background: rgba(255,255,255,0.4);
    }
  }
  
  ${Block}:nth-child(2) {
    background: #DDDBD7;

    .info {
      span {
        color: var(--text-gray);
      }
    }

    .bottom {
      background: rgba(255,255,255,0.4);
    }
  }
  
  ${Block}:nth-child(3) { 
    .info {
      background: var(--white);

      > .sub {
        display: flex;
        justify-content: space-between;

        > .right {
          text-align: right;
        }
      }

      h6 {
        color: #B1B0AF;
      }

      span {
        color: #292724;
      }
    }

    .info:nth-child(2) {
      padding-top: 11px;
      
      span {
        font-size: 9px;
        font-weight: bold;
      }
    }

    .bottom {
      background: #B1B0AF;
    }

    .bar {
      background: #519151;
    }
  }
`
