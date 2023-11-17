import express from 'express';
import { postlogin, logout, register, sendmailtoall,sendmailtoindividual,sendCvsToCompany} from '../controllers/admin.controller.js';
import upload from '../middlewares/multer.js';
import { ulpoadfiledata, ulpoadCompanydata } from '../controllers/filecontroller.js';


const router = express.Router();

router.post('/postlogin', postlogin)
router.get("/logout", logout);
router.post("/register", register)
router.post('/uploadfile', upload.single('file'), ulpoadfiledata)
router.post('/uploadcompanyfile', upload.single('file'), ulpoadCompanydata)
router.post('/sendtoall', sendmailtoall)
router.post('/sendtoone', sendmailtoindividual)
router.post('/sendcvtocompany', sendCvsToCompany)

export default router;