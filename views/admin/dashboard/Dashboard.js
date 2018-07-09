import React, { Component } from 'react';
import { Grid, Row, Glyphicon, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import DashboardTable from './Dashboard.table';
import DashboardTableData from './Dashboard.table.dataTable';
import { loadDataToTextTable } from './Dashboard.action';

class Dashboard extends Component {
  // componentWillMount() {
  //   fetch(URLs.URL_DASHBOARD_TEXT)
  //     .then((dashboardsData) => { return dashboardsData.json(); })
  //     .then((dashboardsDataJson) => {
  //       const widget = dashboardsDataJson[0].widgets[0];
  //       this.setState({
  //         textContent: widget.configs.text,
  //         widgetTitle: widget.title,
  //       });
  //     });
  // }

  componentDidMount() {
    this.props.getDataTextWidget();
  }

  render() {
    return (
      <Grid>
        <Row>
          
          <div className="background-header">
            <div className="dashboard-logo">
              <Glyphicon glyph="dashboard" /> Dashboard
            </div>

            <div className="dashboard-action">
              <Glyphicon glyph="user" />
              <span className="admin-name" > admin</span>
            </div>
          </div>
          <h3 className="dashboard-title">Dashboard Title</h3>
          <hr className="dashboard-bar" />
        </Row>

        <Row>
          <Col md={4}>
            <DashboardTable title={this.props.widget.title} content={this.props.widget.configs.text} />
          </Col>
          <Col md={4}>
            <DashboardTableData />
          </Col>
        </Row>

      </Grid>
    );
  }
}


function mapStateToProp(state) {
  return {
    widget: state.dashboardReducer.widget,
  };
}

// function mapStateToProps(state) {
//   return {
//     widget: dashboardSelector(state),
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    getDataTextWidget: loadDataToTextTable(dispatch),

  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Dashboard);
