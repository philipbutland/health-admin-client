//EditPatient
import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditPatient(props) {
  const [username,setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [photo,setPhoto] = useState('')
  const [dob,setDob] = useState('')
  const [gender,setGender] = useState('')
  const [bloodType,setBloodType] = useState('') 

  const { patientId } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`${API_URL}/patient/${patientId}`)
      .then((response) => {
        const onePatient = response.data;
        setUserName(onePatient.username);
        setEmail(onePatient.email);
        setPhoto(onePatient.photo);
        setDob(onePatient.dob);
        setGender(onePatient.gender);
        setBloodType(onePatient.bloodType);
      })
      .catch((error) => console.log(error));

  }, [patientId]);

  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { username, email, photo, dob, gender, bloodType };
 
    // Make a PUT request to update the patient´s profile
    axios
      .put(`${API_URL}/patients/${patientId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the patient´s profile
        // is updated we navigate back to the details page
        navigate(`/patients/${patientId}`)
      });
  };

  const deletePatient = () => {                    
    // Make a DELETE request to delete the patient
    axios
      .delete(`${API_URL}/patients/${patientId}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of the patient´s profile.
        navigate("/patients");
      })
      .catch((err) => console.log(err));
  }; 
   

  return (
    <div>
    <h3>Edit the Patient´s Profile</h3>

    <form onSubmit={handleFormSubmit}>      
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <label>Photo:</label>
      <input
        type="text"
        name="photo"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <label>DOB:</label>
      <input
        type="text"
        name="dob"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <label>Gender:</label>
       <input
        type="text"
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <label>Blood type:</label>
          <input
        type="text"
        name="bloodType"
        value={bloodType}
        onChange={(e) => setBloodType(e.target.value)}
      />
     
      <button type="submit">Update Patient´s Profile</button>
    </form>
    <button onClick={deletePatient}>Delete Patient´s Profile</button>
  </div>
);
}

export default EditPatient