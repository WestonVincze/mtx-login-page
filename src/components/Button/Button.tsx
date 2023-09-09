import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

export const Button: React.FC<ButtonProps> = ({
  onClick = () => null,
  children,
  ...props
}) => {
  return (
    <button
      className={styles.button}
      onClick={() => onClick()}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => null | void;
}
