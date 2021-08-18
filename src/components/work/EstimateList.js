import React, { useState } from 'react'
import styled from 'styled-components'

import moment from 'moment'

import DragIcon from '../assets/icons/DragIcon.svg'
import ActionIcon from '../assets/icons/ActionIcon.svg'
import TeamToDelete from '../assets/icons/TeamToDelete.svg'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function EstimateList({ type, data }) {
  
  const [edit, setEdit] = useState(null)
  const [selectedData, setSelectedData] = useState(data)

  const editField = (e) => {
    console.log(e)
    console.log('Editing field...')
    setEdit(e.target.name)
  }

  const handleChange = event => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.value // This code replace the font object
    });
  }

  return (
    <Container small={type === 'subitem' ? true : false}>
      <DragButton>
        <img src={DragIcon} alt="drag icon" />
      </DragButton>

      <Info>
        <Top>
          <div className="title">
            <h3>{ data.title }</h3>
            { 
              type !== 'overview' ?
                <span>Pending</span>
              : null
            }
          </div>
          {
            type !== 'title' && type !== 'overview' ?
              <div className="team">
                <img src={TeamToDelete} alt="team to delete" />
              </div>
            : null
          } 
        </Top>
        {
          type !== 'overview' ?
            <Bottom>
              { type === 'item' || type === 'subitem' ? 
                <>
                  <Item width={0.2}>
                    <h6>Hours</h6>
                    <span>{ data.time }</span>
                  </Item>
                  <Item width={0.2}>
                    <h6>Rate</h6>
                    <span>${ data.rate }</span>
                  </Item>
                  <Item width={0.2}>
                    <h6>Total</h6>
                    <span>
                      <TextField
                        variant="outlined"
                        value={data ? data.total : null}
                        disabled
                        onClick={(e) => editField(e)}
                        name="total"
                        disabled={edit === 'total' ? false : true}
                        onChange={(e) => handleChange(e)}
                      />
                    </span>
                  </Item>
                  <Item width={0.3}>
                    <h6>Start</h6>
                    <span>{ moment(data.startDate).format("MMM Do YYYY") }</span>
                  </Item>
                  <Item width={0.3}>
                    <h6>End</h6>
                    <span>{ moment(data.endDate).format("MMM Do YYYY") }</span>
                  </Item>
                </>
              : type === 'expense' ?
                <>
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
                </>
              : null
              }
            </Bottom>
          : null
        }
      </Info>

      <Description small={type === 'subitem' ? true : false}>
        <p>
          { data.description }
        </p>
      </Description>
      <ActionButton>
        <img src={ActionIcon} alt="action icon" />
      </ActionButton>
    </Container>
  )
}

export default EstimateList

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: ${props => props.small ? "50px" : "0"};
`

const DragButton = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eee;

  > img {
    max-width: 50px;
  }
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
`

const Description = styled.div`
  display: flex;
  flex: ${props => props.small ? "0.5525" : "0.5"};
  padding: 15px;
  font-size: 14px;
  background: #fff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
`

const ActionButton = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    max-height: 50px;
  }
`
