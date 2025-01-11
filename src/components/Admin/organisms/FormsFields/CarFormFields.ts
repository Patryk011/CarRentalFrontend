import { ref } from "vue";

export interface CarDTO {
  id: number;
  carBrandId: number;
  carModelId: number;
  carBrandName: string;
  carModelName: string;
  registrationNumber: string;
  pricePerDay: number;
  transmission: string;
  seats: number;
  fuelType: string;
  engineCapacity: number;
  productionYear: number;
  color?: string;
  state: string;
}

export interface CarModelDTO {
  id?: number;
  name: string;
  carBrandId: number;
  BrandName: string;
}

export interface CarBrandDTO {
  id?: number;
  name: string;
}

export interface SelectOption {
  value: number | string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options: SelectOption[] | string[];
}

export const formFields = ref([
  {
    name: "carBrandId",
    label: "Marka",
    type: "select",
    required: true,
    options: [] as SelectOption[],
  },
  {
    name: "carModelId",
    label: "Model",
    type: "select",
    required: true,
    options: [] as SelectOption[],
  },
  {
    name: "registrationNumber",
    label: "Numer rejestracyjny",
    type: "text",
    required: true,
    options: [],
  },
  {
    name: "state",
    label: "Stan",
    type: "select",
    required: true,
    options: [
      { value: "AVAILABLE", label: "Available" },
      { value: "BLOCKED", label: "Blocked" },
    ] as SelectOption[],
  },
  {
    name: "productionYear",
    label: "Rok produkcji",
    type: "number",
    required: true,
    options: [],
  },
  {
    name: "color",
    label: "Kolor",
    type: "text",
    required: true,
    options: [],
  },
  {
    name: "pricePerDay",
    label: "Cena za dzień",
    type: "number",
    required: true,
    options: [],
  },
  {
    name: "transmission",
    label: "Skrzynia biegów",
    type: "select",
    required: true,
    options: [
      { value: "MANUAL", label: "Manualna" },
      { value: "AUTOMATIC", label: "Automatyczna" },
    ] as SelectOption[],
  },
  {
    name: "fuelType",
    label: "Typ paliwa",
    type: "select",
    required: true,
    options: [
      { value: "PETROL", label: "Benzyna" },
      { value: "DIESEL", label: "Diesel" },
      { value: "HYBRID", label: "Hybryda" },
      { value: "ELECTRIC", label: "Elektryczny" },
    ] as SelectOption[],
  },
  {
    name: "seats",
    label: "Ilość miejsc",
    type: "number",
    required: true,
    options: [],
  },
  {
    name: "engineCapacity",
    label: "Pojemność silnika",
    type: "number",
    required: true,
    options: [],
    value: null,
  },
]);
