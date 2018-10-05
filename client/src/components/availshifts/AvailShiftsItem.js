import React, { Component } from "react"
import { connect } from "react-redux"
import { bookShiftsAsync } from "../../actions/bookShifts"
import { cancelShiftsAsync } from "../../actions/cancelShifts"
import { ReactComponent as RedSpinner } from "../../images/spinner_red.svg"
import { ReactComponent as GreenSpinner } from "../../images/spinner_green.svg"

class AvailShiftsItem extends Component {
  _btnColor = () => (this.props.bookStatus ? "btn btn-cancel" : "btn btn-book")

  _btnDisabledColor = () =>
    this.props.overlapped || this.props.timePassed ? " btn-disabled" : ""

  _handleBookOrCancelShift = () => {
    let { shift, date, bookStatus } = this.props
    const { dispatch } = this.props
    bookStatus
      ? dispatch(cancelShiftsAsync(shift, date))
      : dispatch(bookShiftsAsync(shift, date))
  }

  _handleButtonValue = () => {
    const { btnLoading, bookStatus } = this.props
    if (btnLoading) {
      return bookStatus ? <RedSpinner /> : <GreenSpinner />
    } else {
      return bookStatus ? "cancel" : "book"
    }
  }

  render() {
    const {
      startTime,
      endTime,
      bookStatus,
      overlapped,
      timePassed
    } = this.props

    return (
      <div className="shifts__content">
        <div className="avail-shifts__content-left">
          <span className="shifts__time">
            {startTime}-{endTime}
          </span>
        </div>
        <div className="avail-shifts__content-right">
          {bookStatus && (
            <span className="shifts__status shifts__status-booked">Booked</span>
          )}

          {overlapped && (
            <span className="shifts__status shifts__status-overlapping">
              Overlapping
            </span>
          )}

          <button
            className={`${this._btnColor()} ${this._btnDisabledColor()}`}
            onClick={this._handleBookOrCancelShift}
            disabled={overlapped || timePassed}>
            {this._handleButtonValue()}
          </button>
        </div>
      </div>
    )
  }
}

export default connect()(AvailShiftsItem)
