import React, { Component } from "react";
import EditableTimerList from "../timers/EditableTimerList";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";
import ToggleableTimerForm from "../timers/ToggleableTimerForm";

export default class TimerDashboard extends Component {
  state = {
    timers: [],
  };

  componentDidMount() {
    this.loadTimersFromServer();
    //setInterval(this.loadTimersFromServer, 5000);
  }

  loadTimersFromServer = () => {
    this.getTimers((serverTimers) =>
      this.setState({
        timers: serverTimers,
      })
    );
  };

  getTimers = (success) => {
    return fetch("/api/timers", {
      headers: {
        Accept: "application/json",
      },
    })
      .then(this.checkStatus)
      .then((res) => res.json())
      .then(success);
  };

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  };

  handleTrashClick = (timerId) => {
    this.setState({
      timers: this.state.timers.filter((t) => t.id !== timerId),
    });
    this.deleteTimer({ id: timerId });
  };

  deleteTimer(data) {
    return fetch("/api/timers", {
      method: "delete",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.checkStatus);
  }

  handleEditFormSubmit = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project,
          });
        } else {
          return timer;
        }
      }),
    });
    this.updateTimer(attrs);
  };

  updateTimer(data) {
    return fetch("/api/timers", {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.checkStatus);
  }

  handleCreateFormSubmit = (timer) => {
    const t = this.createTimer(timer);
    this.setState({ timers: this.state.timers.concat(t) });
    this.createServerTimer(t);
  };

  createTimer = (timer) => {
    const t = {
      title: timer.title || "Timer",
      project: timer.project || "Project",
      id: uuidv4(),
      elapsed: 0,
    };
    return t;
  };

  createServerTimer(data) {
    return fetch("/api/timers", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.checkStatus);
  }
  handleStartClick = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      }),
    });
    this.startTimer({ id: timerId, start: now });
  };

  startTimer(data) {
    return fetch("api/timers/start", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this.checkStatus);
  }

  handleStopClick = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          });
        } else {
          return timer;
        }
      }),
    });
    this.stopTimer({ id: timerId, stop: now });
  };

  stopTimer(data) {
    return fetch("/api/timers/stop", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.checkStatus);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="ui three column centered grid">
          <div className="column">
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
    );
  }
}
