import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import axios from 'axios';

function JobScroll({ projectID }) {

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
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ width: '100%' }}
      >
        {
          data ?
            data.map(job => {
              return (
              <SwiperSlide>
                <JobContainer>
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
                    <div className="bottom">
                      <span className="bar"></span>
                    </div>
                  </Block>
                  <Block>
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
                  <Block>
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
              </SwiperSlide>
              )
            })
          : null
        }
      </Swiper>
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
      width: 60%;
      background: #E0BC77;
    }
  }
`

const JobContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  ${Block}:nth-child(1) {
    background: #3C3C3C;

    .bottom {
      background: rgba(255,255,255,0.4);
    }
  }
  
  ${Block}:nth-child(2) {
    background: #DDDBD7;

    .info {
      span {
        color: #3C3C3C;
      }
    }

    .bottom {
      background: rgba(255,255,255,0.4);
    }
  }
  
  ${Block}:nth-child(3) { 
    .info {
      background: #FFFFFF;

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
