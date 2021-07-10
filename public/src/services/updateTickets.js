const url = "http://localhost:3000/updated-tickets";

export const updateTickets = (queryParams) =>
  fetch(`${url}${queryParams}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      return data.result;
    })
    .catch((error) => {
      throw error;
    });
