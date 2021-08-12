import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import styled from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import PageTitle from '../layout/PageTitle'

import Avatar from '@material-ui/core/Avatar';

function YourProfile() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of 
  
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }; 

  return (
    <>
      <PageTitle title={'Your Profile'} />

      <ProfileContainer>   

        <MemberAvatar>
          <Avatar alt="" src="">
            MM
          </Avatar>
          <MemberInfo>
            <h5>Full Name</h5>
            <span>Position</span> 
          </MemberInfo>
        </MemberAvatar>

        <Form>
          <form onSubmit={handleSubmit(onSubmit)}>

            <LeftContainer>

              <h3>Your Profile</h3>

              <div className="form-group">
                <label htmlFor="name">Full Name</label> 
                <input className="form-control" placeholder="First and last name" id="name" {...register("name")} />
              </div>

              <div className="form-group">
                <label htmlFor="name">Job Title</label> 
                <input className="form-control" placeholder="Are you the leader of the pack?" id="name" {...register("name")} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Email</label> 
                  <input className="form-control" placeholder="you@somehere.com" id="name" {...register("name")} />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Phone</label> 
                  <input className="form-control" placeholder="000-000-0000" id="name" {...register("name")} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Billable Rate</label> 
                  <input className="form-control" placeholder="What are they worth" id="name" {...register("name")} />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Cost Rate</label> 
                  <input className="form-control" placeholder="What it costs us" id="name" {...register("name")} />
                </div>
              </div>

              <h3 style={{ marginTop: '15px' }}>Hours I’m available to work</h3>

              <DaysAvailable>
                <Day>
                  <span>Mon</span>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Day>
                <Day>
                  <span>Mon</span>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Day>
                <Day>
                  <span>Mon</span>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Day>
                <Day>
                  <span>Mon</span>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Day>
                <Day>
                  <span>Mon</span>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Day>
                <Day>
                  <span>Mon</span>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Day>
                <Day>
                  <span>Mon</span>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Day>
              </DaysAvailable>

            </LeftContainer>

            <RightContainer>
              
              <h3>Change Password</h3>

              <div className="form-group">
                <label htmlFor="name">Current Password</label> 
                <input className="form-control" placeholder="Don’t choose 1234" id="name" {...register("name")} />
              </div>
              <div className="form-group">
                <label htmlFor="name">New Password</label> 
                <input className="form-control" placeholder="We know you chose 1234" id="name" {...register("name")} />
              </div>
              <div className="form-group">
                <label htmlFor="name">Confirm Password</label> 
                <input className="form-control" placeholder="Remember what you chose?" id="name" {...register("name")} />
              </div>
              <span className="helper">Password strength: Strong</span>
            </RightContainer>

          </form>
        </Form>
        
      </ProfileContainer>
    </>
  )
}

export default YourProfile

const MemberAvatar = styled.div`
  display: flex;
  align-items: center;
`

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  > span {
    font-size: 12px;
  }
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  width: 66.6%;
`

const Form = styled.div`
  display: flex;
  margin-top: 30px;

  > form {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`

const LeftContainer = styled.div`
  width: 48.5%;
`

const RightContainer = styled.div`
  width: 48.5%;
`

const DaysAvailable = styled.div`
  display: flex;
  justify-content: space-between;
`

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
`
