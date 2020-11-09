import React, { Component } from 'react'
import TimerForm from './TimerForm';

export default class ToggleableTimerForm extends Component {
    state = {
        isOpen: false,
    };

    handleFormOpen = () => {
        this.setState({isOpen: true});
    }

    handleFormClose = () =>{
        this.setState({isOpen:false});
    }

    handleFormSubmit = (timer) =>{
        this.props.onFormSubmit(timer);
        this.handleFormClose();
    }

    render() {
        if(this.state.isOpen){
            return (<TimerForm handleFormSubmit={this.handleFormSubmit} onFormClose={this.handleFormClose}  />);
        }else{
            return (
                <div className="ui basic content center aligned segment">
                    <button className="ui basic button icon" onClick={this.handleFormOpen}>
                        <i className="plus icon"/>
                    </button>
                </div>
            )
        }

        
    }
}
