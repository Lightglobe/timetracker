import React, { Component } from 'react'
import Timer from  './Timer';
import TimerForm from './TimerForm';

export default class EditableTimer extends Component {
    state = {
        editFormOpen: false,
    }

    handleFormClose = () => {
        this.setState({editFormOpen: false})
    };

    handleSubmit = (timer) =>{
        this.props.onFormSubmit(timer);
        this.handleFormClose();
    }

    handleEditFormOpen = () => {
        this.setState({editFormOpen:true});
    };

    render() {
        if(this.state.editFormOpen){
            return (
                <div>
                    <TimerForm
                        id={this.props.id}
                        title={this.props.title}
                        project={this.props.project}
                        handleFormSubmit={this.handleSubmit}
                        onFormClose={this.handleFormClose}
                    /> 
                </div>
            )
        } else {
            return (
                <Timer
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                    onEditFormOpen={this.handleEditFormOpen}
                />
            )
        }
    }
}
