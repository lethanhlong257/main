import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, Table } from 'react-bootstrap';

import TableTitle from './Dashboard.title';
import { loadDataToDataTable } from './Dashboard.action';

class DashboardTableData extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div className="table">
        <TableTitle title="Table data widget" />
        <div className="dataTable">

          <Pagination>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Next />
          </Pagination>;

          <div className="table-data">
            <Table striped bordered condensed hover >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Title</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
              </tbody>
            </Table>;
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProp(state) {
  return {
    totalIndex: state.dashboardReducer.totalIndex,
    contacts: state.dashboardReducer.contacts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDataToDataTableWidget: loadDataToDataTable(dispatch),

  };
}

export default connect(mapStateToProp, mapDispatchToProps)(DashboardTableData);
