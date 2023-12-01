import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  registerNewCompany,
  updateCompanyName,
  getCompany,
} from "../../api/company";
import {
  setCompanyName,
  registerCompany,
  unRegisterCompany,
} from "../../slices/companySlice";
import { getUnlockedCharacters } from "../../api/unlockedCharacters";
import { setUnlockedCharacters } from "../../slices/unlockedCharactersSlice";

export const useCompany = () => {
  // const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();

  const companyName = useSelector(
    (state: RootState) => state.company.companyName,
  );

  // if company is already registered then we should load its data to redux
  const handleRegisterNewCompany = async(name: string) => {
    try {
      const company = await getCompany(name);
      if (company) {
        dispatch(setCompanyName(name));
        dispatch(registerCompany());
        const characters = await getUnlockedCharacters(companyName);
        dispatch(setUnlockedCharacters(characters));
        return;
      }
      await registerNewCompany(name);
      dispatch(registerCompany());
      dispatch(setCompanyName(name));
    } catch (error) {
      setError((error as Error).message);
    }
  };

  // TODO: change to "selectedCompoany"?
  const handleUnRegisterCompany = () => {
    dispatch(unRegisterCompany());
  };

  const handleResetCompanyLocalState = () => {
    dispatch(unRegisterCompany());
    dispatch(setCompanyName(""));
  };

  // const handleChangeCompany = () => {};

  const handleUpdateCompanyName = async(newCompanyName: string) => {
    try {
      await updateCompanyName(companyName, newCompanyName);
      dispatch(setCompanyName(newCompanyName));
      dispatch(registerCompany());
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return {
    error,
    resetCompanyLocalState: handleResetCompanyLocalState,
    registerCompany: handleRegisterNewCompany,
    unRegisterCompany: handleUnRegisterCompany,
    updateCompanyName: handleUpdateCompanyName,
  };
};
