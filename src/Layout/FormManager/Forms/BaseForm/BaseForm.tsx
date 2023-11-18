import { Button } from "../../../../components/Button";
import { InputFieldProps, RestrictedInputField } from "../../../../components/RestrictedInputField";
import styles from "./BaseForm.module.scss";

interface BaseFormProps {
  fields: InputFieldProps[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onBack?: () => void;
  onBackText?: string;
  loading: boolean;
}

export const BaseForm = ({ onSubmit, fields, onBack, onBackText, loading }: BaseFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {fields.map((input, i) => 
        <RestrictedInputField key={i} {...input} />
      )}
      <div>
        <Button onClick={() => onBack?.()} direction="left">{onBackText}</Button>
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </div>
    </form>
  );
};