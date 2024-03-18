export function fibonacciWithSteps(n: number): number[][] {
  const steps: number[][] = [];

  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    const currentStep: number[] = [];
    let tempA = a;
    let tempB = b;

    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        currentStep.push(tempA);
      } else if (j === 1) {
        currentStep.push(tempB);
      } else {
        const nextFib = tempA + tempB;
        tempA = tempB;
        tempB = nextFib;
        currentStep.push(nextFib);
      }
    }

    steps.push(currentStep);
  }

  return steps;
}
