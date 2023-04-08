import {
  useState,
  useEffect
} from 'react';
import {
  API_URL
} from '../globalData';

const useApi = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    request()
  }, [])
  const request = async () => {

    try {
      setLoading(true);
      setError(null);

      const options = {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(API_URL + url, options);
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.error) {
        throw new Error(responseData.error)
      }
      setData(responseData)
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  return {
    request,
    data,
    loading,
    error,
    setData
  };
};

export default useApi;