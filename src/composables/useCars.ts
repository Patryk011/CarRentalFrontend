import { reactive, ref } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import { CarDTO } from "@/components/Admin/organisms/FormsFields/CarFormFields";

export default function useCars() {
  const cars = reactive(ref<CarDTO[]>([]));

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
  return {
    cars,
    fetchCars,
    addCar,
    blockCar,
    unblockCar,
  };
}
