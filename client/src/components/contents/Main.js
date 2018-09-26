import React, { Component } from 'react';

class Main extends Component {
  state = {
    booked: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ booked: res.express }))
      .catch(err => console.log(err));
  }

  // Tell webpack to proxy our API requests to our API server,
  callApi = async () => {
    const response = await fetch('/shifts');
    const shifts = await response.json();
    const booked = await shifts.filter(shift => shift.booked)
    console.log(booked)

    if (response.status !== 200) throw Error(shifts.message);

    return booked;
  }

  render() {
    return (
      <div>
        {/* <header class="universal-header">
            <nav class="nav">
                <a class="nav__tab nav__tab--selected" href="./index.html">My Shifts</a>
                <a class="nav__tab" href="./availableShifts.html">Available Shifts</a>
            </nav>
        </header> */}

        <section class="shifts">
            <div class="shifts__rows">
                <div class="shifts_row">
                    <header class="shifts__header">
                        <span class="shifts__text shifts__text--size-big">Today</span>
                        <span class="shifts__text shifts__text--size-small">2 shifts,</span>
                        <span class="shifts__text shifts__text--size-small">4 h</span>
                    </header>
                    <div class="shifts__content">
                        <div class="shifts__content-left">
                            <span class="shifts__time">12:00-14:00</span>
                            <span class="shifts__place">Helsinki</span>
                        </div>
                        <div class="shifts__content-right">
                            <button class="btn btn-cancel btn-disabled">Cancel</button>
                        </div>
                    </div>
                    <div class="shifts__content">
                        <div class="shifts__content-left">
                            <span class="shifts__time">14:00-16:00</span>
                            <span class="shifts__place">Helsinki</span>
                        </div>
                        <div class="shifts__content-right">
                            <button class="btn btn-cancel">Cancel</button>
                        </div>
                    </div>
                </div>

                <div class="shifts_row">
                    <header class="shifts__header">
                        <span class="shifts__text shifts__text--size-big">Tomorrow</span>
                        <span class="shifts__text shifts__text--size-small">1 shift,</span>
                        <span class="shifts__text shifts__text--size-small">4 h</span>
                    </header>
                    <div class="shifts__content">
                        <div class="shifts__content-left">
                            <span class="shifts__time">12:00-16:00</span>
                            <span class="shifts__place">Tampere</span>
                        </div>
                        <div class="shifts__content-right">
                            <button class="btn btn-cancel">Cancel</button>
                        </div>
                    </div>
                </div>

                <div class="shifts_row">
                    <header class="shifts__header">
                        <span class="shifts__text shifts__text--size-big">September 22</span>
                        <span class="shifts__text shifts__text--size-small">2 shifts,</span>
                        <span class="shifts__text shifts__text--size-small">3 h 30 m</span>
                    </header>
                    <div class="shifts__content">
                        <div class="shifts__content-left">
                            <span class="shifts__time">9:00-11:00</span>
                            <span class="shifts__place">Turku</span>
                        </div>
                        <div class="shifts__content-right">
                            <button class="btn btn-cancel">Cancel</button>
                        </div>
                    </div>
                    <div class="shifts__content">
                        <div class="shifts__content-left">
                            <span class="shifts__time">13:30-15:00</span>
                            <span class="shifts__place">Turku</span>
                        </div>
                        <div class="shifts__content-right">
                            <button class="btn btn-cancel">Cancel</button>
                        </div>
                    </div>
                </div>


            </div>
        </section>

      </div>
    );
  }
}

export default Main;
