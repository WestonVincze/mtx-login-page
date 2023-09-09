import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { signupUser, loginUser } from "../../api/users";
import { loginSuccess, logoutSuccess } from "../../slices/loginSlice";
import { User } from "../../types";

const MOCK_RESPONSE_TIME = 400;

export const useUsers = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const companyName = useSelector(
    (state: RootState) => state.company.companyName
  );

  const loggedInUsers = useSelector(
    (state: RootState) => state.login.loggedInUsers
  );

  const handleSignup = async (user: User): Promise<boolean> => {
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, MOCK_RESPONSE_TIME));
    // validate that all characters are owned within the store
    // where should this logic go?
    try {
      await signupUser(user, companyName);
      setLoading(false);
      return true;
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
      return false;
    }
  };

  const handleLogin = async (user: User): Promise<boolean> => {
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, MOCK_RESPONSE_TIME));
    if (loggedInUsers.includes(user.username)) {
      setError(`'${user.username}' is already logged in.`);
      return false;
    }
    try {
      await loginUser(user, companyName);
      dispatch(loginSuccess(user.username));
      setLoading(false);
      return true;
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
      return false;
    }
  };

  const handleLogout = async (username: string) => {
    dispatch(logoutSuccess(username));
  };

  return {
    loading,
    error,
    loggedInUsers,
    signup: handleSignup,
    login: handleLogin,
    logout: handleLogout
  };
};
