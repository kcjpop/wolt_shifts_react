import React, {Component} from "react";
import moment from "moment";

import AvailShiftsItemHeader from "./AvailShiftsItemHeader";
import AvailShiftsItem from "./AvailShiftsItem";

const _renderAvailShiftsItems = eachDateObjList => {
  return eachDateObjList.map(shift => {
    const startTime = moment(shift.startTime).format("HH:mm");
    const endTime = moment(shift.endTime).format("HH:mm");
    return (<AvailShiftsItem key={shift.id} shift={shift} bookStatus={shift.booked} startTime={startTime} endTime={endTime}

/>);
  });
};


const AvailShiftsRow = (props) => {
  const {eachDateObjList, date} = props
  return (<div class="shifts_row">
    <AvailShiftsItemHeader date={date}/> {_renderAvailShiftsItems(eachDateObjList)}
  </div>);
};

export default AvailShiftsRow;
