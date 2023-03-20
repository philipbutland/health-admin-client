import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function AppointmentList() {
  const [appointment,setAppointment] = useState(false)

  useEffect(()=>{
      axios.get('http://localhost:5005/api/appointments')
      .then(response=>{
          console.log(response.data)
          setTimeout(() => {
              setAppointment(response.data)
          }, 2000);
      })
  },[])
  return (
    <div>
        {!appointment && <h2>Loading...</h2>}
              
        {appointment && appointment.map(individualAppointment=>{
            return(
                <div key={individualAppointment._id}>
                    <h2>{individualAppointment.patient}</h2>
                    <p>{individualAppointment.doctor}</p>
                    <p>{individualAppointment.department}</p>
                    <p>{individualAppointment.date}</p>
                    <Link to={`/appointment/api/${individualAppointment._id}`}>Link to Appointment</Link>
                </div>
            )
        })}
    </div>
  )
}

export default AppointmentList