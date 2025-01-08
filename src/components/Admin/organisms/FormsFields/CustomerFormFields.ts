export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  licenseNumber: string;
  address: string;
  registrationDate: string;
  discountPercentage: number;
  keycloakId: number;
}

export const formFields = [
  { name: "firstName", label: "Imię", type: "text", required: true },
  { name: "lastName", label: "Nazwisko", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phoneNumber", label: "Numer telefonu", type: "tel", required: true },
  { name: "birthDate", label: "Data urodzenia", type: "date", required: true },
  {
    name: "licenseNumber",
    label: "Numer prawa jazdy",
    type: "text",
    required: false,
  },
  { name: "address", label: "Adres", type: "text", required: true },
  {
    name: "registrationDate",
    label: "Data rejestracji",
    type: "date",
    required: true,
  },
  {
    name: "discountPercentage",
    label: "Zniżka",
    type: "number",
    required: true,
  },
];
