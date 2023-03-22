//AddAppointment
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddAppointment() {
  const [patient,setPatient] = useState('')
  const [doctor, setDoctor] = useState('')
  const [department,setDepartment] = useState('')
  const [date,setDate] = useState('')   
   
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const bodyToPost = {doctor, patient, date, department}
        axios.post('http://localhost:5005/appointments',bodyToPost)
        .then(()=>{
           setPatient ('')
           setDoctor('')
           setDepartment('')
           setDate ('')
           alert("Appointment Created")
           navigate('/appointments')
        })
    }
  return (
    <div>
     <h3>Add the Appointment</h3>
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
            Patient Name
            <input type="text" value={patient} onChange={(e)=>setPatient(e.target.value)}/>
        </label>
        <label htmlFor="">
            Doctor Name
            <input type="text" value={doctor} onChange={(e)=>setDoctor(e.target.value)}/>
        </label>
        <label htmlFor="">
            Department
            <input type="text" value={department} onChange={(e)=>setDepartment(e.target.value)}/>
        </label>
        <label htmlFor="">
            Date
            <input type="text" value={date} onChange={(e)=>setDate(e.target.value)}/>
        </label>
        <button type="submit">Submit Appointment</button>
    </form>
</div>
  )
}
export default AddAppointment





