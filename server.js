import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data.js";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*", // Replace with your frontend URL
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.get("/data", (req, res) => {
  res.status(200).json(data);
});

app.post("/change/:amount", (req, res) => {
  let amount = req.params.amount;
  amount = Number(amount).toFixed(2);

  let total = amount * 100;
  const silverDollar = 100;
  const halfDollar = 50;
  const quarter = 25;
  const dime = 10;
  const nickel = 5;
  const penny = 1;
  let halfDollarQuotient = Number(0);
  let quarterQuotient = Number(0);
  let dimeQuotient = Number(0);
  let nickelQuotient = Number(0);
  let subtract = Number(0);
  let SilverDollarQuotient = Math.floor(total / silverDollar);
  let remainder = total % silverDollar;

  if (remainder / halfDollar >= 1) {
    halfDollarQuotient = Math.floor(remainder / halfDollar);
    subtract = halfDollarQuotient * halfDollar;
    remainder = remainder - subtract;
  }

  if (remainder / quarter >= 1) {
    quarterQuotient = Math.floor(remainder / quarter);
    subtract = quarterQuotient * quarter;
    remainder = remainder - subtract;
  }

  if (remainder / dime >= 1) {
    dimeQuotient = Math.floor(remainder / dime);
    subtract = dimeQuotient * dime;
    remainder = remainder - subtract;
  }

  if (remainder / nickel >= 1) {
    nickelQuotient = Math.floor(remainder / nickel);
    subtract = nickelQuotient * nickel;
    remainder = remainder - subtract;
  }

  let data = {
    total: total,
    SilverDollarQuotient,
    halfDollarQuotient,
    quarterQuotient,
    dimeQuotient,
    nickelQuotient,
    remainder,
  };

  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
