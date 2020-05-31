const initialState = [];

export default function seedings(state = initialState, action) {
  let seedingList = state.slice();
  switch (action.type) {
    case "FETCH_SEEDINGS":
      return [...action.seedings];

    case "FETCH_SEEDING":
      return [action.seeding];

    case "ADD_SEEDING":
      return [...state, action.note];

    case "UPDATE_SEEDING":
      let noteToUpdate = action.seeding;
      return seedingList.splice(action.index, 1, noteToUpdate);

    case "DELETE_SEEDING":
      for (let i = 0; i < seedingList.length; i++) {
        if (seedingList[i].id === action.index) {
          seedingList.splice(i, 1);
          return seedingList;
        }
      }
      return seedingList;

    default:
      return state;
  }
}
