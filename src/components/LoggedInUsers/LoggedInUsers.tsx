import { Button } from "../Button";
import { useUsers } from "../../services/hooks/users";
import styles from "./LoggedInUsers.module.scss";
import { toast } from "react-toastify";

export const LoggedInUsers = () => {
  const { loggedInUsers, logout } = useUsers();

  const handleLogout = (username: string) => {
    logout(username);
    toast.success(`${username} logged out.`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <div className={styles.loggedInUsers} data-testid="loggedInUsers">
      {loggedInUsers.length > 0 && (
        <>
          <h2 data-testid="title">LOGGED IN USERS</h2>

          <ul>
            {loggedInUsers.map((u) => (
              <li key={u}>
                <p>{u}</p>
                <Button onClick={() => handleLogout(u)}>Log Out</Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
