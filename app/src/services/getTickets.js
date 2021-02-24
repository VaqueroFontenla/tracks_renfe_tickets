const url = "src/data/tracks-renfe-tickets.json";

export const getTickets = () =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
