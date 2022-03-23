const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Stocks = require("./models/stock");
const cors = require('cors');
app.use(cors());


mongoose.connect(
  "mongodb://localhost/stockdb",
  () => {
    console.log("connected..................");
  },
  (e) => console.error(e)
);

app.use(express.json());


app.get("/api/stockList", (req, res) => {
  Stocks.find(function (err, doc) {
    if (err) return res.send(err);
    console.log("text", doc);
    return res.send(doc);
  });
});

app.post("/api/stockList", (req, res) => {
  const newStockObject = new Stocks(req.body);
  newStockObject.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newStockObject);
});
  console.log(req.body)
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at port number ${port}....`));
