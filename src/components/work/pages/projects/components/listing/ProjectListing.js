import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, useLocation } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

import { useSelector, useDispatch } from "react-redux";
import { setShowOrdered } from "../../../../../../features/items/projectSlice";

import '../../../../../../styles/List.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function ProjectListing({company, columns, data, jobs, modalTitle, modalContent, size, projectID, view, add, openModal, headerButton, nocolor, defaultcolor, ...rest }) {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects([])
    data.forEach(project => {
      jobs.forEach(job => {
        if (job.projectID === project.projectID) {
          setProjects(projects => [...projects, project])
          setProjects(projects => [...projects, job])
          return;
        }
        setProjects(projects => [...projects, project])
      })
    })
  }, [data, jobs]);

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.showOrdered);

  const setOrder = () => {
    dispatch(setShowOrdered(!order))
  }

  useEffect(() => {
    if (order) {

      setTimeout(function() {
        const container = document.querySelectorAll('.project-grid .MuiDataGrid-windowContainer');
        container.forEach(el => { 
          const elHeight = el.style.height;
          const height = parseInt(elHeight.replace('px'));
  
          if (height > 350) {
            el.style.height = `${height / 2}px`;
          }
        })
      }, 500);
    } 
  }, [order]);

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

  useEffect(() => {
    if (add) {
      setIsOpen(true)
    }

    if (openModal) {
      setIsOpen(true)
    }
  }, [add, openModal]);

  function showItem(GridCellParams) {

    if (GridCellParams.row.jobNo) {
      const itemId = GridCellParams.id
      const projectID = GridCellParams.row.projectID
      history.push(`/${pagePath}/${projectID}/jobs/${itemId}`);
      return;
    }

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
      <div style={{ height: 'auto', width: '100%' }} className="project-grid">
        <GridHeading>
          <span>{ company }</span>
        </GridHeading>
        <DataGrid
          className={`hideHeader ${nocolor ? 'no-color' : defaultcolor ? 'default-color' : ''}`}
          columns={columns}
          rows={projects}
          getRowClassName={(params) => {
            // If the row is a job
            if (params.row.jobNo) {
              return 'job-row';
            }
          }}
          onCellClick={projectID ? showProject : showItem}
          onColumnHeaderClick={(params, event) => {
            if (pagePath === 'projects') setOrder(event); return;
          }}
          autoHeight
          style={{ 
            marginTop: '-36px'
           }}
          rowsPerPageOptions={[]}
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

export default ProjectListing

const ModalBody = styled.div`
  position: relative;

  > h2 {
    font-weight: 300;
    font-size: 28px; 
    margin-bottom: 15px;
  }
` 

const GridHeading = styled.div`
  display: flex;
  background: #B1B0AF;
  padding: 7.5px 15px;
  margin-bottom: 5px;
  border-radius: 2px;

  > span {
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
  }
`
