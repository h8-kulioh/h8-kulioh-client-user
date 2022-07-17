import * as actionType from "../actions/actionType";
let initialState = {
  universities: [],
  majors: [],
};

function univReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.UNIV_READS:
      return {
        ...state,
        universities: action.payload,
      };
    case actionType.UNIV_MAJOR_READS:
      return {
        ...state,
        majors: action.payload,
      };
    default:
      return state;
  }
}

export default univReducer;
