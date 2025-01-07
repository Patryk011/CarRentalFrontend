export interface Rental {
  id: number;
  customerId: number;
  carId: number;
  startDate: string;
  finishDate: string;
  status: string;
  totalCost: number;
  discountPercentage: number;
}

export const formFields = [
  { name: "customerId", label: "ID Klienta", type: "number", required: true },
  { name: "carId", label: "ID Samochodu", type: "number", required: true },
  {
    name: "startDate",
    label: "Data rozpoczęcia",
    type: "date",
    required: true,
  },
  {
    name: "finishDate",
    label: "Data zakończenia",
    type: "date",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: ["W trakcie", "Zakończone", "Anulowane"],
  },
];
