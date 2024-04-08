import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { TColumn } from "./types";
import { bubbleSort, generateRandomArray, selectionSort } from "./sorting";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TColumn[]>([]);
  const [isSelectionChecked, setIsSelectionChecked] = useState(true);
  const [isAscLoading, setIsAscLoading] = useState(false);
  const [isDescLoading, setIsDescLoading] = useState(false);

  useEffect(() => {
    getNewArray();
  }, []);

  const getNewArray = () => {
    const randomArr = generateRandomArray();
    setArray(randomArr);
  };

  const onChangeHandler = () => {
    setIsSelectionChecked((prev) => !prev);
  };

  const ascHandler = () => {
    setIsAscLoading(true);

    const matrix = isSelectionChecked
      ? selectionSort(array, Direction.Ascending)
      : bubbleSort(array, Direction.Ascending);

    if (!matrix) return setIsAscLoading(false);

    let step = 0;
    setArray(matrix[step]);

    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setArray(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsAscLoading(false);
      }
    }, DELAY_IN_MS);
  };

  const descHandler = () => {
    setIsDescLoading(true);

    const matrix = isSelectionChecked
      ? selectionSort(array, Direction.Descending)
      : bubbleSort(array, Direction.Descending);

    if (!matrix) return setIsDescLoading(false);

    let step = 0;
    setArray(matrix[step]);

    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setArray(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsDescLoading(false);
      }
    }, DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section className="container">
        <section className={styles.controlPanel}>
          <div className={styles.inputs}>
            <RadioInput
              label="Выбор"
              name="sorting"
              value="selection"
              checked={isSelectionChecked}
              onChange={onChangeHandler}
              disabled={isAscLoading || isDescLoading}
            />
            <RadioInput
              label="Пузырёк"
              name="sorting"
              value="bubble"
              checked={!isSelectionChecked}
              onChange={onChangeHandler}
              disabled={isAscLoading || isDescLoading}
            />
          </div>
          <div className={styles.middleBtns}>
            <Button
              text="По возрастанию"
              extraClass={styles.btn}
              sorting={Direction.Ascending}
              onClick={ascHandler}
              isLoader={isAscLoading}
              disabled={isDescLoading}
            />
            <Button
              text="По убыванию"
              extraClass={styles.btn}
              sorting={Direction.Descending}
              onClick={descHandler}
              isLoader={isDescLoading}
              disabled={isAscLoading}
            />
          </div>
          <Button
            text="Новый массив"
            extraClass={styles.btn}
            onClick={getNewArray}
            disabled={isAscLoading || isDescLoading}
          />
        </section>
        <ul className={styles.field}>
          {array &&
            array.map((column, index) => (
              <li key={index}>
                <Column index={column.value} state={column.state} />
              </li>
            ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
