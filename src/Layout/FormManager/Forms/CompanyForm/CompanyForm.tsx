import { useEffect, useState } from "react";
import { InputField } from "../../../../components/InputField";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useCompany } from "../../../../services/hooks/company/company";
import { Button } from "../../../../components/Button";
import { toast } from "react-toastify";

export const CompanyForm = () => {
  const { companyName, isRegistered } = useSelector(
    (state: RootState) => state.company
  );
  const [company, setCompany] = useState(companyName);
  const { registerCompany, updateCompanyName, error } = useCompany();

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }, [error]);

  const onRegister = () => {
    if (isRegistered) {
      updateCompanyName(company);
    } else {
      registerCompany(company);
    }
  };

  // register company
  // rename company
  //

  return (
    <>
      <InputField
        id="company-name"
        label="Enter company name:"
        value={company}
        fieldType="text"
        onChange={setCompany}
      />
      <Button onClick={onRegister}>
        {isRegistered ? "Rename" : "Register"}
      </Button>
    </>
  );
};
