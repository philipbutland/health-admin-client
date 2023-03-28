import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAppointment() {

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const bodyToPost = { doctorId, patientId, dateTime, department };

    if (!doctorId) {
      setError("Please select a doctor")
    }
    else if (!patientId)
      setError("Please select a patient")
    else if (!dateTime)
      setError("Please select a date and time")
    else if (!department)
     setError("Please select a department from the dropdown menu")
    else{
      axios
        .post("http://localhost:5005/appointments/add-appointment", bodyToPost)
        .then(() => {
          setDoctorId("");
          setPatientId("");
          setDateTime("");
          setDepartment("");
          alert("Appointment Created");
          navigate("/appointments");
        })
        .catch((error) => {
          console.log("error", error);
          setError(<p className="errorMessage">{error.response.data.message}</p>)
        });
    }
  }
  return (
    <div>
      <h3>Add an Appointment</h3>
      <form action="" onSubmit={handleSubmit}>
        {error && <p className="errorMessage"> {error} </p>}
        <label htmlFor="" className="editFieldLabel">
          Doctor
          <input
            className="editField" 
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            placeholder="Doctor (required)"
          />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Patient
          <input
            className="editField" 
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Patient (required)"
          />
        </label>
        <label htmlFor="" className="editFieldLabel">
          dateTime
          <input
            className="editField" 
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
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
                <option value="Opthamology">Opthamology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Oncology">Oncology</option>
    		</select>
          </div> 
        </label>

        <button className="addButton" type="submit">Submit Appointment</button>
      </form>
    </div>
  );
}

export default AddAppointment;
