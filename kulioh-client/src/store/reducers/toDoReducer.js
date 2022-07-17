import * as actionType from "../actions/actionType";
let initialState = {
  isChange: false,
};

function toDoReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.TODO_UPDATE:
      return {
        ...state,
        isChange: !state.isChange,
      };
    default:
      return state;
  }
}

export default toDoReducer;
