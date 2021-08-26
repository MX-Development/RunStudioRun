import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, useLocation } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

import PageTitle from './layout/PageTitle'

import Modal from 'react-modal';
Modal.setAppElement('#root');

function List({ title, columns, data, modalTitle, modalContent, size, projectID, view, add, ...rest }) {

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
    field: '', width: 55, sortable: false, 
    renderCell: () => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H0V9.039H12.052L6.545,14.545,8,16l8-8Z" fill="#b1b0af"/>
        </svg>
      </div>
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
    history.push(`/projects/${projectID}/${view}/${estimateID}`);
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
