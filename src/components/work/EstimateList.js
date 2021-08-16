import React from 'react'
import styled from 'styled-components'

import DragIcon from '../assets/icons/DragIcon.svg'
import ActionIcon from '../assets/icons/ActionIcon.svg'
import TeamToDelete from '../assets/icons/TeamToDelete.svg'

function EstimateList({ type, title }) {
  return (
    <Container>
      <DragButton>
        <img src={DragIcon} alt="drag icon" />
      </DragButton>

      <Info>
        <Top>
          <div className="title">
            <h3>{ type === 'item' ? 'Add an item/task' : type === 'expense' ? 'Add an expense' : type === 'title' ? title : null }</h3>
            <span>Pending</span>
          </div>
          <div className="team">
            <img src={TeamToDelete} alt="team to delete" />
          </div>
        </Top>
        <Bottom>
          { type === 'item' ? 
            <>
              <Item width={0.2}>
                <h6>Hours</h6>
                <span>0hr/0m</span>
              </Item>
              <Item width={0.2}>
                <h6>Rate</h6>
                <span>$120</span>
              </Item>
              <Item width={0.2}>
                <h6>Total</h6>
                <span>$0</span>
              </Item>
              <Item width={0.3}>
                <h6>Start</h6>
                <span>30 Sep 2017</span>
              </Item>
              <Item width={0.3}>
                <h6>End</h6>
                <span>30 Sep 2017</span>
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
      </Info>

      <Description>
        <p>
        { type === 'title' ? 
          'The stage/phase text entry allows you to enter important information about how you will go about one part of the job. It also allows you to allocated this stage to a team member. This will also appear as a heading in your estimate.'
        : 
          'This description is the default text added in the EXPENSES settings. The user can add or edit to this text that may better describe the scope of work to the client. This may be multiple lines entry, perhaps the area expands as text is added.'
        }
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
  flex: 0.5;
  padding: 15px;
  background: #fff;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

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
`

const Description = styled.div`
  display: flex;
  flex: 0.5;
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
