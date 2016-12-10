import React from 'react';
import { connect }  from 'react-redux';
import * as actions from '../actions/index';
import GuessList from './guess-list';
import GuessCount from './guess-count';
import Feedback from './feedback';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        // this.guessNumber = this.guessNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.updateDirFeedback = this.updateDirFeedback.bind(this);
        // this.updateDistFeedback = this.updateDistFeedback.bind(this);
        // this.updateDistance = this.updateDistance.bind(this);
        // this.getFewest = this.getFewest.bind(this);
        console.log(props);
    }

    // guessNumber(number) {
    //     this.props.dispatch(
    //         actions.guessNumber(number)
    //     );
    // }
    //
    // compareNumbers(number) {
    //     this.props.dispatch(
    //         actions.compareNumbers(number)
    //     );
    // }
    //
    // updateDirFeedback(directionFeedback) {
    //     this.props.dispatch(
    //         actions.updateDirFeedback(directionFeedback)
    //     );
    // }
    //
    // updateDistFeedback(distanceFeedback) {
    //     this.props.dispatch(
    //         actions.updateDistFeedback(distanceFeedback)
    //     );
    // }
    //
    // updateDistance(distance) {
    //     this.props.dispatch(
    //         actions.updateDistance(distance)
    //     );
    // }

    // getFewest(distance) {
    //     this.props.dispatch(
    //         actions.getFewest()
    //     );
    // }

    handleSubmit(event) {
      event.preventDefault();
      const guess = event.target.guessInput.value;

      let distance = this.props.state.distance;
      event.target.guessInput.value = "";
      const diff = guess - this.props.state.number;
      const absDiff = Math.abs(diff);
      console.log("guessArr:", this.props.guessArr)
      if (this.props.guessArr.includes(guess)) {
        this.props.updateDirFeedback("");
        this.props.updateDistFeedback("You Already Guessed That");
        return;
      }
      else if (this.props.state.distance !== null) {
        if (absDiff < this.props.state.distance) {
            let directionFeedback = "and Getting Warmer!";
            this.props.updateDirFeedback(directionFeedback);
        } else if (absDiff === this.props.state.distance) {
            let directionFeedback = "and The Same Distance Away!";
            this.props.updateDirFeedback(directionFeedback);
        } else {
            let directionFeedback = "and Getting Colder!";
            this.props.updateDirFeedback(directionFeedback);
        }
      }
      if(diff === 0) {
        let distanceFeedback = "You Win!";
        let directionFeedback = "";
        this.props.updateDirFeedback(directionFeedback);
        this.props.updateDistFeedback(distanceFeedback);

      } else {
          if (absDiff <= 5) {
            let distanceFeedback = "HOT"
            this.props.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 15) {
            let distanceFeedback = "Warm"
            this.props.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 30) {
            let distanceFeedback = "Chilly"
            this.props.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 50) {
            let distanceFeedback = "COLD"
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
                    <input type="number" name="guessInput" placeholder="Enter your Guess" />
                    <button type="submit">Guess</button>
                </form>
                <button onClick={() => this.props.getFewest()}>Get Fewest</button>
                <button onClick={() => this.props.postFewest(5)}>Post Fewest</button>
                <GuessCount guesses={this.props.guessArr} />
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
    directionFeedback: state.directionFeedback
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);
