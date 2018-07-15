import React, { Component } from 'react';
import { connect } from 'react-redux';


class DashboardContentTabTable extends Component {

    constructor(props) {
        super(props)

    }

    color (typeTable) {
        switch (typeTable.toLowerCase()) {
            case "user":
                return {
                    panelHeaderColor: "dashboard-primary-color panel-heading",
                    panelIcon: "fas fa-user"
                };

            case "playfield":
                return {
                    panelHeaderColor: "dashboard-red-color panel-heading",
                    panelIcon: "fa fa-tasks"
                };
    
            case "booking":
                return {
                    panelHeaderColor: "dashboard-yellow-color panel-heading",
                    panelIcon: "fas fa-address-book"
                };
            
            case "post":
                return {
                    panelHeaderColor: "dashboard-green-color panel-heading",
                    panelIcon: "fas fa-clipboard"
                };
        
            default:
                return {
                    panelHeaderColor: "panel-heading",
                    panelIcon: "fas fa-napster"
                };
        }
    }

    render() {
        return (
            <div className="col-lg-3 col-md-6">
                <div className="panel panel-primary">
                    <div className={this.color(this.props.typeTable).panelHeaderColor}>
                        <div className="row">
                            <div className="col-xs-3 dashboard-icon-big">
                                <i className={this.color(this.props.typeTable).panelIcon}></i>
                            </div>
                            <div className="col-xs-9 text-right">
                                <div className="huge">26</div>
                                <div>{this.props.typeTable}</div>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                        <div className="panel-footer">
                            <span className="pull-left">View Details</span>
                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                            <div className="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}


export default connect()(DashboardContentTabTable);

