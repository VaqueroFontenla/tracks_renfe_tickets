const url = "http://localhost:3000/tickets";

export const getTickets = (queryParams) =>
  fetch(`${url}${queryParams}`)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((error) => {
      throw error;
    });
