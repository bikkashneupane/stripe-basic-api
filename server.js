import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// stripe
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51PaSRURr5bu3DUEznmPedb0KRbfleDXClB5Jtv2Xez0URCcXEkfIS7pNqfvrcMGRni5F9dKgi0JgD12ywba4AeG800cBSWxwDl"
);

app.post("/create-stripe-paymet", async (req, res) => {
  try {
    const { amount, currency, paymentMethod } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      payment_method_types: [paymentMethod],
    });

    res.json({
      status: "success",
      clientSecrete: paymentIntent.client_secret,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Something went wrong",
    });
  }
});

app.post("/confirm-order", async (req, res) => {
  console.log(req.body);
  // data processing
  res.json({
    status: "success",
  });
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server Online",
  });
});

app.listen(PORT, (error) =>
  error ? console.log(error) : console.log("Server running on port: " + PORT)
);
