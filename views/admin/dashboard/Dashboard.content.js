import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardTextContent extends Component {
  render() {
    return (
          <div className="textContentComponent">
              <p>{this.props.content}</p>
          </div>
    );
  }
}

export default connect()(DashboardTextContent)