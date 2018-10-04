import React from "react";
import MyShiftItem from "./MyShiftItem";
import MyShiftItemRowHeader from "./MyShiftItemRowHeader";

import moment from "moment";

const renderItems = (shiftList, date) => {
  return shiftList.map((shift, idx) => (
    <MyShiftItem key={idx} shift={shift} date={date} />
  ));
};

const calcaulteTime = shiftList => {
  let sumTime = 0;
  shiftList.forEach(shift => {
    sumTime += shift.endTime - shift.startTime;
  });
  const hrs = moment.duration(sumTime).hours();
  const mins = moment.duration(sumTime).minutes();

  if (mins > 0) {
    return ` ${hrs} h ${mins} min`;
  }
  return ` ${hrs} h`;
};

const MyShiftRow = ({ date, shiftList }) => {
  return (
    <div className="shifts_row">
      <MyShiftItemRowHeader
        date={date}
        shiftAmount={shiftList.length}
        shiftTimePeriod={calcaulteTime(shiftList)}
      />
      {renderItems(shiftList, date)}
    </div>
  );
};

export default MyShiftRow;
