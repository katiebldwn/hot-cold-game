import React from 'react';
import {connect}  from 'react-redux';
import * as actions from '../actions/index';
import GuessList from './guess-list';
import GuessNumber from './guess-number';
import Feedback from './feedback';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.guessNumber = this.guessNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        const guess = event.target.guessInput.value;
        this.guessNumber(guess);
        this.compareNumbers(guess);
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
                <GuessNumber guesses={this.props.guessArr} />
                <GuessList guesses={this.props.guessArr} />
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     guessNumber: () => {
//       return dispatch(guessNumber())
//     }
//   }
// }

const mapStateToProps = (state) => {
    return {
        guessArr: state.guesses,
        state: state,
        distanceFeedback: state.distanceFeedback,
        directionFeedback: state.directionFeedback
    }
}


export default connect(mapStateToProps, null)(Board);
