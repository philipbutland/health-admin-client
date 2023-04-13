import React, { useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../../api/service";

function AddDoctor() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("********");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState(0);
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
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
    const bodyToPost = { username, email, password, photo, price, department, gender };

    if (!username) {
      setError("Please add a doctor's name")
    }
    else if (!email){
      setError("Please add an e-mail address for your doctor")
    }
    else if (!password){
      setError("Please enter a password")
    }
    else if (!gender){
      setError("Please select a gender from the dropdown menu")
    }
    else if (!department){
      setError("Please select a department from the dropdown menu")
    }
    else{
      service
        .createDoctors(bodyToPost)
        .then(() => {
          setUserName("");
          setEmail("");
          setPassword("");
          setPhoto("");
          setPrice(0);
          setDepartment("");
          setGender("");
          alert("Doctor's Profile Created");
          navigate("/doctors");
        })
        .catch((error) => {
          console.log("error", error);
          setError(<p>{error.response.data.message}</p>)
        });
    }
  }
  return (
    <div>
      <p className="pageHeader">Add a Doctor</p>
      <form action="" onSubmit={handleSubmit}>
        {error && <p className="errorMessage"> {error} </p>}
        <label htmlFor="" className="editFieldLabel">
          Doctor's Name
          <input className="editField" type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Name (required)" />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Email
          <input className="editField" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail address (required)" />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Password
          <input className="editField" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password (required)" />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Photo
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Price
          <input className="editField" type="number" value={price} onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label htmlFor=""  className="editFieldLabel">
           Department
           <div>
             <select className="editField" name="department" onChange={(e)=>setDepartment(e.target.value)}>
              <option value="">--- Choose a department ---</option>
       		    <option value="Radiology">Radiology</option>
       		    <option value="Pediatrics">Pediatrics</option>
       		    <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Oncology">Oncology</option>
    		    </select>
          </div> 
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

        <button className="addButton" type="submit">Submit Doctor Profile</button>
      </form>
    </div>
  );
}

export default AddDoctor;
