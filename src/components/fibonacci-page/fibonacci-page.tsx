import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";

import { fibonacciWithSteps } from "./fibonacci";
import { DELAY_IN_MS } from "../../constants/delays";

export type TCirclesState = {
  number: number;
  index: number;
};

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState(0);
  const [steps, setSteps] = useState<number[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startAlgorithm = (e: FormEvent) => {
    e.preventDefault();
    const newSteps = fibonacciWithSteps(input);

    setSteps(newSteps);
    setCurrentStepIndex(0);

    if (!newSteps.length) return;

    let index = 0;

    const intervalId = setInterval(() => {
      if (index >= newSteps.length - 1) {
        clearInterval(intervalId);
        return;
      }

      setCurrentStepIndex(++index);
    }, DELAY_IN_MS);
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
              setInput(Number(e.currentTarget.value))
            }
          />
          <Button onClick={startAlgorithm} text="Рассчитать" />
        </form>
        <div className={styles.field}>
          {steps?.[currentStepIndex].map((char, index) => {
            return <Circle letter={char + ""} index={index} key={index} />;
          })}
        </div>
      </section>
    </SolutionLayout>
  );
};
