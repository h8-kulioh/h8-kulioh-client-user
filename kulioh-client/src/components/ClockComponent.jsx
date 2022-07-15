import React, { Fragment } from 'react'

export default function ClockComponent({ timerHours, timerMinutes, timerSeconds }) {
    return (
        <Fragment>
            <div className='timer-container'>
                <div className='timer'>
                    <div className='clock'>
                        <div>
                            <p>{timerHours}</p>
                            <p>Hours</p>
                        </div>
                        <div>
                            <span>:</span>

                        </div>
                        <div>
                            <p>{timerMinutes}</p>
                            <p>Minutes</p>
                        </div>
                        <span>:</span>
                        <div>
                            <p>{timerSeconds}</p>
                            <p>Seconds</p>
                        </div>
                    </div>

                </div>

            </div>
        </Fragment>
    )
}
ClockComponent.defaultProps = {
    timerHours: 10,
    timerMinutes: 10,
    timerSeconds: 10
}