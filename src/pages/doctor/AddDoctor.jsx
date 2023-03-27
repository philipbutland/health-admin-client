//AddDoctor
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import the service since we need it to send (and get) the data to(from) the server
import service from "../../api/service";


function AddDoctor() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


 // ******** this function handles the file upload ********
 const handleFileUpload = (e) => {
  // console.log("The file to be uploaded is: ", e.target.files[0]);

  const uploadData = new FormData();

  // photo => this name has to be the same as in the model since we pass
  // req.body to .create() method when creating a new movie in '/api/movies' POST route
  uploadData.append("photo", e.target.files[0]);

  service
    .uploadImage(uploadData)
    .then((response) => {
      // console.log("response is: ", response);
      // response carries "fileUrl" which we can use to update the state
      setPhoto(response.fileUrl);
    })
    .catch((err) => console.log("Error while uploading the file: ", err));
};

// ******** this function submits the form ********
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const bodyToPost = { username, email, photo, price, department, gender };
    // if (isNaN(price) || price === '') { return setError('Please select a price for your service')}

    service
      .createDoctors(bodyToPost)
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
        <label htmlFor="">
          Doctors Name
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </label>
        <label htmlFor="">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Photo
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </label>
        <label htmlFor="">
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
          />
        </label>
        <label htmlFor="">
          Department
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Gender
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <button type="submit">Submit Doctor Profile</button>
      </form>
    </div>
  );
}

export default AddDoctor;
