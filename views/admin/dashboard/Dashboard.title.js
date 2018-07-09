import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';


class TableTitle extends Component {
  render() {
    return (

      <div className="background-header">
        <div className="dashboard-logo">
          <span>{this.props.title}</span>
        </div>

        <div className="dashboard-action">
          <Glyphicon glyph="glyphicon glyphicon-fullscreen" />
        </div>
      </div>


    );
  }
}

export default connect()(TableTitle);
