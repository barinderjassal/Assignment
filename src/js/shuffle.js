// global variables
let numbers = [];
let listElements = [];

/**
 * User clicks on Shuffle button to fire this function
 */
const shuffleNumbersHandler = () => {
  // get DOM Values and assign it to global variable
  // Manipulating DOM is a costly operation so This Check is
  // basically to avoid fetching values from DOM again and again
  // That is the purpose of having a global variable/state
  if (!numbers.length) {
    numbers = getNumbersFromDom();
  }

  // get numbers shuffled by shuffle function
  // and then pass the Shuffled Array to updateDom function
  // in order to update the DOM
  updateDom([...shuffle(numbers)]);
};

/**
 * User Clicks on Sort button to fire this function
 */
const sortNumbersHandler = () => {
  // if the global numbers array is empty, then fetch the numbers from the grid
  if (!numbers.length) {
    listElements = getNumberInListElements();
    for (let i = 0; i < listElements.length; i++) {
      numbers.push(+listElements[i].innerText);
    }
  }
  // call updateDom method with the sorted numbers
  updateDom([...sortNums(numbers)]);
};

/**
 *
 * @returns an array of DOM values
 */
const getNumbersFromDom = () => {
  let domValues = [];
  listElements = getNumberInListElements();
  for (let i = 0; i < listElements.length; i++) {
    // here typecasting the string value to number
    // because I want to do sorting on numbers not strings by using comparator function
    domValues.push(+listElements[i].innerText);
  }
  return domValues;
};

/**
 *
 * @param {*} blocksArray
 * represents the array of value of each cell in the grid
 * and it returns the shuffled array
 */
const shuffle = (numArray) => {
  for (let i = numArray.length - 1; i > 0; i--) {
    // generate a random index to swap with the current index
    let randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the array items by using ES6 destructuring.
    [numArray[i], numArray[randomIndex]] = [numArray[randomIndex], numArray[i]];
  }
  // return the updated shuffled array of numbers
  return numArray;
};

/**
 *
 * @param {*} numArray could be Shuffled or Sorted array
 * This function is updating each cell of the grid with the updated value
 */
const updateDom = (numArray) => {
  const listElements = getNumberInListElements();

  // tempIndex is to track the index of numArray w.r.t listElement
  let tempIndex = 0;
  for (let i = 0; i < listElements.length; i++) {
    listElements[i].innerText = numArray[tempIndex].toString();
    tempIndex++;
  }
};

/**
 *
 * @returns the DOM elements with list-item-number className that contains the value
 */
const getNumberInListElements = () =>
  document.getElementsByClassName('list-item-number');

/**
 *
 * @param {*} numbersArray, takes unsorted array i.e. current dom values
 * @returns sorted array
 */
const sortNums = (numbersArray) => {
  return numbersArray.sort((a, b) => a - b);
};
