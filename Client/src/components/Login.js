import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [creds, setcreds] = useState({
        email:"",
        password:""
    })

    let history = useNavigate();   //useHistory has been deprecated and useNavigate is used instead

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: creds.email, password: creds.password }),
          });
      
          const jsonResponse = await response.json(); // Read the JSON response once
      
          console.log(jsonResponse);
      
          if (jsonResponse.success) {
            localStorage.setItem("token", jsonResponse.authToken);
            history("/");
        props.showalert("Logged in successfully", "success")

          } else {
            props.showalert("Invalid E-mail or password", "danger")
            
          }
          
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      
    
        const onChange=(e)=>{
            setcreds({...creds, [e.target.name]:e.target.value})
          }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={creds.email} onChange={onChange} name='email' aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={creds.password} onChange={onChange} name='password'/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>    </div>
    )
}

export default Login
