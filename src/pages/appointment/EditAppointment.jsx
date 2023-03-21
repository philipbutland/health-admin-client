//EditAppointment
import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditAppointment(props) {
  const [patient,setPatient] = useState('')
  const [doctor, setDoctor] = useState('')
  const [department,setDepartment] = useState('')
  const [date,setDate] = useState('')   
 
  const { appointmentId } = useParams();
  const navigate = useNavigate();  
 
  useEffect(() => {
    axios
      .get(`${API_URL}/appointments/${appointmentId}`)
      .then((response) => {
        const oneAppointment = response.data;
        setPatient(oneAppointment.patient);
        setDoctor(oneAppointment.doctor);
        setDepartment(oneAppointment.department);
        setDate(oneAppointment.date);
      })
      .catch((error) => console.log(error));
    
  }, [appointmentId]);
  
  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { patient, doctor, department, date };
 
    // Make a PUT request to update the appointment
    axios
      .put(`${API_URL}/appointments/${appointmentId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the appointment
        // is updated we navigate back to the details page
        navigate(`/appointments/${appointmentId}`)
      });
  };

 const deleteAppointment = () => {                    
    // Make a DELETE request to delete the appointment
    axios
      .delete(`${API_URL}/appointments/${appointmentId}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of appointments.
        navigate("/appointments/");
      })
      .catch((err) => console.log(err));
  };  
  
  return (
    <div>
      <h3>Edit the Appointment</h3>
 
      <form onSubmit={handleFormSubmit}>    
        <label>Patient:</label>
        <input
          type="text"
          name="patient"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        />
        <label>Doctor:</label>
        <input
          type="text"
          name="doctor"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        />
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
       <label>Date:</label>
        <input
          type="text"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Update Appointment</button>
      </form>
      <button onClick={deleteAppointment}>Delete Appointment</button>
    </div>
  );
}

export default EditAppointment