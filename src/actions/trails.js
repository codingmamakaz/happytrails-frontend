export const setTrails = trailsData => {
  return {
    type: 'SET_TRAILS',
    trailsData
  }
}

export const clearMyTrails = () => {
  return {
    type: "CLEAR_MY_TRAILS"
  }
}

export const clearTrails = () => {
  return {
    type: "CLEAR_TRAILS"
  }
}

const REACT_APP_API_URL = 'https://rails-happytrails.herokuapp.com/api/v1'

//When a user clicks "save" on TrailCards, this gets triggered.
//Sends a post request to create a new trail
export const saveTrail = (trail, currentUser) => {
  return dispatch => {
    //the key trail is the required key in Trail strong params
    const trailInfo = {
      trail: { ...trail, user_id: currentUser.id, api_trail_id: trail.id }
    }
    return fetch(`${REACT_APP_API_URL}/newtrail`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: 'application/json', "Content-Type":
          'application/json'
      },
      body: JSON.stringify(trailInfo)
    })
      .then(res => res.json())
      .then(trail => {

        if (trail.error) {
          alert(trail.error)
        } else {
          dispatch({
            type: 'ADD_SAVE_TRAIL',
            trail
          })
        }
      })
      .catch(console.logs)
  }
}

//gets all the trails saved under a user
export const getSavedTrails = () => {
  return dispatch => {
    return fetch(`${REACT_APP_API_URL}/trails`, {

      credentials: "include",
      method: "GET",
      hearders: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(trailsObj => {
        if (trailsObj.error) {
          alert(trailsObj.error)
        } else {
          dispatch({
            type: 'GET_SAVED_TRAILS',
            trailsObj
          })
        }
      })
      .catch(console.log)
  }
}
