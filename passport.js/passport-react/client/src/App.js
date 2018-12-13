import React, { PureComponent, Component } from 'react';
import './App.css';
import {
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import _ from 'lodash'

class App extends Component {
  state = { user: {} };

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user')) || {};
    this.setState({ user });
  }

  render() {
    if (_.isEmpty(this.state.user)) {
      return <Auth />;
    }
    return (
      <MainApp />
    )
  }
}

class MainApp extends PureComponent {
  render() {
    return (
      <div>Hi</div>
    )
  }
}

class Auth extends PureComponent {
  render() {
    return (
      <div className="Auth">
        <UsernamePasswordForm endpoint="./login" displayName="Log In" />
        <UsernamePasswordForm endpoint="./signup" displayName="Sign Up" />
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
    e.preventDefault();
    fetch(`/api/${this.props.endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        console.log('got response from submission');
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.resetState();
      });
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
