//AppointmentList
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function AppointmentList() {
  const [appointment,setAppointment] = useState(false)

  useEffect(()=>{
      axios.get('http://localhost:5005/appointments')
      .then(response=>{
          console.log(response.data)
          setTimeout(() => {
              setAppointment(response.data)
          }, 2000);
      })
  },[])
  return (
    <div className="normalPage">
     <h3>Appointment List</h3>
        {!appointment && <h2>Loading...</h2>}
              
        {appointment && appointment.map(individualAppointment=>{
            return(
                <div key={individualAppointment._id}>
                    <h2>Patient: {individualAppointment.patient}</h2>
                    <p>Doctor: {individualAppointment.doctor}</p>
                    <p>Department: {individualAppointment.department}</p>
                    <p>Date: {individualAppointment.date}</p>
                    <Link to={`/appointments/add-appointment`}>Add Appointment</Link> <span> | </span>
                    <Link to={`/appointments/${individualAppointment._id}`}>Edit Appointment</Link>                    
                </div>
            )
        })}
    </div>
  )
}

export default AppointmentList