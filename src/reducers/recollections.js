const initialState = [];

export default function recollections(state = initialState, action) {
  let recollectionList = state.slice();
  switch (action.type) {
    case "FETCH_RECOLLECTIONS":
      return [...action.recollections];

    case "ADD_RECOLLECTION":
      return [...state, action.note];

    case "UPDATE_RECOLLECTION":
      let noteToUpdate = action.recollection;
      return recollectionList.splice(action.index, 1, noteToUpdate);

    case "DELETE_RECOLLECTION":
      for (let i = 0; i < recollectionList.length; i++) {
        if (recollectionList[i].id === action.index) {
          recollectionList.splice(i, 1);
          return recollectionList;
        }
      }
      return recollectionList;

    default:
      return state;
  }
}
