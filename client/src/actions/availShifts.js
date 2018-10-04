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
  console.log("GET SHIFT ACTION");
  return dispatch => {
    dispatch(getAvailShiftsBegin());
    return fetch("/shifts")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        return sortAvailShiftsByCity(json);
      })
      .then(sortByCityObj => {
        return groupByDates(sortByCityObj);
      })
      .then(groupByDates => {
        dispatch(getAvailShiftsSucess(groupByDates));
      })
      .catch(error => dispatch(getAvailShiftsFailure(error)));
  };
};

// Handle HTTP errors since fetch won't.
const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const sortAvailShiftsByCity = availshiftsList => {
  const now = new Date().getTime();
  const booked = _.filter(availshiftsList, "booked");

  const extraMetaAddedShiftList = availshiftsList.map(shiftObj => {
    let overlapped = false;
    booked.forEach(bookedShift => {
      if (
        bookedShift.startTime < shiftObj.endTime &&
        bookedShift.endtime > shiftObj.endTime
      ) {
        if (!shiftObj.booked) {
          overlapped = true;
        }
      }
    });
    const timeCheck = now < shiftObj.startTime ? false : true;
    return {
      ...shiftObj,
      btnLoading: false,
      timePassed: timeCheck,
      overlapped
    };
  });

  const orderedShiftsList = _.orderBy(
    extraMetaAddedShiftList,
    "startTime",
    "asc"
  );

  const cities = [...new Set(orderedShiftsList.map(item => item.area))].sort();

  const formaP = cities => (target, shiftList) => {
    for (let cityName of cities) {
      target[cityName] = shiftList.filter(shift => shift.area === cityName);
    }
    return target;
  };
  const sortByCityObj = formaP(cities)({}, orderedShiftsList);
  return sortByCityObj;
};

const groupByDates = sortByCityObj => {
  const groupByDateObj = {};
  for (let cityNameKey in sortByCityObj) {
    groupByDateObj[cityNameKey] = sortByCityObj[cityNameKey].reduce(function(
      newObj,
      shift
    ) {
      const formattedTime = moment(shift.startTime)
        .format("LL")
        .replace(", 2018", "");
      newObj[formattedTime] = newObj[formattedTime] || [];
      newObj[formattedTime].push(shift);
      return newObj;
    },
    Object.create(null));
  }
  return groupByDateObj;
};
