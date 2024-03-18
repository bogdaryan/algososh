import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, newRandomColumns, selectionSort } from "./sorting";

export type TColumns = {
  index: number;
  state?: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [columns, setColumns] = useState<TColumns[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);

  useEffect(() => {
    newRandomColumns(setColumns);
  }, []);

  function handleAscendingSort() {
    if (!isSorting) {
      setIsSorting(true);
      if (selectedSorting === "bubble") {
        bubbleSort(columns, setColumns);
      } else if (selectedSorting === "selection") {
        selectionSort(columns, setColumns);
      }
    }
  }

  function handleDescendingSort() {
    if (!isSorting) {
      setIsSorting(true);
      if (selectedSorting === "bubble") {
        bubbleSort(columns, setColumns, false);
      } else if (selectedSorting === "selection") {
        selectionSort(columns, setColumns, false);
      }
    }
  }

  function renderColumns() {
    return columns.map((column, index) => (
      <Column index={column.index} key={index} state={column.state} />
    ));
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <section className="container">
        <section className={styles.controlPanel}>
          <div className={styles.inputs}>
            <RadioInput
              label="Выбор"
              name="sorting"
              value="selection"
              checked={selectedSorting === "selection"}
              onChange={() => setSelectedSorting("selection")}
            />
            <RadioInput
              label="Пузырёк"
              name="sorting"
              value="bubble"
              checked={selectedSorting === "bubble"}
              onChange={() => setSelectedSorting("bubble")}
            />
          </div>
          <div className={styles.middleBtns}>
            <Button
              text="По возрастанию"
              extraClass={styles.btn}
              sorting={Direction.Ascending}
              onClick={handleAscendingSort}
              disabled={isSorting}
            />
            <Button
              text="По убыванию"
              extraClass={styles.btn}
              sorting={Direction.Descending}
              onClick={handleDescendingSort}
              disabled={isSorting}
            />
          </div>
          <Button
            onClick={() => newRandomColumns(setColumns)}
            text="Новый массив"
            extraClass={styles.btn}
            disabled={isSorting}
          />
        </section>
        <section className={styles.field}>{columns && renderColumns()}</section>
      </section>
    </SolutionLayout>
  );
};
