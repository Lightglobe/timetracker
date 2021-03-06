import React, { Component } from 'react'
import TimerActionButton from './TimerActionButton';

export default class Timer extends Component {

    componentDidMount(){
        this.forceUpdateInterval = setInterval(() => this.forceUpdate(),50);
    }

    componentWillUnmount(){
        clearInterval(this.forceUpdateInterval);
    }


    pad(numberString, size) {
        let padded = numberString;
        while (padded.length < size) padded = `0${padded}`;
        return padded;
    }
    
    millisecondsToHuman(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);
    
        const humanized = [
          this.pad(hours.toString(), 2),
          this.pad(minutes.toString(), 2),
          this.pad(seconds.toString(), 2),
        ].join(':');
    
        return humanized;
      }

    renderElapsedString(elapsed, runningSince) {
        let totalElapsed = elapsed;
        if (runningSince) {
          totalElapsed += Date.now() - runningSince;
        }
        return this.millisecondsToHuman(totalElapsed);
    }

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    }

    handleStartClick = () => {
        this.props.onStartClick(this.props.id);
    }
    handleStopClick = () => {
        this.props.onStopClick(this.props.id);
    }
    render() {
        const elapsedString = this.renderElapsedString(this.props.elapsed,this.props.runningSince);
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='header'>
                        {this.props.title}
                    </div>
                    <div className='meta'>
                        {this.props.project}
                    </div>
                    <div className='center aligned description'>
                        <h2>
                            {elapsedString}
                        </h2>
                    </div>
                    <div className='extra content'>
                        <span className='right floated edit icon' onClick={this.props.onEditFormOpen}>
                            <i className='edit icon' />
                        </span>
                        <span className='right floated trash icon' onClick={this.handleTrashClick}>
                            <i className='trash icon'/>
                        </span>
                    </div>
                </div>
                <TimerActionButton
                    timerIsRunning={!!this.props.runningSince}
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}
                />
            </div>
        )
    }
}
