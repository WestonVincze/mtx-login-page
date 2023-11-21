import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useCompany } from "../../../../services/hooks/company/company";
import { toast } from "react-toastify";
import { BaseForm } from "../BaseForm";

export const CompanyForm = () => {
  const { companyName, isRegistered } = useSelector(
    (state: RootState) => state.company,
  );
  const [company, setCompany] = useState(companyName);
  const { registerCompany, updateCompanyName, error } = useCompany();

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }, [error]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isRegistered) {
      updateCompanyName(company);
    } else {
      registerCompany(company);
    }
  }

  return (
    <>
      <h2>{isRegistered ? "Rename" : "Register"} Your Company</h2>
      <BaseForm
        restricted={false}
        fields={[
          {
            id: "company-name",
            label: "Company",
            value: company,
            fieldType: "text",
            onChange: setCompany,
          }
        ]}
        onSubmit={handleSubmit}
      />
    </>
  );
};
