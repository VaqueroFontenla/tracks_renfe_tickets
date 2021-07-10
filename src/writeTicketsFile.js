const fs = require("fs").promises;

const writeTicketsFile = async (tickets) => {
  await fs.writeFile(
    "src/data/tickets.json",
    JSON.stringify(tickets),
    (err) => {
      if (err) console.log(err);
      console.log("Tickets: Successfully Written to File.");
    }
  );
};

module.exports = { writeTicketsFile };
