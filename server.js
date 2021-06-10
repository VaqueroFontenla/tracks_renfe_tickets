const express = require("express");
const cors = require("cors");
const startTracking = require("./src/index");
const tickets = require("./src/data/tickets.json");

// create app
const app = express();

// set express middleware
app.use(express.json());
app.use(cors());

// init express aplication
const appPort = 3000;
app.listen(appPort, () => {
  console.log(`app listening at http://localhost:${appPort}`);
});

// static app
const staticappPath = "./public/dist";
app.use(express.static(staticappPath));

app.get("/updated-tickets", async (req, res) => {
  const journey = req.query.journey;
  const month = req.query.month;
  await startTracking.startTracking(journey, month);
  res.send("Tickets: Successfully Written to File.");
});

app.get("/tickets", async (req, res) => {
  res.json({
    result: tickets,
  });
});
