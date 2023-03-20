//AddDoctor
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddDoctor() {
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [price,setPrice] = useState('')
  const [department,setDepartment] = useState('')  
   
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const bodyToPost = {name, email, price, department}
        axios.post('http://localhost:5005/doctors',bodyToPost)
        .then(()=>{
           setName ('')
           setEmail('')
           setPrice('')
           setDepartment('')
           alert("Doctors Profile Created")
           navigate('/doctors')
        })
    }

    return (
    <div>
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
            Doctors Name
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label htmlFor="">
            Email
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label htmlFor="">
            Price
          <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </label>
        <label htmlFor="">
        Department
          <input type="text" value={department} onChange={(e)=>setDepartment(e.target.value)}/>
        </label>
        <button>Submit Doctor´s Profile</button>
    </form>
</div>
  )
}

export default AddDoctor