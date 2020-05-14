const initialState = [];

export default function trees(state = initialState, action) {
  let treeList = state.slice();

  switch (action.type) {
    case "FETCH_TREES":
      console.log(`TREEESSSSSSS ${JSON.stringify(...action.trees)}`);
      return [...state, ...action.trees];

    case "ADD_TREE":
      return [...state, action.note];

    case "UPDATE_TREE":
      let noteToUpdate = action.tree;
      treeList.splice(action.index, 1, noteToUpdate);
      return treeList;

    case "DELETE_TREE":
      treeList.splice(action.index, 1);
      return treeList;

    default:
      return state;
  }
}
