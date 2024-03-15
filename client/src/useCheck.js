import { useEffect } from "react";

//un hook custom trb sa inceapa cu 'use;
function useCheck(setLoggedIn){
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            const options={
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'token':token})
            }

            fetch("http://localhost:3000/check",options)
            .then(res=>res.json())
            .then(res=>{
                if(res.succes){
                    setLoggedIn(true)
                }
            })
            .catch(()=>{
                localStorage.removeItem('token')
                window.location.href='/'
            })
        }
    },[])
}
export default useCheck