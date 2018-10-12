import React, { Component } from "react"
import AvailShiftsNav from "./AvailShiftsNav"
import AvailShiftsRow from "./AvailShiftsRow"
import { connect } from "react-redux"

import selectAvailShifts from "../../selectors/availShifts"

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
    const {cityObj} = this.props
    const shiftRows = []
    for (let dateKey in cityObj) {
      shiftRows.push(
        <AvailShiftsRow
          key={dateKey}
          eachDateObjList={cityObj[dateKey]}
          date={dateKey}
        />
      )
    }
    return shiftRows
  }

  render() {
    console.log(111, this.props)
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

// const mapStateToProps = store => ({ ...store })

const mapStateToProps = (store, ownProps) => {
  return {
    ...store,
    cityObj : store.shiftsByCityObj[ownProps.match.params.cityName],
    selectorAvailShifts: selectAvailShifts(store)
  }
}

export default connect(mapStateToProps)(AvailShifts)
