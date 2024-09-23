import React, { useState } from "react";
import { TextField } from "./TextField";
import { Label } from "./Label";
import UserService from "../service/UserService";

export const LoanPage = () => {
  const [firstName, setFirstName] = useState<any>('');
  const [secondName, setSecondName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [dob, setDob] = useState<any>('');
  const [loanType, setLoanType] = useState<any>('');
  const [showModal, setShowModal] = useState(false);
  const [eligibilityMessage, setEligibilityMessage] = useState("");
  const [panNumber, setPanNumber] = useState<any>('');

  const handleLoanTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanType(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    if (age >= 18) {
      setEligibilityMessage("You are eligible for the loan.");
  
      const userData = {
        first_name: firstName,
        last_name: secondName,
        email,
        date: dob, 
        loan_type: loanType,
        pan:panNumber,
        
      };
  
      try {
        const response = await UserService.loan(userData); 
        console.log(response.data.status, response.data);
      } catch (error) {
        console.error("Error during registration:", error);
        setEligibilityMessage("There was an error processing your request.");
      }
    } else {
      setEligibilityMessage("You are not eligible for the loan. Must be at least 18 years old.");
    }
    setShowModal(true);
  };
  

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="register-container">
        <h2>Loan Application Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <Label label={"First Name"} id={"name"} />
              <TextField
                name={"name"}
                id={"name"}
                type={"text"}
                placeholder={"Enter your First Name"}
                value={firstName}
                setValue={setFirstName}
              />
            </div>
            <div className="col">
              <Label label={"Last Name"} id={"last_name"} />
              <TextField
                name={"last_name"}
                id={"last_name"}
                type={"text"}
                placeholder={"Enter your Last Name"}
                value={secondName}
                setValue={setSecondName}
              />
            </div>
          </div>
          <div className="mb-3">
            <Label label={"Email"} id={"email"} />
            <TextField
              name={"email"}
              id={"email"}
              type={"email"}
              placeholder={"Enter your email"}
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="mb-3">
            <Label label={"Date of birth"} id={"birth_date"} />
            <TextField
              name={"birth_date"}
              id={"birth_date"}
              type={"date"}
              placeholder={"Select your date of birth"}
              value={dob}
              setValue={setDob}
            />
          </div>
          <div className="col">
              <Label label={"Pan Number"} id={"pan_number"} />
              <TextField
                name={"pan_number"}
                id={"pan_number"}
                type={"text"}
                placeholder={"Enter your Pan Number"}
                value={panNumber}
                setValue={setPanNumber}
              />
            </div>
          <div className="mb-3">
            <Label label={"Loan Type"} id={"loan_type"} />
            <select
              className="form-select"
              id="loan_type"
              onChange={handleLoanTypeChange}
              value={loanType}
            >
              <option value="" disabled>
                Select loan type
              </option>
              <option value="personal">Personal Loan</option>
              <option value="home">Home Loan</option>
              <option value="auto">Auto Loan</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </form>
      </div>

      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Loan Eligibility</h2>
            <p>{eligibilityMessage}</p>
            <button onClick={handleCloseModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
