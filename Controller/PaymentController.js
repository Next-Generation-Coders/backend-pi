const Payment = require("../models/Payment");
//twilio

const accountSid='AC74f9f49e499a338807d3b296e7771085'
const authToken='79218cf2d27e323d1dd05f6687e902b3'
const client =require('twilio')(accountSid,authToken);



exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('user', 'fullname email').populate('tournament', 'title');
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Fonction pour récupérer un paiement par son identifiant
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Fonction pour créer un nouveau paiement
exports.createPayment = async (req, res) => {
    const payment = new Payment({
        user: req.body.user,
        tournament: req.body.tournament,
        amount: req.body.amount,
        subtotal: req.body.subtotal,
        total: req.body.total,
        payment_status: req.body.payment_status
    });

    try {
        const newPayment = await payment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour supprimer un paiement
exports.deletePayment = async (req, res) => {
    try {
        await Payment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Payment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Fonction pour récupérer les paiements par utilisateur
exports.getPaidPaymentsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const paidPayments = await Payment.find({ user: userId, payment_status: 'paid' }).populate('tournament', 'title');
        res.json(paidPayments);
    } catch (error) {
        console.error('Error fetching paid payments by user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getPaymentByTournamentId = async (req, res) => {
    const tournamentId = req.params.tournamentId;

    try {
        const payment = await Payment.findOne({ tournament: tournamentId });
        res.json(payment);
    } catch (error) {
        console.error('Error fetching payment by tournament id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.sendMessage = async (req, res) => {

    try {
        const to = req.body.phone;

        const message = await client.messages.create({
            from: "+17125264912",
            to: to,
            body: " Thank you for your payment. Your transaction was successful. ",
        });

        console.log("Message has been sent:", message.sid);

        res.status(200).send("Message sent successfully");
    } catch (err) {
        console.error("Error sending message:", err);

        res.status(500).send("Failed to send message");
    }

};