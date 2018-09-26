import React, {Component} from 'react'
import moment from 'moment'
import _ from 'lodash'

import AvailShiftsNav from './AvailShiftsNav'
import Spinner from '../../images/spinner_green.svg'

import AvailShiftsRow from './AvailShiftsRow'
// import AvailShiftsItem from './AvailShiftsItem'
// import AvailShiftsItemHeader from './AvailShiftsItemHeader'





class AvailShifts extends Component {
  state = {
    cityObj : {}
  };

  async componentDidMount() {
      console.log('compo did mount')
      const res = await this._callApi()
      await this.setState({ cityObj: res })
  }



  // Tell webpack to proxy our API requests to our API server,
  _callApi = async () => {
    const response = await fetch('/shifts');
    // console.log('GET response:', response)
    const shifts = await response.json();
    // console.log('shifts:', shifts)
    if (response.status !== 200) throw Error(shifts.message);





    const orderedShifts = _.orderBy(shifts,'startTime','asc');
    const cities = await [...new Set(orderedShifts.map(item => item.area))].sort();

    let cityObj = {}
    await cities.map(city => {
      cityObj[city] = orderedShifts.filter(shift => shift.area === city)
    })
    // console.log('cityObj',cityObj)

    const groupByDateObj = await this._groupByDates(cityObj)
    // console.log('groupByDateObj',groupByDateObj)

    return groupByDateObj;
  }




  _groupByDates = cityObj => {
    const groupByDateObj = {}
    for (let key in cityObj) {
      groupByDateObj[key] = cityObj[key].reduce(function (newObj, shift) {
         const formatted = moment(shift.startTime).format('LL');
         newObj[formatted] = newObj[formatted] || [];
         newObj[formatted].push(shift);
         return newObj;
       }, Object.create(null))
    }
    return groupByDateObj
  }




  _renderAvailNavs = () => {
    const {cityObj} = this.state
    const navList = []
    for (let cityKey in cityObj) {
      navList.push(<AvailShiftsNav {...this.props.match} key={cityKey} cityName={cityKey}/>)
    }
    return navList
  }




  _renderAvailShiftsRows = () => {
    const { cityObj } = this.state
    const { pathname } = this.props.location
    const cityName = pathname.replace('/availshift/','');

    const shiftRows = []
    if (cityName !== '/availshift') {
      for (let dateKey in cityObj[cityName]) {
        // console.log(cityObj[cityName][dateKey])
        const shortDate = dateKey.replace(', 2018','')
        shiftRows.push(
          <AvailShiftsRow
            key={shortDate}
            eachDateObjList={cityObj[cityName][dateKey]}
            date={shortDate} shiftAmount={cityObj[cityName][dateKey].length}
            _bookShift={this._bookShift}
           />)
      }
    }

    // console.log(shiftRows)
    return shiftRows

  }

  _bookShift = async (_id) => {
    const resp = await fetch(`/shifts/${_id}/book`, {method: 'POST'})
    console.log('Book resp:', resp)
  }




  render() {
    // console.log('props:', this.props)
    return (
        <div>
        <section class="shifts">
          <nav className="shifts__nav">
            {this._renderAvailNavs()}
          </nav>

          {this._renderAvailShiftsRows()}

             <div class="shifts__rows">


                {/* <div class="shifts_row">
                    <header class="shifts__header">
                        <span class="shifts__text shifts__text--size-big">September 21</span>
                    </header>
                    <div class="shifts__content">
                        <div class="avail-shifts__content-left">
                            <span class="shifts__time">16:00-18:00</span>
                        </div>
                        <div class="avail-shifts__content-right">
                            <span class="shifts__status"></span>
                            <button class="btn btn-book btn-spin"><img src={Spinner}/></button>
                        </div>

                    </div>
                </div> */}
            </div>
        </section>
        </div>
    )
  }
}

export default AvailShifts
