import React, { useState } from 'react'
import styled from 'styled-components'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';

function AddNav({ show }) {

  const [state, setState] = useState({
    overview: false,
    stage: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Container shown={show ? true : false}>
      <Item active={state.overview ? true : false}>
        <FormControlLabel
          control={<Checkbox checked={state.overview} onChange={handleChange} name="overview" />}
          label="Write an overview"
          labelPlacement="start"
        />
      </Item>
      <Item active={state.stage ? true : false}>
        <FormControlLabel
          control={<Checkbox checked={state.stage} onChange={handleChange} name="stage" />}
          label="Add a Stage/Phase"
          labelPlacement="start"
        />
      </Item>
      <Item active={state.item ? true : false}>
        <FormControlLabel
          control={<Checkbox checked={state.item} onChange={handleChange} name="item" />}
          label="Add an Item/Task"
          labelPlacement="start"
        />
      </Item>
      <Item active={state.subitem ? true : false}>
        <FormControlLabel
          control={<Checkbox checked={state.subitem} onChange={handleChange} name="subitem" />}
          label="Add a Sub Item/Task"
          labelPlacement="start"
        />
      </Item>
      <Item active={state.expense ? true : false}>
        <FormControlLabel
          control={<Checkbox checked={state.expense} onChange={handleChange} name="expense" />}
          label="Add an Expense"
          labelPlacement="start"
        />
      </Item>
      <AddButton>
        <button class="btn btn-grey" type="button">Add</button>
      </AddButton>
    </Container>
  )
}

export default AddNav

const Container = styled.div`
  position: absolute;
  top: 145px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  padding: 15px;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  border-radius: 4px;
  display: ${props => props.shown ? "flex" : "none"};
  flex-direction: column;
  z-index: 5;
`

const Item = styled.div`
  background: ${props => props.active ? "#eee" : "transparent"};
  transition: background 0.2s ease;

  > label {
    display: flex;
    justify-content: space-between;
    margin-right: 0;
  }

  > .MuiCheckbox-root {
    padding: 6px;
  }
`

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
`