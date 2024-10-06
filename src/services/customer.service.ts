import axios, { AxiosResponse } from "axios";
import { getToken } from "./keycloak.service";

interface Customer {
  id: number;
  name: string;
  email: string;
}

const fetchCustomers = async (): Promise<AxiosResponse<Customer[]>> => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  return await axios.get<Customer[]>("http://localhost:8080/api/customers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
