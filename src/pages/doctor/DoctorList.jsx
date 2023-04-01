/* eslint-disable jsx-a11y/img-redundant-alt */
//DoctorList
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
//import doctorPic from '../../images/doctor.png';
import service from '../../api/service'

const API_URL = "http://localhost:5005";

function DoctorList() {
  const [doctor,setDoctor] = useState(false)

  const getDoctors = () => {
    service.getDoctors()
    axios.get('http://localhost:5005/doctors')
    .then(response=>{
          setDoctor(response.data)
    })
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    axios.get('http://localhost:5005/doctors')
    .then(response=>{
      setDoctor(response.data)
    })
    .catch(err => console.log(err))
  },[])

  const deleteDoctor = (doctorId) => {
    axios.delete(`${API_URL}/doctors/${doctorId}`)
    .then( () => 
      getDoctors()
    )
    .then(alert("Doctor's Profile deleted")
    )
    .catch(err=>console.log(err))
  }


  return (
    <div>
        <p className="pageHeader">Doctor List</p>
        {!doctor && <h2>Loading...</h2>}
        <table className="Container">

            <thead>
                <tr>
                    <th className="tableHeader">Name</th>
                    <th className="tableHeader">Photo</th>
                    <th className="tableHeader">Department</th>
                </tr>
            </thead>

            <tbody>
                {doctor && doctor.map(individualDoctor=>{
                    return(
                        <tr key={individualDoctor._id} className="tableBody">
                            <td className="userColumn">{individualDoctor.username}</td>                           
                            <td className="mediumColumn"><img className="smallImage" src={individualDoctor.photo} alt="doctor" /></td>
                            <td className="mediumColumn">{individualDoctor.department}</td>
                            <td className="buttonColumn"><button className="editButton"><Link to={`/doctors/${individualDoctor._id}`}>Details</Link></button></td>
                            <td className="buttonColumn"><button className="editButton"><Link to={`/doctors/edit/${individualDoctor._id}`}>Edit Doctor</Link></button></td>
                            <td className="buttonColumn"><button className="editButton" onClick={()=>deleteDoctor(individualDoctor._id)}>Delete Doctor</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        <button className="addButton"><Link to={`/doctors/add-doctor`}>Add Doctor</Link></button>

    </div>
)}


export default DoctorList