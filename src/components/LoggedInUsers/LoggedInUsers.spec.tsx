import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { LoggedInUsers } from "./LoggedInUsers";
import { useUsers } from "../../services/hooks/users";

jest.mock("../../services/hooks/users");

const mockUseUsers = useUsers as jest.MockedFunction<typeof useUsers>;

const useUsersDefaultValues = {
  loading: false,
  error: "",
  loggedInUsers: ["user1", "user2"],
  logout: jest.fn(),
  signup: jest.fn(),
  login: jest.fn()
};

describe("LoggedInUsers", () => {
  it("renders", () => {
    mockUseUsers.mockReturnValue(useUsersDefaultValues);
    const { getByTestId, getByText } = render(<LoggedInUsers />);

    expect(getByTestId("loggedInUsers")).toBeInTheDocument();
    expect(getByText("user1")).toBeInTheDocument();
    expect(getByText("user2")).toBeInTheDocument();
  });

  it("does not render content if there are no logged in users", () => { 
    mockUseUsers.mockReturnValue({...useUsersDefaultValues, loggedInUsers: []});
    const { queryByTestId } = render(<LoggedInUsers />);

    expect(queryByTestId("title")).not.toBeInTheDocument();
  });

  it("logs out for correct user when logout is clicked", () => {
    const logout = jest.fn();
    mockUseUsers.mockReturnValue({ ...useUsersDefaultValues, logout: logout });
    const { getAllByText } = render(<LoggedInUsers />);

    const button = getAllByText("Log Out");
    fireEvent.click(button[0]);
    expect(logout).toHaveBeenCalledWith("user1");
    fireEvent.click(button[1]);
    expect(logout).toHaveBeenCalledWith("user2");
  });
});