import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ChangeBugStatus(){
    const token=localStorage.getItem('token')
    const [bugId , setBugId]=useState(0)
    const [status,setStatus]=useState('')
    const [error,setError]=useState('')
    const navigate=useNavigate()

    const updateStatus=async function(){
        try {
            const options={
                method:"PUT",
                headers:{
                    Authorization:`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    status
                })
            }

            const response = await fetch(`http://localhost:3000/bug/status/${bugId}`,options)
            const result = await response.json()

            if(result.succes){
                navigate('/homepage')
            }
            else{
                setError(result.message)
                setTimeout(()=>{
                    setError('')
                },2000)
            }
        } catch (err) {
            setError(err)
            setTimeout(()=>{
                setError('')
            },2000)
        }
    }
    return(
        <div className="changeBugStatusWrapper">
            <div>
                <label>Bug id</label>
                <input type="number" min={0} onChange={(e)=>setBugId(e.target.value)}/>
            </div>
            <div>
                <label>New Status</label>
                <input type="text" onChange={(e)=>setStatus(e.target.value)}/>
            </div>
            <div>
                <button onClick={()=>updateStatus()}>Update Status</button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}
export default ChangeBugStatus