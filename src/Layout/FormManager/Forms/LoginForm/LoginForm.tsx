import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUsers } from "../../../../services/hooks/users";
import { BaseForm } from "../BaseForm";

interface LoginFormProps {
  onBack?: () => void;
}

export const LoginForm = ({ onBack } : LoginFormProps) => {
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
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setUsername("");
      setPassword("");
    }
    setLoading(false);
  }

  return (
    <>
      <h2>LOG IN</h2>
      <BaseForm
        restricted={true}
        fields={[
          {
            id: "login-username",
            label: "username",
            fieldType: "text",
            value: username,
            onChange: setUsername,
            disabled: loading,
          },
          {
            id: "login-password",
            label: "password",
            fieldType: "password",
            value: password,
            onChange: setPassword,
            disabled: loading,
          },
        ]}
        onSubmit={handleSubmit}
        loading={loading}
        onBack={onBack}
        onBackText="Need an account?"
      />
    </>
  );
};
