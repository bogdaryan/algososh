import React, { FormEvent, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TCirclesState } from "../../lib/reversString";

import { reverseString } from "../../lib/reversString";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>("");
  const [circles, setCircles] = useState<TCirclesState[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function onClick(e: FormEvent) {
    e.preventDefault();
    const input = inputRef.current;
    const value = input!.value;

    setString(value);
  }

  useEffect(() => {
    if (string) {
      reverseString(string, setCircles);
    }
  }, [string]);

  return (
    <SolutionLayout title="Строка">
      <section className="container">
        <form className={styles.form} onSubmit={onClick}>
          <Input
            isLimitText={true}
            max={11}
            maxLength={11}
            extraClass="mr-12"
            ref={inputRef}
          />
          <Button onClick={onClick} text="Развернуть" />
        </form>
        <div className={styles.field}>
          {circles &&
            circles.map((circle, index) => (
              <Circle letter={circle.letter} key={index} state={circle.state} />
            ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
