import { ElementStates } from "../../types/element-states";
import { TColumns } from "./sorting-page";

export function newRandomColumns(
  setColumns: React.Dispatch<React.SetStateAction<TColumns[]>>
) {
  const lengthRandom = Math.floor(Math.random() * 4) + 5;

  const arrayRandomSize = new Array(lengthRandom).fill(null).map(() => ({
    index: Math.floor(Math.random() * 100),
  }));

  setColumns(arrayRandomSize);
}

export function selectionSort(
  columns: TColumns[],
  setColumns: React.Dispatch<React.SetStateAction<TColumns[]>>,
  asc: boolean = true
): TColumns[] {
  const array = [...columns];
  const length = array.length;

  for (let i = 0; i < length; i++) {
    let minIndex = i;

    for (let j = i; j < length; j++) {
      if (asc) {
        if (array[j].index < array[minIndex].index) {
          minIndex = j;
        }
      } else if (!asc) {
        if (array[j].index > array[minIndex].index) {
          minIndex = j;
        }
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    const newColumns = array.map((column, index) => ({
      index: column.index,
      state:
        index === i || index === minIndex
          ? ElementStates.Changing
          : index < i
          ? ElementStates.Modified
          : ElementStates.Default,
    }));

    setTimeout(() => {
      setColumns(newColumns);
    }, i * 1000);
  }

  setTimeout(() => {
    const finalColumns = array.map((column) => ({
      index: column.index,
      state: ElementStates.Modified,
    }));
    setColumns(finalColumns);
  }, length * 1000);

  return array;
}

export async function bubbleSort(
  columns: TColumns[],
  setColumns: React.Dispatch<React.SetStateAction<TColumns[]>>,
  asc: boolean = true
): Promise<TColumns[]> {
  const array = [...columns];
  const length = array.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (
        (asc && array[j].index > array[j + 1].index) ||
        (!asc && array[j].index < array[j + 1].index)
      ) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        const newColumns = array.map((column, index) => ({
          index: column.index,
          state:
            index === j || index === j + 1
              ? ElementStates.Changing
              : ElementStates.Default,
        }));

        array[j].state = ElementStates.Modified;

        setColumns(newColumns);

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  const finalColumns = array.map((column) => ({
    index: column.index,
    state: ElementStates.Modified,
  }));

  setColumns(finalColumns);

  return array;
}

// export async function bubbleSort(
//   columns: TColumns[],
//   setColumns: React.Dispatch<React.SetStateAction<TColumns[]>>,
//   asc: boolean = true
// ): Promise<TColumns[]> {
//   const array = [...columns];
//   const length = array.length;

//   let swapped;
//   do {
//     swapped = false;
//     for (let i = 0; i < length - 1; i++) {
//       if (
//         (asc && array[i].index > array[i + 1].index) ||
//         (!asc && array[i].index < array[i + 1].index)
//       ) {
//         [array[i], array[i + 1]] = [array[i + 1], array[i]];
//         swapped = true;

//         const newColumns = array.map((column, index) => ({
//           index: column.index,
//           state:
//             index === i || index === i + 1
//               ? ElementStates.Changing
//               : ElementStates.Default,
//         }));

//         setColumns(newColumns);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//       }
//     }
//   } while (swapped);

//   const finalColumns = array.map((column) => ({
//     index: column.index,
//     state: ElementStates.Modified,
//   }));
//   setColumns(finalColumns);

//   return array;
// }
