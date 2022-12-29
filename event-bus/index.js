const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events =[];

app.get('/events',(req,res,next)=>{
  res.send(events);
});

app.post("/events", (req, res,next) => {
  const event = req.body;
  events.push(event);
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
