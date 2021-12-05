/*
 * Copyright (c) 2021 by Barinderjit Singh
 *
 * Maersk Assignment
 * Problem Description: An Attched PDF in the repo
 *
 * A Utility file for helper functions like Shuffle and Sort
 */

/**
 *
 * @param {*} tileProps represents the array of value of each cell in the grid
 * and it returns the shuffled array
 */
export const shuffleTiles = (tileProps) => {
  for (let i = tileProps.length - 1; i > 0; i--) {
    // generate a random index to swap with the current index
    let randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the array items by using ES6 destructuring.
    [tileProps[i], tileProps[randomIndex]] = [
      tileProps[randomIndex],
      tileProps[i],
    ];
  }
  // return the updated shuffled array of tiles
  return tileProps;
};

/**
 *
 * @param {*} tileProps, takes unsorted array i.e. current dom values
 * @returns sorted array
 */
export const sortTileByValues = (tileProps) =>
  tileProps.sort((prop1, prop2) => prop1.value - prop2.value);

/**
 *
 * @returns an object that have the List Elements and Span Elements
 */
export const fetchDomElements = () => {
  const listElms = document.getElementsByClassName('list-item');
  const spanElms = document.getElementsByClassName('list-item-number');

  return {
    listElms,
    spanElms,
  };
};
