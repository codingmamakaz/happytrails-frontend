export default (state = { mySavedTrailsArr: [] }, action) => {
  switch (action.type) {

    case 'ADD_SAVE_TRAIL':
      return { ...state, mySavedTrailsArr: [...state.mySavedTrailsArr, action.trail.data] }

    case 'GET_SAVED_TRAILS':
      return { mySavedTrailsArr: action.trailsObj.data }

    case 'DELETE_SAVED_TRAIL':
      debugger
      let newSavedTrails = state.mySavedTrailsArr.filter(trail => trail.id !== action.api_trail_id)
      return { ...state, mySavedTrailsArr: newSavedTrails }

    case "CLEAR_MY_TRAILS":
      return null

    default:
      return state
  }
}
