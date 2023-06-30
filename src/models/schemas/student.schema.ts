import {Schema, Document, model} from "mongoose";

export interface IStudent extends Document {
    name: string;
    theoryScore: number;
    practiceScore: number;
    description: string;
    assess: string;
    classroom: object
}

const studentSchema: Schema = new Schema<IStudent>({
    name: String,
    theoryScore: Number,
    practiceScore: Number,
    description: String,
    assess: String,
    classroom: {type: Schema.Types.ObjectId, ref: "Classroom"}
});

const Student = model<IStudent>('Student', studentSchema);

export default Student;