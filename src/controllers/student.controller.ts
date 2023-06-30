import {Request, Response} from "express";
import Student from "../models/schemas/student.schema";
import Classroom from "../models/schemas/class.schema";
import {IStudent} from "../models/schemas/student.schema";
import {IClassroom} from "../models/schemas/class.schema";

export class studentController {

    static async searchClass(req: Request, res: Response) {
        let query = {};
        if (req.query.search) {
            let searchValue = req.query.search;
            let classroomSearch: IClassroom = await Classroom.findOne({name: {$regex: searchValue}});
            query = {
                classroom: classroomSearch
            }
        }
        return query;
    }

    static async getListPage(req: Request, res: Response) {
        try {
            let searchClassValue = await studentController.searchClass(req, res);
            let studentList: IStudent[] = await Student.find(searchClassValue).populate({
                path: "classroom", select: "name"
            }).sort({theoryScore: 1});
            res.render('list', {students: studentList});
        } catch (err) {
            console.log(err.message);
        }
    }

    static async getDetailPage(req: Request, res: Response) {
        try {
            let id = req.query.id;
            let student: IStudent = await Student.findOne({_id: id}).populate({
                path: "classroom", select: "name"
            });
            res.render('detail', {student});
        } catch (err) {
            console.log(err.message);
        }
    }

    static async getCreatePage(req: Request, res: Response) {
        try {
            let classes: IClassroom[] = await Classroom.find();
            res.render('create', {checkExist: false, classes})
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async createStudent(req: Request, res: Response) {
        try {
            const {name, theoryScore, practiceScore, description, assess, classroom} = req.body
            let id = req.query.id;
            let student: IStudent = await Student.findOne({_id: id}).populate({
                path: "classroom", select: "name"
            });
            if (!student) {
                let newStudent: IStudent = new Student({
                    name: name,
                    theoryScore: theoryScore,
                    practiceScore: practiceScore,
                    description: description,
                    assess: assess,
                    classroom: classroom
                })
                await newStudent.save()
                res.redirect('/student/list')
            } else {
                res.render('create', {checkExist: true})
            }
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async getUpdatePage(req: Request, res: Response) {
        try {
            let id = req.query.id;
            let studentUpdate: IStudent = await Student.findOne({_id: id}).populate({
                path: "classroom", select: "name"
            });
            let classes: IClassroom[] = await Classroom.find();
            if (studentUpdate) {
                res.render('update', {classes, student: studentUpdate});
            } else {
                res.render('notFound');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    static async updateStudent(req: Request, res: Response) {
        try {
            let id = req.query.id;
            const {name, theoryScore, practiceScore, description, assess, classroom} = req.body;
            let studentUpdate: IStudent = await Student.findOne({_id: id});
            studentUpdate.name = name;
            studentUpdate.theoryScore = theoryScore;
            studentUpdate.practiceScore = practiceScore;
            studentUpdate.description = description;
            studentUpdate.assess = assess;
            studentUpdate.classroom = classroom;
            await studentUpdate.save();
            res.redirect('/student/list');
        } catch (err) {
            console.log(err.message);
        }
    }

    static async deleteStudent(req: Request, res: Response) {
        try {
            let id = req.query.id;
            let studentDelete: IStudent = await Student.findOne({_id: id});
            if (studentDelete) {
                await studentDelete.deleteOne();
                res.redirect('/student/list');
            } else {
                res.render('notFound');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

}