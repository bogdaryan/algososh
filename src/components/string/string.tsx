import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

type TCirclesState = {
  letter: string;
  state?: ElementStates;
};

function reverseString(
  string: string,
  setLetters: React.Dispatch<React.SetStateAction<TCirclesState[]>>
): void {
  const letters: string[] = string.split("");
  let left = 0;
  let right = letters.length - 1;

  const updatedLetters = letters.map((letter) => ({
    letter,
    state: ElementStates.Default,
  }));

  setLetters(updatedLetters);

  const interval = setInterval(() => {
    if (left >= right) {
      clearInterval(interval);

      const finalLetters = letters.map((letter) => ({
        letter,
        state: ElementStates.Modified,
      }));

      setLetters(finalLetters);
      return;
    }

    const updatedLetters = letters.map((letter, index) => {
      let state = ElementStates.Default;

      if (left === index || right === index) {
        state = ElementStates.Changing;
      } else if (index < left || index > right) {
        state = ElementStates.Modified;
      }

      return { letter, state };
    });

    const temp = letters[left];
    letters[left] = letters[right];
    letters[right] = temp;

    setLetters(updatedLetters);

    left++;
    right--;
  }, DELAY_IN_MS);
}

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>("");
  const [circles, setCircles] = useState<TCirclesState[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function onClick() {
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
        <form className={styles.form}>
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
