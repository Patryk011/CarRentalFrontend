import { reactive, ref, computed, watch } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import { CarDTO } from "@/components/Admin/organisms/FormsFields/CarFormFields";
import {
  CarBrandDTO,
  CarModelDTO,
} from "@/components/Admin/organisms/FormsFields/ModelFormFields";

export default function useCars() {
  const cars = ref<CarDTO[]>([]);
  const carBrandOptions = ref([]);
  const carModelOptions = ref([]);
  const formData = reactive<CarDTO>({
    id: null,
    carBrandId: null,
    carModelId: null,
    carBrandName: "",
    carModelName: "",
    registrationNumber: "",
    productionYear: null,
    color: "",
    pricePerDay: null,
    transmission: "",
    fuelType: "",
    seats: null,
    engineCapacity: null,
    state: "AVAILABLE",
  });

  const fetchCars = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No keycloak token");
        return;
      }

      const response = await axios.get<CarDTO[]>(
        "http://localhost:8081/api/Cars/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched cars:", response.data);
      cars.value = response.data;
    } catch (err) {
      console.error("Błąd przy pobieraniu danych: ", err);
    }
  };

  const addCar = async (newCar: CarDTO) => {
    try {
      const response = await axios.post<CarDTO>(
        "http://localhost:8081/api/Cars",
        newCar,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      cars.value.push(response.data);
    } catch (err) {
      console.error("Błąd dodawania auta: ", err);
    }
  };

  const blockCar = async (carId: number) => {
    try {
      const token = getToken();
      await axios.patch(
        `http://localhost:8081/api/Cars/${carId}/block`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const car = cars.value.find((c) => c.id === carId);
      if (car) car.state = "BLOCKED";
      fetchCars();
    } catch (error) {
      console.error("Błąd blokowania samochodu:", error);
    }
  };

  const unblockCar = async (carId: number) => {
    try {
      const token = getToken();
      await axios.patch(
        `http://localhost:8081/api/Cars/${carId}/unlock`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const car = cars.value.find((c) => c.id === carId);
      if (car) car.state = "AVAILABLE";
      fetchCars();
    } catch (error) {
      console.error("Błąd odblokowywania samochodu:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error(
          "Brak tokena Keycloak. Użytkownik może być niezalogowany."
        );
        return;
      }
      const response = await axios.get<CarBrandDTO[]>(
        "http://localhost:8081/api/carBrands/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      carBrandOptions.value = response.data.map((brand) => ({
        value: brand.id,
        label: brand.brand,
      }));
    } catch (error) {
      console.error("Błąd przy pobieraniu marek: ", error);
    }
  };

  const fetchModels = async (brandId: number) => {
    try {
      const token = getToken();
      if (!token) {
        console.error(
          "Brak tokena Keycloak. Użytkownik może być niezalogowany."
        );
        return;
      }
      const response = await axios.get<CarModelDTO[]>(
        `http://localhost:8081/api/carModels/brandById/${brandId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      carModelOptions.value = response.data.map((model) => ({
        value: model.id,
        label: model.model,
      }));
    } catch (error) {
      console.error("Błąd przy pobieraniu modeli: ", error);
    }
  };

  const deleteCar = async (id: number) => {
    try {
      const response = await axios.delete(`/api/cars/${id}`);
      if (response.status === 200) {
        cars.value = cars.value.filter((car) => car.id !== id);
      }
    } catch (error) {
      console.error("Błąd przy usuwaniu samochodu:", error);
    }
  };

  const selectedBrandId = computed(() => formData.carBrandId);

  watch(selectedBrandId, (newBrandId) => {
    if (newBrandId) {
      fetchModels(Number(newBrandId));
    } else {
      carModelOptions.value = [];
    }
  });

  return {
    cars,
    fetchCars,
    addCar,
    blockCar,
    unblockCar,
    fetchBrands,
    fetchModels,
    carBrandOptions,
    carModelOptions,
    formData,
    deleteCar,
  };
}
