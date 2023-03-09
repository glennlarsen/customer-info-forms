import { useState, useEffect } from "react";
import axios from "axios";

function useApi(url) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const data = response.data.data;
        setAnswers(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData(url);
  }, [url]);

  return {
    answers,
    loading,
    error,
    setAnswers,
  };
}

export default useApi;
