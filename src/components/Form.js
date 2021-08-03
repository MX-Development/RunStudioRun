import React, { useState } from 'react'

import ModalBox from './ModalBox'

function Form() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button onClick={e => setOpenModal(!openModal)}>Open Modal</button>
      <ModalBox 
        modalOpened={openModal} 
        title={'So you just thought you’d press it.'}
      >
        <p>
          Nothing to preview or print, please add ITEMS and EXPENSES.
        </p>

        <div className="modal-footer">
          <div className="btn-group">
            <div className="btn-left">
              <button className="btn btn-gold btn-left">Close</button>
              <button className="btn btn-light-gray btn-left">Close</button>
            </div>
            <div className="btn-right">
              <button className="btn btn-dark-gray btn-right" onClick={e => setOpenModal(!openModal)}>Close</button>
            </div>
          </div>
        </div>
      </ModalBox>
    </>
  )
}

export default Form
