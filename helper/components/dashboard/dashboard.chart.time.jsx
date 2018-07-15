import React, { Component } from 'react';
import { connect } from 'react-redux';

import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const data = [
    { name: '0h', times: 0 },
    { name: '1h', times:  0},
    { name: '2h', times: 0 },
    { name: '3h', times: 0 },
    { name: '4h', times: 1 },
    { name: '5h', times: 0 },
    { name: '6h', times: 1 },
    { name: '7h', times: 2 },
    { name: '8h', times: 5 },
    { name: '9h', times: 7 },
    { name: '10h', times: 2 },
    { name: '11h', times: 2 },
    { name: '12h', times: 2 },
    { name: '13h', times: 4 },
    { name: '14h', times: 6 },
    { name: '15h', times: 8 },
    { name: '16h', times: 20},
    { name: '17h', times: 20},
    { name: '18h', times: 36},
    { name: '19h', times: 32 },
    { name: '20h', times: 23 },
    { name: '21h', times: 12 },
    { name: '22h', times: 10 },
    { name: '23h', times: 2 },

  ]


class DashboardChartTime extends Component {

  render() {
    return (
        <div className="dashboard-chart-time-wrap">
            <div className="card">
                <div className="card-header">
                <i className="fas fa-chart-line"></i> <strong>Time chart</strong>
                </div>
                <div className="card-body">
                    
                    <p>The density time that was booked a day</p>
                    

                    <AreaChart width={700} height={250} data={data}>
                    <defs>
                        
                        <linearGradient id="timesColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    
                    <Area type="monotone" dataKey="times" stroke="#82ca9d" fillOpacity={1} fill="url(#timesColor)" />
                    </AreaChart>
                    
                </div>
            </div>
        </div>
      
    );
  }
}


export default connect()(DashboardChartTime);

