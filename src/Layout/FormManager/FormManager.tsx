import { Switch } from "../../components/Switch";
import { LoginForm } from "./Forms/LoginForm";
import { SignupForm } from "./Forms/SignupForm";
import { CompanyForm } from "./Forms/CompanyForm";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const FormManager: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const { companyName, isRegistered } = useSelector(
    (state: RootState) => state.company
  );

  return (
    <>
      {isRegistered ? (
        <>
          <h1>{companyName}</h1>
          <Switch />
          <SignupForm />
          <LoginForm />
        </>
      ) : (
        <CompanyForm />
      )}
    </>
  );
};
