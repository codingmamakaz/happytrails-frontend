import { resetLoginForm } from './loginForm'
import { resetSignupForm } from './signupForm'
import { clearMyReviews, getMyReviews } from './../actions/reviews'
import { clearTrails, getSavedTrails } from './../actions/trails'


const apiURL = 'http://localhost:3000/api/v1'

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
  }
}

export const signup = (credentials, history) => {
  return dispatch => {
    console.log("credentials in signup are", credentials)
    const userInfo = {
      user: credentials
    }
    //this has to be nested for strong params to work
    return fetch(`${apiURL}/signup`, {
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
    console.log("credentials in login are", credentials)
    return fetch(`${apiURL}/login`, {
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
    return fetch(`${apiURL}/get_current_user`, {
      credentials: "include",
      method: "GET",
      hearders: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          alert(user.error)
        } else {
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
    dispatch(clearTrails())
    return fetch(`${apiURL}/logout`, {
      credentials: "include",
      method: "DELETE"
    })
  }
}
