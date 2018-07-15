import React, { Component } from 'react';
import { connect } from 'react-redux';


class DashboardTitle extends Component {

  render() {
    return (
        <nav className="nav-dashboard-title-wrap">
            <i className="fas fa-tachometer-alt"></i> <span className="dashboard-title">Dashboard</span>
        </nav>
      
    );
  }
}


export default connect()(DashboardTitle);

