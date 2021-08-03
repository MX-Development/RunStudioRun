import React, { useState } from 'react'
import { useForm } from "react-hook-form"

import ModalBox from './ModalBox'

function Form() {

  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <button onClick={e => setOpenModal(!openModal)}>Open Modal</button>
      <ModalBox 
        modalOpened={openModal} 
        title={'So you just thought you’d press it.'}
      >

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" defaultValue="test" id="name" {...register("name")} />
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select className="form-control" id="gender" {...register("gender")}>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="example">Gender</label>
            <input className="form-control" id="example" {...register("exampleRequired", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <div className="modal-footer">
            <div className="btn-group">
              <div className="btn-left">
                <button className="btn btn-gold btn-left">Cancel</button>
                <button className="btn btn-light-gray btn-left">View job</button>
              </div>
              <div className="btn-right">
                <button type="submit" className="btn btn-dark-gray btn-right" onClick={e => setOpenModal(!openModal)}>Save time</button>
              </div>
            </div>
          </div>
        </form>
      </ModalBox>
    </>
  )
}

export default Form
