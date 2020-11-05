import React, { Component } from 'react'
import EditableTimerList from '../timers/EditableTimerList'
export default class TimerDashboard extends Component {
    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList/>
                </div>
            </div>
        )
    }
}
