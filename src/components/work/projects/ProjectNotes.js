import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField'; 

import AddIconSquare from '../../assets/icons/AddIconSquare.svg'

function ProjectNotes({ data }) {
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
    <FormGroup>
      <FormControl variant="outlined">
        <FormLabel style={{ lineHeight: '1.4', fontWeight: '400 !important' }}>Project notes</FormLabel>
        <TextField
          variant="outlined"
          placeholder="Enter the job description and if you’d like the client to understand what you will be working on tick to publish this description in your estimate."
          value={data ? data.project_notes : null}
          multiline
          rows={4}
          readOnly
          style={{ background: 'var(--white)' }}
        />
        <IconContainer>
          <img src={AddIconSquare} />
        </IconContainer>
        {/* <Editor
          ref={editor}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
        /> */}
      </FormControl>
    </FormGroup>  
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
