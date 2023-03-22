//AddDoctor
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddDoctor() {
  const [username,setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [photo,setPhoto] = useState('')
  const [price,setPrice] = useState('')
  const [department,setDepartment] = useState('')
  const [gender,setGender] = useState('')
     
  const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const bodyToPost = {username, email, photo, price, department, gender}
        axios.post('http://localhost:5005/doctors',bodyToPost)
        .then(()=>{
           setUserName ('')
           setEmail('')
           setPhoto('')
           setPrice('')
           setDepartment('')
           setGender('')
           alert("Doctors Profile Created")
           navigate('/doctors')
        })
    }

    return (
    <div className="editPage">
    <h3>Add the Doctor</h3>
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="" className="editFieldLabel">
            Doctors Name:
            <input className="editField" type="text" value={username} onChange={(e)=>setUserName(e.target.value)}/>
        </label>
        <label htmlFor="" className="editFieldLabel">
            Email
            <input className="editField" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label htmlFor="" className="editFieldLabel">
           Photo
          <input className="editField" type="text" value={photo} onChange={(e)=>setPhoto(e.target.value)}/>
        </label>
        <label htmlFor="" className="editFieldLabel">
        Price
          <input className="editField" type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </label>
        <label htmlFor="" className="editFieldLabel">
        Department
          <input className="editField" type="text" value={department} onChange={(e)=>setDepartment(e.target.value)}/>
        </label>
        <label htmlFor="" className="editFieldLabel">
        Gender
          <select className="editField" name="gender" onChange={(e)=>setGender(e.target.value)}>
            <option>M</option>
            <option>F</option>
            <option>I would rather not say</option>
          </select>
          {/* <input type="text" value={gender} onChange={(e)=>setGender(e.target.value)}/> */}
        </label>
        <button className="addButton" type="submit">Submit Doctor Profile</button>
    </form>
</div>
  )
}

export default AddDoctor