import * as actions from '../actions/index';

const initialState = {
    number: Math.floor(Math.random() * 100) + 1,
    guesses: [],
    winner: false,
    distanceFeedback: "",
    directionFeedback: "",
    distance: null,
    modalVisible: false
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
    else if (action.type === actions.COMP_NUMBERS) {
        const diff = action.guess - state.number;
        const absDiff = Math.abs(diff);
        let myObj = Object.assign({}, state);
        if (state.distance !== null) {
            if (absDiff < state.distance) {
                myObj = Object.assign({}, myObj, {directionFeedback: "Getting Warmer"})
            } else if (absDiff === state.distance) {
                myObj = Object.assign({}, myObj, {directionFeedback: ""})
            } else {
                myObj = Object.assign({}, myObj, {directionFeedback: "Getting Colder"})
            }
        }
        if(diff === 0) {
            return Object.assign({}, state, {winner: true, distanceFeedback: "You Win!", directionFeedback: "",  distance: 0})
        } else if (diff !== 0) {
            if (absDiff <= 5) {
                myObj = Object.assign({}, myObj, {distanceFeedback: "HOT", distance: absDiff})
            } else if (absDiff <= 15) {
                myObj = Object.assign({}, myObj, {distanceFeedback: "Warm", distance: absDiff})
            } else if (absDiff <= 30) {
                myObj = Object.assign({}, myObj, {distanceFeedback: "Chilly", distance: absDiff})
            } else if (absDiff <= 50) {
                myObj = Object.assign({}, myObj, {distanceFeedback: "Cold", distance: absDiff})
            }
        }
        return Object.assign({}, state, myObj);
    }
    return state;
};
