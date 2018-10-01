import * as types from "./actionTypes";
import moment from "moment";
import _ from "lodash";

export const getAvailShiftsBegin = () => ({
  type: types.GET_AVAIL_SHIFTS_BEGIN
});

export const getAvailShiftsSucess = shiftsByCityObj => ({
  type: types.GET_AVAIL_SHIFTS_SUCCESS,
  shiftsByCityObj
});

export const getAvailShiftsFailure = error => ({
  type: types.GET_AVAIL_SHIFTS_FAILURE,
  error
});

export const getAvailShiftsAsync = () => {
  // console.log('ACTION')
  return dispatch => {
    dispatch(getAvailShiftsBegin());
    return fetch("/shifts")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        // console.log('json:',json)
        return sortAvailShiftsByCity(json);
      })
      .then(sortByCityObj => {
        // console.log('sortByCityObj:',sortByCityObj)
        return groupByDates(sortByCityObj);
      })
      .then(groupByDates => {
        // console.log('groupByDates:',groupByDates)
        dispatch(getAvailShiftsSucess(groupByDates));
        return groupByDates;
      })
      .catch(error => dispatch(getAvailShiftsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const sortAvailShiftsByCity = availshiftsList => {
  const orderedShiftsList = _.orderBy(availshiftsList, "startTime", "asc");

  const cities = [...new Set(orderedShiftsList.map(item => item.area))].sort();

  // let sortByCityObj = {};
  // cities.map(cityName => {
  //   sortByCityObj[cityName] = orderedShiftsList.filter(
  //     shift => shift.area === cityName
  //   );
  // });
  // console.log('*********about to go FOR MAP !!!!')

  //  Pure funcitonal functions
  const forMap = (target, shiftList) => (cityName, idx) => {
    return target[cityName] = shiftList.filter(shiftObj => shiftObj.area === cityName)
  }

  const formaP = (cities) => (target, shiftList) => {
    for (let cityName of cities) {
      target[cityName] = shiftList.filter(
          shift => shift.area === cityName
        )
    }
    return target
  }


  const sortByCityObj = formaP(cities)({},orderedShiftsList)
  // const sortByCityObj = cities.map(forMap({},orderedShiftsList))//returns array due to .map
  // console.log('!!!!!!!!!!!!!!End of formap',sortByCityObj)

  // const animals = (first) => {
  //   return second => {
  //       const result = `I love ${first} and ${second}`
  //       return result
  //     }
  // }
  // const dog = animals('dog')
  // dog('cat') // I love dog and cat
  // dog('bird') // I love dog and bird

  // cat = animals('cat')('dog')

  return sortByCityObj;
};

const groupByDates = sortByCityObj => {
  const groupByDateObj = {};
  for (let cityNameKey in sortByCityObj) {
    groupByDateObj[cityNameKey] = sortByCityObj[cityNameKey].reduce(function(
      newObj,
      shift
    ) {
      const formattedTime = moment(shift.startTime).format("LL");
      newObj[formattedTime] = newObj[formattedTime] || [];
      newObj[formattedTime].push(shift);
      return newObj;
    },
    Object.create(null));
  }
  return groupByDateObj;
};
