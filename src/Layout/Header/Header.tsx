import styles from "./Header.module.scss";
import { Button } from "../../components/Button";
import { useModal } from "../../services/hooks/modal";
import { Modal } from "../../components/Modal";
import { Settings } from "../../components/Settings";
import { Store } from "../../components/Store";
import React from "react";

export const Header: React.FC = () => {
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
        <Button onClick={openSettings}>SETTINGS</Button>
        <Button>TEST</Button>
        <Button onClick={openStore}>STORE</Button>
      </div>
    </>
  );
};
