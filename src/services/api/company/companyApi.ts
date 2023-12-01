import { CompanyData, Company } from "../../types";
import { freeCharacters } from "../../data/freeCharacters";

const COMPANY_DATA_KEY = "companyData";

const newCompanyInitData = {
  users: {},
  unlockedCharacters: freeCharacters,
  lBucks: 0,
  lootBoxes: 0,
  keys: 0,
};

const getCompanyData = async(): Promise<CompanyData> => {
  return await JSON.parse(localStorage.getItem(COMPANY_DATA_KEY) || "{}");
};

const setCompanyData = async(companyData: CompanyData): Promise<void> => {
  localStorage.setItem(COMPANY_DATA_KEY, JSON.stringify(companyData));
};

export const getCompany = async(
  companyName: string,
): Promise<Company | null> => {
  const companyData = await getCompanyData();

  return companyData[companyName] || null;
};

const deleteCompany = async(companyName: string): Promise<void> => {
  const companyData = await getCompanyData();
  delete companyData[companyName];

  setCompanyData(companyData);
};

export const setCompany = async(
  companyName: string,
  company: Company,
): Promise<void> => {
  if (!companyName || companyName === "") {
    throw new Error("No company name provided.");
  }
  const companyData = await getCompanyData();
  /*
  if (!companyData[companyName])
    throw new Error(
      `Cannot set company; company data for ${companyName} not found.`
    );
  */
  companyData[companyName] = company;
  await setCompanyData(companyData);
};

export const registerNewCompany = async(
  companyName: string,
): Promise<void> => {
  await setCompany(companyName, { name: companyName, ...newCompanyInitData });
};

export const updateCompanyName = async(
  oldCompanyName: string,
  newCompanyName: string,
): Promise<void> => {
  const oldCompanyData = await getCompany(oldCompanyName);
  if (!oldCompanyData)
    throw new Error("Cannot update name for company that does not exist.");
  await setCompany(newCompanyName, oldCompanyData);
  await deleteCompany(oldCompanyName);
};
