const handleError = function(res,error ,message){
    console.error(`Error ${message}`,error)
    res.status(500).json({
        succes:false,
        message:`Error ${message}`
    })
}
module.exports = handleError