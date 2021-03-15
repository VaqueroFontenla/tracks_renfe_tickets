const express = require("express");
const cors = require("cors");
const startTracking = require("./src/api/index");

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

const tickets = [
  {
    "date": "24/02/2021",
    "departure": "06.40",
    "duration": "6 h. 10 min.",
    "price": "45,90 €"
  },
  {
    "date": "24/02/2021",
    "departure": "15.25",
    "duration": "5 h. 40 min.",
    "price": "60,60 €"
  },
  {
    "date": "25/02/2021",
    "departure": "06.40",
    "duration": "6 h. 10 min.",
    "price": "45,90 €"
  },
  {
    "date": "25/02/2021",
    "departure": "15.25",
    "duration": "5 h. 40 min.",
    "price": "60,60 €"
  },
  { "date": "26/02/2021", "departure": "06.40", "duration": "6 h. 10 min." },
  { "date": "27/02/2021", "departure": "06.40", "duration": "6 h. 10 min." },
  { "date": "28/02/2021", "departure": "06.40", "duration": "6 h. 10 min." }
]

server.get('/tickets', async (req, res) => {
  const tickets = await startTracking.startTracking();
  res.json({
    result: tickets
  });
});
