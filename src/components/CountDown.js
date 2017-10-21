import React, { Component } from 'react';

import { Subtitle } from './typography';

class CountDown extends Component {
  state = {
    count: this.props.time ? this.props.time : 30,
  };

  componentDidMount() {
    this._startCountDown();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _startCountDown = () => {
    this.timer = setInterval(() => {
      if (this.state.count === 0) {
        clearInterval(this.timer);
        this.props.onFinish();
      } else {
        this.setState({
          count: this.state.count - 1,
        });
      }
    }, 1000);
  };

  render() {
    return (
      <Subtitle medium>
        00:{this.state.count > 9 ? this.state.count : `0${this.state.count}`}
      </Subtitle>
    );
  }
}

export default CountDown;
