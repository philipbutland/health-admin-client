//EditDoctor
import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditDoctor() {
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [price,setPrice] = useState('')
  const [department,setDepartment] = useState('')   
 
  const { doctorId } = useParams();
  const navigate = useNavigate();  
 
  useEffect(() => {
    axios
      .get(`${API_URL}/doctors/${doctorId}`)
      .then((response) => {
        const oneDoctor = response.data;
        setName(oneDoctor.name);
        setEmail(oneDoctor.doctor);
        setPrice(oneDoctor.price);
        setDepartment(oneDoctor.department);
      })
      .catch((error) => console.log(error));
    
  }, [doctorId]);

  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, email, price, department };
 
    // Make a PUT request to update the doctor´s profile
    axios
      .put(`${API_URL}/doctors/${doctorId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the doctor´s profile
        // is updated we navigate back to the details page
        navigate(`/doctors/${doctorId}`)
      });
  };

  const deleteDoctor = () => {                    
    // Make a DELETE request to delete the appointment
    axios
      .delete(`${API_URL}/doctors/${doctorId}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of the doctor´s profile.
        navigate("/doctors");
      })
      .catch((err) => console.log(err));
  }; 


  return (
    <div>
      <h3>Edit the Doctor´s Profile</h3>
 
      <form onSubmit={handleFormSubmit}>      
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <label>Price:</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          name="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
       
        <button type="submit">Update Doctor´s Profile</button>
      </form>
      <button onClick={deleteDoctor}>Delete Doctor´s Profile</button>
    </div>
  );
}

export default EditDoctor