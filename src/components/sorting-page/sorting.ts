import { SetStateAction } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TColumn } from "./types";
import { setDelay, swap } from "../../utils/utils";

const MIN_ARRAY_LENGTH = 3;
const MAX_ARRAY_LENGTH = 17;
const MIN_VALUE = 0;
const MAX_VALUE = 100;

const getRandomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomArray = () => {
  const arrLength = getRandomNumberInRange(MIN_ARRAY_LENGTH, MAX_ARRAY_LENGTH);
  const randomArr: TColumn[] = [];
  let randomNum: number;
  while (randomArr.length < arrLength) {
    randomNum = getRandomNumberInRange(MIN_VALUE, MAX_VALUE);
    randomArr.push({ value: randomNum, state: ElementStates.Default });
  }
  return randomArr;
};

const setElementsStateSelection = (
  array: TColumn[],
  currentIndexI: number = array.length,
  currentIndexJ: number = array.length,
  selectedIdx: number = array.length
) => {
  let state: ElementStates;
  const updatedArray = array.map((element, index) => {
    if (index === selectedIdx || index === currentIndexJ) {
      state = ElementStates.Changing;
    } else if (index < currentIndexI) {
      state = ElementStates.Modified;
    } else {
      state = ElementStates.Default;
    }
    return {
      ...element,
      state,
    };
  });
  return updatedArray;
};

export const selectionSort = (
  arr: TColumn[],
  direction: Direction
): TColumn[][] | null => {
  const { length } = arr;
  if (!length) return null;

  const sortMatrix: TColumn[][] = [];
  let stepArray: TColumn[];

  for (let i = 0; i < length - 1; i++) {
    let selectedIdx = i;

    for (let j = i + 1; j < length; j++) {
      stepArray = setElementsStateSelection(arr, i, j, selectedIdx);
      sortMatrix.push(stepArray);
      if (
        direction === Direction.Ascending
          ? arr[selectedIdx].value > arr[j].value
          : arr[selectedIdx].value < arr[j].value
      )
        selectedIdx = j;
    }

    if (arr[i].value !== arr[selectedIdx].value) swap(arr, i, selectedIdx);
  }
  stepArray = setElementsStateSelection(arr);
  sortMatrix.push(stepArray);

  return sortMatrix;
};

const setElementsStateBubble = (
  arr: TColumn[],
  idxJ: number = arr.length,
  idxI: number = arr.length
) => {
  const { length } = arr;
  let state: ElementStates;
  const newArray = arr.map((el, idx) => {
    if (idx === idxJ || idx === idxJ + 1) {
      state = ElementStates.Changing;
    } else if (idx > length - idxI - 1) {
      state = ElementStates.Modified;
    } else {
      state = ElementStates.Default;
    }
    return {
      ...el,
      state,
    };
  });

  return newArray;
};

export const bubbleSort = (
  arr: TColumn[],
  direction: Direction
): TColumn[][] | null => {
  const { length } = arr;
  if (!length) return null;

  const sortMatrix: TColumn[][] = [];
  let stepArray: TColumn[];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      stepArray = setElementsStateBubble(arr, j, i);
      sortMatrix.push(stepArray);
      if (
        direction === Direction.Ascending
          ? arr[j].value > arr[j + 1].value
          : arr[j].value < arr[j + 1].value
      )
        swap(arr, j, j + 1);
    }
  }
  stepArray = setElementsStateBubble(arr);
  sortMatrix.push(setElementsStateBubble(arr));

  return sortMatrix;
};
