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
  console.log("get route data");
  Stocks.find(function (err, doc) {
    
    if (err) return res.send(err);
    console.log("text", doc);
    return res.send(doc);
  });
});

app.post("/api/stockList", (req, res) => {
  console.log("post route data");

  let count = req.body.Count;
  Stocks.exists({ Symbol: req.body.Symbol }, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log("Stock in Databse exists ? ", result)
      if (result) {
        Stocks.findOne({ Symbol: req.body.Symbol }, function (err, doc) {
          if (err) {
            res.send(err);
          } else {
            count += doc.Count;
            Stocks.findOneAndUpdate({ Symbol: req.body.Symbol },
              { $set: { Count: count } }, {new : true} ,function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  console.log("Updated Doc : ", docs);
                }
              });
          }
        });
      } else {
        const newStockObject = new Stocks(req.body);
        newStockObject.save(err => {
          if (err) return res.status(500).send(err);
          return res.status(200).send(newStockObject);
        });
      }

    }
  });
  console.log(req.body);

});

app.delete("/api/stockList", (req, res) => {
  Stocks.findOneAndRemove(req.body, function (err, doc) {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Stock successfully deleted",
      id: doc._id
  };
  return res.status(200).send(response);
  });
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at port number ${port}....`));
