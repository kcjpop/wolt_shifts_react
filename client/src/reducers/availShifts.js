import {initialState} from "./initialState";
import * as types from "../actions/actionTypes";



const availShiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AVAIL_SHIFTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
      };

    case types.GET_AVAIL_SHIFTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the shifts with the ones from the server
      return {
        ...state,
        loading: false,
        shiftsByCityObj: action.shiftsByCityObj
      };

    case types.GET_AVAIL_SHIFTS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.error,
      };


      case types.BOOK_SHIFTS_BEGIN:
      console.log('!!! STATE in BOOK SHIFT !!!', state)
      console.log(2222,action)

      state.shiftsByCityObj[action.shift.area][action.date] = state.shiftsByCityObj[action.shift.area][action.date].map(shiftObj => {
          if (shiftObj.id === action.shift.id) {
            // return { ...shiftObj, ...action.bookedShift }
            console.log(1111, shiftObj, {...shiftObj, bookLading:true})
            return { ...shiftObj, bookLoading:true }
          }
            return shiftObj
        })
      return {
        ...state, state
      }


      case types.BOOK_SHIFTS_SUCCESS:
      console.log("^^^^^ state:", state.shiftsByCityObj[action.shift.area][action.date])
      console.log(action)

      state.shiftsByCityObj[action.shift.area][action.date] = state.shiftsByCityObj[action.shift.area][action.date].map(shiftObj => {
          if (shiftObj.id === action.shift.id) {
            // return { ...shiftObj, ...action.bookedShift }
            return { ...shiftObj, ...action.bookedShift, bookLoading: false }
          }
            return shiftObj
        })
      return {
        ...state, state
      }



      case types.BOOK_SHIFTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default availShiftsReducer;
