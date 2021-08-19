import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, useLocation } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import PageTitle from './layout/PageTitle'

import Modal from 'react-modal';
Modal.setAppElement('#root');

function List({ title, columns, data, modalTitle, modalContent, size, projectID, add, ...rest }) {

  const centerModal = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: size ? '850px' : '550px'
    },
  };

  const history = useHistory();
  const location = useLocation();
  const pagePath = location.pathname.split('/')[1]
  let { id } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);

  const columnData = columns.push({ 
    field: '', width: 50,  
    renderCell: () => (
      <ArrowRightAltIcon />
    )
  })

  useEffect(() => {
    if (add) {
      setIsOpen(true)
    }
  }, []);

  function showItem(GridCellParams) {
    const itemId = GridCellParams.id
    history.push(`/${pagePath}/${itemId}`);
    setIsOpen(true)
  }

  function showProject(GridCellParams) {
    const estimateID = GridCellParams.row.id
    history.push(`/projects/${projectID}/estimates/${estimateID}`);
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <PageTitle title={title} />
      
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={data}
          onCellClick={projectID ? showProject : showItem}
          autoHeight
          {...rest}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={centerModal}
        memberId={id ? id : null}
        contentLabel="Example Modal"
      >
        <ModalBody>
          <h2>{ modalTitle }</h2>
          { modalContent }
        </ModalBody>
      </Modal>
    </>
  )
}

export default List

const ModalBody = styled.div`
  position: relative;

  > h2 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 15px;
  }
` 
