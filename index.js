const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { connection } = require("./db");

const app = express();

app.use(cors());
app.use(express.json()); // Add this line to parse JSON data from requests

app.get("/Banner", (req, res) => {
  const dataStream = fs.createReadStream("./db.json", "utf-8");
  dataStream.pipe(res);
});

app.get("/:clothingType", (req, res) => {
  const clothingType = req.params.clothingType;
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  if (data[clothingType]) {
    res.json(data[clothingType]);
  } else {
    res.status(404).send("Clothing type not found");
  }
});

app.get("/Banner/:bannerName", (req, res) => {
  const bannerName = req.params.bannerName;
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  if (data.Banner[bannerName]) {
    res.json(data.Banner[bannerName]);
  } else {
    res.status(404).send("Banner not found");
  }
});

app.post("/shoppingCart", (req, res) => {
  const { product_id, name, price, quantity } = req.body;
  res.status(200).json({
    message: "Product added to shopping cart",
    product: {
      product_id,
      name,
      price,
      quantity,
    },
  });
});

app.listen(8080, async () => { // Add async keyword here
  try {
    await connection();
    console.log("Connected to Db");
  } catch (err) {
    console.log(err.message);
  }
  console.log("Server starts");
});
