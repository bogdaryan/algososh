import { ElementStates } from "../../types/element-states";

type Props = {
  index: number;
  steps: string[][];
  currentStepIndex: number;
};

export default function reverseStringWithSteps(input: string): string[][] {
  const letters = input.split("");
  const steps: string[][] = [[...letters]];

  if (input.length <= 1) {
    return steps;
  }

  for (let left = 0; left < Math.floor(input.length / 2); left++) {
    const right = input.length - 1 - left;

    [letters[left], letters[right]] = [letters[right], letters[left]];

    steps.push([...letters]);
  }

  return steps;
}

export function getCharStatus({ index, steps, currentStepIndex }: Props) {
  const maxIndex = steps[currentStepIndex].length - 1;

  if (
    index < currentStepIndex ||
    index > maxIndex - currentStepIndex ||
    currentStepIndex === steps.length - 1
  ) {
    return ElementStates.Modified;
  }

  if (index === currentStepIndex || index === maxIndex - currentStepIndex) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
}
