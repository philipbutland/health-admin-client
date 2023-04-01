import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import ShowAppointment from "../../components/ShowAppointment";

const API_URL = "http://localhost:5005";


function AppointmentInfo() {

    const { appointmentId } = useParams();
    const [doctorArray, setDoctorArray] = useState('')
    const [patientArray, setPatientArray] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [department, setDepartment] = useState('')

    const storedToken = localStorage.getItem("authToken");
 
  useEffect(() => {
    axios
      .get(`${API_URL}/appointments/${appointmentId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log("APPOINTMENT RESPONSE", response.data)
        setDoctorArray(response.data.doctorId);
        setPatientArray(response.data.patientId)
        setDateTime(response.data.dateTime)
        setDepartment(response.data.department)
      })
      .catch((error) => console.log(error));
    
  }, [appointmentId]);

  return (
    <div className="singlePerson">
        <ShowAppointment doctorArray={doctorArray} patientArray={patientArray} dateTime={dateTime} department={department} />
    </div>
  );
}

export default AppointmentInfo