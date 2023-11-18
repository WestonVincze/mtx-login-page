import { useEffect, useState } from "react";
import { useUsers } from "../../../../services/hooks/users";
import { toast } from "react-toastify";
import { BaseForm } from "../BaseForm";

function passwordMatch(password1: string, password2: string): boolean {
  return password1 === password2;
}

interface SignupFormProps {
  button?: () => void;
}

export const SignupForm = ({ button }: SignupFormProps) => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { error, loading, signup } = useUsers();

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }, [error]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!passwordMatch(password1, password2)) {
      toast.error("Password fields don't match.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    await signup({ username, password: password1 });
  }
  return (
    <div className="LoginPage">
      <h2>NEW USER</h2>
      <BaseForm
        fields={[{
          id: "signup-username",
          label:"username",
          fieldType:"text",
          value: username,
          onChange: setUsername,
        },
        {
          id: "signup-password-1",
          label: "password",
          fieldType: "password",
          value: password1,
          onChange: setPassword1,
        },
        {
          id: "signup-password-2",
          label: "confirm",
          fieldType: "password",
          value: password2,
          onChange: setPassword2,
        },
      ]}
        onSubmit={handleSubmit}
        onBack={() => button()}
        onBackText="Already Signed Up?"
        loading={loading}
       />
    </div>
  );
};
