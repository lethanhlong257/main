import React, { Component } from 'react';
import { Grid, Row, Glyphicon, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import DashboardTitle from './dashboard.title.jsx';
import DashboardVerticalMenu from './dashboard.verticleMenu.jsx';
import DashboardContent from './dashboard.content.jsx';
import DashboardContentDashboard from './dashboard.contentDashboard.jsx';

class Dashboard extends Component {

    contentRender = () => {
        let type = this.props.handleContent;
     
        switch (type) {
            case "dashboard":
                return "dashboard";
            case "user":
                return "user"
            default:
                return "dashboard";
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <DashboardTitle />
                </Row>

                <hr className="dashboard-bar" />

                <Row>
                    <Col className="dashboard-vertical-menu" md={3}>
                        <DashboardVerticalMenu />
                    </Col>

                    <Col md={9}>
                        <DashboardContentDashboard />
                    </Col>
                </Row>


                <Row className="dashboard-footer">
                    Footer of dashboard
                </Row>
            </div>
        );
    }
}


function mapStateToProp(state) {
  return {
      handleContent: state.dashboardReducer.contentType
  };
}


function mapDispatchToProps(dispatch) {
  return {

  };
}


export default connect(mapStateToProp, mapDispatchToProps)(Dashboard);
