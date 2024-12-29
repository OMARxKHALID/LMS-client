import { setEarnings, setLoading } from "@/redux/slice/earningSlice";
import { useDispatch } from "react-redux";

export function useEarning() {
  const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/earnings`;
  const dispatch = useDispatch();

  const getEarningsRecords = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`);
      const data = await response.json();
      dispatch(setEarnings(data.totalEarnings));
    } catch (error) {
      console.error("Error fetching earnings:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return { getEarningsRecords };
}
