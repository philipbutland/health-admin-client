import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import ShowAppointment from "../../components/ShowAppointment";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;


function AppointmentInfo() {

    const { appointmentId } = useParams();
    const [doctorName, setDoctorName] = useState('')
    const [patientName, setPatientName] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [department, setDepartment] = useState('')

    const storedToken = localStorage.getItem("authToken");
 
  useEffect(() => {
    axios
      .get(`${API_URL}/appointments/${appointmentId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setDoctorName(response.data.doctorId.username);
        setPatientName(response.data.patientId.username)
        setDateTime(response.data.dateTime)
        setDepartment(response.data.department)
      })
      .catch((error) => console.log(error));
    
  }, [appointmentId]);

  return (
    <div className="singlePerson">
        <ShowAppointment doctorName={doctorName} patientName={patientName} dateTime={dateTime} department={department} />
    </div>
  );
}

export default AppointmentInfo