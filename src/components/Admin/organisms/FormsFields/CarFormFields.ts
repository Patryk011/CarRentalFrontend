export interface Car {
  id: number;
  registrationNumber: string;
  brand: string;
  model: string;
  purchaseDate: string;
  state: string;
  vin: string;
  productionYear: number;
  color: string;
  pricePerHour: number;
  transmission: string;
  fuelType: string;
  seats: number;
  lastServiceDate: string;
  nextServiceDate: string;
  engineCapacity: number;
}

export const formFields = [
  {
    name: "registrationNumber",
    label: "Numer rejestracyjny",
    type: "text",
    required: true,
  },
  { name: "brand", label: "Marka", type: "text", required: true },
  { name: "model", label: "Model", type: "text", required: true },
  { name: "purchaseDate", label: "Data zakupu", type: "date", required: true },
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
    name: "pricePerHour",
    label: "Cena za godzinę",
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
    name: "lastServiceDate",
    label: "Ostatni serwis",
    type: "date",
    required: true,
  },
  {
    name: "nextServiceDate",
    label: "Następny serwis",
    type: "date",
    required: true,
  },
  {
    name: "engineCapacity",
    label: "Pojemność silnika",
    type: "number",
    required: true,
  },
];
