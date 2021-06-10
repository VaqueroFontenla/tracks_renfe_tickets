const url = "http://localhost:3000/tickets";

export const getTickets = () =>
  fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((error) => {
      throw error;
    });
