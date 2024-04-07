import { getArrayOfLetters, getCircleState } from "./utils";

describe("Разворот строки", () => {
  it("с чётным количеством символов", () => {
    const result = getArrayOfLetters("1234");
    expect(result).toEqual([
      ["1", "2", "3", "4"],
      ["4", "2", "3", "1"],
      ["4", "3", "2", "1"],
    ]);
  });

  it("с нечетным количеством символов", () => {
    const result = getArrayOfLetters("123");
    expect(result).toEqual([
      ["1", "2", "3"],
      ["3", "2", "1"],
      ["3", "2", "1"],
    ]);
  });

  it("с одним символом", () => {
    const result = getArrayOfLetters("1");
    expect(result).toEqual([["1"], ["1"]]);
  });

  it("пустуя строка", () => {
    const result = getArrayOfLetters("");
    expect(result).toBe(null);
  });
});

describe("Получение состояния элементов", () => {
  it("modified", () => {
    const result = getCircleState(3, 5, 7);
    expect(result).toBe("modified");
  });

  it("changing", () => {
    const result = getCircleState(3, 3, 7);
    expect(result).toBe("changing");
  });

  it("default", () => {
    const result = getCircleState(3, 2, 7);
    expect(result).toBe("default");
  });
});
