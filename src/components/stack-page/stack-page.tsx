import React, { FormEvent, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  function onClick(e: FormEvent) {
    e.preventDefault();
    const input = inputRef.current;
    const value = input!.value;
  }

  return (
    <SolutionLayout title="Стек">
      <section className="container">
        <form className="form" onSubmit={onClick}>
          <div className="wrapper">
            <Input
              isLimitText={true}
              max={4}
              maxLength={4}
              extraClass="mr-12"
              ref={inputRef}
            />
            <Button text="Добавить" />
            <Button text="Удалить" />
          </div>
          <Button text="Очистить" />
        </form>
        <div className="field">
          <Circle letter="1" index={0} />
          <Circle letter="2" index={1} />
          <Circle letter="3" index={2} />
          <Circle
            letter="4"
            index={3}
            head={"top"}
            state={ElementStates.Changing}
          />
        </div>
      </section>
    </SolutionLayout>
  );
};
