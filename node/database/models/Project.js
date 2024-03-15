const {Sequelize}=require('sequelize')
const {sequelize}=require("../server")

const Project=sequelize.define("Project" ,{
    id:{
        type : Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    repository:Sequelize.STRING
},{
    timestamp:false
});

module.exports = Project