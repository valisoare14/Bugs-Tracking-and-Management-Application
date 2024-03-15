const app = require("./application/app")
const Bug=require("./database/models/Bug")
const Student=require("./database/models/Student")
const Team=require("./database/models/Team")
const Project=require("./database/models/Project")

Project.hasMany(Bug,{foreignKey : "projId"})
Team.hasMany(Student,{foreignKey : "teamId"})
Team.hasMany(Project,{foreignKey : "teamId"})
Student.hasOne(Bug, { foreignKey: 'studentId'});



app.listen(3000 , ()=>{
})