import styles from "./Header.module.scss";
import { Button } from "../../components/Button";
import { useModal } from "../../services/hooks/modal";
import { Modal } from "../../components/Modal";
import { Settings } from "../../components/Settings";
import { Store } from "../../components/Store";

export const Header = () => {
  const { isOpen, content, openModal, closeModal } = useModal();

  const openStore = () => {
    openModal(<Store />);
  };

  const openSettings = () => {
    openModal(<Settings closeModal={closeModal} />);
  };

  return (
    <>
      <Modal isOpen={isOpen} content={content} onClose={closeModal} />
      <div className={styles.header}>
        <section>
          <Button onClick={openSettings} data-testid="settings-btn" direction={"left"}>
            SETTINGS
          </Button>
          <h2>MTX</h2>
        </section>

        <img src="/tie.svg" alt="orange tie icon (MTX INC Logo)" />

        <section>
          <h2>INC</h2>
          <Button onClick={openStore} data-testid="store-btn" className="right">
            STORE
          </Button>
        </section>
      </div>
    </>
  );
};
