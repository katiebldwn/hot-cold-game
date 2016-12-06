import React from 'react';

import {connect}  from 'react-redux';
import * as actions from '../actions/index';
import Modal from './modal';
import Board from './board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.props.dispatch(
            actions.showModal()
        );
    }
    
    //This button will display Modal Component
    //<button onClick={this.showModal}>Button</button>

    render() {
        return (
            <div className="game">
                <h1>HOT and COLD</h1>
                {this.props.modalVisible ? (<Modal />) : ""}
                <Board />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalVisible: state.modalVisible
    }
}

export default connect(mapStateToProps, null)(Game);
