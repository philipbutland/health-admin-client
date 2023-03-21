//AddPatient
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddPatient() {
  const [username,setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [photo,setPhoto] = useState('')
  const [dob,setDob] = useState('')
  const [gender,setGender] = useState('')
  const [bloodType,setBloodType] = useState('') 
   
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const bodyToPost = {username, email, photo, dob, gender, bloodType}
        console.log ("bodyToPost", bodyToPost)
        axios.post('http://localhost:5005/patients/add-patient',bodyToPost)
        .then(()=>{
           setUserName ('')
           setEmail('')
           setPhoto('')
           setDob('')
           setGender('')
           setBloodType('')
           alert("Patients Profile Created")
           navigate('/patients')
        })
    }
    return (
      <div>
      <h3>Add the Patient</h3>
      <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">
              Patient Name
              <input type="text" value={username} onChange={(e)=>setUserName(e.target.value)}/>
          </label>
          <label htmlFor="">
              Email
              <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </label>
          <label htmlFor="">
              Photo
            <input type="text" value={photo} onChange={(e)=>setPhoto(e.target.value)}/>
          </label>
          <label htmlFor="">
          DOB
            <input type="text" value={dob} onChange={(e)=>setDob(e.target.value)}/>
          </label>
          <label htmlFor="">
         Gender
            <input type="text" value={gender} onChange={(e)=>setGender(e.target.value)}/>
          </label>
          <label htmlFor="">
         Blood type
            <input type="text" value={bloodType} onChange={(e)=>setBloodType(e.target.value)}/>
          </label>
          <button>Submit Patient´s Profile</button>
      </form>
  </div>
    )
  }

export default AddPatient