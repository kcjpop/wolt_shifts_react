import * as types from "./actionTypes";

export const markOverlappedShifts = ({ shift, date, apiUpdatedShift }) => ({
  type: types.MARK_OVERLAPPED_SHIFTS,
  shift,
  date,
  apiUpdatedShift
});
