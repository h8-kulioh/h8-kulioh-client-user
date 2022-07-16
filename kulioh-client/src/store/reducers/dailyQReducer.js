import * as actionType from "../actions/actionType";
let initialState = {
  questions: [],
  question: {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
  },
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
