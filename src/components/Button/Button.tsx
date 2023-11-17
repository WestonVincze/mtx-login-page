import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ClipDirection = "left" | "right"; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => null | void;
  direction?: ClipDirection;
}

export const Button = ({ onClick, children, direction = "right", ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[direction]}`}
      onClick={() => onClick?.()}
      disabled={props.disabled}
      data-testid={props["data-testid"]}
    >
      {children}
    </button>
  );
};
