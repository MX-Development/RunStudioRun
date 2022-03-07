import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import ActionIcon from '../../../../assets/icons/ActionIcon.svg'
import CloseIcon from '../../../../assets/icons/CloseIcon.svg'

function ActionButton({ setAction, snapshot, item }) {
  
  const [openActions, setOpenActions] = useState(false)

  return (
    <ButtonContainer
      onClick={(e) => {
        setOpenActions(!openActions)
      }}
    >
      {
        openActions ?
        <img src={CloseIcon} alt="action icon" />
        :
        <img src={ActionIcon} alt="action icon" />
      }
      <ActionNav className={openActions ? 'active' : ''}>
        <ActionItem
          onClick={() => {
            setAction('move_up', snapshot, item)
            setOpenActions(false)
          }}
        >
          Move Up
        </ActionItem>
        <ActionItem
          onClick={() => {
            setAction('move_down', snapshot, item)
            setOpenActions(false)
          }}
        >
          Move Down
        </ActionItem>
        <ActionItem
          onClick={() => {
            setAction('subtask', snapshot, item)
            setOpenActions(false)
          }}
        >
          Make Sub Item/Task
        </ActionItem>
        <ActionItem
          onClick={() => {
            setAction('duplicate', snapshot, item)
            setOpenActions(false)
          }}
        >
          Duplicate
        </ActionItem>
        <ActionItem
          onClick={() => setOpenActions(false)}
        >
          Pending
        </ActionItem>
        <ActionItem
          onClick={() => setOpenActions(false)}
        >
          Approve & Create Task
        </ActionItem>
        <ActionItem
          onClick={() => setOpenActions(false)}
        >
          Commit Time
        </ActionItem>
        <ActionItem
          onClick={() => setOpenActions(false)}
        >
          Hide
        </ActionItem>
        <ActionItem
          onClick={() => {
            setAction('delete', snapshot, item)
            setOpenActions(false)
          }}
        >
          Delete
        </ActionItem>
      </ActionNav>
    </ButtonContainer>
  )
}

export default ActionButton

const ButtonContainer = styled.div`
  width: 50px;
  min-width: 50px;
  height: 50px;
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  > img {
    max-height: 50px;
  }

  &:hover {
    cursor: pointer;
  }
`

const ActionNav = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  transform: translate(-105%,-50%);
  box-shadow: 0px 0px 8px #00000033;
  border-radius: 4px 4px 4px 4px;
  padding: 10px;
  background: var(--white);
  z-index: 5;
  left: -9999px;
  opacity: 0;
  transition: opacity .35s ease-in-out;

  &.active {
    opacity: 1;
    left: 0;
    transition: opacity .35s ease-in-out;
  }
`

const ActionItem = styled.button`
  padding: 7.5px 10px;
  text-decoration: none;
  color: #292724;
  font-size: 14px;
  display: flex;
  word-wrap: none;
  border: none;
  background: transparent;
  white-space: nowrap;
  transition: background .35s ease-in-out;

  &:hover {
    cursor: pointer;
    background: #F4F2F0;
    transition: background .35s ease-in-out;
  }
`