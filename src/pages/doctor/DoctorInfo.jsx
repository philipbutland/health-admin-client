import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";


function DoctorInfo() {

    const { doctorId } = useParams();
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [price, setPrice] = useState('')
    const [department, setDepartment] = useState('')
    const [gender, setGender] = useState('') 
 
  useEffect(() => {
    axios
      .get(`${API_URL}/doctors/${doctorId}`)
      .then((response) => {
        setUserName(response.data.username);
        setEmail(response.data.email)
        setPhoto(response.data.photo)
        setPrice(response.data.price)
        setDepartment(response.data.department)
        setGender(response.data.gender)
      })
      .catch((error) => console.log(error));
    
  }, [doctorId]);

  return (
    <div className="singlePerson">
        <h2>Profile: {username}</h2>
        <img src={photo} alt="../images/doctor.png"></img>
        <p className="profileInfo"><b>e-mail: </b>{email}</p>
        <p className="profileInfo"><b>Price: </b>€{price}</p>
        <p className="profileInfo"><b>Department: </b>{department}</p>
        <p className="profileInfo"><b>Gender: </b>{gender}</p>
    </div>
  );
}

export default DoctorInfo