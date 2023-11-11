import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => null | void;
}

export const Button = ({ onClick, children, ...props }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={() => onClick?.()}
      disabled={props.disabled}
      data-testid={props["data-testid"]}
    >
      {children}
    </button>
  );
};
