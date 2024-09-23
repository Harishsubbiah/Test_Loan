import React from "react";

 interface LabelProps{
    label: string,
    id: string,
 }
export const Label:React.FC<LabelProps> = (props)=>{
    const { label,id } = props;
    return(
        <>        
          <label htmlFor={id} className="form-label">{label}</label>
        </>
    )
}