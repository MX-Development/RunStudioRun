import React from 'react'

const MyHeader = ({
  title,
  time,
  time_worked
}) => {

  return (
    <div style={{
      padding: '5px 10px 15px'
    }}>
    <div className="table-heading">
      <div className="day">
        { title }
      </div>
      <div className="time-bar">
        <span className="bar"></span>
        <span className="time-worked">5h15m</span>
        <span className="time-total">7h330m</span>
      </div>
    </div>
    </div>
  )
}

export default MyHeader
