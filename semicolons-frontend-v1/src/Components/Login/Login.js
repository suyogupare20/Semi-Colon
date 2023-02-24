
import "./Login.css";
import Team from "../Images/Team.png";
import Logo from "../Images/Logo+Per.png"
import React, { useState } from "react";
import { PersonCircle} from "react-bootstrap-icons";
import Per from "../Images/Persistent.png";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(email);

        //document.getElementById("error-message").innerHTML = ""

        if(email === "" && password === "")

        {

            alert("Enter Username and Password");

            console.log("Input fields are Empty");

            return

        }

        else if(email === "")

        {

            alert("Enter Username");

            console.log("Input fields are Empty");

            return

        }

        else

        {

            alert("Enter Password");

            console.log("Input fields are Empty");

            return

        }

        console.log("Data : ",email,password);

        const data = {

            user : email,

            pass : password

        }

    };

    const handleEmailChange = (value) => {
        setEmail(value);
    };
    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const login = (event) => {
        event.preventDefault();
        const data = {
            Email: email,
            Password: password,
        };

        // const url='https://localhost:7061/api/Login';
        // axios.post(url,data).then((result)=>{      
        //     console.log(result.data);
        //     if(result.data!='Username or Password is incorrect'){
        //     navigate('/dashboard')}
        // }).catch((error)=>{
        //     alert("Username or Password Incorrect");
        // })        
    }
    return (

        <div className="container-custom">
            
            <div className="card1">
                <div className="brand-logo inline-flex">
                    <img className="brand-logo1 " src={Logo} alt="Logo" />
                </div>
                
                
                <img className="team" src={Team} alt="Italian Trulli" />

                <form className="login-form " onSubmit={handleSubmit}>
                    <div className="user-logo">
                        <PersonCircle className="logo"/>
                    </div>
                    <h3 className="login-comp">USER LOGIN</h3>
                    
                    <div className="input-field">
                        <div className="form-group mt-3 cust-input1">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1 cust-input"
                                placeholder="Enter email"
                                onChange={(e) => handleEmailChange(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3 cust-input1">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1 cust-input"
                                placeholder="Enter password"
                                onChange={(e) => handlePasswordChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-grid gap-2 mt-3 login-btn">
                        <button className="btn btn-primary" >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
        //

    )
}