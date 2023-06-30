import {Schema, Document, model} from "mongoose";

export interface IClassroom extends Document {
    name: string;
}

const classSchema: Schema = new Schema<IClassroom>({
    name: String,
});

const Classroom = model<IClassroom>('Classroom', classSchema);

export default Classroom;