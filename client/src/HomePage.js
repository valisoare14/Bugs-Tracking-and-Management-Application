import { useEffect, useState } from "react"

function HomePage(){
    const [bugs , setBugs]=useState([])
    const token=localStorage.getItem('token')

    const displayBugs=function(){
        const options={
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        fetch('http://localhost:3000/bug/user',options)
        .then(res=>res.json())
        .then(res=>{
            if(res.succes){
                setBugs(res.data)
            }
        })
        .catch()
    }
 
 
    useEffect(()=>{
        displayBugs();
    },[])
    return (<div className="bugsWrapper">
            <div id='bugList'>Bugs</div>
            <table id='bugs'>
                <tbody>
                    <tr id="tableHeader">
                        <td>Id</td>
                        <td>Severity</td>
                        <td>Priority</td>
                        <td>Status</td>
                        <td>Link</td>
                        <td>Description</td>
                    </tr>
                    {bugs?.map(bug => (
                        <tr className="bugRow" key={bug.id}>
                            <td>{bug.id}</td>
                            <td>{bug.severity}</td>
                            <td>{bug.priority}</td>
                            <td>{bug.status}</td>
                            <td>{bug.link}</td>
                            <td>{bug.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}
export default HomePage