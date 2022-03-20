import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField'; 
 
import AddIconSquare from '../../../../assets/icons/AddIconSquare.svg'

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import '../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Wysiwyg.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function ProjectNotes({ data }) {

  const content = localStorage.getItem('content');

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    content ?
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content)))) 
    : 
      setEditorState(EditorState.createEmpty())
  }, [content]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)

    const contentState = editorState.getCurrentContent();
    localStorage.setItem('content', JSON.stringify(convertToRaw(contentState)));
  }

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
      padding: '0 !important',
      border: 'none'
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

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={centerModal}
      >
        <Editor 
          toolbar={{
            options: ['inline']
          }} 
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </Modal> 

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
            <img src={AddIconSquare} alt="add icon" />
          </IconContainer>
          {/* <Editor
            ref={editor}
            editorState={editorState}
            onChange={editorState => setEditorState(editorState)}
          /> */}
        </FormControl>
      </FormGroup>  
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
