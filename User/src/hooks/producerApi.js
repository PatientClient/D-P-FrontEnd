import {
  useState,
  useEffect
} from 'react';
import {
  API_URL,
  PRODUCE_URL
} from '../globalData';

const useProduceApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const produce = async (body) => {
    try {
      const response = await fetch(PRODUCE_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      return data
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  return {
    produce,
    data,
    loading,
    error
  };
};

export default useProduceApi;