import * as actions from '../actions/index';

const initialState = {
    number: Math.floor(Math.random() * 100) + 1,
    guesses: [],
    winner: false,
    distanceFeedback: "Guess Away!",
    directionFeedback: "",
    distance: null,
    modalVisible: false,
    fewest: null
};

export const hotColdReducer = (state=initialState, action) => {
    if (action.type === actions.GUESS_NUMBER) {
      let guessArr = [];
      guessArr.push(action.number);
      let tempArr = guessArr.concat(state.guesses);
      return Object.assign({}, state, {guesses: tempArr})
    }
    else if (action.type === actions.NEW_NUMBER) {
      return Object.assign({}, state, {number: Math.floor(Math.random() * 100) + 1, distanceFeedback: "Let's Play!"})
    }
    else if (action.type === actions.SHOW_MODAL) {
      return Object.assign({}, state, {modalVisible: !state.modalVisible})
    }
    else if (action.type === actions.NEW_GAME) {
      return Object.assign({}, state, initialState)
    }
    else if (action.type === actions.UPDATE_DISTANCE) {
      return Object.assign({}, state, {distance: action.distance});
    }
    else if (action.type === actions.UPDATE_DIST_FEEDBACK) {
      return Object.assign({}, state, {distanceFeedback: action.distanceFeedback})
    }
    else if (action.type === actions.UPDATE_DIR_FEEDBACK) {
      return Object.assign({}, state, {directionFeedback: action.directionFeedback})
    }
    else if (action.type === actions.UPDATE_FEWEST_STATE) {
      return Object.assign({}, state, {fewest: action.number})
    }

    return state;
};
