import styles from "./InputField.module.scss";

export interface InputFieldProps {
  id: string;
  label: string;
  fieldType?: string;
  value?: string;
  onChange(value: string): void;
  disabled?: boolean;
}

export const InputField = ({
  id,
  label,
  fieldType = "text",
  value = "",
  onChange,
  disabled = false,
}: InputFieldProps) => {
  return (
    <div className={styles.inputField} data-testid="inputField">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={fieldType}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};
