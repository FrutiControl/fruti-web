const initialState = {
  update_id: 0,
  update_type: ""
};

export default function updates(state = initialState, action) {
  switch (action.type) {
    case "WATERING_UPDATE":
      return { id: action.id, type: "watering" };
    case "PRUNING_UPDATE":
      return { id: action.id, type: "pruning" };
    case "FERTILIZATION_UPDATE":
      return { id: action.id, type: "fertilization" };
    case "FUMIGATION_UPDATE":
      return { id: action.id, type: "fumigation" };
    case "SEEDING_UPDATE":
      return { id: action.id, type: "seeding" };
    case "TREE_UPDATE":
      return { id: action.id, type: "tree" };
    case "FARM_UPDATE":
      return { id: action.id, type: "farm" };
    case "INCOME_UPDATE":
      return { id: action.id, type: "income" };
    case "OUTCOME_UPDATE":
      return { id: action.id, type: "outcome" };
    default:
      return state;
  }
}
