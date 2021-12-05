import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, useLocation } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

import PageTitle from './layout/PageTitle'

import './List.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function List({ title, columns, data, modalTitle, modalContent, modalAction, size, projectID, view, add, openModal, headerButton, nocolor, defaultcolor, ...rest }) {

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

  // const columnData = columns.push({ 
  //   field: '', width: 55, sortable: false, 
  //   renderCell: () => (
  //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  //         <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H0V9.039H12.052L6.545,14.545,8,16l8-8Z" fill="#b1b0af"/>
  //       </svg>
  //     </div>
  //   )
  // })

  useEffect(() => {
    if (add) {
      setIsOpen(true)
    }

    if (openModal) {
      setIsOpen(true)
    }
  }, [add, openModal]);

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
      <ListHeader>
        <PageTitle title={title} />
        { headerButton ? <button className="btn">{ headerButton }</button> : null }
      </ListHeader>
      
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          className={nocolor ? 'no-color' : defaultcolor ? 'default-color' : ''}
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
          <ModalHeading>
            <h2>{ modalTitle }</h2>
            { modalAction ? modalAction : null}
          </ModalHeading>
          { modalContent }
        </ModalBody>
      </Modal>
    </>
  )
}

export default List

const ModalHeading = styled.div`
  display: flex;
  justify-content: space-between;
`

const ModalBody = styled.div`
  position: relative;

  > h2 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 15px;
  }
` 

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > button {
    border: 1px solid #B1B0AF;
    color: #B1B0AF;
    border-radius: 2px;
    background: transparent;
    font-size: 12px;
    padding: 4px 6px;

    &:hover {
      cursor: pointer;
    }
  }
`
