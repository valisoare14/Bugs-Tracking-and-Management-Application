const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const logger=require('../utils/logger')
const Team = require('../database/models/Team')
const Bug=require('../database/models/Bug')
const Project=require('../database/models/Project')
const handleError = require('../utils/handleError')
const Student = require('../database/models/Student')

const bcrypt = require('bcrypt')
const jasonWebToken=require('jsonwebtoken')
const checkToken = require('../utils/checkToken')
const { json } = require('sequelize')

const app = express()

dotenv.config()
app.use(cors());
app.use(logger)
app.use(express.json())
app.get('/',function(req,res){
    res.status(200).send('Hello World')
})

app.post('/team' ,async function(req,res){
    try{ 
        if(Object.keys(req.body).length != 0){
            const {name} = req.body
            const team= await Team.create({name})
            return res.status(201).json({
                succes:true,
                data:team
            })
        }
        else{
           return res.status(500).json({succes:false , data:{}})
        }
    }
    catch(error){
       handleError(res,error,"Error creating team !")
    }
})

app.post('/student' ,async function(req,res){
    try{
        if(Object.keys(req.body).length == 0){
            return res.status(500).json({
                succes:false,
                messaje:"Empty body",
                data:{}
            })
        }
        const {name,mail,password,teamName}=req.body
        const team=await Team.findOne({
            where:{
                name:teamName
            }
        })
        if(!team){
            return res.status(404).json({
                succes:false,
                message:"Team not found",
                data:{}
            })
        }

        const salt=bcrypt.genSaltSync(12)
        const hashPass=bcrypt.hashSync(password,salt)
        
        const student=await Student.create({
            name,
            mail,
            password :hashPass ,
            teamId:team.id
        })
        res.status(201).json({
            succes:true ,
            message:"Student created successfully",
            data:{
                student
            }
        })
    }
    catch(error){
        handleError(res,error,"Error creating student ")
    }
})

app.post('/login' , async function(req,res){
    try{
        if(Object.keys(req.body).length ==0){
            return res.status(500).json({
                succes:false,
                message:"Please provide informations about mail and password",
                data:{}
            })
        }
        console.log("salut")
        const {mail,password} = req.body
        
        const student=await Student.findOne({
            where:{
                mail:mail
            }
        })
        if(!student){
            return res.status(404).json({
                succes:false,
                message:"Invalid email",
                data:{}
            })
        }

        const validPassword=bcrypt.compareSync(password,student.password)

        if(!validPassword){
            return res.status(404).json({
                succes:false,
                message:"Invalid Password",
                data:{}
            })
        }

        const token=jasonWebToken.sign({
            id:student.id
        },
        process.env.SECRET_KEY ,
        {
            expiresIn:'1h'
        })

        return res.status(200).json({
            succes:true,
            message:"Student logged in successfully",
            token:token
        })
    }
    catch(error){
        handleError(res , error , 'Error logging user')
    }
})

app.post('/project' ,checkToken , async function(req,res){
    try {
        if(req.body.projectName ==='' || req.body.teamName===''  || req.body.repository==='' ){
            return res.status(500).json({
                succes:false,
                message:"Please provide informations about the project"
            }) 
        }
        const {projectName,teamName ,repository}=req.body

        const team = await Team.findOne({
            where:{
                name:teamName
            }
        })
        if(!team){
            return res.status(404).json({
                succes:false,
                message:'Team does not exists'
            })
        }
        const project=await Project.create({
            name:projectName,
            repository,
            teamId : team.id
        })

        res.status(200).json({succes:true , message:"Project created" , data:{project}})
    } catch (error) {
        handleError(res , error,"Error creating project")
    }
})

app.put('/project',checkToken,async function(req,res){
    try {
        const {id,name,repository}=req.query

        const project=await Project.findByPk(id)
        if(!project){
            return res.status(404).json({
                succes:false,
                message:"Project not found"
            })
        }

        const student=await Student.findByPk(req.studentId)

        const projects=await Project.findAll({
            where:{
                teamId:student.teamId
            }
        })

        if(projects.length ==0){
            return res.status(404).json({
                succes:false,
                message:"Project not available for the student"
            })
        }

        const availabeProject = projects.map(element => element.id).find(element => element == project.id)

        if(availabeProject == undefined){
            return res.status(404).json({
                succes:false,
                message:"Project not available for the student"
            })
        }

        const updatedProject=await project.update({
            name,
            repository
        })

        res.status(200).json({
            succes:true,
            message:"Project successfully updated",
            data:{updatedProject}
        })
    } catch (error) {
        console.log("ups")
        handleError(res,error,"Couldn't update the project")
    }
})

app.post('/bug',async function(req,res){
    try {
        if(Object.keys(req.body).length==0){
            return res.status(500).json({
                succes:false,
                messaje:"Please provide informations about the bug",
                data:{}
            })
        }
        
        const {projectName,severity,priority,description,link}=req.body

        const project=await Project.findOne({
            where:{
                name:projectName
            }
        })
        if(!project){
            return res.status(404).json({
                succes:false,
                message:"Project not found",
                data:{}
            })
        }

        
        const bug = await Bug.create({
            severity:severity,
            priority:priority,
            description:description,
            status:'pending',
            link:link,
            studentId:null,
            projId : project.id
        })

        // Bug.destroy({
        //     where: {},
        //     truncate: true
        // })

        res.status(200).json({
            succes:true,
            message:"Bug created successfully",
            data:{bug}
        })

    } catch (error) {
        handleError(res,error,"Bug couldn't be created")
    }
})

app.get('/bug/user',checkToken ,async function(req,res){
    try {
        const student=await Student.findByPk(req.studentId)

        const team=await Team.findByPk(student.teamId)

        const projects=await Project.findAll({
            where:{
                teamId:team.id
            }
        })

        if(!projects){
            return res.status(404).json({
                succes:false,
                message:"No projects allocated for the team of the student",
                data:{}
            })
        }

        var bugs=[]
        async function findBugs(project){
            const projBugs=await Bug.findAll({
                where:{
                    projId:project.id
                }
            })
            if(projBugs){
                projBugs.forEach(bug=>{
                    bugs.push(bug);
                })
            }
        }        
        await Promise.all(projects.map(project => findBugs(project)));

        if(!bugs){
            return res.status(404).json({
                succes:false,
                message:"No bugs allocated for the team of the student",
                data:{}
            })
        }
        res.status(200).json({
            succes:true,
            message:"Bugs found successfully",
            data:bugs
        })
    } catch (error) {
        handleError(res,error,"Error finding bugs")
    }
})

app.put('/bug/:id',checkToken ,async function(req,res){
    try {
        if(req.body.status ==='' || req.body.link ===''){
            console.log(req.body)
            return res.status(500).json({
                succes:false,
                message:"Please provide information about the updated fields"
            })
        }
        const {status,link}=req.body
        const bugId=req.params.id

        const bug=await Bug.findByPk(bugId)

        if(!bug){
            return res.status(404).json({
                succes:false,
                message:"Bug not found"
            })
        }

        if(bug.studentId != null){
            if(bug.studentId == req.studentId){
                return res.status(501).json({
                    succes:false,
                    message:"Student allready has a bug in process"
                })
            }
            else{
                return res.status(502).json({
                    succes:false,
                    message:"Bug allready in use by another student"
                })
            }
        }

        //
        const student=await Student.findByPk(req.studentId)

        const team=await Team.findByPk(student.teamId)

        const projects=await Project.findAll({
            where:{
                teamId:team.id
            }
        })

        if(!projects){
            return res.status(404).json({
                succes:false,
                message:"No projects allocated for the team of the student"
            })
        }

        var bugs=[]
        async function findBugs(project){
            const projBugs=await Bug.findAll({
                where:{
                    projId:project.id
                }
            })
            if(projBugs){
                projBugs.forEach(bug=>{
                    bugs.push(bug);
                })
            }
        }        
        await Promise.all(projects.map(project => findBugs(project)));

        //verificam daca bug-ul solicitat pentru actualizare
        //face parte din lista de bug-uri a proiectelor din echipa studentului
        const isBugAllocatedForTheStudent= bugs.find(element => element.id == bug.id)
        if(isBugAllocatedForTheStudent == undefined){
            return res.status(404).json({
                succes:false,
                message:"Student can't solve this bug"
            })
        }

        const updatedBug= await bug.update({
            studentId:req.studentId,
            status,
            link
        })

        res.status(200).json({
            succes:true,
            message:"Bug updated succesfully",
            data:{updatedBug}
        })

    } catch (error) {
        handleError(res,error,": unique constraint on studentId")
    }
})

app.put('/bug/status/:id',checkToken ,async function(req,res){
    try {
        if(req.body.status ===''){
            return res.status(500).json({
                succes:false,
                message:"Please provide information about the new status"
            })
        }
        const student=await Student.findByPk(req.studentId)

        const team=await Team.findByPk(student.teamId)

        const projects=await Project.findAll({
            where:{
                teamId:team.id
            }
        })
        
        if(projects.length == 0){
            return res.status(404).json({
                succes:false,
                message:"No projects allocated for the team of the student"
            })
        }

        var bugs=[]
        async function findBugs(project){
            const projBugs=await Bug.findAll({
                where:{
                    projId:project.id
                }
            })
            if(projBugs){
                projBugs.forEach(bug=>{
                    bugs.push(bug);
                })
            }
        }        
        await Promise.all(projects.map(project => findBugs(project)));

        const isTheSpecifiedBugAllowedForTheStudent = bugs.find(element => element.id ==req.params.id)
        
        if(isTheSpecifiedBugAllowedForTheStudent == undefined){
            return res.status(500).json({
                succes:false,
                message:"Student can't update the status for this bug"
            })
        }
        
        if(isTheSpecifiedBugAllowedForTheStudent.studentId != req.studentId){
            return res.status(500).json({
                succes:false,
                message:"Bug not accessible for the student"
            })
        }

        const updatedBug=await isTheSpecifiedBugAllowedForTheStudent.update({
            ...req.body
        })
        
        res.status(200).json({
            succes:true,
            message:"Bug status updated successfully",
            data:{updatedBug}
        })
        //
    } catch (error) {
        handleError(res,error,"Couldn't update the status")
    }
})
app.post('/check' ,(req,res)=>{
    const token= req.body.token
    console.log(token)
    if(!token){
        return res.status(404).json({succes:false,message:'Token not found',data:{}})
    }

    const isValidPassword=jasonWebToken.verify(token,process.env.SECRET_KEY)

    if(!isValidPassword){
        return res.status(404).json({succes:false , message:'Invalid token'})
    }
    res.status(200).json({succes:true , message:"Valid token"})
})
module.exports = app