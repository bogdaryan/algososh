import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./button";

describe("Компонент Button", () => {
  it("Компонент есть в документе", () => {
    render(<Button />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("Snapshot: кнопка с текстом", () => {
    const { asFragment } = render(<Button text="Click me" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: кнопка без текста", () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: заблокированная кнопка", () => {
    const { asFragment } = render(<Button disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: кнопка с индикацией загрузки", () => {
    const { asFragment } = render(<Button isLoader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Нажатие на кнопку вызывает колбек", () => {
    const onClickCb = jest.fn();
    render(<Button onClick={onClickCb} />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(onClickCb).toHaveBeenCalledTimes(1);
  });
});
