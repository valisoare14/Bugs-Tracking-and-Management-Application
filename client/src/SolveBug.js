import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SolveBug(){
    const [bugId,setBugId]=useState(0)
    const [status,setStatus]=useState('')
    const [link,setLink]=useState('')
    const [error,setError]=useState('')
    const token=localStorage.getItem('token')
    const navigate=useNavigate()

    const updateBug=async function(){
        try {
            const options={
                method:"PUT",
                headers:{
                    Authorization :`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({status,link})
            }
            const response=await fetch(`http://localhost:3000/bug/${bugId}`,options)
            const result=await response.json()

            if(result.succes){
                navigate('/homepage')
            }
            else{
                setError(result.message)
                setTimeout(()=>{
                    setError('')
                },2000)
            }
        } catch (er) {
            setError(er)
            setTimeout(()=>{
                setError('')
            },2000)
        }
    }

    return(
        <div className="solveBugWrapper">
            <div>
                <label>Bug id:</label>
                <input type="number" onChange={(e)=>setBugId(e.target.value)} min={0}/>
            </div>
            <div>
                <label>New Status:</label>
                <input type="text" onChange={(e)=>setStatus(e.target.value)}/>
            </div>
            <div>
                <label>Commit Link:</label>
                <input type="text" onChange={(e)=>setLink(e.target.value)}/>
            </div>
            <div>
                <button onClick={()=>updateBug()}>Update Bug</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}
export default SolveBug