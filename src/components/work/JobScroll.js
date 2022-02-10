import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import './JobScroll.css'

import axios from 'axios';
import InfoGraphics from './projects/jobSlider/InfoGraphics';

import { ReactComponent as SliderPrevArrow } from '../assets/icons/SliderPrevArrow.svg'
import { ReactComponent as SliderNextArrow } from '../assets/icons/SliderNextArrow.svg'

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
      showStatus={false}
      showIndicators={false}
      emulateTouch={true}
      swipable={true}
      renderArrowPrev={(clickHandler, hasPrev, label) => {
        return (
          <button type="button" aria-label="prev slide / item" class={`control-arrow control-prev ${hasPrev ? '' : 'disabled'}`} onClick={clickHandler}>
            <SliderPrevArrow />
          </button>
        )
      }}
      renderArrowNext={(clickHandler, hasNext, label) => {
        return (
          <button type="button" aria-label="next slide / item" class={`control-arrow control-next ${hasNext ? '' : 'disabled'}`} onClick={clickHandler}>
            <SliderNextArrow />
          </button>
        )
      }}
      >
        {/* <InfoGraphics />
        <InfoGraphics /> */}
        { data.map((job, index) => {
          return (
            <GraphicItem>
              <GraphicHeading>{ job.jobNo }</GraphicHeading>
              <InfoGraphics item={job} key={index} />
            </GraphicItem>
          )
        }) }
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
      text-align: left;

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

const GraphicItem = styled.div`
  position: relative;
`

const GraphicHeading = styled.h5`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -40px);
  font-weight: bold;
`