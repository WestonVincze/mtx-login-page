import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./Header";
import ReactModal from "react-modal";

test("React Testing Library works!", () => {
  const { getByText } = render(<div id="root">STORE</div>);
  expect(getByText(/STORE/i)).toBeInTheDocument();
});
/*
import Header from "./Header";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

ReactModal.setAppElement("#test");

describe("Header", () => {
  it("renders", () => {
    const { getByText } = render(
      <div id="test">
        <Header />
      </div>
    );
  });
  /*
  it("renders again", () => {
    const { getByText } = render(<Header />);

    expect(getByText("STORE")).toBeInTheDocument();
  });
});
  */
