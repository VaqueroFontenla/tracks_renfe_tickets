const express = require("express");
const cors = require("cors");
const startTracking = require("./api/index");

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
const staticServerPath = "./dist";
server.use(express.static(staticServerPath));

server.get("/tickets", async (req, res) => {
  const journey = req.query.journey;
  const month = req.query.month;
  const tickets = await startTracking.startTracking(journey, month);
  res.json({
    result: tickets,
  });
});
