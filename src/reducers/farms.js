const initialState = [];

export default function trees(state = initialState, action) {
  let farmList = state.slice();
  switch (action.type) {
    case "FETCH_FARMS":
      return [...action.farms];

    case "ADD_FARM":
      return [...state, action.note];

    case "UPDATE_FARM":
      let noteToUpdate = action.tree;
      return farmList.splice(action.index, 1, noteToUpdate);

    case "DELETE_FARM":
      for (let i = 0; i < farmList.length; i++) {
        if (farmList[i].id === action.index) {
          farmList.splice(i, 1);
          return farmList;
        }
      }
      return farmList;

    default:
      return state;
  }
}
