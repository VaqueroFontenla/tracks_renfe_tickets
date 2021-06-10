const express = require("express");
const cors = require("cors");
const startTracking = require("./src/index");
const tickets = require("./src/data/tickets.json");

// create server
const server = express();

// set express middleware
server.use(express.json());
server.use(cors());

// init express aplication
const serverPort = 3000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// static server
const staticServerPath = "./public/dist";
server.use(express.static(staticServerPath));

server.get("/updated-tickets", async (req, res) => {
  const journey = req.query.journey;
  const month = req.query.month;
  await startTracking.startTracking(journey, month);
  res.send("Tickets: Successfully Written to File.");
});

server.get("/tickets", async (req, res) => {
  res.json({
    result: tickets,
  });
});
