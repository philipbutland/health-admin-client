import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAppointment() {

  const [doctorArray,setDoctorArray] = useState([]);
  const [patientArray,setPatientArray] = useState([]);
 

  const [doctorId,setDoctorId] = useState(false)
  const [patientId, setPatientId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [department, setDepartment] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setDoctorArray([]);
    setPatientArray([]);
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
  
  useEffect(()=>{
    axios.get('http://localhost:5005/doctors')
    .then(response=>{
      setDoctorArray(response.data)
    })
    .catch(err => console.log(err))
  },[])

  useEffect(()=>{
    axios.get('http://localhost:5005/patients')
    .then(response=>{
      setPatientArray(response.data)
    })
    .catch(err => console.log(err))
  },[])

  return (
    <div>
      <h3>Add an Appointment</h3>
      <form action="" onSubmit={handleSubmit}>
        {error && <p className="errorMessage"> {error} </p>}


        <label htmlFor="" className="editFieldLabel">
          Doctor
          <div>
            <select className="editField" name="doctorId" onChange={(e)=>setDoctorId(e.target.value)}>
              <option value="">--- Choose a Doctor ---</option>
              {(doctorArray.length>0) && doctorArray.map(individualDoctor=>{
                return(
                    <option key={individualDoctor._id}>{individualDoctor.username}</option>
                )
              })}
    		    </select>
          </div>
        </label>


        <label htmlFor="" className="editFieldLabel">
          Patient
          <div>
            <select className="editField" name="patientId" onChange={(e)=>setPatientId(e.target.value)}>
              <option value="">--- Choose a Patient ---</option>
              {(patientArray.length>0) && patientArray.map(individualPatient=>{
                return(
                  <option key={individualPatient._id}>{individualPatient.username}</option>
                )
              })}
    		    </select>
          </div>
        </label>


        <label htmlFor="" className="editFieldLabel">
          Date and Time
          <input
            className="editField" 
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </label>

        <label htmlFor=""  className="editFieldLabel">
           Department {doctorArray.department}
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
