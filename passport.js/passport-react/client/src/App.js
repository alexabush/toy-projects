import React, { PureComponent, Component } from 'react';
import './App.css';
import { Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class App extends Component {
  componentDidMount() {
    console.log('connected');
    fetch('/auth')
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  render() {
    return (
      <div className="App">
        <UsernamePasswordForm endpoint='./login' displayName='Log In' />
        <UsernamePasswordForm endpoint='./signup' displayName='Sign Up' />
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
    let { inputName, value } = e.target;
    this.setState({ [inputName]: value });
  };

  resetState = () => {
    this.setState({
      username: '',
      password: ''
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.endpoint
    fetch(`/${this.props.endpoint}`, {
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
        this.resetState();
      });
  };

  render() {
    return (
      <div className="username-password-form">
        <h2>{this.props.displayName}</h2>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Username:
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
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Password:
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
