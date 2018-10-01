// import * as types from "../actions/actionTypes";

 const availShifts = {
  shiftsByCityObj: {},
  loading: false,
  error: null,
};

 const bookShifts = {
    booked: null,
    loading: false,
    error: null
}

export const initialState = {
  shiftsByCityObj: {},
  loading: false,
  error: null,
  bookLoading: false,
  boookError: null
}
