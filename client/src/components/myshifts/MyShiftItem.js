import React from "react";
import moment from "moment";

import { connect } from "react-redux";
import { cancelShiftsAsync } from "../../actions/cancelShifts";

const _btnDisabledColor = timePassed => {
  return timePassed ? "btn-disabled" : "";
};

const MyShiftItem = ({ shift, date, dispatch }) => {
  // const { dispatch } = this.props
  const _handleBookCancel = () => {
    dispatch(cancelShiftsAsync(shift, date));
  };

  const _handleButtonValue = () => {
    const { btnLoading } = shift;
    if (btnLoading) {
      return <img src={`../../images/spinner_red.svg`} alt="loader" />;
    } else {
      return "Cancel";
    }
  };

  const { startTime, endTime, area, timePassed } = shift;
  const str_startTime = moment(startTime).format("HH:mm");
  const str_endTime = moment(endTime).format("HH:mm");
  return (
    <div className="shifts__content">
      <div className="shifts__content-left">
        <span className="shifts__time">
          {str_startTime}-{str_endTime}
        </span>
        <span className="shifts__place">{area}</span>
      </div>
      <div className="shifts__content-right">
        <button
          className={`btn btn-cancel ${_btnDisabledColor(timePassed)}`}
          disabled={timePassed}
          onClick={_handleBookCancel}>
          {_handleButtonValue()}
        </button>
      </div>
    </div>
  );
};

export default connect()(MyShiftItem);
