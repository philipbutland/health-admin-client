//EditAppointment
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function EditAppointment() {

  const [doctorArray,setDoctorArray] = useState([]);
  const [patientArray,setPatientArray] = useState([]);

  const [doctorId, setDoctorId] = useState(false)
  const [patientId, setPatientId] = useState(false)
  const [dateTime,setDateTime] = useState('')   
 
  const { appointmentId } = useParams();
  const navigate = useNavigate();  

  let department = ""
  let doctorName = ""
 
  useEffect(() => {
    axios
      .get(`${API_URL}/appointments/${appointmentId}`)
      .then((response) => {
        const oneAppointment = response.data;
        setDoctorId(oneAppointment.doctorId);
        setPatientId(oneAppointment.patientId);
        setDateTime(oneAppointment.dateTime);
      })
      .catch((error) => console.log(error));
  }, [appointmentId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (doctorArray.length>0) {
      doctorArray.map(individualDoctor=>{
          if (individualDoctor._id === doctorId) {
            department = individualDoctor.department
            doctorName = individualDoctor.username
          }
      })
    }

    const requestBody = { doctorId, doctorName, patientId, department, dateTime };
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

  useEffect(()=>{
    axios.get(`${API_URL}/doctors`)
    .then(response=>{
      setDoctorArray(response.data)
    })
    .catch(err => console.log(err))
  },[])

  useEffect(()=>{
    axios.get(`${API_URL}/patients`)
    .then(response=>{
      setPatientArray(response.data)
    })
    .catch(err => console.log(err))
  },[])

  
  return (
    <div className="normalPage">
      <p className="pageHeader">Edit the Appointment</p>
 
      <form onSubmit={handleFormSubmit}>  

      <label htmlFor="" className="editFieldLabel">
          Doctor
          <div>
            <select className="editField" name="doctorId" onChange={(e)=>setDoctorId(e.target.value)}>
              <option value="">{doctorId.username} ({doctorId.department})</option>
              {(doctorArray.length>0) && doctorArray.map(individualDoctor=>{
                return(
                    individualDoctor.username !== doctorId.username && 
                    <option key={individualDoctor._id} value={individualDoctor._id}>{individualDoctor.username} ({individualDoctor.department})</option>
                )               
              })}
    		    </select>
          </div>
        </label>

        <label htmlFor="" className="editFieldLabel">
          Patient
          <div>
            <select className="editField" name="patientId" onChange={(e)=>setPatientId(e.target.value)}>
              <option value="">{patientId.username}</option>
              {(patientArray.length>0) && patientArray.map(individualPatient=>{
                return(
                  individualPatient.username !== patientId.username && 
                  <option key={individualPatient._id} value={individualPatient._id}>{individualPatient.username}</option>
                )
              })}
    		    </select>
          </div>
        </label>

        <label className="editFieldLabel">
          Date / Time:
          <input className="editField" type="datetime-local" name="dateTime" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
        </label>
        <button className="editButton"  type="submit">Update Appointment</button>
      </form>
      <button className="addButton"  onClick={deleteAppointment}>Delete Appointment</button>
    </div>
  );
}

export default EditAppointment;
