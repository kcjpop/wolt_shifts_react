import React from 'react'
import { NavLink } from 'react-router-dom'

const _handleURL = (cityName) => {
  return `/availshift/${cityName}`
}


const AvailShiftsNav = ({cityName, availShiftAmount}) => {
    return(
          <NavLink
              to={_handleURL(cityName)}
              className="shifts__tab"
              activeClassName="shifts__tab--selected">
              <span className="shifts__location">{cityName}</span>
              <span className="shifts__numbers"> ({availShiftAmount})</span>
          </NavLink>

    )
}

export default AvailShiftsNav
