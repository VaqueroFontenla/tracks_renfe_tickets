const express = require("express");
const cors = require("cors");
const startTracking = require("./src/startTracking");
const writeTicketsFile = require("./src/writeTicketsFile");
const tickets = require("./src/data/tickets.json");
const staticappPath = "./public/dist";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});

app.use(express.static(staticappPath));

app.get("/updated-tickets", async (req, res) => {
  const journey = req.query.journey;
  const month = req.query.month;
  const data = await startTracking.startTracking(journey, month);
  res.json({
    result: data,
  });
  await writeTicketsFile.writeTicketsFile(data);
});

app.get("/tickets", async (req, res) => {
  res.json({
    result: tickets,
  });
});
