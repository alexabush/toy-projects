import React, { PureComponent, Component } from 'react';
import './App.css';
import {
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import _ from 'lodash';

class App extends Component {
  state = { user: {} };

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user')) || {};
    this.setState({ user });
  }

  handleFormSubmission = (e, endpoint, submissionData) => {
    e.preventDefault();
    fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionData)
    })
      .then(res => res.json())
      .then(({ user }) => {
        console.log('got response from submission');
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({ user });
      });
  };

  handleLogout = e => {
    e.preventDefault();
    fetch('/api/logout')
      .then(res => res.json())
      .then(data => {
        console.log('logging out');
        localStorage.removeItem('user');
        this.setState({ user: {} });
      });
  };

  render() {
    console.log('App');
    if (_.isEmpty(this.state.user)) {
      return <Auth handleFormSubmission={this.handleFormSubmission} />;
    }
    return <MainApp user={this.state.user} handleLogout={this.handleLogout} />;
  }
}

class MainApp extends PureComponent {
  render() {
    console.log('MainApp');
    let { username } = this.props.user;
    return (
      <div>
        <h1>{`Hi ${username}`}</h1>
        <form onSubmit={this.props.handleLogout}>
          <button type="submit">Log Out</button>
        </form>
      </div>
    );
  }
}

class Auth extends PureComponent {
  render() {
    return (
      <div className="Auth">
        <UsernamePasswordForm
          handleFormSubmission={this.props.handleFormSubmission}
          endpoint="./login"
          displayName="Log In"
        />
        <UsernamePasswordForm
          handleFormSubmission={this.props.handleFormSubmission}
          endpoint="./signup"
          displayName="Sign Up"
        />
      </div>
    );
  }
}

class UsernamePasswordForm extends PureComponent {
  state = {
    username: '',
    password: ''
  };

  onChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetState = () => {
    this.setState({
      username: '',
      password: ''
    });
  };

  onSubmit = e => {
    this.props.handleFormSubmission(e, this.props.endpoint, this.state);
    this.resetState();
  };

  render() {
    return (
      <div className="username-password-form">
        <h2>{this.props.displayName}</h2>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="username">
            <Col componentClass={ControlLabel} sm={2}>
              Username:
            </Col>
            <Col sm={12}>
              <FormControl
                type="text"
                value={this.state.username}
                name="username"
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="password">
            <Col componentClass={ControlLabel} sm={2}>
              Password:
            </Col>
            <Col sm={12}>
              <FormControl
                type="text"
                value={this.state.password}
                name="password"
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <button className="btn btn-primary text-center" type="submit">
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

export default App;
