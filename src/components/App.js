import React, {Component} from 'react';
import JournalEntry from './JournalEntry';
import Nav from './Nav';
import {Route} from 'react-router-dom';
import axios from 'axios';

import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      colors: [],
      currentColor: '',
      currentColorId: 0,
    };
  }

  handleChangeColor = (evt, id) => {
    const {target} = evt;
    this.setState({currentColor: target.innerHTML, currentColorId: id});
  };

  handleSubmit = async input => {
    const {currentColorId, entries} = this.state;
    const entryInput = {...input, colorId: currentColorId};
    const newEntry = await axios.post('/api/journalentries', entryInput);
    this.setState({entries: [...entries, newEntry.data]});
  };

  async componentDidMount() {
    try {
      const resolvedColors = await axios.get('/api/colors');
      const colors = resolvedColors.data;
      this.setState({colors});
    } catch (err) {
      console.log(`app componentdidmount error: ${err}`);
    }
  }

  render() {
    console.log(this.state.entries);
    const {colors, currentColor} = this.state;
    return (
      <div
        className={`d-flex flex-column app-container ${
          currentColor !== '' ? `${currentColor}-background` : ''
        }`}
      >
        <Nav />
        <Route
          exact
          path="/"
          render={props => (
            <JournalEntry
              props={props}
              colors={colors}
              handleChangeColor={this.handleChangeColor}
              currentColor={currentColor}
              handleSubmit={this.handleSubmit}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
