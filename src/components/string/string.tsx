import React, { FormEvent, useCallback, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { getArrayOfLetters, getCircleState } from "./utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [letters, setLetters] = useState<{
    arr: string[];
    step: number;
  } | null>(null);

  const onClickHandler = useCallback(() => {
    const array = getArrayOfLetters(inputValue);

    if (!array) return;

    setIsLoading(true);

    let step = 0;
    setLetters({ arr: array[step], step: -1 });

    const timerId = setInterval(() => {
      if (step < array.length) {
        setLetters({ arr: array[step], step });
        step++;
      } else {
        clearInterval(timerId);
        setIsLoading(false);
        setInputValue("");
      }
    }, DELAY_IN_MS);
  }, [inputValue]);

  return (
    <SolutionLayout title="Строка">
      <section className="container">
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Input
            isLimitText={true}
            max={11}
            maxLength={11}
            extraClass="mr-12"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setInputValue(e.currentTarget.value)
            }
          />
          <Button
            onClick={onClickHandler}
            text="Развернуть"
            disabled={!inputValue || isLoading}
            isLoader={isLoading}
          />
        </form>
        <ul className={styles.field}>
          {letters?.arr &&
            letters.arr.map((letter, idx) => (
              <li key={idx}>
                <Circle
                  letter={letter}
                  state={getCircleState(idx, letters.step, letters.arr.length)}
                />
              </li>
            ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
