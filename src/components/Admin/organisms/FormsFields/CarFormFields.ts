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
