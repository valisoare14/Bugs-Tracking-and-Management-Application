const Sequelize=require("sequelize")

const sequelize=new Sequelize({
    dialect:"sqlite",
    storage:"database/database.sqlite",
    logging:false
})

const functieSync=async function(){
    try{
        await sequelize.sync()
        console.log("Defined models reacreated/created succefully")
    }
    catch(error){
        console.warn("Error creating models")
        console.warn(error)
    }
}
functieSync()

module.exports = {sequelize}