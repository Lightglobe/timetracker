import React, { Component } from 'react'
import Timer from  './Timer';
import TimerForm from './TimerForm';

export default class EditableTimer extends Component {
    state = {
        editFormOpen: false,
    }
    render() {
        if(this.state.editFormOpen){
            return (
                <div>
                    <TimerForm
                        title={this.props.title}
                        project={this.props.project}
                    /> 
                </div>
            )
        } else {
            return (
                <Timer
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                />
            )
        }
    }
}
