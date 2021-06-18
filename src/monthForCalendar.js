const monthForCalendar = (tickets) => {
  const months = tickets.map((data) =>
    new Date(new Date(data.date).toLocaleDateString("es-ES")).getMonth()
  );

  return [...new Set(months)][0];
};

module.exports = { monthForCalendar };
