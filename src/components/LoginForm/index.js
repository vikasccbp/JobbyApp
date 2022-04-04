import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isBool: false, errorMessage: ''}

  usernameSubmit = event => {
    this.setState({username: event.target.value})
  }

  passwordSubmit = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({isBool: true, errorMessage: errorMsg})
  }

  submitTheForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {isBool, errorMessage} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginDiv">
        <div className="loginSubDiv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="img1"
            alt="website logo"
          />
          <form onSubmit={this.submitTheForm}>
            <div className="inputDiv">
              <label htmlFor="input1">USERNAME</label>
              <br />
              <input
                type="text"
                placeholder="Username"
                id="input1"
                onChange={this.usernameSubmit}
              />
            </div>
            <div className="inputDiv">
              <label htmlFor="input2">PASSWORD</label>
              <br />
              <input
                type="password"
                placeholder="Password"
                id="input2"
                onChange={this.passwordSubmit}
              />
            </div>
            <button type="submit" className="button1">
              Login
            </button>
            {isBool && <p className="error">*{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
