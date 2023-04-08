import {
  useState,
  useEffect
} from "react";

const useLogin = () => {
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const login = async (email, password) => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      const loggedIn = await response.json();
      if (loggedIn) {
        return loggedIn;
      }
    } catch (error) {
      console.error(error);
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

export default useLogin;