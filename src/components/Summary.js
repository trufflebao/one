import React, {Component} from 'react';
import Nav from './Nav';

import '../styles/Summary.css';

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      colors: [],
    };
  }

  setDefaultState = () => {
    const {entries} = this.props;
    const colors = entries.reduce((acc, cur) => {
      acc.push(cur.color.name);
      return acc;
    }, []);
    const uniqueColors = Array.from(new Set(colors));
    const uniqueColorRatio = uniqueColors.map(color => {
      const count = colors.reduce((acc, cur) => {
        if (color === cur) {
          acc += 1;
        }
        return acc;
      }, 0);
      const ratio = (count / colors.length) * 100;
      return {
        name: color,
        ratio: `${ratio}%`,
      };
    });
    this.setState({entries, colors: uniqueColorRatio});
  };

  componentDidMount() {
    this.setDefaultState();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(JSON.stringify(prevProps)) !==
      JSON.stringify(JSON.stringify(this.props))
    ) {
      this.setDefaultState();
    }
  }

  render() {
    const {entries, colors} = this.state;
    console.log(colors);
    if (!colors.length || !entries.length) return <div />;
    return (
      <div
        style={{
          backgroundImage: `
          linear-gradient(to bottom right, red ${colors[0].ratio}, transparent),
          linear-gradient(to bottom left, purple ${
            colors[4].ratio
          }, transparent),
          linear-gradient(to top right, blue ${colors[3].ratio}, transparent),
          linear-gradient(to top left, yellow ${colors[1].ratio}, transparent),
          linear-gradient(to left, green ${colors[2].ratio},transparent),
          linear-gradient(to right, orange ${colors[2].ratio},transparent)
          `,
          backgroundBlendMode: 'screen',
        }}
        className="summary-container"
      >
        <Nav />
        hi
      </div>
    );
  }
}

export default Summary;
