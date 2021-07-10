const url = "http://localhost:3000/updated-tickets";

export const updateTickets = (queryParams) =>
  fetch(`${url}${queryParams}`)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((error) => {
      throw error;
    });
