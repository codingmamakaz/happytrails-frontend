export const setTrail = trailsData => {
  return {
    type: 'SET_TRAIL',
    trailsData
  }
}

export const clearTrails = () => {
  return {
    type: "CLEAR_TRAILS"
  }
}

const apiURL = 'http://localhost:3000/api/v1'

//When a user clicks "save" on TrailCards, this gets triggered.
//Sends a post request to create a new trail
export const saveTrail = (trail, currentUser) => {
  return dispatch => {
    //the key trail is the required key in Trail strong params
    const trailInfo = {
      trail: { ...trail, user_id: currentUser.id, api_trail_id: trail.id }
    }
    return fetch(`${apiURL}/newtrail`, {
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
          console.log("trails - trail ", trail)
        }
      })
      .catch(console.logs)
  }
}

//gets all the trails saved under a user
export const getSavedTrails = () => {
  return dispatch => {
    return fetch(`${apiURL}/trails`, {

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
