const initialState = [];

export default function waterings(state = initialState, action) {
  let wateringList = state.slice();
  switch (action.type) {
    case "FETCH_WATERINGS":
      return [...action.waterings];

    case "FETCH_WATERING":
      return [action.watering];

    case "ADD_WATERING":
      return [...state, action.note];

    case "UPDATE_WATERING":
      let noteToUpdate = action.watering;
      return wateringList.splice(action.index, 1, noteToUpdate);

    case "DELETE_WATERING":
      for (let i = 0; i < wateringList.length; i++) {
        if (wateringList[i].id === action.index) {
          wateringList.splice(i, 1);
          return wateringList;
        }
      }
      return wateringList;

    default:
      return state;
  }
}
