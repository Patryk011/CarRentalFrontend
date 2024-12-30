const carImages = import.meta.glob("/src/assets/cars/*.{webp,png}");

export const getCarImagePath = (brand: string, model: string): string => {
  const normalizedBrand = brand.toLowerCase();
  const normalizedModel = model.toLowerCase();

  for (const ext of ["webp", "png"]) {
    const path = `/src/assets/cars/${normalizedBrand}-${normalizedModel}.${ext}`;
    if (carImages[path]) {
      return path;
    }
  }
};

const translateFields: Record<string, string> = {
  PETROL: "Benzyna",
  AUTOMATIC: "Automatyczna",
  MANUAL: "Manualna",
};

export const translate = (key: string): string => translateFields[key];
