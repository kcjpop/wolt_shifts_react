import React from 'react'
import moment from 'moment'

const _btnColor = (bookStatus) => (
  bookStatus ? 'btn btn-cancel' : 'btn btn-book'
)

const _checkTime = () => {
  const currentTime = new Date().getTime()
  console.log(currentTime)
}


// const _btnStatus = (bookStatus) => {
//   return !bookStatus && 'btn-disabled'
// }

// const _bookShift = () => {
//
// }

const AvailShiftsItem = ({shift, startTime, endTime, bookStatus, _bookShift}) => {
  return (
      <div className="shifts__content">
          <div className="avail-shifts__content-left">
              <span className="shifts__time">{startTime}-{endTime}</span>
          </div>
          <div className="avail-shifts__content-right">
              <span className="shifts__status shifts__status-booked">{ bookStatus ? 'booked' : '?' }</span>
              <button
                className={_btnColor(bookStatus)}
                onClick={_bookShift.bind(this, shift.id)}
                >
                { bookStatus ? 'cancel' : 'book' }
              </button>
          </div>
      </div>
  )
}

export default AvailShiftsItem
