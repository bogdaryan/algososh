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

export const selectionSort = async (
  arrayToSort: TColumn[],
  sortingDirection: Direction,
  updateArrayState: React.Dispatch<SetStateAction<TColumn[]>>
) => {
  const { length } = arrayToSort;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    if (sortingDirection === Direction.Ascending) {
      for (let j = i + 1; j < length; j++) {
        await setDelay(1000);
        updateArrayState(
          setElementsStateSelection(arrayToSort, i, j, minIndex)
        );
        if (arrayToSort[minIndex].value > arrayToSort[j].value) minIndex = j;
      }
    } else {
      for (let j = i + 1; j < length; j++) {
        await setDelay(1000);
        updateArrayState(
          setElementsStateSelection(arrayToSort, i, j, minIndex)
        );
        if (arrayToSort[minIndex].value < arrayToSort[j].value) minIndex = j;
      }
    }
    if (arrayToSort[i].value !== arrayToSort[minIndex].value)
      swap(arrayToSort, i, minIndex);
  }
  await setDelay(1000);
  updateArrayState(setElementsStateSelection(arrayToSort));
};

const setElementsStateBubble = (
  array: TColumn[],
  currentIndexJ: number = array.length,
  currentIndexI: number = array.length
) => {
  const { length } = array;
  let state: ElementStates;
  const updatedArray = array.map((element, index) => {
    if (index === currentIndexJ || index === currentIndexJ + 1) {
      state = ElementStates.Changing;
    } else if (index > length - currentIndexI - 1) {
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

export const bubbleSort = async (
  arrayToSort: TColumn[],
  sortingDirection: Direction,
  updateArrayState: React.Dispatch<SetStateAction<TColumn[]>>
) => {
  const { length } = arrayToSort;
  for (let i = 0; i < length; i++) {
    if (sortingDirection === Direction.Ascending) {
      for (let j = 0; j < length - i - 1; j++) {
        await setDelay(1000);
        updateArrayState(setElementsStateBubble(arrayToSort, j, i));
        if (arrayToSort[j].value > arrayToSort[j + 1].value)
          swap(arrayToSort, j, j + 1);
      }
    } else {
      for (let j = 0; j < length - i - 1; j++) {
        await setDelay(1000);
        updateArrayState(setElementsStateBubble(arrayToSort, j, i));
        if (arrayToSort[j].value < arrayToSort[j + 1].value)
          swap(arrayToSort, j, j + 1);
      }
    }
  }
  await setDelay(1000);
  updateArrayState(setElementsStateBubble(arrayToSort));
};
