export interface CarDTO {
  id: number;
  carBrandName: string;
  carModelName: string;
  pricePerDay: number;
  transmission: string;
  seats: number;
  fuelType: string;
  engineCapacity: number;
  productionYear: number;
  color?: string;
  vin?: string;
  state: string;
}

export const formFields = [
  {
    name: "registrationNumber",
    label: "Numer rejestracyjny",
    type: "text",
    required: true,
  },
  { name: " carBrandName", label: "Marka", type: "text", required: true },
  { name: " carModelName", label: "Model", type: "text", required: true },
  {
    name: "state",
    label: "Stan",
    type: "select",
    required: true,
    options: ["Dostępny", "Zablokowany"],
  },
  { name: "vin", label: "VIN", type: "text", required: true },
  {
    name: "productionYear",
    label: "Rok produkcji",
    type: "number",
    required: true,
  },
  { name: "color", label: "Kolor", type: "text", required: true },
  {
    name: "pricePerDay",
    label: "Cena za dzień",
    type: "number",
    required: true,
  },
  {
    name: "transmission",
    label: "Skrzynia biegów",
    type: "select",
    required: true,
    options: ["Manualna", "Automatyczna"],
  },
  {
    name: "fuelType",
    label: "Typ paliwa",
    type: "select",
    required: true,
    options: ["Benzyna", "Diesel", "Hybryda", "Elektryk"],
  },
  { name: "seats", label: "Ilość miejsc", type: "number", required: true },
  {
    name: "engineCapacity",
    label: "Pojemność silnika",
    type: "number",
    required: true,
  },
];
