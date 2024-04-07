import React, { ChangeEvent, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./Stack";
import { DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const stack = useRef(new Stack(20));
  const [stackItems, setStackItems] = useState<string[]>(
    stack.current.elements
  );
  const [inputValue, setInputValue] = useState("");
  const [lastElementState, setLastElementState] = useState(
    ElementStates.Changing
  );
  const [loadingState, setLoadingState] = useState({
    adding: false,
    deleting: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addToStack = (item: string) => {
    setLoadingState((prev) => ({ ...prev, adding: true }));
    setLastElementState(ElementStates.Changing);
    stack.current.push(item);
    setStackItems([...stack.current.elements]);
    setInputValue("");
    setTimeout(() => {
      setLastElementState(ElementStates.Default);
      setLoadingState((prev) => ({ ...prev, adding: false }));
    }, DELAY_IN_MS);
  };

  const deleteFromStack = () => {
    setLoadingState((prev) => ({ ...prev, deleting: true }));
    setLastElementState(ElementStates.Changing);
    setTimeout(() => {
      stack.current.pop();
      setStackItems([...stack.current.elements]);
      setLastElementState(ElementStates.Default);
      setLoadingState((prev) => ({ ...prev, deleting: false }));
    }, DELAY_IN_MS);
  };

  const clearStack = () => {
    stack.current.clear();
    setStackItems(stack.current.elements);
  };

  const isStackEmpty = !stackItems.length;

  return (
    <SolutionLayout title="Стек">
      <section className="container">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="wrapper">
            <Input
              isLimitText={true}
              maxLength={4}
              value={inputValue}
              onChange={handleInputChange}
              extraClass="mr-12"
            />
            <Button
              text="Добавить"
              onClick={() => addToStack(inputValue)}
              disabled={
                !inputValue || stack.current.size >= stack.current.stackLimit
              }
              isLoader={loadingState.adding}
            />
            <Button
              text="Удалить"
              onClick={deleteFromStack}
              disabled={isStackEmpty || loadingState.adding}
              isLoader={loadingState.deleting}
            />
          </div>
          <Button
            text="Очистить"
            onClick={clearStack}
            disabled={
              isStackEmpty || loadingState.adding || loadingState.deleting
            }
          />
        </form>
        <ul className="field">
          {stackItems &&
            stackItems.map((i, index) => (
              <li key={index}>
                <Circle
                  letter={i}
                  index={index}
                  head={stack.current.lastIndex === index ? "top" : null}
                  state={
                    stack.current.lastIndex === index
                      ? lastElementState
                      : ElementStates.Default
                  }
                />
              </li>
            ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
