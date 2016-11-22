//guess a number, generate new random number, compare numbers
export const GUESS_NUMBER = 'GUESS_NUMBER';
export const guessNumber = number => ({
    type: GUESS_NUMBER,
    number
});

export const NEW_NUMBER = 'NEW_NUMBER';
export const newNumber = (1, 100) => ({
    type: NEW_NUMBER,

});

export const COMP_NUMBERS = 'COMP_NUMBERS';
export const compareNumbers = (guess, answer) ({
    type: COMP_NUMBERS,
    guess,
    answer
});