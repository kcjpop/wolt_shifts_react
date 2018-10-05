import React, { Component } from "react"
import { connect } from "react-redux"
import { filter as _filter } from "lodash"

import MyShiftRow from "./MyShiftRow"

class MyShifts extends Component {
  componentDidMount() {
    console.log("My Shift page compo DID Mount")
  }

  renderStartPage() {
    const fixedCities = ["Helsinki", "Tampere", "Turku"]
    let newShiftObjByDate = {}
    const { shiftsByCityObj } = this.props
    fixedCities.map(cityName => {
      for (let dateKey in shiftsByCityObj[cityName]) {
        newShiftObjByDate[dateKey] = newShiftObjByDate[dateKey] || []
        const booked = _filter(shiftsByCityObj[cityName][dateKey], "booked")
        newShiftObjByDate[dateKey].push(...booked)
      }
      return newShiftObjByDate
    })

    const myShiftRowList = []
    for (let dateKey in newShiftObjByDate) {
      if (newShiftObjByDate[dateKey].length > 0) {
        myShiftRowList.push(
          <MyShiftRow
            key={dateKey}
            date={dateKey}
            shiftList={newShiftObjByDate[dateKey]}
          />
        )
      }
    }
    return myShiftRowList
  }

  render() {
    const { loading, error } = this.props

    if (error) {
      return <div> Error ! {error.message}</div>
    }

    if (loading) {
      return <div>Loading...</div>
    }

    if (this.renderStartPage().length > 0) {
      return (
        <section className="shifts">
          <div className="shifts__rows">{this.renderStartPage()}</div>
        </section>
      )
    }

    return <div>You have no booked shifts</div>
  }
}
const mapStateToProps = store => ({ ...store })

export default connect(mapStateToProps)(MyShifts)
