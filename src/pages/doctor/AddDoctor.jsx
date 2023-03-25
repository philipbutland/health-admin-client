import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddDoctor() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const bodyToPost = { username, email, photo, price, department, gender };
    // if (isNaN(price) || price === '') { return setError('Please select a price for your service')}
    axios
      .post("http://localhost:5005/doctors/add-doctor", bodyToPost)
      .then(() => {
        setUserName("");
        setEmail("");
        setPhoto("");
        setPrice("");
        setDepartment("");
        setGender("");
        alert("Doctors Profile Created");
        navigate("/doctors");
      })
      .catch((er) => {
        console.log("error", er);
        const email = er.response.data.error.message.includes('Email')
        if (email) setError('Fill your email')
      });
  }
  return (
    <div>
      <h3>Add the Doctor</h3>
      <form action="" onSubmit={handleSubmit}>
        {error && <p> {error} </p>}
        <label htmlFor="" className="editFieldLabel">
          Doctors Name
          <input
            className="editField" 
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Email
          <input
            className="editField" 
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Photo
          <input
            className="editField" 
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Price
          <input
            className="editField" 
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
          />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Department
          <input
            className="editField" 
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </label>

        <label htmlFor=""  className="editFieldLabel">
           Gender
           <div>
             <select className="editField" name="gender" onChange={(e)=>setGender(e.target.value)}>
       		    <option value="M">Male</option>
       		    <option value="F">Female</option>
       		    <option value="NA">I'd rather not say</option>
    		    </select>
          </div> 
        </label>

        <button type="submit">Submit Doctor Profile</button>
      </form>
    </div>
  );
}

export default AddDoctor;






