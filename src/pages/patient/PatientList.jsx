//PatientList
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function PatientList() {
  const [patient,setPatient] = useState(false)

  useEffect(()=>{
    axios.get('http://localhost:5005/patients')
    .then(response=>{
        console.log(response.data)
        setTimeout(() => {
            setPatient(response.data)
        }, 2000);
    })
},[])

  return (
    <div>
    <h3>Patient List</h3>
    {!patient && <h2>Loading...</h2>}
      
    {patient && patient.map(individualPatient=>{
        return(
            <div key={individualPatient._id}>
                <h2>{individualPatient.username}</h2>
                <p>{individualPatient.email}</p>
                <p>{individualPatient.photo}</p>
                <p>{individualPatient.dob}</p>
                <p>{individualPatient.gender}</p>
                <p>{individualPatient.bloodType}</p>
                <Link to={`/patients/${individualPatient._id}`}>Link to Patient List</Link>
            </div>
        )
    })}
</div>
)
}
export default PatientList