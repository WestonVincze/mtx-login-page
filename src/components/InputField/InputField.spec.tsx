import "@testing-library/jest-dom/extend-expect";
import { InputField } from "./InputField";
import { render } from "@testing-library/react";

const handleChangeMock = jest.fn();

interface renderInputFieldOptions {
  defaultValue?: string;
}

const renderInputField = ({ defaultValue }: renderInputFieldOptions = {}) => {
  const utils = render(
    <InputField id="test" label="label" onChange={handleChangeMock} />,
  );

  return { ...utils };
};

describe("InputField", () => {
  it("renders", () => {
    const { getByTestId } = renderInputField();

    expect(getByTestId("inputField")).toBeInTheDocument();
  });
});
