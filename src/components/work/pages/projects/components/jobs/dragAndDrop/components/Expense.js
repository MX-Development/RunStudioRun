import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from 'axios'

import Avatar from '@material-ui/core/Avatar';

function Task({ data, size, stage }) {

  const [teamMembers, setTeamMembers] = useState([])

  const fetchData = async () => {

    try {
      axios.get(`/json/settings/team.json`)
      .then(res => {
        setTeamMembers([])
        res.data.forEach(member => {
          setTeamMembers(teamMembers => [...teamMembers, member])
        })
      })

      console.log('Data fetched successfully.')
    } catch (err) {
      console.trace(err);
    }
  } 

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container small={size === 'small' ? true : false}>
      <Info>
        <Top>
          <div className="title">
            <h3>{ data.title }</h3>
            {
              // Show status if stage is estimate - remove status when stage is job
              stage !== 'job' ? <span className="item-status">{ data.status }</span> : null
            }
          </div>
          <Members>
            { teamMembers.forEach(member => {
              if (data.team.length > 0 &&data.team.includes(member.id)) {
                return (
                  <Avatar alt={ member.name } src={ member.avatar }>
                    M
                  </Avatar>
                )
              }
            })}
          </Members>
        </Top>
        <Bottom>
          <Item width={0.1}>
            <h6>Option</h6>
            <span>A</span>
          </Item>
          <Item width={0.2}>
            <h6>Quantity</h6>
            <span>000</span>
          </Item>
          <Item width={0.2}>
            <h6>Unit cost</h6>
            <span>$0</span>
          </Item>
          <Item width={0.2}>
            <h6>Cost</h6>
            <span>$0</span>
          </Item>
          <Item width={0.1}>
            <h6>Markup</h6>
            <span>000%</span>
          </Item>
          <Item width={0.2}>
            <h6>Unit price</h6>
            <span>$0</span>
          </Item>
          <Item width={0.2}>
            <h6>Total</h6>
            <span>$0</span>
          </Item>
        </Bottom>
      </Info>

      <Description small={size === 'small' ? true : false}>
        <p>
          { data.description }
        </p>
      </Description>
    </Container>
  )
}

export default Task

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: ${props => props.small ? "50px" : "0"};
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0.5;
  padding: 0 15px;
  background: #fff;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  > .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  > .title span {
    opacity: 0.5;
    font-style: italic;
    margin-left: 10px;
  }
`

const Bottom = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 5px;
`

const Item = styled.div`
  flex: ${props => props.width};

  > h6 {
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  > span {
    font-size: 16px;
  }

  .MuiOutlinedInput-input {
    border: none !important;
    outline: none;
    padding: 0 !important;
    font-size: 18px !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  .MuiFormLabel-root {
    font-size: 0.67em;
    margin-bottom: 2px;
    text-transform: uppercase;
    font-weight: 600 !important;
  }

  .MuiFormControl-marginNormal {
    margin: 0;
    top: -5px;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    opacity: 0;
  }

  .MuiOutlinedInput-adornedStart {
    padding-left: 0;
  }
`

const Description = styled.div`
  display: flex;
  flex: ${props => props.small ? "0.5525" : "0.5"};
  padding: 15px;
  font-size: 14px;
  background: #fff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const Members = styled.div`
  display: flex;

  .MuiAvatar-root {
    width: 30px !important;
    height: 30px !important;
    margin-left: 5px;
  }
`
