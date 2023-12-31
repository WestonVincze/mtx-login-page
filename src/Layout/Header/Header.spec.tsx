import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Header } from "./Header";
import { store } from "../../store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";

describe("Header", () => {
  beforeEach(() => {
    ReactModal.setAppElement(document.createElement("div"));
  });

  it("renders", () => {
    const { getByTestId } = render(<Header />);

    const settings = getByTestId("settings-btn");
    const store = getByTestId("store-btn");

    expect(settings).toBeInTheDocument();
    expect(store).toBeInTheDocument();
  });

  it("can open the store modal", async() => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const storeBtn = getByTestId("store-btn");

    fireEvent.click(storeBtn);

    await waitFor(() => {
      expect(getByTestId("store-modal")).toBeInTheDocument();
    });
  });

  /** settings replaced with reset data
  it("can open the settings modal", async() => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const settingsBtn = getByTestId("settings-btn");

    fireEvent.click(settingsBtn);

    await waitFor(() => {
      expect(getByTestId("settings-modal")).toBeInTheDocument();
    });
  });
  **/
});
