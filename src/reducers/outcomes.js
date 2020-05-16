const initialState = [];

export default function outcomes(state = initialState, action) {
  let outcomesList = state.slice();
  switch (action.type) {
    case "FETCH_OUTCOMES":
      return [...action.outcomes];

    case "ADD_OUTCOME":
      return [...state, action.note];

    case "UPDATE_OUTCOME":
      let noteToUpdate = action.note;
      return outcomesList.splice(action.index, 1, noteToUpdate);

    case "DELETE_OUTCOME":
      for (let i = 0; i < outcomesList.length; i++) {
        if (outcomesList[i].id === action.index) {
          outcomesList.splice(i, 1);
          return outcomesList;
        }
      }
      return outcomesList;

    default:
      return state;
  }
}
