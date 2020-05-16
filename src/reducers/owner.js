const initialState = {
  id: 0,
  day_cost: 0,
  city: "",
  department: "",
  country: ""
};

export default function owner(state = initialState, action) {
  switch (action.type) {
    case "FETCH_OWNER":
      return {...state, ...action.owner};

    case "UPDATE_OWNER":
      return {...state, ...action.note};

    default:
      return state;
  }
}
