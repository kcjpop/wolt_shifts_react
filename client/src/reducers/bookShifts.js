import {initialState} from "./initialState";
import * as types from "../actions/actionTypes";


const bookShiftsReducer = (state = initialState, action) => {

  switch (action.type) {

    case types.BOOK_SHIFTS_BEGIN:
    console.log('!!! STATE in BOOK SHIFT !!!', state)
      return {
        ...state,
        loading: true
      }

    case types.BOOK_SHIFTS_SUCCESS:
    console.log("^^^^^ state:", state)
      return {



      }
    // return state.map(stateItem => {
    //     if (stateItem.id === shift_id.id) {
    //       return {...stateItem, ...action.newAmount}
    //     }
    //       return stateItem
    //   })

      // return {
      //   ...state,
      //   loading: false,
      //   booked: true
      // }

    case types.BOOK_SHIFTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      return state

  }
}

export default bookShiftsReducer
