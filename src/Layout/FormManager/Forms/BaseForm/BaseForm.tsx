import { Button } from "../../../../components/Button";
import { InputFieldProps, RestrictedInputField } from "../../../../components/RestrictedInputField";
import { InputField } from "../../../../components/InputField";
import styles from "./BaseForm.module.scss";

interface BaseFormProps {
  restricted: boolean;
  fields: InputFieldProps[];
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onSubmitText?: string;
  onBack?: () => void;
  onBackText?: string;
  loading?: boolean;
}

export const BaseForm = ({ fields, restricted, onSubmit, onSubmitText = "Submit", onBack, onBackText, loading = false }: BaseFormProps) => {
  const Input = restricted ? RestrictedInputField : InputField;

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {fields.map((field, i) => 
        <Input key={i} {...field} />
      )}
      <div>
        {onBack && <Button onClick={() => onBack?.()} direction="left">{onBackText}</Button>}
        <Button type="submit" disabled={loading}>
          {onSubmitText} 
        </Button>
      </div>
    </form>
  );
};