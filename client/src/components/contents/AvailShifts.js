import React, { Component } from "react";

import AvailShiftsNav from "./AvailShiftsNav";


import AvailShiftsRow from "./AvailShiftsRow";
import { connect } from "react-redux";
import { getAvailShiftsAsync } from "../../actions/availShifts";

import moment from "moment";
import _ from "lodash";

class AvailShifts extends Component {
  componentDidMount() {
    console.log("compo did mount");
    this.props.dispatch(getAvailShiftsAsync());
  }

  _renderAvailNavs = () => {
    const { shiftsByCityObj } = this.props;
    const navList = [];
    for (let cityKey in shiftsByCityObj) {
      navList.push(
        <AvailShiftsNav
          {...this.props.match}
          key={cityKey}
          cityName={cityKey}
        />
      );
    }
    return navList;
  };

  _renderAvailShiftsRows = () => {
    console.log("all props in AvailShifts Compo:", this.props);
    const { shiftsByCityObj } = this.props;
    const { pathname } = this.props.location;
    const cityName = pathname.replace("/availshift/", "");

    const shiftRows = [];
    console.log('cityName:',cityName)
    for (let dateKey in shiftsByCityObj[cityName]) {
      const shortDate = dateKey.replace(", 2018", "");
      shiftRows.push(
        <AvailShiftsRow
          key={shortDate}
          eachDateObjList={shiftsByCityObj[cityName][dateKey]}
          date={shortDate}
          // shiftAmount={shiftsByCityObj[cityName][dateKey].length}
        />
      );
    }
    return shiftRows;
  };

  render() {
    console.log(333, this.props)
    const { error, loading } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <section class="shifts">
          <nav className="shifts__nav">{this._renderAvailNavs()}</nav>
          <div class="shifts__rows">{this._renderAvailShiftsRows()}</div>
        </section>
      </div>
    );
  }
}



// const mapStateToProps = store => ({
//   availShifts: store.availShifts
// })
const mapStateToProps = store => ({ ...store.availShifts })

export default connect(mapStateToProps)(AvailShifts);
