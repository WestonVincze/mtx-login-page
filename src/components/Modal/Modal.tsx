import ReactModal from "react-modal";
import { Button } from "../Button";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  content: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ isOpen, content, onClose }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      style={{
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.35)",
          zIndex: 5,
        },
      }}
    >
      <div className={styles.modalHeader} data-testid="modal">
        <Button onClick={() => onClose()} data-testid="close-btn">&times;</Button>
      </div>
      {content}
    </ReactModal>
  );
};
