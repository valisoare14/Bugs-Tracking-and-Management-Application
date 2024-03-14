import { useState } from "react"
import { useNavigate } from "react-router-dom"


function AddProject(){
    
    const [projectName,setProjectName]=useState('')
    const [teamName,setTeamName]=useState('')
    const [repository,setRepositoryName]=useState('')
    const [error,setError]=useState('')
    const navigate=useNavigate()
    const token=localStorage.getItem('token')

    const addProject=async function(){
        try {
            const options={
                method:"POST",
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    projectName,
                    teamName,
                    repository
                })
            }
            const response= await fetch('http://localhost:3000/project',options)
            const result=await response.json()

            if(!result.succes){
                setError(result.message)
                setTimeout(()=>{
                    setError('')
                },2000)
            }
            else{
                navigate('/homepage')
            }

        } catch (err) {
            setError(err)
            setTimeout(()=>{
                setError('')
            },2000)
        }
    }

    return(
        <div className="addProjectDetailsWrapper">
            <div>
                <label>Project Name:</label>
                <input type="text" id='projectNameInput' onChange={(e)=>setProjectName(e.target.value)} />
            </div>
            <div>
                <label>Team Name:</label>
                <input type="text" id='teamNameInput' onChange={(e)=>setTeamName(e.target.value)} />
            </div>
            <div>
                <label>Repository Name:</label>
                <input type="text" id='repositoryNameInput' onChange={(e)=>setRepositoryName(e.target.value)}/>
            </div>
            <div>
                <button onClick={()=>addProject()}>Add</button>
            </div>
            {error && <div className='error'>{error}</div>}
        </div>
    )
}
export default AddProject