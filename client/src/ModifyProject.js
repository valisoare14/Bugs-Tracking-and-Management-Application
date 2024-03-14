import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ModifyProject(){
    const [projectId,setProjectId]=useState(0)
    const [projectName,setProjectName]=useState('')
    const [repository,setRepository]=useState('')
    const [error,setError]=useState('')
    const navigate=useNavigate()
    const token=localStorage.getItem('token')

    const updateProject=async function(){
        try {
            const options={
                method:"PUT",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

            const response=await fetch(`http://localhost:3000/project?id=${projectId}&name=${projectName}&repository=${repository}`,options)
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
        <div className="modifyProjectWrapper">
            <div>
                <label>Project id:</label>
                <input type="number" onChange={(e)=>setProjectId(e.target.value)} min={0}/>
            </div>
            <div>
                <label>New Name:</label>
                <input type="text" onChange={(e)=>setProjectName(e.target.value)}/>
            </div>
            <div>
                <label>New Repository:</label>
                <input type="text" onChange={(e)=>setRepository(e.target.value)}/>
            </div>
            <div>
                <button onClick={()=>updateProject()}>Update Project</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}
export default ModifyProject