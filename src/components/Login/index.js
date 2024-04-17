import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {usernameInput: '', passwordInput: '', ErrorMsg: ''}

  onChangeUserInput = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props

    history.replace('/')
    this.setState({
      ErrorMsg: '',
    })
  }

  onSubmitFailure = error => {
    this.setState({
      ErrorMsg: `*${error}`,
    })
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'

    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }
    const stringifiedData = JSON.stringify(userDetails)
    const options = {
      method: 'POST',
      body: stringifiedData,
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {ErrorMsg, usernameInput, passwordInput} = this.state
    return (
      <div className="bg-container">
        <form className="form-container">
          <h1 className="restaurant-name">UNI Resto Cafe</h1>
          <div className="username-container">
            <label htmlFor="username" className="username-label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="userinput"
              value={usernameInput}
              onChange={this.onChangeUserInput}
            />
          </div>
          <div className="username-container">
            <label htmlFor="password" className="username-label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="userinput"
              value={passwordInput}
              onChange={this.onChangePassword}
            />
          </div>
          <button
            type="submit"
            className="login-btn"
            onClick={this.onClickLogin}
          >
            Login
          </button>
          <p className="error-msg">{ErrorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
