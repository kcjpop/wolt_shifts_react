import { initialState } from "./initialState"
import * as types from "../actions/actionTypes"

const availShiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AVAIL_SHIFTS_BEGIN:
      return {
        ...state,
        loading: true
      }

    case types.GET_AVAIL_SHIFTS_SUCCESS:
      return {
        ...state,
        loading: false,
        shiftsByCityObj: action.shiftsByCityObj
      }

    case types.GET_AVAIL_SHIFTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case types.BOOK_SHIFTS_BEGIN:
      state.shiftsByCityObj[action.shift.area][
        action.date
      ] = state.shiftsByCityObj[action.shift.area][action.date].map(
        shiftObj => {
          if (shiftObj.id === action.shift.id) {
            return { ...shiftObj, btnLoading: true }
          }
          return shiftObj
        }
      )
      return {
        ...state,
        shiftsByCityObj: { ...state.shiftsByCityObj }
      }

    case types.BOOK_SHIFTS_SUCCESS:
      state.shiftsByCityObj[action.shift.area][
        action.date
      ] = state.shiftsByCityObj[action.shift.area][action.date].map(
        shiftObj => {
          if (shiftObj.id === action.shift.id) {
            return {
              ...shiftObj,
              ...action.apiUpdatedShift,
              btnLoading: false
            }
          }
          return shiftObj
        }
      )
      return {
        ...state,
        shiftsByCityObj: { ...state.shiftsByCityObj }
      }

    case types.BOOK_SHIFTS_FAILURE:
      state.shiftsByCityObj[action.shift.area][
        action.date
      ] = state.shiftsByCityObj[action.shift.area][action.date].map(
        shiftObj => {
          if (shiftObj.id === action.shift.id) {
            return {
              ...shiftObj,
              ...action.apiUpdatedShift,
              btnLoading: false
            }
          }
          return shiftObj
        }
      )
      return {
        ...state,
        shiftsByCityObj: { ...state.shiftsByCityObj },
        error: action.error
      }

    case types.CANCEL_SHIFTS_BEGIN:
      state.shiftsByCityObj[action.shift.area][
        action.date
      ] = state.shiftsByCityObj[action.shift.area][action.date].map(
        shiftObj => {
          if (shiftObj.id === action.shift.id) {
            return { ...shiftObj, btnLoading: true }
          }
          return shiftObj
        }
      )
      return {
        ...state,
        shiftsByCityObj: { ...state.shiftsByCityObj }
      }

    case types.CANCEL_SHIFTS_SUCCESS:
      state.shiftsByCityObj[action.shift.area][
        action.date
      ] = state.shiftsByCityObj[action.shift.area][action.date].map(
        shiftObj => {
          if (shiftObj.id === action.shift.id) {
            return {
              ...shiftObj,
              ...action.apiUpdatedShift,
              btnLoading: false
            }
          }
          return shiftObj
        }
      )
      return {
        ...state,
        shiftsByCityObj: { ...state.shiftsByCityObj }
      }

    case types.CANCEL_SHIFTS_FAILURE:
      state.shiftsByCityObj[action.shift.area][
        action.date
      ] = state.shiftsByCityObj[action.shift.area][action.date].map(
        shiftObj => {
          if (shiftObj.id === action.shift.id) {
            return { ...shiftObj, btnLoading: false }
          }
          return shiftObj
        }
      )
      return {
        ...state,
        shiftsByCityObj: { ...state.shiftsByCityObj },
        error: action.error
      }

    case types.MARK_OVERLAPPED_SHIFTS:
      const cities = ["Helsinki", "Tampere", "Turku"]
      for (let city of cities) {
        if (state.shiftsByCityObj[city][action.date]) {
          state.shiftsByCityObj[city][action.date] = state.shiftsByCityObj[
            city
          ][action.date].map(shift => {
            if (
              shift.startTime < action.apiUpdatedShift.endTime &&
              shift.endTime > action.apiUpdatedShift.startTime
            ) {
              if (!shift.booked && !shift.timePassed) {
                return { ...shift, overlapped: action.apiUpdatedShift.booked }
              }
              return shift
            }
            return shift
          })
        }
      }

      return {
        ...state,
        shiftsByCityObj: { ...state.shiftsByCityObj }
      }

    default:
      return state
  }
}

export default availShiftsReducer
