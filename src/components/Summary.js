import React, {Component} from 'react';
import ReactWordcloud from 'react-wordcloud';

import Nav from './Nav';

import '../styles/Summary.css';

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      words: [],
      colors: [],
    };
  }

  setDefaultState = () => {
    const {entries} = this.props;
    //grab colors and its ratio
    const colors = entries.reduce((acc, cur) => {
      acc.push(cur.color.name);
      return acc;
    }, []);
    const uniqueColors = Array.from(new Set(colors));
    const uniqueColorRatio = uniqueColors.map(color => {
      const count = colors.reduce((acc, cur) => {
        if (color === cur) acc += 1;
        return acc;
      }, 0);
      const ratio = (count / colors.length) * 100;
      return {
        name: color,
        ratio: `${ratio}%`,
      };
    });
    //grab words from entries and count
    const allWords = entries.reduce((acc, cur) => {
      const textNoPeriod = cur.text.substring(0, cur.text.length - 1);
      const words = textNoPeriod.split(' ');
      acc.push(...words);
      return acc;
    }, []);
    const uniqueWords = Array.from(new Set(allWords));
    const uniqueWordsValue = uniqueWords.map(word => {
      const count = allWords.reduce((acc, cur) => {
        if (word === cur) acc += 1;
        return acc;
      }, 0);
      return {
        text: word,
        value: count,
      };
    });
    this.setState({entries, colors: uniqueColorRatio, words: uniqueWordsValue});
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
    const {entries, colors, words} = this.state;
    const maxWords = 30;
    const options = {
      rotations: 0,
      fontSizes: [50, 200],
      fontFamily: 'Courier New',
    };
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
        <div className="wordcloud-container">
          <ReactWordcloud words={words} maxWords={maxWords} options={options} />
        </div>
      </div>
    );
  }
}

export default Summary;
