export interface CarBrandDTO {
  id: number;
  brand: string;
}

export const formFields = [
  {
    name: "brand",
    label: "Nazwa marki",
    type: "text",
    required: true,
    placeholder: "Wprowadź nazwę marki",
  },
];
