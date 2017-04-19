import React from 'react';
import {connect} from 'react-redux';

class FewestCount extends React.Component {
    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <div className="guess-number">
                <p className="guess-number-display">Fewest Guesses: {this.props.fewest}</p>
            </div>
        )
    }
}

export default connect()(FewestCount);
