import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";

import { fibonacciWithSteps } from "./fibonacci";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TCirclesState = {
  number: number;
  index: number;
};

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<number[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startAlgorithm = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newSteps = fibonacciWithSteps(input);

    setSteps(newSteps);
    setCurrentStepIndex(0);

    if (!newSteps.length) {
      setLoading(false);
      return;
    }

    let index = 0;

    const intervalId = setInterval(() => {
      if (index >= newSteps.length - 1) {
        clearInterval(intervalId);
        setLoading(false);
        return;
      }

      setCurrentStepIndex(++index);
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className="container">
        <form className={styles.form} onSubmit={startAlgorithm}>
          <Input
            type="number"
            isLimitText={true}
            max={19}
            value={input}
            extraClass="mr-12"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setInput(e.currentTarget.value)
            }
          />
          <Button
            onClick={startAlgorithm}
            text="Рассчитать"
            disabled={!input || input > 19 || input < 0 ? true : false}
            isLoader={loading}
          />
        </form>
        <ul className={styles.field}>
          {steps?.[currentStepIndex].map((char, index) => {
            return (
              <li key={index}>
                <Circle letter={char + ""} index={index} key={index} />;
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
