import React from 'react';
import {connect}  from 'react-redux';
import * as actions from '../actions/index';
import GuessList from './guess-list';
import GuessCount from './guess-count';
import Feedback from './feedback';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.guessNumber = this.guessNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateDirFeedback = this.updateDirFeedback.bind(this);
        this.updateDistFeedback = this.updateDistFeedback.bind(this);
        this.updateDistance = this.updateDistance.bind(this);
    }

    guessNumber(number) {
        this.props.dispatch(
            actions.guessNumber(number)
        );
    }

    compareNumbers(number) {
        this.props.dispatch(
            actions.compareNumbers(number)
        );
    }

    updateDirFeedback(directionFeedback) {
        this.props.dispatch(
            actions.updateDirFeedback(directionFeedback)
        );
    }

    updateDistFeedback(distanceFeedback) {
        this.props.dispatch(
            actions.updateDistFeedback(distanceFeedback)
        );
    }

    updateDistance(distance) {
        this.props.dispatch(
            actions.updateDistance(distance)
        );
    }

    handleSubmit(event) {
      event.preventDefault();
      const guess = event.target.guessInput.value;

      let distance = this.props.state.distance;
      event.target.guessInput.value = "";
      const diff = guess - this.props.state.number;
      const absDiff = Math.abs(diff);
      console.log("guessArr:", this.props.guessArr)
      if (this.props.guessArr.includes(guess)) {
        this.updateDirFeedback("");
        this.updateDistFeedback("You Already Guessed That");
        return;
      }
      else if (this.props.state.distance !== null) {
        if (absDiff < this.props.state.distance) {
            let directionFeedback = "and Getting Warmer!";
            this.updateDirFeedback(directionFeedback);
        } else if (absDiff === this.props.state.distance) {
            let directionFeedback = "and The Same Distance Away!";
            this.updateDirFeedback(directionFeedback);
        } else {
            let directionFeedback = "and Getting Colder!";
            this.updateDirFeedback(directionFeedback);
        }
      }
      if(diff === 0) {
        let distanceFeedback = "You Win!";
        let directionFeedback = "";
        this.updateDirFeedback(directionFeedback);
        this.updateDistFeedback(distanceFeedback);
      } else {
          if (absDiff <= 5) {
            let distanceFeedback = "HOT"
            this.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 15) {
            let distanceFeedback = "Warm"
            this.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 30) {
            let distanceFeedback = "Chilly"
            this.updateDistFeedback(distanceFeedback);
          } else if (absDiff <= 50) {
            let distanceFeedback = "COLD"
            this.updateDistFeedback(distanceFeedback);
          }
          this.guessNumber(guess);
          this.updateDistance(absDiff);
        }


    }

    render() {
      console.log(this.props)
        return (

            <div className="board">
                <Feedback  distanceFeedback={this.props.distanceFeedback} directionFeedback={this.props.directionFeedback} />
                <form onSubmit={this.handleSubmit}>
                    <input type="number" name="guessInput" placeholder="Enter your Guess" />
                    <button type="submit">Guess</button>
                </form>
                <GuessCount guesses={this.props.guessArr} />
                <GuessList guesses={this.props.guessArr} />
            </div>
        )
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


export default connect(mapStateToProps, null)(Board);
