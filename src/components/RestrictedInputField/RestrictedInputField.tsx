import { toast } from "react-toastify";
import { InputField, InputFieldProps } from "../InputField";
import { useUnlockedCharacters } from "../../services/hooks/unlockedCharacters";

const ACCEPTED_CHARS_REGEX = /^[a-z0-9!@#$%^&*()-_=+,.<>/?|`~]+$/i;

export const RestrictedInputField = ({
  onChange,
  ...props
}: InputFieldProps) => {
  const { isCharacterUnlocked } = useUnlockedCharacters();

  /* TODO: solve for all methods of data entry */
  function handleChange(value: string) {
    const lastChar = value.charAt(value.length - 1);

    if (!ACCEPTED_CHARS_REGEX.test(lastChar) || isCharacterUnlocked(lastChar)) {
      onChange(value);
    } else {
      toast.error(`You don't own "${lastChar}".`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  return <InputField onChange={handleChange} {...props} />;
};
