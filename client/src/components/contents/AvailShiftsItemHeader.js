import React from 'react'

const AvailShiftsItemHeader = ({date}) => {
  return(
    <header className="shifts__header">
        <span className="shifts__text shifts__text--size-big">{date}</span>
    </header>
  )
}

export default AvailShiftsItemHeader
