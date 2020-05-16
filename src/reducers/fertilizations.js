const initialState = [];

export default function fertilizations(state = initialState, action) {
  let fertilizationList = state.slice();
  switch (action.type) {
    case "FETCH_FERTILIZATIONS":
      return [...action.fertilizations];

    case "ADD_FERTILIZATION":
      return [...state, action.note];

    case "UPDATE_FERTILIZATION":
      let noteToUpdate = action.fertilization;
      return fertilizationList.splice(action.index, 1, noteToUpdate);

    case "DELETE_FERTILIZATION":
      for (let i = 0; i < fertilizationList.length; i++) {
        if (fertilizationList[i].id === action.index) {
          fertilizationList.splice(i, 1);
          return fertilizationList;
        }
      }
      return fertilizationList;

    default:
      return state;
  }
}
