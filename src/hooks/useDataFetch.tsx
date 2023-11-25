import { useState, useEffect } from "react";
import { DataRow, UseDataFetchingResult } from "../types/types";

const useDataFetching = (): UseDataFetchingResult => {
  const API_URL = process.env.REACT_APP_API_URL as string;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const dataWithIndex = data.map((item: DataRow, index: number) => ({
        ...item,
        index,
      }));

      setData(dataWithIndex);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = (updatedData: any[]) => {
    setData(updatedData);
  };

  return { data, loading, error, updateData };
};

export default useDataFetching;
