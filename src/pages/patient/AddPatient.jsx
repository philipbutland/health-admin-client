import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../../api/service";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function AddPatient() {
  const [username,setUserName] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("********")
  const [photo, setPhoto] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [bloodType, setBloodType] = useState('') 
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

// ******** this method handles the file upload ********
const handleFileUpload = (e) => {
 
  const uploadData = new FormData();

  uploadData.append("photo", e.target.files[0]);

  service
    .uploadImage(uploadData)
    .then(response => {
      setPhoto(response.fileUrl);
    })
    .catch(err => console.log("Error while uploading the file: ", err));
};

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const bodyToPost = {username, email, password, photo, dob, gender, bloodType}
    if (!username) {
      setError("Please select a patient's name")
    }
    else if (!email) {
      setError("Please select an a-mail address for your patient")
    }
    else if (!password) {
      setError("Please enter a password")
    }
    else if (!gender)
      setError("Please select a gender from the dropdown menu")
    else if (!bloodType)
      setError("Please select a blood type from the dropdown menu")
    else{
      axios
        .post(`${API_URL}/patients/add-patient`, bodyToPost)
        .then(() => {
          setUserName("");
          setEmail("");
          setPhoto("");
          setDob("");
          setGender("");
          setPassword("")
          setBloodType("");
          alert("Patient's Profile Created");
          navigate("/patients");
        })
        .catch((error) => {
          setError(<p>{error.response.data.message}</p>)
        });
     }
  }
  
  return (
    <div>
      <p className="pageHeader">Add a Patient</p>
      <form action="" onSubmit={handleSubmit}>
        {error && <p className="errorMessage"> {error} </p>}
        <label htmlFor="" className="editFieldLabel">
          Patient's Name
          <input className="editField" type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Name (required)" />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Email
          <input className="editField" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail address (required)" />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Password
          <input className="editField" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (required)" />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Photo
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Date of Birth
          <input className="editField" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>

        <label htmlFor=""  className="editFieldLabel">
           Gender
           <div>
             <select className="editField" name="gender" onChange={(e)=>setGender(e.target.value)}>
              <option value="">--- Choose a gender ---</option>
       		    <option value="M">Male</option>
       		    <option value="F">Female</option>
       		    <option value="N/A">I'd rather not say</option>
    		    </select>
          </div> 
        </label>

        <label htmlFor=""  className="editFieldLabel">
           Blood Type
           <div>
             <select className="editField" name="bloodType" onChange={(e)=>setBloodType(e.target.value)}>
              <option value="">--- Choose a Blood Type ---</option>
       		    <option value="A+">A+</option>
       		    <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
    		    </select>
          </div> 
        </label>

        <button className="addButton" type="submit">Submit Patient Profile</button>
      </form>
    </div>
  );
}

export default AddPatient;