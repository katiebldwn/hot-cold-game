import React from 'react';
import { connect }  from 'react-redux';
import * as actions from '../actions/index';
import GuessList from './guess-list';
import GuessCount from './guess-count';
import Feedback from './feedback';
import FewestCount from './fewest-count';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(props);
    }



    handleSubmit(event) {
      event.preventDefault();
      const guess = event.target.guessInput.value;
      console.log(this.props)
      let distance = this.props.state.distance;
      event.target.guessInput.value = "";
      const diff = guess - this.props.state.number;
      const absDiff = Math.abs(diff);
      this.props.updateDistFeedback("");
      if (this.props.guessArr.includes(guess)) {
        this.props.updateDirFeedback("");
        this.props.updateDistFeedback("That's a Repeated Guess!");
        return;
      }
      else if (this.props.state.distance !== null) {
        if (absDiff < this.props.state.distance) {
            let directionFeedback = "and Getting Warmer!";
            this.props.updateDirFeedback(directionFeedback);
        } else if (absDiff === this.props.state.distance) {
            let directionFeedback = "and Getting Ever Closer!";
            this.props.updateDirFeedback(directionFeedback);
        } else {
            let directionFeedback = "and Getting Colder!";
            this.props.updateDirFeedback(directionFeedback);
        }
      }
      if(diff === 0) {
        let numGuesses = this.props.state.guesses.length;
        let distanceFeedback = "You Guessed It!";
        let directionFeedback = "";
        this.props.updateDirFeedback(directionFeedback);
        this.props.updateDistFeedback(distanceFeedback);
        if(numGuesses < this.props.fewest) {
          this.props.postFewest(numGuesses + 1);
        }

      } else {
          if (absDiff <= 5) {
            let distanceFeedback = "Hot Hot Hot"
            this.props.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 15) {
            let distanceFeedback = "Warm"
            this.props.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 30) {
            let distanceFeedback = "Chilly"
            this.props.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 50) {
            let distanceFeedback = "Brrr, Freezing Cold"
            this.props.updateDistFeedback(distanceFeedback);
          }
          this.props.guessNumber(guess);
          this.props.updateDistance(absDiff);
        }


    }

    render() {
        return (
            <div className="board">
                <Feedback  distanceFeedback={this.props.distanceFeedback} directionFeedback={this.props.directionFeedback} />
                <form onSubmit={this.handleSubmit}>
                    <input type="number" name="guessInput" placeholder="Enter your Guess!" />
                    <button type="submit">Final Answer?</button>
                </form>
                <button onClick={() => this.props.getFewest()}>Fewest Guesses</button>
                <GuessCount guesses={this.props.guessArr} />
                <FewestCount fewest={this.props.fewest} />
                <GuessList guesses={this.props.guessArr} />
            </div>
        )
    }
}
// <button onClick={() => this.props.getFewest()}>Get Fewest</button>
const mapDispatchToProps = (dispatch) => {
  return {
    getFewest: () => {
      return dispatch(actions.getFewest())
    },
    postFewest: (number) => {
      return dispatch(actions.postFewest(number))
    },
    guessNumber(number) {
      return dispatch(actions.guessNumber(number))
    },
    compareNumbers(number) {
      return dispatch(actions.compareNumbers(number))
    },
    updateDirFeedback(directionFeedback) {
      return dispatch(actions.updateDirFeedback(directionFeedback))
    },
    updateDistFeedback(distanceFeedback) {
      return dispatch(actions.updateDistFeedback(distanceFeedback))
    },
    updateDistance(distance) {
      return dispatch(actions.updateDistance(distance))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    guessArr: state.guesses,
    state: state,
    distanceFeedback: state.distanceFeedback,
    directionFeedback: state.directionFeedback,
    fewest: state.fewest
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);
