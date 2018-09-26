import React from 'react'
import moment from 'moment'

import AvailShiftsItemHeader from './AvailShiftsItemHeader'
import AvailShiftsItem from './AvailShiftsItem'




const _renderAvailShiftsItems = (shiftsArr, _bookShift) => {
  return shiftsArr.map(shift =>{
    const startTime = moment(shift.startTime).format('HH:mm')
    const endTime = moment(shift.endTime).format('HH:mm')
    return <AvailShiftsItem
      key={shift.id}
      shift={shift}
      bookStatus = {shift.booked}
      startTime={startTime}
      endTime={endTime}
      _bookShift={_bookShift}
     />
   })
}






const AvailShiftsRow = ({eachDateObjList, date, _bookShift}) => {

  return(
      <div class="shifts_row">
          <AvailShiftsItemHeader date={date} />

          {_renderAvailShiftsItems(eachDateObjList, _bookShift)}
      </div>
    )
}

export default AvailShiftsRow
