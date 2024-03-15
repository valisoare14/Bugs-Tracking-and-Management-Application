const {Sequelize}=require('sequelize')
const {sequelize}=require('../server')

const Team=sequelize.define("Team",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
        unique:true
    }
},
{timestamp:false});

module.exports=Team