import * as types from "./actionTypes"
import { markOverlappedShifts } from "./myShifts"

export const bookShiftsAsync = (shift, date) => {
  return dispatch => {
    dispatch(bookShiftsBegin(shift, date))
    return fetch(`/shifts/${shift.id}/book`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(handleErrors)
      .then(json => {
        return json
      })
      .then(json => dispatch(bookShiftsSuccess(shift, date, json)))
      .then(
        json => dispatch(markOverlappedShifts(json)) //return obj from bookShiftSuccess action
      )
      .catch(error => {
        console.log("!!! ERROR:", error)
        dispatch(bookShiftsFailure(shift, date, error))
      })
  }
}

export const bookShiftsBegin = (shift, date) => ({
  type: types.BOOK_SHIFTS_BEGIN,
  shift,
  date
})

export const bookShiftsSuccess = (shift, date, bookedShift) => ({
  type: types.BOOK_SHIFTS_SUCCESS,
  shift,
  date,
  apiUpdatedShift: bookedShift
})

export const bookShiftsFailure = (shift, date, error) => ({
  type: types.BOOK_SHIFTS_FAILURE,
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
