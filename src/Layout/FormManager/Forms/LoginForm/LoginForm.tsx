import React, { useEffect, useState } from "react";
import { RestrictedInputField } from "../../../../components/RestrictedInputField";
import { toast } from "react-toastify";
import { useUsers } from "../../../../services/hooks/users";
import { Button } from "../../../../components/Button";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, error } = useUsers();

  useEffect(() => {
    if (error !== null)
      toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT });
  }, [error]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (await login({ username, password })) {
      toast.success(`${username} logged in.`, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      setUsername("");
      setPassword("");
    }
    setLoading(false);
  }

  return (
    <div className="LoginPage">
      <h2>LOG IN</h2>
      <form onSubmit={handleSubmit}>
        <RestrictedInputField
          id="login-username"
          label="username"
          fieldType="text"
          value={username}
          onChange={setUsername}
          disabled={loading}
        />
        <RestrictedInputField
          id="login-password"
          label="password"
          fieldType="password"
          value={password}
          onChange={setPassword}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
