import React, {Component} from 'react';

import '../styles/JournalEntry.css';

class JournalEntry extends Component {
  constructor() {
    super();
    this.state = {
      entry: '',
      date: '',
      time: '',
    };
  }

  handleChangeInput = evt => {
    const {target} = evt;
    this.setState({entry: target.value});
  };

  getDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const hours =
      today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const minutes =
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const seconds =
      today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
    const time = hours + ':' + minutes + ':' + seconds;
    this.setState({date, time});
  };

  componentDidMount() {
    this.getDateTime();
    this.interval = setInterval(() => this.getDateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      history,
      match,
      location,
      colors,
      handleChangeColor,
      currentColor,
      handleSubmit,
    } = this.props;
    const {entry, date, time} = this.state;

    return (
      <div className="container-fluid entry-container">
        <div>Location</div>
        <div>
          <form className="d-flex flex-column justify-content-center">
            <input
              type="text"
              value={entry}
              onChange={evt => this.handleChangeInput(evt)}
            />
          </form>
        </div>
        <div>
          {colors.map(color => (
            <button
              className={`${color.name} ${
                color.name === currentColor ? 'active' : ''
              }`}
              key={color.id}
              onClick={evt => handleChangeColor(evt,color.id)}
            >
              {color.name}
            </button>
          ))}
        </div>
        <button onClick={() => handleSubmit({text:entry,date:date,time:time})}>Submit</button>
        <div className="date-container">
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </div>
    );
  }
}

export default JournalEntry;
