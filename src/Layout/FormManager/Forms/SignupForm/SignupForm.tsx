import { useEffect, useState } from "react";
import { RestrictedInputField } from "../../../../components/RestrictedInputField";
import { useUsers } from "../../../../services/hooks/users";
import { Button } from "../../../../components/Button";
import { toast } from "react-toastify";

function passwordMatch(password1: string, password2: string): boolean {
  return password1 === password2;
}

export const SignupForm = () => {
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
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit}>
        <RestrictedInputField
          id="signup-username"
          label="username"
          fieldType="text"
          value={username}
          onChange={setUsername}
          disabled={loading}
        />
        <RestrictedInputField
          id="signup-password-1"
          label="password"
          fieldType="password"
          value={password1}
          onChange={setPassword1}
          disabled={loading}
        />
        <RestrictedInputField
          id="signup-password-2"
          label="re-enter password"
          fieldType="password"
          value={password2}
          onChange={setPassword2}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          SIGN UP
        </Button>
      </form>
    </div>
  );
};
