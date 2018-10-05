import React from "react"

const MyShiftItemRowHeader = ({ date, shiftAmount, shiftTimePeriod }) => {
  return (
    <header className="shifts__header">
      <span className="shifts__text shifts__text--size-big">{date}</span>
      <span className="shifts__text shifts__text--size-small">
        {shiftAmount} shifts,
      </span>
      <span className="shifts__text shifts__text--size-small">
        {shiftTimePeriod}
      </span>
    </header>
  )
}

export default MyShiftItemRowHeader
