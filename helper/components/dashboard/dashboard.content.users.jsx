import React, { Component } from 'react';
import { connect } from 'react-redux';



class DashboardContentUsers extends Component {

  render() {
    return (
        <div className="dashboard-content-dashboard-wrap">
            <h1 className="dashboardContent-title">Users</h1>
            <hr  />
            
        </div>
      
    );
  }
}


export default connect()(DashboardContentUsers);

