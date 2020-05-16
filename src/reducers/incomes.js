const initialState = [];

export default function incomes(state = initialState, action) {
  let incomesList = state.slice();
  switch (action.type) {
    case "FETCH_INCOMES":
      return [...action.incomes];

    case "ADD_INCOME":
      return [...state, action.note];

    case "UPDATE_INCOME":
      let noteToUpdate = action.note;
      return incomesList.splice(action.index, 1, noteToUpdate);

    case "DELETE_INCOME":
      for (let i = 0; i < incomesList.length; i++) {
        if (incomesList[i].id === action.index) {
          incomesList.splice(i, 1);
          return incomesList;
        }
      }
      return incomesList;

    default:
      return state;
  }
}
