import express from "express";
import {studentController} from "../controllers/student.controller";

const studentRouter = express.Router();

studentRouter.get('/list', studentController.getListPage);
studentRouter.get('/detail', studentController.getDetailPage);
studentRouter.get('/create', studentController.getCreatePage);
studentRouter.post('/create', studentController.createStudent);
studentRouter.get('/update', studentController.getUpdatePage);
studentRouter.post('/update', studentController.updateStudent);
studentRouter.get('/delete', studentController.deleteStudent);

export default studentRouter;
