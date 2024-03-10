const stripe = require('stripe')('sk_test_51OpIvqHJCyMdA57TO4gItUpDj6TpTKWJb3zDD4UuYGGibgdrAKdpxuJiKonH21vOeiVXRM38koZtjJgF2bLm0v9900Rdaad7x8');

// Importez votre modèle Payment
const Payment = require('../models/Payment');



// Fonction pour créer une session de paiement avec Stripe
exports.createStripePaymentSession = async (req, res) => {
    try {

        // Créez une session de paiement avec Stripe
        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     line_items: [{
        //         price_data: {
        //             currency: 'usd',
        //             product_data: {
        //                 name: 'Paiement pour tournoi de football', // Nom du produit (optionnel)
        //             },
        //             unit_amount: payment.total * 100, // Le montant total du paiement, en cents
        //         },
        //         quantity: 1,
        //     }],
        //     mode: 'payment',
        //     success_url: 'http://localhost:3000/success', // URL à rediriger en cas de succès
        //     cancel_url: 'http://localhost:3000/annuler', // URL à rediriger en cas d'annulation
        // });

const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000, // The amount in cents (e.g., $10.00)
  currency: 'usd',
  description: 'Payment for your product or service',
  payment_method_types: ['card'],
  receipt_email: 'customer@example.com', // Email to send receipt to
  metadata: {
    order_id: '12345', // Any custom metadata you want to attach
  },
  shipping: {
    name: 'John Doe',
    address: {
      line1: '123 Main St',
      city: 'City',
      state: 'CA',
      postal_code: '12345',
      country: 'US',
    },
  },
  // Other payment intent details...
});

const clientSecret = paymentIntent.client_secret;

// Use the clientSecret in your frontend code to confirm the payment
    res.json(clientSecret)

        // res.json({ sessionId: session.id }); // Renvoie l'ID de la session de paiement à utiliser dans le frontend pour rediriger l'utilisateur vers la page de paiement Stripe
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour gérer les événements de paiement Stripe
exports.handleStripePaymentEvent = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, 'sk_test_51OpIvqHJCyMdA57TO4gItUpDj6TpTKWJb3zDD4UuYGGibgdrAKdpxuJiKonH21vOeiVXRM38koZtjJgF2bLm0v9900Rdaad7x8');
    } catch (err) {
        return res.status(400).send(err);
    }

    // Gérez l'événement de paiement Stripe ici
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Mettez à jour l'état du paiement dans votre base de données ou effectuez d'autres actions nécessaires
            break;
        default:
            console.log("Ajoutez d'autres cas pour gérer d'autres types d'événements Stripe selon vos besoins");
    }

    res.status(200).json({ received: true });
};