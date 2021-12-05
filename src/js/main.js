/*
 * Copyright (c) 2021 by Barinderjit Singh
 *
 * Maersk Assignment
 * Problem Description: An Attched PDF in the repo
 */

import { TILE_DATA } from './constants.js';
import { shuffleTiles, sortTileByValues, fetchDomElements } from './util.js';

window.onload = function () {
  // get buttons and attach shuffle and sort events respectively
  const shuffleBtn = document.getElementById('shuffle-btn');
  const sortBtn = document.getElementById('sort-btn');
  shuffleBtn.addEventListener('click', shuffleTilesHandler);
  sortBtn.addEventListener('click', sortTilesByNumberHandler);

  const ulElement = document.getElementById('grid-list');

  if (TILE_DATA.length) {
    for (let i = 0; i < TILE_DATA.length; i++) {
      const liElement = document.createElement('li');
      const divElement = document.createElement('div');
      const spanElement = document.createElement('li');

      liElement.setAttribute('class', 'list-item');
      liElement.style.backgroundColor = TILE_DATA[i].backgroundColor;

      divElement.setAttribute('class', 'colored-bar');
      spanElement.setAttribute('class', 'list-item-number');
      spanElement.innerText = TILE_DATA[i].value;

      liElement.appendChild(divElement);
      liElement.appendChild(spanElement);

      ulElement.appendChild(liElement);
    }
  }
};

// global variables aka Global State
let tileProperties = [];

/**
 * User clicks on Shuffle button to fire this function
 */
const shuffleTilesHandler = () => {
  // get each Tile Property and assign it to global variable
  // Manipulating DOM is a costly operation so This Check is
  // basically to avoid fetching values from DOM again and again
  // That is the purpose of having a global variable/state
  if (!tileProperties.length) {
    getTileAttributesFromDom();
  }

  // get numbers shuffled by shuffle function
  // and then pass the Shuffled Array to updateDom function
  // in order to update the DOM
  updateDom([...shuffleTiles(tileProperties)]);
};

/**
 * User Clicks on Sort button to fire this function
 */
const sortTilesByNumberHandler = () => {
  // if the global numbers array is empty, then fetch the numbers from the grid

  if (!tileProperties.length) {
    getTileAttributesFromDom();
  }
  // call updateDom method with the sorted tiles returned from sortTileByValues function
  updateDom([...sortTileByValues(tileProperties)]);
};

/**
 *
 * @param {*} tileProps could be Shuffled or Sorted array
 * This function is updating each cell of the grid with the updated value
 */
const updateDom = (tileProps) => {
  const { listElms, spanElms } = fetchDomElements();

  // tempIndex is to track the index of tileProps
  let tempIndex = 0;
  for (let i = 0; i < tileProps.length; i++) {
    listElms[i].style.backgroundColor = tileProps[tempIndex].backgroundColor;
    spanElms[i].innerText = tileProps[tempIndex].value.toString();
    tempIndex++;
  }
};

/**
 * This function fetch the DOM elements and put their values into
 * global variable/state tileProperties in an array format
 */
const getTileAttributesFromDom = () => {
  const { listElms, spanElms } = fetchDomElements();

  for (let i = 0; i < listElms.length; i++) {
    tileProperties.push({
      backgroundColor: listElms[i].style.backgroundColor,
      value: +spanElms[i].innerText,
    });
  }
};
