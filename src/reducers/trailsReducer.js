export default (state = [], action) => {
  switch (action.type) {
    case 'SET_TRAILS':
      return action.trailsData.trails
    case "CLEAR_TRAILS":
      return null

    default:
      return state
  }
}

//* Reducer
