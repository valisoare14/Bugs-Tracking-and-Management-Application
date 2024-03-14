import { useState } from "react"

function AddBug(){
    const [projectName,setProjectName]=useState('')
    const [severity,setSeverity]=useState('')
    const [priority,setPriority]=useState('')
    const [description,setDescription]=useState('')
    const [link,setLink]=useState('')
    const [error,setError]=useState('')

    const addProject=async function(){
        try {
            const options={
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    projectName,
                    severity,
                    priority,
                    description,
                    link
                })
            }

            const response=await fetch('http://localhost:3000/bug',options)
            const result=await response.json()

            if(result.succes){
                console.log(result.data)
            }
        } catch (err) {
            setError(err)
        }
    }


    return(
        <div className="addBugWrapper">   
            <div>
                <label>Project Name:</label>
                <input type="text"  onChange={(e)=>setProjectName(e.target.value)} />
            </div>
            <div>
                <label>Severity:</label>
                <input type="text"  onChange={(e)=>setSeverity(e.target.value)} />
            </div>
            <div>
                <label>Priority:</label>
                <input type="text"  onChange={(e)=>setPriority(e.target.value)}/>
            </div>
            <div>
                <label>Description:</label>
                <input type="text"  onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div>
                <label>Link:</label>
                <input type="text"  onChange={(e)=>setLink(e.target.value)}/>
            </div>
            <div>
                <button onClick={()=>addProject()}>Add</button>
            </div>
        </div>
    )
}
export default AddBug