import React from 'react';
import {connect}  from 'react-redux';
import * as actions from '../actions/index';
import Modal from './modal';
import Board from './board';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.getFewest();
      console.log(this.props)
    }

    render() {
      this.props.getFewest();
        return (
            <div className="game">
                <h1>Hot or Cold</h1>
                <h2>Numbers Guessing Game</h2>
                {this.props.modalVisible ? (<Modal />) : ""}
                <Board />
                <button onClick={this.props.newGame}>New Game!</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFewest: () => {
      return dispatch(actions.getFewest())
    },
    newGame: () => {
      return dispatch(actions.newGame())
    },
    showModal: () => {
      return dispatch(actions.showModal())
    },
  }
}
const mapStateToProps = (state) => {
    return {
        modalVisible: state.modalVisible,
        fewest: state.fewest
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
