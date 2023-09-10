import { Button } from "../Button";
import { useCompany } from "../../services/hooks/company";
import React from "react";

interface SettingsProps {
  closeModal: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ closeModal }) => {
  const {
    resetCompanyLocalState,
    unRegisterCompany,
    updateCompanyName,
    error
  } = useCompany();
  //const [data, setData] = useState()
  // rename company
  // change company -> resets company state
  // show company form with no name

  const handleChangeCompany = () => {
    resetCompanyLocalState();
    closeModal();
  };

  // show rename company form
  const handleRenameCompany = () => {
    unRegisterCompany();
    closeModal();
  };

  // TODO: Figure out how to close modal on click...

  return (
    <div data-testid="settings-modal">
      <Button onClick={() => handleRenameCompany()}>Rename Company</Button>
      <Button onClick={() => handleChangeCompany()}>Change Company</Button>
    </div>
  );
};
