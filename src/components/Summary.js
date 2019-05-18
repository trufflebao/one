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

  getColorsRatio = colors => {
    //grab colors and its ratio
    const uniqueColors = Array.from(new Set(colors));
    const uniqueColorRatio = uniqueColors.map(color => {
      const count = colors.reduce((acc, cur) => {
        if (color === cur) acc += 1;
        return acc;
      }, 0);
      const ratio = (count / colors.length) * 100;
      return {
        name: color,
        ratio: ratio,
      };
    });
    return uniqueColorRatio;
  };

  setDefaultState = () => {
    const {entries} = this.props;
    const colors = entries.reduce((acc, cur) => {
      acc.push(cur.color.name);
      return acc;
    }, []);
    const uniqueColorRatio = this.getColorsRatio(colors);
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

  onWordClick = word => {
    console.log(word.text);
    this.props.props.history.push(`/summary/${word.text}`);
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
    const {match} = this.props.props;
    const {entries, colors, words} = this.state;
    const maxWords = 30;
    const options = {
      rotations: 0,
      fontSizes: [50, 200],
      fontFamily: 'Courier New',
    };
    const callbacks = {onWordClick: this.onWordClick};

    if (!colors.length || !entries.length) return <div />;
    if (match.params.word) {
      const displaySentences = entries.filter(entry =>
        entry.text.includes(match.params.word)
      );
      const displayColors = displaySentences.reduce((acc, cur) => {
        acc.push(cur.color.name);
        return acc;
      }, []);
      const backgroundColors = this.getColorsRatio(displayColors).sort(
        (a, b) => b.ratio - a.ratio
      );
      return (
        <div
          className="summary-container"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${
              backgroundColors[0].name
            } ${backgroundColors[0].ratio}%, transparent),
        linear-gradient(to bottom left, ${backgroundColors[1].name} ${
              backgroundColors[1].ratio
            }%, transparent),
        linear-gradient(to top right, ${backgroundColors[2].name} ${
              backgroundColors[2].ratio
            }%, transparent),
        linear-gradient(to top left, ${backgroundColors[3].name} ${
              backgroundColors[3].ratio
            }%, transparent)`,
            backgroundBlendMode: 'screen',
          }}
        >
          <Nav />
          <div className="overflow-container">
            <ul>
              {displaySentences.map(displaySentence => (
                <li key={displaySentence.id}>{displaySentence.text}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      const backgroundColors = colors.sort((a, b) => b.ratio - a.ratio);
      return (
        <div
          className="summary-container"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${
              backgroundColors[0].name
            } ${backgroundColors[0].ratio}%, transparent),
      linear-gradient(to bottom left, ${backgroundColors[1].name} ${
              backgroundColors[1].ratio
            }%, transparent),
      linear-gradient(to top right, ${backgroundColors[2].name} ${
              backgroundColors[2].ratio
            }%, transparent),
      linear-gradient(to top left, ${backgroundColors[3].name} ${
              backgroundColors[3].ratio
            }%, transparent)`,
            backgroundBlendMode: 'screen',
          }}
        >
          <Nav />
          <div className="wordcloud-container">
            <ReactWordcloud
              words={words}
              maxWords={maxWords}
              options={options}
              callbacks={callbacks}
            />
          </div>
        </div>
      );
    }
  }
}

export default Summary;
