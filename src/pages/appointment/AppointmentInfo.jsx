import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import ShowAppointment from "../../components/ShowAppointment";

const API_URL = "http://localhost:5005";


function AppointmentInfo() {

    const { appointmentId } = useParams();
    const [doctorId, setDoctorId] = useState('')
    const [patientId, setPatientId] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [department, setDepartment] = useState('')

    const storedToken = localStorage.getItem("authToken");
 
  useEffect(() => {
    axios
      .get(`${API_URL}/appointments/${appointmentId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setDoctorId(response.data.doctorId);
        setPatientId(response.data.patientId)
        setDateTime(response.data.dateTime)
        setDepartment(response.data.department)
      })
      .catch((error) => console.log(error));
    
  }, [appointmentId]);

  return (
    <div className="singlePerson">
        <ShowAppointment doctorId={doctorId} patientId={patientId} dateTime={dateTime} department={department} />
    </div>
  );
}

export default AppointmentInfo