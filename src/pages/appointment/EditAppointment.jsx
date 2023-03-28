//EditAppointment
import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditAppointment() {
  const [patientId,setPatientId] = useState('')
  const [doctorId, setDoctorId] = useState('')
  const [department,setDepartment] = useState('')
  const [dateTime,setDateTime] = useState('')   
 
  const { appointmentId } = useParams();
  const navigate = useNavigate();  
 
  useEffect(() => {
    axios
      .get(`${API_URL}/appointments/${appointmentId}`)
      .then((response) => {
        const oneAppointment = response.data;
        setPatientId(oneAppointment.patientId);
        setDoctorId(oneAppointment.doctorId);
        setDepartment(oneAppointment.department);
        setDateTime(oneAppointment.dateTime);
      })
      .catch((error) => console.log(error));
    
  }, [appointmentId]);
  
  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    const requestBody = { patientId, doctorId, department, dateTime };
    console.log("body", requestBody)
     axios
      .put(`${API_URL}/appointments/${appointmentId}`, requestBody)
      .then((response) => {
        navigate(`/appointments/${appointmentId}`)
      });
  };

 const deleteAppointment = () => {                    
    axios
      .delete(`${API_URL}/appointments/${appointmentId}`)
      .then(() => {
        navigate("/appointments/");
      })
      .catch((err) => console.log(err));
  };  
  
  return (
    <div className="normalPage">
      <h3>Edit the Appointment</h3>
 
      <form onSubmit={handleFormSubmit}>  

        <label className="editFieldLabel">
          Patient:
          <input className="editField" type="text" name="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        </label>
        <label className="editFieldLabel">
          Doctor:
          <input className="editField" type="text" name="doctorId" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
        </label>
        <label className="editFieldLabel">
          Date / Time:
          <input className="editField" type="datetime-local" name="dateTime" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
        </label>
        <label htmlFor=""  className="editFieldLabel">
           Department
           <div>
             <select className="editField" name="department" value={department} onChange={(e)=>setDepartment(e.target.value)}>
              <option value="">--- Choose a department ---</option>
       		    <option value="Radiology">Radiology</option>
       		    <option value="Pediatrics">Pediatrics</option>
       		    <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Opthamology">Opthamology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Oncology">Oncology</option>
    		    </select>
          </div> 
        </label>
        <button className="editButton"  type="submit">Update Appointment</button>
      </form>
      <button className="addButton"  onClick={deleteAppointment}>Delete Appointment</button>
    </div>
  );
}

export default EditAppointment