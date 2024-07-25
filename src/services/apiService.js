const BASE_URL =
  "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates";

export const getDetails = async () => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${BASE_URL}`, config);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    throw new Error("Network response was not ok");
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
