export interface CarModelDTO {
  id: number;
  model: string;
  carBrandId: number;
  carBrandName: string;
}

export interface CarBrandDTO {
  id?: number;
  brand: string;
}

export const formFields = [
  {
    name: "brandId",
    label: "Marka",
    type: "select",
    required: true,
    options: [],
  },
  {
    name: "model",
    label: "Nazwa modelu",
    type: "text",
    required: true,
    placeholder: "Wpisz nazwę modelu",
  },
];
