import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableTitle from './Dashboard.title';
import DashboardTextContent from './Dashboard.content';

class Table extends Component {

  render() {
    return (
      <div className="table">
        <TableTitle title={this.props.title} />
        <DashboardTextContent content = {this.props.content} />
      </div>
      
    );
  }
}


export default connect()(Table);

