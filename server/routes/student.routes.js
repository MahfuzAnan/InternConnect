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
  uploadcvfile
} from '../controllers/student.controller.js';
import Upload from '../middlewares/multer.Cv.js'; 



const router = express.Router();

router.post('/createStudent', createStudent);

router.get('/students', getAllStudents);

router.get('/getStudent/:student_id ', getStudentById);

router.put('/updateStudent/:student_id ', updateStudentById);

router.delete('/deleteStudent/:student_id ', deleteStudentById);

router.post('/login', loginStudent);

router.post('/postlogin', postlogin)

router.post('/updatePassword/:student_id', updatePasswordById);

router.post('/uploadCV/:student_id', Upload.single('file'), uploadcvfile);



router.get("/logout", logout);
export default router;