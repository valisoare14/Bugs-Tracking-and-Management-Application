import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props){
    const {loggedIn,setLoggedIn}=props
    const [mail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate()

    const fetchLogin=async function(){
        try {
            const options={
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({mail,password})
            }
            const result=await fetch('http://localhost:3000/login',options)
            const response=await result.json()
            
            if(response.succes){
                localStorage.setItem('token',response.token)
                setLoggedIn(true)
                navigate('/homepage')
            }
            else{
                setError(response.message)
                setTimeout(()=>{
                    setError('')
                },2000)
            }
        } catch (error) {
            setError(error.message)
            setTimeout(()=>{
                setError('')
            },2000)
        }
    }
    //elementul JSX '()' , pe care o returnam , accepta un singur element radacina
    // daca punem ' {error && <div className='error'>{error}</div>}' inafara <div className='loginWrapper'> , vom avea eroare
    return(
        <div className='loginWrapper'>
            <div id='mailDiv'>
                <label>Mail</label>
                <input type='text' onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type='password'onChange={e=>setPassword(e.target.value)}/>
            </div>
            <div>
                <button id="loginButton" onClick={()=>fetchLogin()}>Submit</button>
            </div>
            {error && <div className='error'>{error}</div>}
        </div>
    )
}
export default Login