import React, { Component } from 'react';
import { connect } from 'react-redux';

import {BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Legend } from 'recharts';

const data = [
    { name: 'A', booked_times: 0 },
    { name: 'B', booked_times:  5},
    { name: 'C', booked_times:  3},
    { name: 'D', booked_times:  10},
    { name: 'E', booked_times:  9},
    { name: 'F', booked_times:  20},
    { name: 'G', booked_times:  1},
    { name: 'H', booked_times:  32},
    { name: 'Y', booked_times:  22},
    { name: 'K', booked_times:  5},

  ]


class DashboardChartTime extends Component {

  render() {
    return (
        <div className="dashboard-chart-time-wrap">
            <div className="card">
                <div className="card-header">
                <i className="fas fa-chart-bar"></i> <strong>Top 10 booking</strong>
                </div>
                <div className="card-body">

                    <BarChart width={700} height={350} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="booked_times" fill="#337ab7" />
                    </BarChart>
                    
                </div>
            </div>
        </div>
      
    );
  }
}


export default connect()(DashboardChartTime);

