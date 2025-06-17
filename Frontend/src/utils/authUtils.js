import axios from "axios";
import { setUser, setLoading } from "../redux/slice/authSlice";
import { base_url } from "../base_url";

export const checkAuth = async (dispatch) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get(`${base_url}/auth/check-auth`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        dispatch(setUser(response.data));
        console.log(response)
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    }
  }

  dispatch(setLoading(false));
};
