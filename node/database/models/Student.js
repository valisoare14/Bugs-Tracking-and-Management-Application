const {Sequelize} = require("sequelize")
const {sequelize}=require("../server")

const Student=sequelize.define( "Student",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name : Sequelize.STRING,
    mail : Sequelize.STRING,
    password : Sequelize.STRING,
},{
    timestamp:false
});

module.exports = Student