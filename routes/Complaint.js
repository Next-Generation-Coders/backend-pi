const express = require('express');
const { createComplaint,updateComplaintStatus,getAllComplaints,respondToComplaint, deleteComplaint,getbyname,getbyid } = require('../Controller/ComplaintController');
const router = express.Router();

router.post('/complaints', createComplaint);

router.get('/AllComplaints', getAllComplaints);

router.put('/complaints/update-status', updateComplaintStatus);

router.put('/complaints/respond',respondToComplaint);

router.delete('/complaints/:complaintId', deleteComplaint);

router.get('/getById/:id', getbyid);

router.get('/getbyname/:name', getbyname);


module.exports = router;
