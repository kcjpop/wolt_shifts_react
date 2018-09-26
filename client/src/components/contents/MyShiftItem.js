import React from 'react'


const MyShiftItem = () => {
    return(
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
    )
}

export default MyShiftItem