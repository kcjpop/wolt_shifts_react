import React, { Component } from "react";
import moment from "moment";

import { connect } from "react-redux"
import {bookShiftsAsync} from "../../actions/bookShifts"

import ReactSVG from 'react-svg'


class AvailShiftsItem extends Component {

  state = {
    disabled: false,
  };



  _btnColor = () => (this.props.bookStatus ? "btn btn-cancel" : "btn btn-book");

  // _btnDisabled = () => {
  //   if (this.state.bookStatus) {
  //     this.setState({
  //       disabled: true
  //     });
  //     return "btn-disabled";
  //   }
  // };

  _disabledReason = () => {
    if (this.props.bookStatus) {
      return "booked";
    }
  };



  _handleBookShift = () => {
    let {shift, date} = this.props
    date = date + ', 2018'
    const { dispatch } = this.props
    dispatch(bookShiftsAsync(shift, date))
    console.log(123, shift)

  }

  handleButtonValue = () => {
    const { bookLoading, bookStatus} = this.props
    if (bookLoading) {
      return <ReactSVG src="../../images/spinner_green.svg" />

    }
    else {
      return bookStatus ? "cancel" : "book"
    }
  }




  render() {

    const {shift, startTime, endTime, bookStatus, bookLoading } = this.props
    const {disabled} = this.state



    return (
      <div className="shifts__content">
        <div className="avail-shifts__content-left">
          <span className="shifts__time">
            {startTime}-{endTime}
            {bookStatus}
          </span>
        </div>
        <div className="avail-shifts__content-right">
          <span className="shifts__status shifts__status-booked">
            {this._disabledReason()}
          </span>

          <button
            className={`${this._btnColor()}`}
            onClick={this._handleBookShift}
            disabled={disabled}
          >
            {this.handleButtonValue()}
          </button>
        </div>
      </div>
    );
  }
}





// Connect to use dispatch
export default connect()(AvailShiftsItem);
