import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import currentUser from './reducers/currentUserReducer'
import loginForm from './reducers/loginFormReducer'
import trails from './reducers/trailsReducer'
import myTrails from './reducers/myTrailReducer'
import signupForm from './reducers/signupForm'
import reviews from './reducers/reviewsReducer'

const reducer = combineReducers({
  //I can do users:users or do like line 10
  currentUser,
  loginForm,
  trails,
  myTrails,
  signupForm,
  reviews
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))
export default store