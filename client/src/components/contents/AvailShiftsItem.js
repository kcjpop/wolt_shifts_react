import React from "react";
import moment from "moment";

const _btnColor = bookStatus =>
  bookStatus ? "btn btn-cancel" : "btn btn-book";

const _checkTime = () => {
  const currentTime = new Date().getTime();
  console.log(currentTime);
};

let disabled = false;

const _btnDisabled = (bookStatus, startTime) => {
  if (bookStatus) {
    disabled = true;
    return "btn-disabled";
  }
};

const _disableReason = bookStatus => {
  if (bookStatus) {
    return "booked";
  }
};

const AvailShiftsItem = ({
  shift,
  startTime,
  endTime,
  bookStatus,
  _bookShift
}) => {
  return (
    <div className="shifts__content">
      <div className="avail-shifts__content-left">
        <span className="shifts__time">
          {startTime}-{endTime}
        </span>
      </div>
      <div className="avail-shifts__content-right">
        <span className="shifts__status shifts__status-booked">
          {_disableReason(bookStatus)}
        </span>
        {/* An here is the btn !!!! */}
        <button
          className={`${_btnColor(bookStatus)} ${_btnDisabled(
            bookStatus,
            shift.startTime
          )}`}
          onClick={_bookShift.bind(this, shift.id)}
          disabled={disabled}
        >
          {/* An here is the btn !!!! */}
          {bookStatus ? "cancel" : "book"}
        </button>
      </div>
    </div>
  );
};

export default AvailShiftsItem;
