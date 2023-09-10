import "@testing-library/jest-dom/extend-expect";
import { Button } from "./Button";
import { fireEvent, render } from "@testing-library/react";

const handleClickMock = jest.fn();

describe("Button", () => {
  it("renders", () => {
    const { getByTestId } = render(<Button data-testid="button" />);

    expect(getByTestId("button")).toBeInTheDocument();
  });

  it("renders with text", () => {
    const { getByText } = render(<Button data-testid="button">Button Text</Button>);

    expect(getByText("Button Text")).toBeInTheDocument();
  });

  it("calls the onClick function", () => {
    const { getByTestId } = render(<Button data-testid="button" onClick={handleClickMock} />);

    fireEvent.click(getByTestId("button"));

    expect(handleClickMock).toHaveBeenCalled();
  });
});