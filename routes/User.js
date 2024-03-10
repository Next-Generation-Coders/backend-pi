const express=require("express")
const router=express.Router()
const UserController=require('../Controller/UserController')
const tokenVerif = require('../middlewares/tokenVerification')
const upload = require('../config/multer')

//Auth
router.post('/signup',UserController.signupUser);

router.post('/login',UserController.loginUser);

router.put('/verify',UserController.verifyEmail);

router.put('/reset',UserController.resetPassword);

router.get('/roles',UserController.checkRoles)

router.post('/refresh',UserController.refresh)

router.put('/toggle-block',tokenVerif.requireAdmin,UserController.toggleBlockUser)

router.put('/profile',tokenVerif.requireAuth,UserController.updateUserProfile)

router.put('/change-password',tokenVerif.requireAuth,UserController.changePassword)

router.get('/email/:email',UserController.getUserByEmail)

router.put('/avatar',tokenVerif.requireAuth,upload.single('avatar'),UserController.saveAvatar)



//CRUD
router.post('/add',UserController.add);

router.get('/getall',tokenVerif.requireAdmin,UserController.getall);

router.get('/getbyid/:id',UserController.getbyid);

router.get('/getbyname/:name',tokenVerif.requireCoachAndPlayer,UserController.getbyname);

router.put('/update/:id',UserController.update);

router.delete('/delete/:id',UserController.deleteUser);

router.get('/getallPlayers',UserController.getallPlayers);

router.get('/getbyemail', UserController.getByEmail);

router.get('/getPlayersByIds/:id',UserController.getPlayersByIds);

module.exports = router;