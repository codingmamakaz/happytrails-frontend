export const setTrail = trailsData => {
  return {
    type: 'SET_TRAIL',
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


//When a user clicks "save" on TrailCards, this gets triggered.
//Sends a post request to create a new trail
export const saveTrail = (trail, currentUser) => {
  return dispatch => {
    //the key trail is the required key in Trail strong params
    const trailInfo = {
      trail: { ...trail, user_id: currentUser.id, api_trail_id: trail.id }
    }
    return fetch("http://localhost:3000/api/v1/newtrail", {
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
    return fetch("http://localhost:3000//api/v1/trails", {

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

export const deleteSavedTrail = (api_trail_id, user_id, history) => {
  return dispatch => {
    console.log("api_trail_id", api_trail_id)
    console.log("user_id", user_id)
    return fetch(`http://localhost:3000/api/v1/users/${user_id}/trails/${api_trail_id}`, {
      // return fetch(`http://localhost:3000/api/v1/trails/${api_trail_id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(trail => {
        console.log("trail", trail)
        if (trail.error) {
          alert(trail.error)
        } else {
          dispatch({
            type: 'DELETE_SAVED_TRAIL',
            trail,
            trailId: api_trail_id
          })
          history.push(`/my-trails`)
        }
      })
      .catch(console.logs)
  }
}