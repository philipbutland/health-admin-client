//EditAppointment
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function EditAppointment() {

  const [doctorArray,setDoctorArray] = useState([]);
  const [patientArray,setPatientArray] = useState([]);

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
        setPatientId(oneAppointment.patient);
        setDoctorId(oneAppointment.doctor);
        setDepartment(oneAppointment.department);
        setDateTime(oneAppointment.date);
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
        // Once the delete request is resolved successfully
        // navigate back to the list of appointments.
        navigate("/appointments/");
      })
      .catch((err) => console.log(err));
  };  

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
      <h3>Edit the Appointment</h3>
 
      <form onSubmit={handleFormSubmit}>  

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

export default EditAppointment;
