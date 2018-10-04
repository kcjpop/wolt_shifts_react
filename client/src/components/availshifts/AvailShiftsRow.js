import React from "react";
import moment from "moment";

import AvailShiftsItemHeader from "./AvailShiftsItemHeader";
import AvailShiftsItem from "./AvailShiftsItem";

const _renderAvailShiftsItems = (eachDateObjList, date) => {
  return eachDateObjList.map(shift => {
    const startTime = moment(shift.startTime).format("HH:mm");
    const endTime = moment(shift.endTime).format("HH:mm");

    return (
      <AvailShiftsItem
        key={shift.id}
        shift={shift}
        bookStatus={shift.booked}
        startTime={startTime}
        endTime={endTime}
        date={date}
        btnLoading={shift.btnLoading}
        overlapped={shift.overlapped}
        timePassed={shift.timePassed}
      />
    );
  });
};

const AvailShiftsRow = props => {
  const { eachDateObjList, date } = props;
  return (
    <div className="shifts_row">
      <AvailShiftsItemHeader date={date} />
      {_renderAvailShiftsItems(eachDateObjList, date)}
    </div>
  );
};

export default AvailShiftsRow;
