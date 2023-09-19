import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


let newTaskFreeTime = [];
let newTaskWork = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function dateGenerator(req, res, next) {
    let d = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayName = days[d.getDay()];
    let monthName = month[d.getMonth()];
    let dayNumber = d.getDate();
    let completeDate = dayName + ", " + monthName + " " + dayNumber;

    app.get("/", (req, res) => {
        res.render("index.ejs", {
            inputedTaskFreeTime: newTaskFreeTime,
            completedDate: completeDate
        });
    });

    app.get("/work", (req, res) => {
        res.render("work.ejs", {
            inputedTaskWork: newTaskWork,
            completedDate: completeDate
        });
    });
    
    app.post("/submitForFreeTime", (req, res) => {
        newTaskFreeTime.push(req.body["taskToDo"]);
        res.render("index.ejs", {
            inputedTaskFreeTime: newTaskFreeTime,
            completedDate: completeDate
        });
    });

    app.post("/submitForWork", (req, res) => {
        newTaskWork.push(req.body["taskToDo"]);
        res.render("work.ejs", {
            inputedTaskWork: newTaskWork,
            completedDate: completeDate
        });
    });
    
    next();
}

app.use(dateGenerator);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
