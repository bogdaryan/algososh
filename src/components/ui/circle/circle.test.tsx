import { render } from "@testing-library/react";
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

describe("Компонент Circle", () => {
  it("Snapshot: Рендер без буквы", () => {
    const { asFragment } = render(<Circle />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер с буквой", () => {
    const { asFragment } = render(<Circle letter="test" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер с head", () => {
    const { asFragment } = render(<Circle head="head" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер с react-элементом в head", () => {
    const head = <Circle isSmall />;
    const { asFragment } = render(<Circle head={head} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер с tail", () => {
    const { asFragment } = render(<Circle tail="tail" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер с react-элементом в tail", () => {
    const tail = <Circle isSmall />;
    const { asFragment } = render(<Circle tail={tail} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер с index", () => {
    const { asFragment } = render(<Circle index={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Snapshot: Рендер с пропом "isSmall ===  true"', () => {
    const { asFragment } = render(<Circle isSmall />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер в состоянии default", () => {
    const { asFragment } = render(<Circle state={ElementStates.Default} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер в состоянии changing", () => {
    const { asFragment } = render(<Circle state={ElementStates.Changing} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Snapshot: Рендер в состоянии modified", () => {
    const { asFragment } = render(<Circle state={ElementStates.Modified} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
