const Payment = require("../models/Payment");


// Fonction pour récupérer tous les paiements
/*exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/

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

// Fonction pour mettre à jour un paiement existant
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

