import React, { FormEvent, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { DELAY_IN_MS } from "../../constants/delays";

type TCirclesState = {
  number: number;
  index: number;
};

function fibonacci(
  n: number,
  setCircles: React.Dispatch<React.SetStateAction<TCirclesState[]>>
): void {
  let a = 0;
  let b = 1;
  let index = 0;

  const interval = setInterval(() => {
    if (index >= n) {
      clearInterval(interval);
      return;
    }

    const nextFib = index < 2 ? 1 : a + b;
    a = b;
    b = nextFib;

    setCircles((prevCircles) => [...prevCircles, { number: nextFib, index }]);

    index++;
  }, DELAY_IN_MS);
}

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [circles, setCircles] = useState<TCirclesState[]>([]);

  function onClick(e: FormEvent) {
    e.preventDefault();
    const input = inputRef.current;
    const value = input!.value;

    setNumber(Number(value));
  }

  useEffect(() => {
    if (number) {
      fibonacci(number, setCircles);
    }
  }, [number]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className="container">
        <form className={styles.form} onSubmit={onClick}>
          <Input
            type="number"
            isLimitText={true}
            max={20}
            extraClass="mr-12"
            ref={inputRef}
          />
          <Button onClick={onClick} text="Рассчитать" />
        </form>
        <div className={styles.field}>
          {circles &&
            circles.map((circle: any, index: any) => (
              <Circle letter={circle.number} key={index} index={circle.index} />
            ))}
        </div>
      </section>
    </SolutionLayout>
  );
};
