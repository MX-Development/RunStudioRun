import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, useLocation } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

import { useSelector, useDispatch } from "react-redux";
import { setShowOrdered } from "../../features/items/projectSlice";

import PageTitle from '../layout/PageTitle'

import '../List.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function ProjectListing({company, columns, data, jobs, modalTitle, modalContent, size, projectID, view, add, openModal, headerButton, nocolor, defaultcolor, ...rest }) {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects([])
    data.map(project => {
      jobs.map(job => {
        if (job.projectID == project.projectID) {
          setProjects(projects => [...projects, project])
          setProjects(projects => [...projects, job])
          return;
        }
        setProjects(projects => [...projects, project])
      })
    })
  }, [data]);

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.showOrdered);

  const setOrder = event => {
    console.log('Changing order');
    dispatch(setShowOrdered(!order))
  }

  useEffect(() => {
    if (order) {
      console.log('order');

      setTimeout(function() {
        const container = document.querySelectorAll('.project-grid .MuiDataGrid-windowContainer');
        container.forEach(el => { 
          const elHeight = el.style.height;
          const height = parseInt(elHeight.replace('px'));
          const newHeight = height / 2;
  
          if (height > 350) {
            el.style.height = `${height / 2}px`;
          }
          // console.log(`${parseInt(height.replace('px')) / 2}px`);
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
