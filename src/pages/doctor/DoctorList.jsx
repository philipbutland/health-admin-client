//DoctorList
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
const API_URL = "http://localhost:5005";

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
        <table className="Container">

            <thead>
                <tr>
                    <th className="tableHeader">Name</th>
                    <th className="tableHeader">Photo</th>
                    <th className="tableHeader">Gender</th>
                </tr>
            </thead>

            <tbody>
                {doctor && doctor.map(individualDoctor=>{
                    return(
                        <tr key={individualDoctor._id} className="tableBody">
                            <td className="userColumn">{individualDoctor.username}</td>
                            <td className="mediumColumn">{individualDoctor.photo}</td>
                            <td className="mediumColumn">{individualDoctor.department}</td>
                            <td className="buttonColumn"><button className="editButton"><Link to={`/doctors/${individualDoctor._id}`}>Details</Link></button></td>
                            <td className="buttonColumn"><button className="editButton"><Link to={`/doctors/edit/${individualDoctor._id}`}>Edit Doctor</Link></button></td>
                            <td className="buttonColumn"><button className="editButton" onclick={axios.delete(`${API_URL}/doctors/${individualDoctor._id}`)}>Delete Doctor</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        <button className="addButton"><Link to={`/doctors/add-doctor`}>Add Doctor</Link></button>

    </div>
)}


export default DoctorList