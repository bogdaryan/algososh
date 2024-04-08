import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./sorting";

describe("Алгоритм сортировки выбором", () => {
  it("пустой массив", () => {
    expect(selectionSort([], Direction.Ascending)).toBe(null);
  });

  it("массив из одного элемента", () => {
    expect(
      selectionSort(
        [{ value: 1, state: ElementStates.Default }],
        Direction.Ascending
      )
    ).toEqual([[{ value: 1, state: ElementStates.Modified }]]);
  });

  it("массив из нескольких элементов", () => {
    const input = [
      {
        value: 82,
        state: ElementStates.Default,
      },
      {
        value: 4,
        state: ElementStates.Default,
      },
      {
        value: 19,
        state: ElementStates.Default,
      },
    ];

    const output = [
      [
        {
          value: 82,
          state: ElementStates.Changing,
        },
        {
          value: 4,
          state: ElementStates.Changing,
        },
        {
          value: 19,
          state: ElementStates.Default,
        },
      ],
      [
        {
          value: 82,
          state: ElementStates.Default,
        },
        {
          value: 4,
          state: ElementStates.Changing,
        },
        {
          value: 19,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 4,
          state: ElementStates.Modified,
        },
        {
          value: 82,
          state: ElementStates.Changing,
        },
        {
          value: 19,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 4,
          state: ElementStates.Modified,
        },
        {
          value: 19,
          state: ElementStates.Modified,
        },
        {
          value: 82,
          state: ElementStates.Modified,
        },
      ],
    ];
    expect(selectionSort(input, Direction.Ascending)).toEqual(output);
  });
});

describe("Алгоритм сортировки пузырьком", () => {
  it("пустой массив", () => {
    expect(bubbleSort([], Direction.Ascending)).toBe(null);
  });

  it("массив из одного элемента", () => {
    expect(
      bubbleSort(
        [{ value: 1, state: ElementStates.Default }],
        Direction.Ascending
      )
    ).toEqual([[{ value: 1, state: ElementStates.Modified }]]);
  });

  it("массив из нескольких элементов", () => {
    const input = [
      {
        value: 22,
        state: ElementStates.Default,
      },
      {
        value: 65,
        state: ElementStates.Default,
      },
      {
        value: 41,
        state: ElementStates.Default,
      },
    ];

    const output = [
      [
        {
          value: 22,
          state: ElementStates.Changing,
        },
        {
          value: 65,
          state: ElementStates.Changing,
        },
        {
          value: 41,
          state: ElementStates.Default,
        },
      ],
      [
        {
          value: 65,
          state: ElementStates.Default,
        },
        {
          value: 22,
          state: ElementStates.Changing,
        },
        {
          value: 41,
          state: ElementStates.Changing,
        },
      ],
      [
        {
          value: 65,
          state: ElementStates.Changing,
        },
        {
          value: 41,
          state: ElementStates.Changing,
        },
        {
          value: 22,
          state: ElementStates.Modified,
        },
      ],
      [
        {
          value: 65,
          state: ElementStates.Modified,
        },
        {
          value: 41,
          state: ElementStates.Modified,
        },
        {
          value: 22,
          state: ElementStates.Modified,
        },
      ],
    ];

    expect(bubbleSort(input, Direction.Descending)).toEqual(output);
  });
});
