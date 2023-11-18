import { LoginForm } from "./Forms/LoginForm";
import { SignupForm } from "./Forms/SignupForm";
import { CompanyForm } from "./Forms/CompanyForm";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

enum FormState {
  Company,
  Signup,
  Login,
}

export const FormManager: React.FC = () => {
  const { companyName, isRegistered } = useSelector(
    (state: RootState) => state.company,
  );

  console.log(isRegistered);

  const [formState, setFormState] = useState<FormState>();

  useEffect(() => {
    setFormState(isRegistered ? FormState.Signup : FormState.Company);

  }, [isRegistered]);

  const renderForm = () => {
    switch (formState) {
      case FormState.Company: 
        return <CompanyForm />;
      case FormState.Signup:
        return <SignupForm button={() => setFormState(FormState.Login)} />;
      case FormState.Login:
        return <LoginForm button={() => setFormState(FormState.Signup)} />;
      default:
        return null;
    }
  };

  return (
    <>
      {formState !== FormState.Company  && <h1>{companyName}</h1>}
      {renderForm()}
    </>
  );
};
