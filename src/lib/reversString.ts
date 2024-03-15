import { DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";

export type TCirclesState = {
  letter: string;
  state?: ElementStates;
};

export function reverseString(
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
