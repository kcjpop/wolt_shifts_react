import React, { Component } from "react"
import AvailShiftsNav from "./AvailShiftsNav"
import AvailShiftsRow from "./AvailShiftsRow"
import { connect } from "react-redux"

class AvailShifts extends Component {
  _renderAvailNavs = () => {
    const { shiftsByCityObj } = this.props
    const navList = []
    for (let cityKey in shiftsByCityObj) {
      let availShiftAmount = 0
      for (let dateKey in shiftsByCityObj[cityKey]) {
        shiftsByCityObj[cityKey][dateKey].map(shift => {
          if (!shift.booked && !shift.overlapped && !shift.timePassed) {
            availShiftAmount += 1
          }
        })
      }
      navList.push(
        <AvailShiftsNav
          {...this.props.match}
          key={cityKey}
          cityName={cityKey}
          availShiftAmount={availShiftAmount}
        />
      )
    }
    return navList
  }

  _renderAvailShiftsRows = () => {
    const { shiftsByCityObj } = this.props
    const { pathname } = this.props.location
    const cityName = pathname.replace("/availshift/", "")

    const shiftRows = []
    console.log("cityName:", cityName)
    for (let dateKey in shiftsByCityObj[cityName]) {
      shiftRows.push(
        <AvailShiftsRow
          key={dateKey}
          eachDateObjList={shiftsByCityObj[cityName][dateKey]}
          date={dateKey}
        />
      )
    }
    return shiftRows
  }

  render() {
    const { error, loading } = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <section className="shifts">
          <nav className="shifts__nav">{this._renderAvailNavs()}</nav>
          <div className="shifts__rows">{this._renderAvailShiftsRows()}</div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = store => ({ ...store })

export default connect(mapStateToProps)(AvailShifts)
