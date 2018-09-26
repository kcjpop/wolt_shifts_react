import React from 'react'
import { NavLink } from 'react-router-dom'

const _isAvailShift = (match, location) => {
  console.log('match, location:', match, location)
  if (location.pathname.includes('availshift')) {
    return true
  }
}

const Nav = () => {
    return(
        <header className="universal-header">
            <nav className="nav">
                <NavLink
                    to="/myshift"
                    className="nav__tab"
                    activeClassName="nav__tab--selected"
                >My Shifts</NavLink>

                <NavLink
                    to="/availshift/Helsinki"
                    className="nav__tab"
                    isActive={_isAvailShift}
                    activeClassName="nav__tab--selected"
                >Available Shifts</NavLink>
            </nav>
        </header>
    )
}

export default Nav
