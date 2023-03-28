import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import ShowDoctor from "../../components/ShowDoctor";

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
        <ShowDoctor username={username} image={photo} email={email} price={price} department={department} gender={gender} />
    </div>
  );
}

export default DoctorInfo