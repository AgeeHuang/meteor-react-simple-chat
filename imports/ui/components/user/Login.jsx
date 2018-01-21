import React, { Component } from 'react';
import classNames from 'classnames';
import { createUser } from '../../../api/user/methods';
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      error: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    console.log(': SUBMIT---');
    const { username, password } = this.state;
    this.setState({ isLoading: true });
    this.handleLogin(username, password);
    // const result = createUser(username, password);
  }
  handleLogin(username, password) {
    Meteor.loginWithPassword(username, password, error => {
      this.props.history.push('/list');
    });
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  loginWithFacebook(event) {
    event.preventDefault();
    Meteor.loginWithFacebook(
      {
        requestPermissions: [
          'public_profile',
          'email'
        ],
      },
      (err) => {
        if (err) {
          console.log('Handle errors here: ', err);
        }
      },
    );
  }
  render() {
    const {
      username,
      password,
      isLoading
    } = this.state;
    return (
      <div className="page-wrap">
        <div className="page-base-view login">
          <h2>LOGIN</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="username"
              className="form-login"
              placeholder="@username"
              value={username}
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="password"
              className="form-login"
              placeholder="password"
              value={password}
              onChange={this.handleInputChange}
            />
            <button
              type="submit"
              className="form-btn"
              disabled={isLoading}
            >
              GO
            </button>
          </form>
        </div>
        <div className="page-base-view social-media">
          <button
            className="facebook-connect"
            onClick={this.loginWithFacebook}
          >
            <i className="fa fa-facebook" aria-hidden="true"></i>
            Login With Facebook
          </button>
          <button className="twitter-connect">
            <i className="fa fa-twitter" aria-hidden="true"></i>
            Login With Twitter
          </button>
        </div>
      </div>
    );
  }
}


export default Login;
