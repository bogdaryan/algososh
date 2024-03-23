import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { TColumn } from "./types";
import { bubbleSort, generateRandomArray, selectionSort } from "./sorting";
import { Column } from "../ui/column/column";

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

  const ascHandler = async () => {
    setIsAscLoading(true);
    if (isSelectionChecked) {
      await selectionSort(array, Direction.Ascending, setArray);
    } else {
      await bubbleSort(array, Direction.Ascending, setArray);
    }
    setIsAscLoading(false);
  };

  const descHandler = async () => {
    setIsDescLoading(true);
    if (isSelectionChecked) {
      await selectionSort(array, Direction.Descending, setArray);
    } else {
      await bubbleSort(array, Direction.Descending, setArray);
    }
    setIsDescLoading(false);
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
        <section className={styles.field}>
          {array &&
            array.map((column, index) => (
              <Column index={column.value} state={column.state} key={index} />
            ))}
        </section>
      </section>
    </SolutionLayout>
  );
};
