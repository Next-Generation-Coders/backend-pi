const express = require('express');
const { createComplaint,updateComplaintStatus,getAllComplaints,respondToComplaint } = require('../Controller/ComplaintController');
const router = express.Router();

router.post('/complaints', createComplaint);

router.get('/AllComplaints', getAllComplaints);

router.put('/complaints/update-status', updateComplaintStatus);

router.put('/complaints/respond',respondToComplaint);

module.exports = router;
