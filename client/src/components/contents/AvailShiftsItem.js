import React, { Component } from "react";
import moment from "moment";

class AvailShiftsItem extends Component {
  state = {
    shift: this.props.shift,
    startTime: this.props.startTime,
    endTime: this.props.endTime,
    bookStatus: this.props.bookStatus,
    disabled: false
  };

  _btnColor = () => (this.state.bookStatus ? "btn btn-cancel" : "btn btn-book");

  // _btnDisabled = () => {
  //   if (this.state.bookStatus) {
  //     this.setState({
  //       disabled: true
  //     });
  //     return "btn-disabled";
  //   }
  // };

  _disabledReason = () => {
    if (this.state.bookStatus) {
      return "booked";
    }
  };

  _bookShift = async e => {
    const resp = await fetch(`/shifts/${this.state.shift.id}/book`, {
      method: "POST"
    });
    console.log("Book resp:", resp);

    if (resp.status === 200) {
      this.setState({
        bookStatus: true
      });
    }
  };

  render() {
    const { shift, bookStatus, startTime, endTime, disabled } = this.state;
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
          {/* An here is the btn !!!! */}
          <button
            className={`${this._btnColor()}`}
            onClick={this._bookShift}
            disabled={disabled}
          >
            {/* An here is the btn !!!! */}
            {bookStatus ? "cancel" : "book"}
          </button>
        </div>
      </div>
    );
  }
}

export default AvailShiftsItem;
