const express = require('express');
const router = express.Router();
const { getAllPayments ,getPaymentById,createPayment,updatePayment,deletePayment} = require('../Controller/PaymentController');
const { createStripePaymentSession, handleStripePaymentEvent } = require('../Controller/StripeController');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Payment = require('../models/Payment');
const stripe = require('stripe')('sk_test_51OpIvqHJCyMdA57TO4gItUpDj6TpTKWJb3zDD4UuYGGibgdrAKdpxuJiKonH21vOeiVXRM38koZtjJgF2bLm0v9900Rdaad7x8');
const stripeWebhookSecret = 'whsec_zH1CYIYgdMGSnDkmw9RckWASDvACPAnZ';


// Routes pour les paiements
router.get('/', getAllPayments);
router.get('/:id',getPaymentById);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);




router.post("/create-checkout-session", async (req, res) => {
  try {
    // Get user and tournament information from the request
    const userId = req.body.userId; // Assuming you pass userId in the request body
    const tournamentId = req.body.tournamentId; // Assuming you pass tournamentId in the request body

    // Fetch user and tournament data from the database
    const user = await User.findById(userId);
    const tournament = await Tournament.findById(tournamentId);

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(tour => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: tour.title,
            },
            unit_amount: 10000,
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
    });

    const payment = new Payment({
      user: userId,
      tournament: tournamentId,
      amount: 1000,
      subtotal: 1000,
      total: 1000,
      payment_status: "pending",
      paymentDate: new Date(),
    });

    await payment.save();

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




router.get("/checkout-success", async (req, res) => {
  try {
    const stripeSessionId = req.query.payment_intent;

    // Update the payment status to "paid" based on the Stripe session ID
    const updatedPayment = await Payment.findOneAndUpdate(
      { stripeSessionId: stripeSessionId },
      { $set: { payment_status: "paid" } },
      { new: true }
    );

    if (!updatedPayment) {
      console.error("Payment not found in the database");
      return res.status(404).json({ error: "Payment not found" });
    }

    // Redirect the user to a success page
    res.redirect(`${process.env.CLIENT_URL}/payment`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;