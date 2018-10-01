import * as types from './actionTypes'

export const bookShiftsAsync = (shift, date) => {
  return dispatch => {
    dispatch(bookShiftsBegin())
    return fetch(`/shifts/${shift.id}/book`, {
      method: "POST"})
      // .then(handleErrors)
      .then(res => res.json())
      .then(handleErrors)
      .then(json => {
        console.log('*******Book shift output:', json)
        return json
      })
      .then(json=> dispatch(bookShiftsSuccess(shift, date, json))
      )
      .catch(error =>
        { console.log('!!! ERROR:', error)
          dispatch(bookShiftsFailure(error))})
  }

}

export const bookShiftsBegin = () => ({
  type: types.BOOK_SHIFTS_BEGIN
})

export const bookShiftsSuccess = (shift, date, bookedShift) => ({
  type: types.BOOK_SHIFTS_SUCCESS,
  shift,
  date,
  bookedShift
})

export const bookShiftsFailure = error => ({
  type: types.BOOK_SHIFTS_FAILURE,
  error
})


// Handle HTTP errors since fetch won't.
const handleErrors = response => {
  if (!response.booked) {
    console.log('RESPONSE:', response)
    throw Error(response.message);
  }
  return response;
};
