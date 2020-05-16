const initialState = [];

export default function prunings(state = initialState, action) {
  let pruningList = state.slice();
  switch (action.type) {
    case "FETCH_PRUNINGS":
      return [...action.prunings];

    case "ADD_PRUNING":
      return [...state, action.note];

    case "UPDATE_PRUNING":
      let noteToUpdate = action.pruning;
      return pruningList.splice(action.index, 1, noteToUpdate);

    case "DELETE_PRUNING":
      for (let i = 0; i < pruningList.length; i++) {
        if (pruningList[i].id === action.index) {
          pruningList.splice(i, 1);
          return pruningList;
        }
      }
      return pruningList;

    default:
      return state;
  }
}
