import * as actionType from "../actions/actionType";
let initialState = {
  questions: [],
  isAnswered: false,
};

function dailyQReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.DAILY_Q_READ:
      return {
        ...state,
        questions: action.payload,
      };
    case actionType.DAILY_Q_READ_ONE:
      return {
        ...state,
        question: action.payload,
      };
    case actionType.DAILY_Q_ISANSWERED:
      return {
        ...state,
        isAnswered: true,
      };
    default:
      return state;
  }
}

export default dailyQReducer;
