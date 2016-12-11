import fetch from 'isomorphic-fetch';

export const GUESS_NUMBER = 'GUESS_NUMBER';
export const guessNumber = number => ({
    type: GUESS_NUMBER,
    number
});

export const NEW_NUMBER = 'NEW_NUMBER';
export const newNumber = () => ({
    type: NEW_NUMBER
});

export const COMP_NUMBERS = 'COMP_NUMBERS';
export const compareNumbers = (guess) => ({
    type: COMP_NUMBERS,
    guess
});

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = () => ({
    type: SHOW_MODAL
});

export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
    type: NEW_GAME
});

export const UPDATE_DIST_FEEDBACK = 'UPDATE_DIST_FEEDBACK';
export const updateDistFeedback = (distanceFeedback) => ({
  type: UPDATE_DIST_FEEDBACK,
  distanceFeedback
});

export const UPDATE_DIR_FEEDBACK = 'UPDATE_DIR_FEEDBACK';
export const updateDirFeedback = (directionFeedback) => ({
  type: UPDATE_DIR_FEEDBACK,
  directionFeedback
});

export const UPDATE_DISTANCE = 'UPDATE_DISTANCE';
export const updateDistance = (distance) => ({
  type: UPDATE_DISTANCE,
  distance
});

const UPDATE_FEWEST_STATE = 'UPDATE_FEWEST_STATE';
const updateFewestState = (number) => ({
  type: UPDATE_FEWEST_STATE,
  number
});

// export const GET_FEWEST = 'GET_FEWEST';
export const getFewest = () => {
  return dispatch => {
    return fetch('http://localhost:3000/fewest-guesses')
    .then(response => response.json())
    .then(data => {
      console.log(updateFewestState(data[0].fewest))
      dispatch(updateFewestState(data[0].fewest))
    })
  }
}

export const postFewest = (number) => {
  // console.log(this.updateFewestState)
  return dispatch => {
    return fetch('http://localhost:3000/fewest-guesses', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: 'same-origin', // you need to add this line
      body: JSON.stringify({
        fewest: number
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dispatch(updateFewestState(data[0].fewest))
    })
  }
}
