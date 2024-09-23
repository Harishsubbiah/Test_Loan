import React, {useState}from "react";
import { TextField } from "./TextField";
import { Button } from "./Button";
import { Label } from "./Label";
import { useNavigate } from 'react-router-dom';
import UserService from "../service/UserService";




export  const Index = () => {


    const [email,setUserName] = useState<any>('')
    const [password,setPassword] = useState<any>('')
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const credentials = {email, password };
            const response = await UserService.login(credentials);
    
            if (response.status === 200 && response.data.status == 1) {
                navigate("/loan");
            } else {
                alert("Login failed. Please check your username and password.");
            }
        } catch (error) {
            console.error("Login error: ", error);
            alert("An error occurred during login. Please try again.");
        }
    };
    
      
    
    return ( <>
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} method="get">
            <div className="mb-3">
            < Label label={"User Name"} id={"user_name"}/>
            <TextField name={"email"} id={"user_name"} type={"text"} placeholder={"Enter your username"} value={email} setValue={setUserName}/>
            </div>
            <div className="mb-3">
            < Label label={"Password"} id={"password"}/>
            <TextField  name={"password"} id={"password"} type={"password"} placeholder={"Enter your password"} value={password} setValue={setPassword}/>
            </div>
            <div className="login-button">
            <Button type={'submit'} label={"Login"} isPrimary={true} />
            </div>
            
        </form>
        <div className="mt-3 text-center">
            <a href="/register" className="btn btn-link">User Register</a>
        </div>
    </div>
    </>
    )
}