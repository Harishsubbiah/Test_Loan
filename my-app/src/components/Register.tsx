import React, { useState } from "react";
import { TextField } from "./TextField";
import { Label } from "./Label";
import { Button } from "./Button";
import { Radio } from "./Radio";
import UserService from "../service/UserService";  
import { useNavigate } from "react-router-dom"; 

export const Register = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     
      if (!fullName || !email || !phone || !gender || !password) {
        alert("All fields are required.");
        return;
      }

      const userData = { fullName, email, phone, gender, password };


      const response = await UserService.register(userData);
      console.log(response.data.status,response.data);
      
      if (response.data.status == 1) {  
       
        navigate("/");  
      } else {
        console.log(response.data);
        
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      alert("An error occurred during registration.");
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  return (
    <div className="register-container">
      <h2>User Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Label label={"Full Name"} id={"fullName"} />
          <TextField name={"fullName"} id={"fullName"} type={"text"} placeholder={"Enter your full name"} setValue={setFullName} value={fullName} />
        </div>
        <div className="mb-3">
          <Label label={"Email"} id={"email"} />
          <TextField name={"email"} id={"email"} type={"email"} placeholder={"Enter your email"} setValue={setEmail} value={email} />
        </div>
        <div className="mb-3">
          <Label label={"Phone"} id={"phone"} />
          <TextField name={"phone"} id={"phone"} type={"number"} placeholder={"Enter your phone number"} setValue={setPhone} value={phone} />
        </div>
        <div className="mb-3">
          <Label label={"Gender"} id={"gender"} />
          <Radio
            name={"gender"}
            id={"male"}
            radioLabel={"Male"}
            value={"male"}
            onChange={handleGenderChange}
            checked={gender === "male"}
          />
          <Radio
            name={"gender"}
            id={"female"}
            radioLabel={"Female"}
            value={"female"}
            onChange={handleGenderChange}
            checked={gender === "female"}
          />
        </div>
        <div className="mb-3">
          <Label label={"Password"} id={"password"} />
          <TextField name={"password"} id={"password"} type={"password"} placeholder={"Enter your password"} setValue={setPassword} value={password} />
        </div>
        <Button type="submit" label="Register" isPrimary={true} />
        <Button type="button" label="Cancel" isPrimary={false} onPress={() => navigate("/")} />
      </form>
    </div>
  );
};
