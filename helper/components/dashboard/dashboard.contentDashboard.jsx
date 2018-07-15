import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardContentTabTable from './dashboard.contentDashboard.tabTable.jsx';
import DashboardChartTime from './dashboard.chart.time.jsx';
import DashboardChartTop from './dashboard.chart.top.jsx';
import DashboardTableUnapproved from './dashboard.table.unapproved.jsx';


class DashboardContentDashboard extends Component {

  render() {
    return (
        <div className="dashboard-content-dashboard-wrap">
            <h1 className="dashboardContent-title">{this.props.contentType}</h1>
            <hr  />
            <div className="row">
                <DashboardContentTabTable typeTable="User" />
                <DashboardContentTabTable typeTable="Playfield" />
                <DashboardContentTabTable typeTable="Post" />
                <DashboardContentTabTable typeTable="Booking" />
            </div>
            <hr/>
            <div className="row">
                <div className="col-md-9">
                    <DashboardChartTime />
                    <hr/>
                    <DashboardChartTop />              
                </div>

                <div className="col-md-3">
                    <DashboardTableUnapproved />
                </div>
            </div>
        </div>
      
    );
  }
}


export default connect()(DashboardContentDashboard);

