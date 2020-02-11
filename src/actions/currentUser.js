import { resetLoginForm } from './loginForm'
import { resetSignupForm } from './signupForm'
import { clearMyReviews, getMyReviews } from './../actions/reviews'
import { clearMyTrails, getSavedTrails } from './../actions/trails'


const REACT_APP_API_URL = 'https://rails-happytrails.herokuapp.com/api/v1'

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
  }
}

export const signup = (credentials, history) => {
  return dispatch => {
    const userInfo = {
      user: credentials
    }
    //this has to be nested for strong params to work
    return fetch(`${REACT_APP_API_URL}/signup`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: 'application/json', "Content-Type":
          'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          alert(user.error)
        } else {
          dispatch(setCurrentUser(user.data.attributes))
          dispatch(getSavedTrails())
          dispatch(getMyReviews())
          dispatch(resetSignupForm())
          history.push(`/`)
        }
      })
      .catch(console.logs)
  }
}

export const login = (credentials, history) => {
  return dispatch => {
    return fetch(`${REACT_APP_API_URL}/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: 'application/json', "Content-Type":
          'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          alert(user.error)
        } else {
          dispatch(setCurrentUser(user))
          dispatch(getSavedTrails())
          dispatch(getMyReviews())
          dispatch(resetLoginForm())
          history.push('/')
        }
      })
      .catch(console.logs)
  }
}

export const getCurrentUser = () => {
  return dispatch => {
    return fetch(`${REACT_APP_API_URL}/get_current_user`, {
      credentials: "include",
      method: "GET",
      hearders: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(user => {
        if (user.error !== "No one is logged in") {
          //if the error message is "No one is logged in", which is coming from the back-end
          //then ignore and move on. Otherwise alert the user.error
          //This way, there isn't alert popping up upon every getCurrentUser().
          // console.log(user.error)
          //I'm just returning here to avoid alert popping up - got it working in master, but won't go away on this branch
          return
        } else if (user.data) {
          dispatch(setCurrentUser(user.data.attributes))
        }
      })
      .catch(console.logs)
  }
}

export const clearCurrentUser = () => {
  return {
    type: "CLEAR_CURRENT_USER",
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(clearCurrentUser())
    dispatch(clearMyReviews())
    dispatch(clearMyTrails())
    return fetch(`${REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "DELETE"
    })
  }
}
