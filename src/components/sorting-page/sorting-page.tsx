import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

type TColumns = {
  index: number;
  state?: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [columns, setColumns] = useState<TColumns[]>([]);

  function newArray() {
    const lengthRandom = Math.floor(Math.random() * 20) + 5;

    const arrayRandomSize = new Array(lengthRandom).fill(null).map(() => ({
      index: Math.floor(Math.random() * 100),
    }));

    setColumns(arrayRandomSize);
  }

  useEffect(() => {
    newArray();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <section className="container">
        <section className={styles.controlPanel}>
          <div className={styles.inputs}>
            <RadioInput label="Выбор" name="sorting" />
            <RadioInput label="Пузырёк" name="sorting" />
          </div>
          <div className={styles.middleBtns}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              extraClass={styles.btn}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass={styles.btn}
            />
          </div>
          <Button
            onClick={newArray}
            text="Новый массив"
            extraClass={styles.btn}
          />
        </section>
        <section className={styles.field}>
          {columns &&
            columns.map((column, index) => (
              <Column index={column.index} key={index} />
            ))}
        </section>
      </section>
    </SolutionLayout>
  );
};
