import bcrypt from "bcryptjs";
import { getCompany, setCompany } from "../company";
import { Company, User, Users } from "../../types";

export const addUserToCompany = async (user: User, companyName: string) => {
  const company: Company | null = await getCompany(companyName);
  if (!company)
    throw new Error("Cannot add user to company that does not exist.");
  company.users[user.username] = user;
  setCompany(companyName, company);
};

export const getCompanyUsers = async (companyName: string): Promise<Users> => {
  const company: Company | null = await getCompany(companyName);
  if (!company)
    throw new Error("Cannot fetch users from company that does not exist.");
  return company.users;
};

export const signupUser = async (
  { username, password }: User,
  companyName: string,
): Promise<void> => {
  const users: Users = await getCompanyUsers(companyName);

  if (username === "" || password === "")
    throw new Error("Username or password field empty.");

  if (users[username]) throw new Error(`${username} already exists.`);
  const hashedpw = await bcrypt.hash(password, 10);

  users[username] = { username, password: hashedpw };

  await addUserToCompany(users[username], companyName);
};

export const loginUser = async (
  { username, password }: User,
  companyName: string,
): Promise<boolean> => {
  const users: Users = await getCompanyUsers(companyName);

  if (username === "" || password === "")
    throw new Error("Username or password field empty.");

  if (!users) throw new Error(`No users found for ${companyName}.`);

  if (!users[username]) throw new Error("Invalid username.");

  const success = await bcrypt.compare(password, users[username].password);
  if (!success) throw new Error("Incorrect password.");
  return success;
};
