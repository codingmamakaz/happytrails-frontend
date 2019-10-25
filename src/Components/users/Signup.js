import React from 'react'
import { connect } from 'react-redux'
import { updateSignupForm } from "../../actions/signupForm"
import { signup } from "../../actions/currentUser"
import { Button } from "../../ui/Styles"

const Signup = ({ signupFormData, updateSignupForm, signup, history }) => {

  const handleInputChange = event => {
    const { name, value } = event.target
    const updatedFormInfo = {
      ...signupFormData,
      [name]: value
    }
    updateSignupForm(updatedFormInfo)
  }

  const handleSubmit = event => {
    event.preventDefault()
    signup(signupFormData, history)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label has-text-white">Username</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input is-hovered is-primary" placeholder="username" value={signupFormData.username} name="username" type="text" onChange={handleInputChange} />
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
          <input className="input is-hovered is-primary" placeholder="password" value={signupFormData.password} name="password" type="password" onChange={handleInputChange} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
          <span className="icon is-small is-right">
          </span>
        </div>
      </div>
      <Button type="submit"> Sign up </Button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    signupFormData: state.signupForm
  }
}

export default connect(mapStateToProps, { updateSignupForm, signup })(Signup)