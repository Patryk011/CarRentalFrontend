export interface ICar {
  id: number;
  carBrandName: string;
  carModelName: string;
  pricePerHour: number;
  transmission: string;
  seats: number;
  fuelType: string;
  engineCapacity: number;
  productionYear: number;
  color?: string;
  vin?: string;
  state?: string;
}

export interface ICardProps {
  car: ICar;
}
