import React from 'react'

const MyCard = ({
  title,
  client,
  prefix,
  description,
  time,
  time_worked,
  hexBlock
}) => {

  let totalTime = time
  let timeWorked = time_worked
  // let remaining = totalTime - timeWorked
  let percentage = timeWorked / totalTime * 100
  let cardHeight = (time / 4) + 'px'

  return (
    <div className="event-outer" style={{ height: cardHeight, borderColor: '#' + hexBlock }}>
      <div className="event-container">
        <div className="event-header">
          <h5>{title}</h5>
          <h6 style={{ fontWeight: '500', margin: '2.5px 0' }}>{ prefix }</h6>
          <span className="type" style={{ fontWeight: '400' }}>{ client }</span>
        </div>
        <div className="event-description">
          <p>
            Hallo
          </p>
        </div>
        <div className="event-footer">
          <div className="event-time">
            <div className="time-meta">
              <span>{(new Date(timeWorked * 1000)).toUTCString().match(/(\d:\d\d:)/)[0].replace(':', 'h').replace(':', 'm')}</span>
              <span>{(new Date(totalTime * 1000)).toUTCString().match(/(\d:\d\d:)/)[0].replace(':', 'h').replace(':', 'm')}</span>
            </div>
            <div className="card-time">
              <span className="total-bar"></span>
              <span className="worked-bar" style={{ width: percentage + '%' }}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCard
