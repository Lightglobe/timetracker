import React, { Component } from 'react'

export default class TimerForm extends Component {
    state = {
        title: this.props.title || '',
        project: this.props.project || '',
    };
    
    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    }

    handleProjectChange = (e) => {
        this.setState({project: e.target.value})
    }

    render() {
        const submitText = this.props.title? 'Update' : 'Create';
        return (
            <div class="ui centered card">
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>
                                Title
                            </label>
                            <input type='text' value={this.state.title} onChange={this.handleTitleChange}/>
                        </div>
                        <div className='field'>
                            <label>
                                Project
                            </label>
                            <input type='text' value={this.state.project} onChange={this.handleProjectChange}/>
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button className='ui basic blue button'>
                                {submitText}
                            </button>
                            <button className='ui basic red button'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
