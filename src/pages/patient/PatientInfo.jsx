import { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import ShowPatient from "../../components/ShowPatient";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;


function PatientInfo() {

    const {patientId} = useParams();
    const [username,setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [photo,setPhoto] = useState('')
    const [dob,setDob] = useState('')
    const [gender,setGender] = useState('') 
    const [bloodType,setBloodType] = useState('')
 
  useEffect(() => {
    axios
      .get(`${API_URL}/patients/${patientId}`)
      .then((response) => {
        setUserName(response.data.username);
        setEmail(response.data.email)
        setPhoto(response.data.photo)
        setDob(response.data.dob)
        setGender(response.data.gender)
        setBloodType(response.data.bloodType)
      })
      .catch((error) => console.log(error));
    
  }, [patientId]);

  return (
    <div className="singlePerson">
        <ShowPatient id={patientId} username={username} image={photo} email={email} dob={dob} gender={gender} bloodType={bloodType} />
    </div>
  );
}

export default PatientInfo