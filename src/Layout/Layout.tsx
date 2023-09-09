import { Header } from "./Header";
import { FormManager } from "./FormManager";
import { LoggedInUsers } from "../components/LoggedInUsers";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <FormManager />
      <LoggedInUsers />
    </>
  );
};
