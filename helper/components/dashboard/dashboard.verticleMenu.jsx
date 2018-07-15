import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { handleUserContent } from './dashboard.action.jsx';


class DashboardVerticleMenu extends Component {

  handleUserContent = () => {
    this.props.handleUserContent();
  }

  render() {
    console.log(this.props.contentType);
    return (
        <div className="dashboard-vertical-menu-wrap">
            <nav className="navbar bg-light">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/user"><i className="fas fa-user"></i> User</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)"><i className="fa fa-tasks"></i> Playfields</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)"><i className="fas fa-clipboard"></i> Post</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)"><i className="fas fa-address-book"></i> Booking</a>
                </li>

              </ul>
            </nav>
        </div>
      
    );
  }
}


function mapStateToProp(state) {
  return {
    contentType: state.dashboardReducer.contentType
  };
}


function mapDispatchToProps(dispatch) {
  return {
    handleUserContent: handleUserContent(dispatch)

  };
}



export default connect(mapStateToProp, mapDispatchToProps)(DashboardVerticleMenu);

