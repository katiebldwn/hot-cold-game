import React from 'react';
import {connect} from 'react-redux';

class GuessNumber extends React.Component {
    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <div className="guess-number">
                <p className="guess-number-display">Guess #{this.props.guesses.length}</p>
            </div>
        )
    }
}

export default connect()(GuessNumber);
