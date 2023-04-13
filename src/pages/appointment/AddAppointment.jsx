//AddAppointment
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function AddAppointment() {
  const [doctorArray, setDoctorArray] = useState([]);
  const [patientArray, setPatientArray] = useState([]);

  const [doctorId, setDoctorId] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const { user } = useContext (AuthContext)
  const role = localStorage.getItem('role')
 
 /*  const [department, setDepartment] = useState("");
  const [doctorName, setDoctorName] = useState(""); */

  const [error, setError] = useState("");
  const navigate = useNavigate();

  let department=""
  let doctorName=""
  let IdCheck = ""

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (doctorId){
     IdCheck = doctorId
    }
    else {
      IdCheck = user._id
    }
    
    if (doctorArray.length>0) {
      doctorArray.map(individualDoctor=>{

        if (individualDoctor._id === IdCheck) {
          department = individualDoctor.department;
          doctorName = individualDoctor.username;
        }
      });
    }

    const bodyToPost = {
      doctorId,
      doctorName,
      patientId,
      dateTime,
      department,
    };

    if (role === "patient" ){
      bodyToPost.patientId = user._id;
      bodyToPost.doctorId = doctorId;
    }
    
    else if (role === "doctor" ){
      bodyToPost.doctorId = user._id;
      bodyToPost.patientId = patientId;
      bodyToPost.doctorName = user.username;
      bodyToPost.department = department;
    }

    if (!doctorId && role ==="admin") {
      setError("Please select a doctor");
      return;
    } else if (!patientId && role === "admin") {
      setError("Please select a patient");
      return;
    } else if (!dateTime) {
      setError("Please select a date and time");
      return;
    } else {
      const storedToken = localStorage.getItem("authToken");
      axios
        .post(`${API_URL}/appointments/add-appointment`, bodyToPost, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
          .then(() => {
          setDoctorId("");
          setPatientId("");
          setDateTime("");
          alert("Appointment Created");
          navigate("/appointments");
        })
        .catch((error) => {
          console.log("error", error);
          setError(
            <p className="errorMessage">{error.response.data.message}</p>
          );
        });
    }
  }

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
      <p className="pageHeader">Add an Appointment</p>
      <form action="" onSubmit={handleSubmit}>
        {error && <p className="errorMessage"> {error} </p>}

   { (role === "admin" || role === "patient") &&  
      <label htmlFor="" className="editFieldLabel">
          Doctor
          <div>
            <select
              className="editField"
              name="doctorId"
              value={doctorId}
              onChange={(e) => {
                setDoctorId(e.target.value);
              }}
            >
              <option value="">--- Choose a Doctor --- </option>
              {doctorArray.length > 0 &&
                doctorArray.map((individualDoctor) => {
                  return (
                    <option
                      key={individualDoctor._id}
                      value={individualDoctor._id}
                    >
                      {individualDoctor.username} ({individualDoctor.department}
                      )
                    </option>
                  );
                })}
            </select>
          </div>
        </label>}

        {(role === "admin" || role === "doctor") &&
        <label htmlFor="" className="editFieldLabel">
          Patient
          <div>
            <select
              className="editField"
              name="patientId"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              <option value="">--- Choose a Patient ---</option>
              {patientArray.length > 0 &&
                patientArray.map((individualPatient) => {
                  return (
                    <option
                      className="dropdown"
                      key={individualPatient._id}
                      value={individualPatient._id}
                    >
                      {individualPatient.username}
                    </option>
                  );
                })}
            </select>
          </div>
        </label>}

        <label htmlFor="" className="editFieldLabel">
          Date and Time
          <input
            className="editField"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </label>

        <button className="addButton" type="submit">
          Submit Appointment
        </button>
      </form>
    </div>
  );
}

export default AddAppointment;
