import React, {Component} from 'react';

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
    };
  }

  componentDidMount() {
    const {entries} = this.props;
    this.setState(entries);
  }

  render() {
    console.log(entries);
    return <div>hi</div>;
  }
}

export default Summary;
