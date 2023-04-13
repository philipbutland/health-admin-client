import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function HomePage() {

  const [doctorArray, setDoctorArray] = useState([]);
  const [patientArray, setPatientArray] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/doctors`)
      .then((response) => {
        setDoctorArray(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/patients`)
      .then((response) => {
        setPatientArray(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

    return (
      <div>
        <h1>Home Page</h1>

        <h2>Welcome to the Health Administration Website</h2>

        <h2>Currently linking <span className="doctors">{doctorArray.length} </span> 
        {doctorArray.length === 1 ? (<span>Doctor </span>) : (<span>Doctors </span>)}
        with <span className="patients">{patientArray.length} </span> 
        {patientArray.length === 1 ? (<span>Patient</span>) : (<span>Patients</span>)}</h2>     
        
      </div>
    );
  }
   
  export default HomePage;