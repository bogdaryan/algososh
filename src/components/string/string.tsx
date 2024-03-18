import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import reverseStringWithSteps, { getCharStatus } from "./reversString";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState<string[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startAlgorithm = (e: FormEvent) => {
    e.preventDefault();
    const newSteps = reverseStringWithSteps(input);
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
    <SolutionLayout title="Строка">
      <section className="container">
        <form className={styles.form} onSubmit={startAlgorithm}>
          <Input
            isLimitText={true}
            max={11}
            maxLength={11}
            extraClass="mr-12"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setInput(e.currentTarget.value)
            }
          />
          <Button onClick={startAlgorithm} text="Развернуть" />
        </form>
        <div className={styles.field}>
          {steps?.[currentStepIndex].map((char, index) => {
            const status = getCharStatus({ index, steps, currentStepIndex });

            return <Circle letter={char} state={status} key={index} />;
          })}
        </div>
      </section>
    </SolutionLayout>
  );
};
