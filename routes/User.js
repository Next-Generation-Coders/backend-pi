const express=require("express")
const router=express.Router()
const UserController=require('../Controller/UserController')
const tokenVerif = require('../middlewares/tokenVerification')

//Auth
router.post('/signup',UserController.signupUser);

router.post('/login',UserController.loginUser);

router.put('/verify',UserController.verifyEmail);

router.put('/reset',UserController.resetPassword);

router.get('/roles',UserController.checkRoles)

router.post('/refresh',UserController.refresh)

router.put('/toggleBlock',tokenVerif.requireAdmin,UserController.toggleBlockUser)


//CRUD
router.post('/add',UserController.add);

router.get('/getall',tokenVerif.requireAdmin,UserController.getall);

router.get('/getbyid/:id',tokenVerif.requireAdmin,UserController.getbyid);

router.get('/getbyname/:name',tokenVerif.requireCoachAndPlayer,UserController.getbyname);

router.put('/update/:id',UserController.update);

router.delete('/delete/:id',UserController.deleteUser);

module.exports = router;



