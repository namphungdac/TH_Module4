import express from 'express';
import bodyParser from "body-parser";
import {MongoDB} from "./src/models/data-source";
import studentRouter from "./src/routers/student.router";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(bodyParser.urlencoded({extended: true}));

MongoDB.connectDB()
    .then(() => console.log('DB connected!'))
    .catch((err) => console.log(err.messages));

app.use('/student', studentRouter);

app.listen(1000, 'localhost', () => {
    console.log('Server is running at http://localhost:1000/student');
});