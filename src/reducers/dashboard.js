const initialState = {
  current_activities: 0,
  total_trees: 0,
  future_activities: 0,
  top_activities: [],
  mango_trees: 0.0,
  orange_trees: 0.0,
  lemon_trees: 0.0,
  tangerine_trees: 0.0,
  avocado_trees: 0.0,
  banano_trees: 0.0,
  incomes: [],
  outcomes: [],
  last_activities: [],
  last_days: [],
  forecast: []
};

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DASHBOARD":
      return action.dashboard;

    default:
      return state;
  }
}
