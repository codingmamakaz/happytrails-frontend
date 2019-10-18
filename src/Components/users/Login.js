import React from 'react'
import { connect } from 'react-redux'
import { updateLoginForm } from "../../actions/loginForm"
import { login } from "../../actions/currentUser"
import { Button } from "../../ui/Styles"

const Login = ({ loginFormData, updateLoginForm, login, history }) => {

  const handleInputChange = event => {
    const { name, value } = event.target
    const updatedFormInfo = {
      ...loginFormData,
      [name]: value
    }
    updateLoginForm(updatedFormInfo)
  }

  const handleSubmit = event => {
    event.preventDefault()
    login(loginFormData, history)
    history.push('/')
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label has-text-white">Username</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input is-hovered is-primary" placeholder="username" value={loginFormData.username} name="username" type="text" onChange={handleInputChange} />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          <span className="icon is-small is-right">
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label has-text-white">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input is-hovered is-primary" placeholder="password" value={loginFormData.password} name="password" type="password" onChange={handleInputChange} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
          <span className="icon is-small is-right">
          </span>
        </div>
      </div>
      <Button type="submit">  Log In </Button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    loginFormData: state.loginForm
  }
}

export default connect(mapStateToProps, { updateLoginForm, login })(Login)