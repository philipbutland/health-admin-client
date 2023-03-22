//DoctorList
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function DoctorList() {
  const [doctor,setDoctor] = useState(false)

  useEffect(()=>{
      axios.get('http://localhost:5005/doctors')
      .then(response=>{
          console.log(response.data)
          setTimeout(() => {
              setDoctor(response.data)
          }, 2000);
      })
  },[])
  return (
    <div>
    <h3>Doctor List</h3>
    {!doctor && <h2>Loading...</h2>}
      
    {doctor && doctor.map(individualDoctor=>{
        return(
            <div key={individualDoctor._id}>
                <h2>Username: {individualDoctor.username}</h2>
                <h5>Email: {individualDoctor.email}</h5>
                <p>Photo: {individualDoctor.photo}</p>
                <p>Price: {individualDoctor.price}</p>
                <p>Department: {individualDoctor.department}</p>
                <p>Gender: {individualDoctor.gender}</p>
                <Link to={`/doctors/add-doctor`}>Add Doctor</Link> <span> | </span>
                <Link to={`/doctors/${individualDoctor._id}`}>Edit Doctor</Link>
            </div>
        )
    })}
</div>
)
}


export default DoctorList