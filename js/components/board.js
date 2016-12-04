import React from 'react';
import {connect}  from 'react-redux';
import * as actions from '../actions/index';
import GuessList from './guess-list';

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

    handleSubmit(event) {        
        event.preventDefault();
        this.guessNumber(event.target.guessInput.value)
    }

    render() {
        console.log('Board:', this.props)
        return (
            <div className="board">
                <div className="board-heading">
                    Make your Guess!
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="number" name="guessInput" placeholder="Enter your Guess" />
                    <button type="submit">Guess</button>
                </form>
                <GuessList guesses={this.props.guessArr}/>
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
        state: state
    }
}


export default connect(mapStateToProps, null)(Board);