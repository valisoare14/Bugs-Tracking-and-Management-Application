const {Sequelize}=require("sequelize")
const {sequelize}=require("../server")

const Bug=sequelize.define("Bug",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    severity : Sequelize.STRING,
    priority : Sequelize.STRING,
    description : Sequelize.STRING,
    status:Sequelize.STRING,
    link : Sequelize.STRING,
    studentId:{
        type:Sequelize.INTEGER,
        unique:true
    }
},{
    timestamp:false
});

module.exports=Bug