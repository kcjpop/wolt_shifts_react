import React from 'react'
import { NavLink } from 'react-router-dom'

const _handleURL = (cityName) => {
  return `/availshift/${cityName}`
}


const AvailShiftsNav = ({cityName}) => {
    return(
          <NavLink
              to={_handleURL(cityName)}
              className="shifts__tab"
              activeClassName="shifts__tab--selected">
              <span className="shifts__location">{cityName}</span>
              <span className="shifts__numbers"> (5)</span>
          </NavLink>
        //     {/* <NavLink
        //         to="."
        //         className="shifts__tab"
        //         activeClassName="shifts__tab--selected">
        //         <span className="shifts__location">Helsinki</span>
        //         <span className="shifts__numbers">(5)</span>
        //     </NavLink>
        //     <NavLink
        //         to="."
        //         className="shifts__tab"
        //         activeClassName="shifts__tab--selected">
        //         <span className="shifts__location">Tampere</span>
        //         <span className="shifts__numbers">(3)</span>
        //     </NavLink>
        //     <NavLink
        //         to="."
        //         className="shifts__tab"
        //         activeClassName="shifts__tab--selected">
        //         <span className="shifts__location">Turku</span>
        //         <span className="shifts__numbers">(8)</span>
        //     </NavLink> */}
        // // </nav>
    )
}

export default AvailShiftsNav
