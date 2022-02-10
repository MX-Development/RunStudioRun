import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField'; 

import AddIconSquare from '../../assets/icons/AddIconSquare.svg'

import Modal from 'react-modal';
Modal.setAppElement('#root');

function ProjectNotes({ data }) {

  const centerModal = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      background: 'var(--white)',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '550px',
      maxHeight: '90vh',
      width: '100%',
      padding: '0 !important'
    },
  };
  
  const [modalIsOpen, setIsOpen] = useState(false);

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
    const selectedRow = document.querySelector('.Mui-selected');
    if (selectedRow) selectedRow.classList.remove('Mui-selected');
  }

  function openModal() {
    setIsOpen(true)
  }

  // const [editorState, setEditorState] = useState(
  //   EditorState.createEmpty()
  // )
 
  // const editor = React.useRef(null);
 
  // function focusEditor() {
  //   editor.current.focus();
  // }
 
  // React.useEffect(() => {
  //   focusEditor()
  // }, []);

  // const EditNotes = () => {
  //   console.log('Edit notes...');
  // }

  return (
    <>
      <FormGroup>
        <FormControl variant="outlined">
          <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Project notes</FormLabel>
          <TextField
            variant="outlined"
            placeholder="Enter the job description and if you’d like the client to understand what you will be working on tick to publish this description in your estimate."
            defaultValue={data ? data.project_notes : null}
            multiline
            className="padded-right"
            rows={4}
            inputProps={
              { readOnly: true, }
            }
            style={{ background: 'var(--white)', paddingRight: '30px !important' }}
          />
          <IconContainer onClick={openModal}>
            <img src={AddIconSquare} />
          </IconContainer>
          {/* <Editor
            ref={editor}
            editorState={editorState}
            onChange={editorState => setEditorState(editorState)}
          /> */}
        </FormControl>
      </FormGroup>  

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={centerModal}
      >
        <TextField
          variant="outlined"
          placeholder="Enter the job description and if you’d like the client to understand what you will be working on tick to publish this description in your estimate."
          defaultValue={data ? data.project_notes : null}
          multiline
          rows={25}
          style={{ background: 'var(--white)', width: '100%' }}
        />
      </Modal>
    </>
  )
}

export default ProjectNotes;

const IconContainer = styled.div`
  display: flex;
  position: absolute;
  right: 8px;
  top: 30px;

  &:hover {
    cursor: pointer;
  }
`
