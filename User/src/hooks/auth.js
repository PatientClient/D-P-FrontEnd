import {
  useState,
  useEffect
} from "react";
import {
  API_URL,
} from "../globalData"
import {
  useDispatch
} from "react-redux";
import {
  loginFailure,
  loginSuccess
} from "../redux/slices/Auth";
export const useAuth = () => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const login = async (nationalId, password) => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(`${API_URL}/user/userAuth`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nationalId,
          password
        }),
      });
      const loggedIn = await response.json();
      if (loggedIn.error) {
        console.log("logged failed");
        setError(loggedIn.error)
        dispatch(loginFailure(loggedIn.error));
        throw new Error(loggedIn.error.message);
        return null
      }
      if (loggedIn.success) {
        dispatch(loginSuccess(loggedIn.token))
        console.log("logged in successfully");
        localStorage.setItem("userToken", JSON.stringify(loggedIn.token))
      }
      return loggedIn;
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };



  // Simulating an asynchronous logout process
  const logout = async () => {};


  return {
    login,
    logout
  };
};