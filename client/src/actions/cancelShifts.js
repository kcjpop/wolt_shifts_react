import * as types from "./actionTypes"
import { markOverlappedShifts } from "./myShifts"

export const cancelShiftsAsync = (shift, date) => {
  return dispatch => {
    dispatch(cancelShiftsBegin(shift, date))
    return fetch(`/shifts/${shift.id}/cancel`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(handleErrors)
      .then(json => {
        console.log("Cancel shift API output:", json)
        return json
      })
      .then(json => dispatch(cancelShiftsSuccess(shift, date, json)))
      .then(
        json => dispatch(markOverlappedShifts(json)) // obj from cancelShiftsSuccess
      )
      .catch(error => {
        console.log("!!! ERROR:", error)
        dispatch(cancelShiftsFailure(shift, date, error))
      })
  }
}

export const cancelShiftsBegin = (shift, date) => ({
  type: types.CANCEL_SHIFTS_BEGIN,
  shift,
  date
})

export const cancelShiftsSuccess = (shift, date, cancelledShift) => ({
  type: types.CANCEL_SHIFTS_SUCCESS,
  shift,
  date,
  apiUpdatedShift: cancelledShift
})

export const cancelShiftsFailure = (shift, date, error) => ({
  type: types.CANCEL_SHIFTS_FAILURE,
  shift,
  date,
  error
})

// Handle HTTP errors since fetch won't.
const handleErrors = response => {
  if (response.statusCode) {
    throw Error(response.message)
  }
  return response
}
