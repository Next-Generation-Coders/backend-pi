const Complaint = require("../models/Complaint");
const User = require("../models/User");

// Create a new complaint
const createComplaint = async (req, res) => {
    try {
        const { userId, title, description } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const complaint = new Complaint({
            user: userId,
            title,
            description,
        });

        const savedComplaint = await complaint.save();
        res.status(201).json(savedComplaint);
    } catch (error) {
        console.error('Error creating complaint:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('user');
        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update the status of a complaint
const updateComplaintStatus = async (req, res) => {
    try {
        const { complaintId, status } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { status },
            { new: true }
        );

        res.status(200).json({ complaint });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin responds to a complaint
const respondToComplaint = async (req, res) => {
    try {
        const { complaintId, adminResponse } = req.body;
        console.log('Request Payload:', req.body);


        // Validate input
        if (!complaintId || !adminResponse) {
            return res.status(400).json({ error: 'Invalid input. Both complaintId and adminResponse are required.' });
        }
        const complaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { adminResponse },
            { new: true }
        );
        console.log('Updated Complaint:', complaint);


        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found.' });
        }

        return res.status(200).json({ complaint });
    } catch (error) {
        console.error('Error responding to complaint:', error);
        return res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus,
    respondToComplaint
};
