import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  loginStudent,
  updatePasswordById,
  postlogin,
  logout,
  sendOTPForPasswordReset,
  resetPasswordWithOTP,
  uploadcvfile,
  getcvfile,
  setpreference,
  getOneStudentbyId,
  addProject,
  getProjectsByStudentId,
  editProject,
  deleteProject,
  updateCurrentStatus,
  updateCurrentStatusByIdToHired,
  updateCurrentStatusByIdToRejected,
  uploadInternshipReportFile,
  getStudentReportById,
  ViewGrade
} from '../controllers/student.controller.js';
import Upload from '../middlewares/multer.Cv.js'; 
import uploadInternshipReport from '../middlewares/multer.report.js';
import {ensureAuthenticated} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/createStudent', createStudent);

router.get('/students', getAllStudents);

router.get('/getStudent/:student_id', getStudentById);

router.patch('/updateStudent/:student_id', updateStudentById);

router.delete('/deleteStudent/:student_id ', deleteStudentById);


router.post('/login', loginStudent);

router.post('/postlogin', postlogin)

router.post('/updatePassword/:student_id', updatePasswordById);

router.get("/logout", logout);

router.post("/forgetPassword", sendOTPForPasswordReset);

router.post("/resetPassword/:student_id", resetPasswordWithOTP);


router.post('/uploadCV/:student_id', Upload.single('file'), uploadcvfile);

router.get('/getcv/:student_id', getcvfile)

router.post('/setprefer/:student_id', setpreference)

router.get('/getOnestudent/:student_id', getOneStudentbyId)

router.post('/addProjects/:student_id', addProject);

router.get('/getProjects/:student_id', getProjectsByStudentId);

router.patch('/editProjects/:student_id/:project_id', editProject);

router.delete('/deleteProjects/:student_id/:project_id', deleteProject);

router.patch('/UpdateCurrentStatus', updateCurrentStatus);

router.get('/updateCurrentStatusByIdToHired/:student_id', updateCurrentStatusByIdToHired);

router.get('/updateCurrentStatusByIdToRejected/:student_id', updateCurrentStatusByIdToRejected);

router.post('/updateCurrentStatusByIdToHired/:student_id', updateCurrentStatusByIdToHired);

router.post('/updateCurrentStatusByIdToRejected/:student_id', updateCurrentStatusByIdToRejected);

router.post('/uploadInternshipReport/:student_id', uploadInternshipReport.single('file'), uploadInternshipReportFile);

router.get('/getStudentReport/:student_id', getStudentReportById);

router.get('/ViewGrade', ensureAuthenticated, ViewGrade);

export default router;