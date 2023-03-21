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
                <h2>{individualDoctor.name}</h2>
                <p>{individualDoctor.email}</p>
                <p>{individualDoctor.price}</p>
                <p>{individualDoctor.department}</p>
                <Link to={`/doctors/${individualDoctor._id}`}>Link to Doctors List</Link>
            </div>
        )
    })}
</div>
)
}


export default DoctorList