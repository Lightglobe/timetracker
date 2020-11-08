import React, { Component } from 'react'
import EditableTimerList from '../timers/EditableTimerList'
import Header from './Header';
import {v4 as uuidv4} from 'uuid';
import ToggleableTimerForm from '../timers/ToggleableTimerForm';

export default class TimerDashboard extends Component {
    state = {
        timers: [
            {
                title: 'Practise deadlift',
                project: 'Gym chores',
                id: uuidv4(),
                elapsed: 5456099,
                runningSince: Date.now()
            },
            {
                title: 'Practise squat',
                project: 'Gym chores',
                id: uuidv4(),
                elapsed: 1273998,
                runningSince: null
            }
        ]
    };
    render() {

        return (
            <React.Fragment>
                <Header/>
                <div className='ui three column centered grid'>
                    <div className='column'>
                        <EditableTimerList timers={this.state.timers}/>
                        <ToggleableTimerForm/>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}
