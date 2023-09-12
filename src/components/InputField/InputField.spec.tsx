import "@testing-library/jest-dom/extend-expect";
import { InputField } from "./InputField";
import { fireEvent, render, screen } from "@testing-library/react";

const handleChangeMock = jest.fn();

interface renderInputFieldOptions {
  defaultValue?: string;
  disabled?: boolean;
}

const renderInputField = ({ defaultValue, disabled = false }: renderInputFieldOptions = {}) => {
  const utils = render(
    <InputField id="test-input" label="test input" value={defaultValue} onChange={handleChangeMock} disabled={disabled} />,
  );

  const inputContainer = utils.getByTestId("inputField");
  const input = screen.getByLabelText("test input");
  return { input, inputContainer, ...utils };
};

describe("InputField", () => {
  it("renders with a label", () => {
    const { inputContainer, getByText } = renderInputField();

    expect(inputContainer).toBeInTheDocument();
    expect(getByText("test input")).toBeInTheDocument();
  });

  it("starts with the correct initial value", () => {
    const { getByDisplayValue } = renderInputField({defaultValue: "dog face"});

    expect(getByDisplayValue("dog face")).toBeInTheDocument();
  });

  it("updates the value correctly on keypress", () => {
    const { input } = renderInputField();

    fireEvent.change(input, { target: { value: "hi dog"}});

    expect(handleChangeMock).toHaveBeenCalledWith("hi dog");
  });

  it("doesn't work if it's disabled", () => {
    const { input } = renderInputField({ disabled: true });

    fireEvent.change(input, { target: { value: "hi dog"}});

    expect(input).toHaveAttribute("disabled");
  });
});
