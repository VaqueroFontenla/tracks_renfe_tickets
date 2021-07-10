const express = require("express");
const cors = require("cors");
const startTracking = require("./src/startTracking");
const tickets = require("./src/data/tickets.json");
const staticappPath = "./public/dist";

const app = express();

app.use(express.json());
app.use(cors());

const appPort = 3000;
app.listen(appPort, () => {
  console.log(`app listening at http://localhost:${appPort}`);
});

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
