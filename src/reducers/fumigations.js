const initialState = [];

export default function fumigations(state = initialState, action) {
  let fumigationList = state.slice();
  switch (action.type) {
    case "FETCH_FUMIGATIONS":
      return [...action.fumigations];

    case "ADD_FUMIGATION":
      return [...state, action.note];

    case "UPDATE_FUMIGATION":
      let noteToUpdate = action.fumigation;
      return fumigationList.splice(action.index, 1, noteToUpdate);

    case "DELETE_FUMIGATION":
      for (let i = 0; i < fumigationList.length; i++) {
        if (fumigationList[i].id === action.index) {
          fumigationList.splice(i, 1);
          return fumigationList;
        }
      }
      return fumigationList;

    default:
      return state;
  }
}
