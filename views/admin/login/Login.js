import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

import { login } from './login.action';
import { loginStatus } from './login.constant';
import { loginStatusSelector } from './login.selector';
import './login.css';

export class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    this.login();
  }

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  login = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  }

  renderError() {
    const { status } = this.props;

    switch (status) {
      case loginStatus.inProgress:
        return <span>Validating account...</span>;
      case loginStatus.fail:
        return <span>Username or password is incorrect</span>;
      default:
        return null;
    }
  }

  render() {
    // Default account is admin/admin
    return (
      <Grid>
        <Row>
          <Col >
            <ControlLabel>Username:</ControlLabel>
          </Col>
          <Col md={3}>
            <FormControl
              type="text"
              placeholder="Enter username"
              onChange={this.onUsernameChange}
              value={this.state.username}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ControlLabel>Password:</ControlLabel>
          </Col>
          <Col md={3}>
            <FormControl
              type="password"
              placeholder="Enter password"
              onChange={this.onPasswordChange}
              value={this.state.password}
            />
          </Col>
        </Row>
        <Row className="login-action-row">
          <Col md={3}>
            <Button bsStyle="primary" onClick={this.login}>Login</Button>
          </Col>
        </Row>
        <Row>
          {this.renderError()}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: loginStatusSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    login: login(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
