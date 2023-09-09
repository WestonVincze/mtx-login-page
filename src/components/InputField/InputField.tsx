import styles from "./InputField.module.scss";

export interface InputFieldProps {
  id: string;
  label: string;
  fieldType: string;
  value: string;
  onChange(value: string): void;
  disabled?: boolean;
}

// TODO: add ID so that label can work properly
export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  fieldType,
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={fieldType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};
