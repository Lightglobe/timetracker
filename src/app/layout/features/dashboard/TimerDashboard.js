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

    handleTrashClick = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(t => t.id !== timerId),
        })
    }
    handleEditFormSubmit = (attrs) => {
        this.setState({
            timers: this.state.timers.map((timer) => {
                if(timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        project: attrs.project
                    });
                }
                else
                {
                    return timer;
                }
            }),
        });
    }

    handleCreateFormSubmit = (timer) => {
        const t = this.createTimer(timer);
        this.setState({timers: this.state.timers.concat(t)});
    }

    createTimer = (timer) => {
        const t = {
            title: timer.title || 'Timer',
            project: timer.project || 'Project',
            id: uuidv4(),
            elapsed: 0,
        }
        return t;
    }
    
    handleStartClick = (timerId) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                if(timer.id === timerId){
                    return Object.assign({}, timer, {
                        runningSince: now,
                    });
                }else{
                    return timer;
                }
            }),
        });
    }

    handleStopClick = (timerId) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                if(timer.id === timerId){
                    const lastElapsed = now - timer.runningSince;
                    return Object.assign({},timer,{
                        elapsed: timer.elapsed + lastElapsed,
                        runningSince: null,
                    });
                }else{
                    return timer;
                }
            })
        })
    }



    render() {

        return (
            <React.Fragment>
                <Header/>
                <div className='ui three column centered grid'>
                    <div className='column'>
                        <EditableTimerList 
                            onTrashClick={this.handleTrashClick}
                            onFormSubmit={this.handleEditFormSubmit}
                            timers={this.state.timers}
                            onStartClick={this.handleStartClick}
                            onStopClick={this.handleStopClick}
                        />
                        <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
                    </div>
                </div>
            </React.Fragment>

        )
    }
}
