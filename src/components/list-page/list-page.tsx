import React, { ChangeEvent, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";

import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linked-list";
import {
  getAddByIndexMatrix,
  getAddToHeadMatrix,
  getAddToTailMatrix,
  getDeleteByIndexMatrix,
  getDeleteHeadMatrix,
  getDeleteTailMatrix,
  getInitState,
} from "./utils";
import { TElement } from "./types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { CIRCLE } from "../../constants/element-captions";

export const ListPage: React.FC = () => {
  const linkedList = useRef(new LinkedList<string>(["4", "1", "3", "8"], 7));
  const [list, setList] = useState<TElement[]>(
    getInitState(linkedList.current.toArray())
  );
  const [valueInput, setValueInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [isLoading, setIsLoading] = useState({
    addHead: false,
    addTail: false,
    delHead: false,
    delTail: false,
    addByIdx: false,
    delByIdx: false,
  });

  const valueInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const indexInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(e.target.value);
  };

  const addToHead = (item: string) => {
    setIsLoading((prev) => ({ ...prev, addHead: true }));
    const matrix = getAddToHeadMatrix(linkedList.current, item);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsLoading((prev) => ({ ...prev, addHead: false }));
      }
    }, SHORT_DELAY_IN_MS);

    setValueInput("");
  };

  const addToTail = (item: string) => {
    setIsLoading((prev) => ({ ...prev, addTail: true }));
    const matrix = getAddToTailMatrix(linkedList.current, item);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsLoading((prev) => ({ ...prev, addTail: false }));
      }
    }, SHORT_DELAY_IN_MS);

    setValueInput("");
  };

  const deleteFromHead = () => {
    setIsLoading((prev) => ({ ...prev, delHead: true }));
    const matrix = getDeleteHeadMatrix(linkedList.current);
    setList(matrix[0]);
    setTimeout(() => {
      setList(matrix[1]);
      setIsLoading((prev) => ({ ...prev, delHead: false }));
    }, SHORT_DELAY_IN_MS);

    setValueInput("");
  };

  const deleteFromTail = () => {
    setIsLoading((prev) => ({ ...prev, delTail: true }));
    const matrix = getDeleteTailMatrix(linkedList.current);
    setList(matrix[0]);
    setTimeout(() => {
      setList(matrix[1]);
      setIsLoading((prev) => ({ ...prev, delTail: false }));
    }, SHORT_DELAY_IN_MS);

    setValueInput("");
  };

  const addByIndex = (item: string, idx: number) => {
    setIsLoading((prev) => ({ ...prev, addByIdx: true }));
    const matrix = getAddByIndexMatrix(linkedList.current, item, idx);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsLoading((prev) => ({ ...prev, addByIdx: false }));
      }
    }, SHORT_DELAY_IN_MS);

    setValueInput("");
    setIndexInput("");
  };

  const deleteByIndex = (idx: number) => {
    setIsLoading((prev) => ({ ...prev, delByIdx: true }));
    const matrix = getDeleteByIndexMatrix(linkedList.current, idx);
    let step = 0;
    setList(matrix[step]);
    const timerId = setInterval(() => {
      if (step < matrix.length - 1) {
        step++;
        setList(matrix[step]);
      } else {
        clearInterval(timerId);
        setIsLoading((prev) => ({ ...prev, delByIdx: false }));
      }
    }, SHORT_DELAY_IN_MS);

    setIndexInput("");
  };

  return (
    <SolutionLayout title="Связный список">
      <section className="container">
        <div className={styles.panel}>
          <div className={styles.header}>
            <Input
              isLimitText={true}
              maxLength={4}
              value={valueInput}
              extraClass={styles.input}
              placeholder="Введите значение"
              onChange={valueInputOnChangeHandler}
            />
            <Button
              text="Добавить в head"
              linkedList="small"
              onClick={() => addToHead(valueInput)}
              disabled={
                !valueInput ||
                isLoading.addTail ||
                isLoading.addByIdx ||
                isLoading.delHead ||
                isLoading.delTail ||
                isLoading.delByIdx ||
                list.length >= linkedList.current.getSizeLimit()
              }
              isLoader={isLoading.addHead}
            />
            <Button
              text="Добавить в tail"
              linkedList="small"
              onClick={() => addToTail(valueInput)}
              disabled={
                !valueInput ||
                isLoading.addHead ||
                isLoading.addByIdx ||
                isLoading.delHead ||
                isLoading.delTail ||
                isLoading.delByIdx ||
                list.length >= linkedList.current.getSizeLimit()
              }
              isLoader={isLoading.addTail}
            />
            <Button
              text="Удалить из head"
              linkedList="small"
              onClick={deleteFromHead}
              disabled={
                !list.length ||
                isLoading.addHead ||
                isLoading.addTail ||
                isLoading.delTail ||
                isLoading.addByIdx ||
                isLoading.delByIdx
              }
              isLoader={isLoading.delHead}
            />
            <Button
              text="Удалить из tail"
              linkedList="small"
              onClick={deleteFromTail}
              disabled={
                !list.length ||
                isLoading.addHead ||
                isLoading.addTail ||
                isLoading.delHead ||
                isLoading.addByIdx ||
                isLoading.delByIdx
              }
              isLoader={isLoading.delTail}
            />
          </div>
          <div className={styles.footer}>
            <Input
              placeholder="Введите индекс"
              value={indexInput}
              extraClass={styles.input}
              type="number"
              onChange={indexInputOnChangeHandler}
            />
            <Button
              text="Добавить по индексу"
              linkedList="big"
              onClick={() => {
                if (+indexInput >= 0 && +indexInput <= list.length - 1) {
                  addByIndex(valueInput, +indexInput);
                }
              }}
              disabled={
                !valueInput ||
                !indexInput ||
                isLoading.addHead ||
                isLoading.addTail ||
                isLoading.delHead ||
                isLoading.addTail ||
                isLoading.delByIdx ||
                list.length >= linkedList.current.getSizeLimit() ||
                +indexInput < 0 ||
                +indexInput > list.length - 1
              }
              isLoader={isLoading.addByIdx}
            />
            <Button
              text="Удалить по индексу"
              linkedList="big"
              onClick={() => {
                if (+indexInput >= 0 && +indexInput <= list.length - 1) {
                  deleteByIndex(+indexInput);
                }
              }}
              disabled={
                !indexInput ||
                !list.length ||
                isLoading.addHead ||
                isLoading.addTail ||
                isLoading.addByIdx ||
                isLoading.delHead ||
                isLoading.delTail ||
                +indexInput < 0 ||
                +indexInput > list.length - 1
              }
              isLoader={isLoading.delByIdx}
            />
          </div>
        </div>
        <ul className={styles.field}>
          {list &&
            list.map((el, idx) => (
              <li key={idx} className={styles.circleBox}>
                <Circle
                  head={
                    el.head.type === CIRCLE ? (
                      <Circle
                        letter={el.head.value}
                        isSmall
                        state={el.head.state}
                      />
                    ) : (
                      el.head.value
                    )
                  }
                  tail={
                    el.tail?.type === CIRCLE ? (
                      <Circle
                        letter={el.tail?.value}
                        isSmall
                        state={el.tail?.state}
                      />
                    ) : (
                      el.tail?.value
                    )
                  }
                  letter={el.value}
                  index={idx}
                  state={el.state}
                />
                {idx !== list.length - 1 && <ArrowIcon />}
              </li>
            ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
