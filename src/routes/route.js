const express = require('express')
const multer=require('multer')

const router = express.Router();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'./upload')
  
    },
    filename:function(req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`;
      cb(null,fileName)
    }
  })


  

  const Jwt = require('../jwt/auth')
  const AuthController = require('../contollers/authController')
const UserContoller = require('../contollers/userController')

const StateController = require('../contollers/stateController');
const Citycontroller=require('../contollers/cityController');
const RoleController=require('../contollers/roleController');
const otpController = require('../contollers/otpController');
const firm_Registation_Controller=require('../contollers/firm_Registation_Controller')
const userDocController=require('../contollers/usersDoc_Controller')

router.post('/tokenGenerate',AuthController.generateToken);

//router.get('getUser',Jwt.tokenVerify,AuthController.getUserProfile);

router.get('/getUser',Jwt.tokenVerify,UserContoller.getUser);
const uploadFile=multer({storage:storage})
router.post('/addUser',uploadFile.single('image'),UserContoller.addUser);
router.post('/updateUser',uploadFile.single('image'),UserContoller.updateUser);
router.post('/deleteUser',UserContoller.deleteUser);


//states api

router.get('/getState',StateController.getState);
router.post('/addState',StateController.addState);
router.post('/updateState',StateController.updateState);
router.post('/deleteState',StateController.deleteState);
//cities api
router.post('/addCity',Citycontroller.addCity);
router.post('updateCity',Citycontroller.updateCity);
router.post('/deleteCity',Citycontroller.deleteCity);
router.get('/getCity',Citycontroller.getCity);

//role api

router.post('/addRole',RoleController.addRole);
router.post('/updateRole',RoleController.updateRole);
router.post('/deleteRole',RoleController.deleteRole);
router.get('/getRole',RoleController.getRole);

//users otps api

router.post('/generateOtp',Jwt.tokenVerify,otpController.genrateOtp);
router.post('/ValidateOtp',Jwt.tokenVerify,otpController.otpverfication)


//firm registation api
router.post('/addfirm',firm_Registation_Controller.addFirm)
router.get('/getfirm',firm_Registation_Controller.getFirm)
router.post('/updatefirm',firm_Registation_Controller.updateFirm)
router.post('/deletefirm',firm_Registation_Controller.deleteFirm)

//users document upload api

router.post('/adduserDoc',Jwt.tokenVerify,uploadFile.single('image'),userDocController.adddocument)
router.post('/validateDoc',Jwt.tokenVerify,userDocController.docValidate)



module.exports = router