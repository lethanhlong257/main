import React, { Component } from 'react';
import { connect } from 'react-redux';


class DashboardTableUnapproved extends Component {

  render() {
    return (
        <div className="dashboard-table-unapproved-wrap">
            <div className="card">
                <div className="card-header">
                <strong># un-approved playfields</strong>
                </div>
                <div className="card-body">

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Name of playfield</th>
                            <th>Name of owner</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            
                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            
                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            
                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            
                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                          
                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            
                        </tr>
                        
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
      
    );
  }
}


export default connect()(DashboardTableUnapproved);

