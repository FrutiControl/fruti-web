const initialState = [];

export default function trees(state = initialState, action) {
  let treeList = state.slice();
  console.log("========== REDUCER_TREES ======================");
  console.log(`treeList: ${treeList}`);
  console.log(`state: ${state}`);
  console.log(`action.trees: ${action.trees}`);
  switch (action.type) {
    case "FETCH_TREES":

      return [...action.trees];

    case "ADD_TREE":
      return [...state, action.note];

    case "UPDATE_TREE":
      let noteToUpdate = action.tree;
      return treeList.splice(action.index, 1, noteToUpdate);

    case "DELETE_TREE":
      for (let i = 0; i < treeList.length; i++) {
        if (treeList[i].id === action.index) {
          treeList.splice(i, 1);
          return treeList;
        }
      }

    default:
      return state;
  }
}
