import React, { useEffect, useState } from "react";
import { getTotalItemsInfo } from "../services/api";

const TotalItemsInfo = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getTotalItemsInfo();
        setInfo(data);
      } catch (error) {
        console.error("Failed to fetch total items info.");
      }
    };

    fetchInfo();
  }, []);

  if (!info) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Total Items Info</h2>
      <p>Total Items: {info.total_items}</p>
      <p>Total Sustainability Level: {info.total_sust_level}</p>
    </div>
  );
};

export default TotalItemsInfo;
