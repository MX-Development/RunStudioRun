import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, useLocation } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

import PageTitle from '../pages/PageTitle'

import '../../../styles/List.css';

import { useSelector, useDispatch } from "react-redux";
import { setShowOrdered } from "../../../features/items/projectSlice";

import Modal from 'react-modal';
Modal.setAppElement('#root');

function List({ title, buttons, columns, data, modalTitle, modalContent, modalAction, size, projectID, view, add, openModal, headerButton, nocolor, defaultcolor, ...rest }) {

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.showOrdered);

  const setOrder = event => {
    console.log('Changing order');
    dispatch(setShowOrdered(!order))
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
      maxWidth: size ? '850px' : '550px',
      maxHeight: '90vh',
      overflowY: 'scroll'
    },
  };

  const history = useHistory();
  const location = useLocation();
  const pagePath = location.pathname.split('/')[1]
  let { id } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (add) {
      setIsOpen(true)
    }

    if (openModal) {
      setIsOpen(true)
    }
  }, [add, openModal]);

  function showItem(GridCellParams, MuiEvent) {
    const clickedItem = MuiEvent.target.value;
    if (clickedItem === 'Label') return;

    if (!MuiEvent.target.value) {
      const itemId = GridCellParams.id;

      if (pagePath === 'projects') {
        history.push(`/${pagePath}/${itemId}/jobs`);
        return;
      }

      history.push(`/${pagePath}/${itemId}`);
      setIsOpen(true)
    }
  }

  function showProject(GridCellParams) {
    const estimateID = GridCellParams.row.id
    history.push(`/projects/${projectID}/${view}/${estimateID}`);
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
    const selectedRow = document.querySelector('.Mui-selected');
    if (selectedRow) selectedRow.classList.remove('Mui-selected');
  }

  const ROW_HEIGHT = 52;
  const ROW_MARGIN = 7.5;
  const containerHeight = (data.length + 1) * (ROW_HEIGHT + ROW_MARGIN);

  return (
    <>
      <ListHeader>
        <PageTitle title={title} buttons={buttons} />
        {/* { headerButton ? <button className="btn">{ headerButton }</button> : null } */}
      </ListHeader>
      
      <GridContainer style={{ maxHeight: containerHeight + 'px !important' }}>
        <DataGrid
          className={`${nocolor ? 'no-color' : defaultcolor ? 'default-color' : ''} ${order ? 'hideContent' : ''}`}
          columns={columns}
          rows={data}
          onCellClick={projectID ? showProject : showItem}

          onColumnHeaderClick={(event) => {
            if (pagePath === 'projects' && event.field === 'projectInfo') setOrder(event); return;
          }}

          {...rest}
          style={{ height: containerHeight }}
        />
      </GridContainer>

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

const GridContainer = styled.div`
 width: 100%
`

const ModalHeading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
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
