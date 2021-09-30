import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ModalBox({ modalOpened, title, children, styling, size }) {

  console.log(modalOpened)

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

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('Setting modal box...')
    setIsOpen(!modalIsOpen)
  }, [modalIsOpen]);

  // function openModal() {
  //   setIsOpen(true);
  // }

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={styling ? styling : centerModal}
        contentLabel="Example Modal"
      >
        <ModalBody>
          <h2>{ title }</h2>
          { children }
        </ModalBody>
      </Modal>
    </>
  )
}

export default ModalBox

const ModalBody = styled.div`
  position: relative;

  > h2 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 15px;
  }
`
