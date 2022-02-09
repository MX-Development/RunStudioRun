import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Carousel from "react-simply-carousel";

import './JobScroll.css'

import axios from 'axios';
import InfoGraphics from './projects/jobSlider/InfoGraphics';

function JobScroll({ projectID }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const [data, setData] = useState([])
  useEffect(() => {
    setData([])
    axios.get(`https://kendrix.kendrix.website/json/jobs.json`)
      .then(res => {
        projectID ? 
          res.data.forEach(item => {
            if (item.projectID === parseInt(projectID)) {
              console.log(item);
              setData(data => [...data, item])
            }
          })
        :
          setData(res.data)
        }
      )
  }, [projectID]);

  return (

    data && data.length > 0 ?
      <Carousel
        className="job-carousel"
        infinite={false}
        containerProps={{
          className: 'hallo',
          style: {
            position: 'relative',
            maxWidth: 'none',
            width: '100%'
          }
        }}
        innerProps={{
          style: {
            maxWidth: 'none',
            minWidth: 'none !important'
          }
        }}
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: ">",
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
            position: "absolute",
            top: "0",
            right: "0"
          }
        }}
        backwardBtnProps={{
          children: "<",
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
            position: "absolute",
            top: "0",
            left: "0"
          }
        }}
        itemsToShow={1}
        speed={400}
      >
        <InfoGraphics />
        <InfoGraphics />
        {/* { data.map((job, index) => {
          return (
            <InfoGraphics />
          )
        }) } */}
      </Carousel>
      :
      <JobContainer>
        <Block percentage={0}>
          <div className="top">
            <div className="info">
              <h6>Planned hours</h6>
              <span>0hr</span>
            </div>
            <div className="info">
              <h6>Used</h6>
              <span>0hr/0hr</span>
            </div>
          </div>
          <div className="bottom">
            <span className="bar"></span>
          </div>
        </Block>
        <Block percentage={0}>
          <div className="top">
            <div className="info">
              <h6>Planned budget</h6>
              <span>0hr</span>
            </div>
            <div className="info">
              <h6>Used</h6>
              <span>$0/$0</span>
            </div>
          </div>
          <div className="bottom">
            <span className="bar"></span>
          </div>
        </Block>
        <Block percentage={0}>
          <div className="top">
            <div className="info">
              <h6>Entered</h6>
              <span>-</span>
            </div>
            <div className="info">
              <div className="sub">
                <div className="left">
                  <h6>Start</h6>
                  <span>-</span>
                </div>
                <div className="right">
                  <h6>Due date</h6>
                  <span>-</span>
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

export default JobScroll

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
