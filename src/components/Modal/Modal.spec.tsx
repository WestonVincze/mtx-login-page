import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { Modal } from "./Modal";
import ReactModal from "react-modal";

interface renderModalOptions {
  isOpen?: boolean;
  onClose?: () => void;
}

const renderModal = ({ isOpen, onClose }: renderModalOptions = { isOpen: true, onClose: jest.fn() }) => {
  const utils = render(<Modal content={<p>hi dog</p>} isOpen={isOpen} onClose={onClose} />);
  return { ...utils };
};

describe("Modal", () => {
  beforeEach(() => {
    ReactModal.setAppElement(document.createElement("div"));
  });

  it("renders", () => {
    const { getByTestId } = renderModal();

    expect(getByTestId("modal")).toBeInTheDocument();
  });

  it("renders the content", () => {
    const { getByText } = renderModal();

    expect(getByText("hi dog")).toBeInTheDocument();
  });

  it("does not render if it's not open", () => {
    const { queryByTestId } = renderModal({isOpen: false});

    expect(queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    const { getByTestId } = renderModal({ isOpen: true, onClose: onClose });

    fireEvent.click(getByTestId("close-btn"));
    expect(onClose).toHaveBeenCalled();
  });
});