import React, { useEffect, useState } from "react";
import ListPageComponent from "../component/listPage/listPageComponent";
import { getDetails } from "../../../services/apiService";

const ListPageContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await getDetails();
        console.log('data--', data)
        setData(data);
        localStorage.setItem("universities", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        const cachedData = localStorage.getItem("universities");
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setError("Failed to fetch new data, loaded cached data.");
        } else {
          setError(
            "Failed to fetch universities and no cached data available."
          );
        }
      } finally {
        setIsLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (universityName) => {
    setData((prevUniversities) =>
      prevUniversities.filter(
        (university) => university.name !== universityName
      )
    );
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <ListPageComponent
        items={data}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ListPageContainer;
