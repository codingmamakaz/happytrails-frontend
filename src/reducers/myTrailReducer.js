export default (state = { mySavedTrailsArr: [] }, action) => {
  switch (action.type) {

    case 'ADD_SAVE_TRAIL':
      return { ...state, mySavedTrailsArr: [...state.mySavedTrailsArr, action.trail.data] }

    case 'GET_SAVED_TRAILS':
      return { mySavedTrailsArr: action.trailsObj.data }

    case "CLEAR_MY_TRAILS":
      return null

    default:
      return state
  }
}
