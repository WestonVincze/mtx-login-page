import ReactModal from "react-modal";
import { Button } from "../Button";
import styles from "./Modal.module.scss";

export const Modal: React.FC<ModalProps> = ({ isOpen, content, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
    >
      <div className={styles.modalHeader}>
        <Button onClick={() => onClose()}>&times;</Button>
      </div>
      {content}
    </ReactModal>
  );
};

interface ModalProps {
  isOpen: boolean;
  content: React.ReactNode;
  onClose: () => void;
}
