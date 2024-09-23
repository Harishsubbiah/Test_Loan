import React from "react";
import { Label } from "./Label";
 interface TextFieldProps{
    name: string,
    id: string,
    type: string,
    placeholder: string
    value: string,
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValue:(value:string)=>void;
 }
export const TextField:React.FC<TextFieldProps> = (props)=>{
    const {  name, id, type, placeholder,value,setValue } = props;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value); 
      };

    return(
        <>        
                <input type={type}className="form-control" id={id} placeholder={placeholder} name={name}  value={value}
        onChange={handleInputChange}/>
        </>
    )
}