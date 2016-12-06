import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor(props) {
    super(props)
  }



  render(props) {
    return (
      <div className="feedback">
        {this.props.distanceFeedback} {this.props.directionFeedback}
      </div>
    )
  }
}

export default connect()(Feedback);
