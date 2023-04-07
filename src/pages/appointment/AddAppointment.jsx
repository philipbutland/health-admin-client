//AddAppointment
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function AddAppointment() {
  const [doctorArray, setDoctorArray] = useState([]);
  const [patientArray, setPatientArray] = useState([]);

  const [doctorId, setDoctorId] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [dateTime, setDateTime] = useState("");
 /*  const [department, setDepartment] = useState("");
  const [doctorName, setDoctorName] = useState(""); */

  const [error, setError] = useState("");
  const navigate = useNavigate();

  let department=""
  let doctorName=""

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (doctorArray.length>0) {
      doctorArray.map(individualDoctor=>{

        if (individualDoctor._id === doctorId) {
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

    if (!doctorId) {
      setError("Please select a doctor");
      return;
    } else if (!patientId) {
      setError("Please select a patient");
      return;
    } else if (!dateTime) {
      setError("Please select a date and time");
      return;
    } else {
      const storedToken = localStorage.getItem("authToken");
      console.log("BODY2POST", bodyToPost);
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
console.log(doctorArray)
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

        <label htmlFor="" className="editFieldLabel">
          Doctor
          <div>
            <select
              className="editField"
              name="doctorId"
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
        </label>

        <label htmlFor="" className="editFieldLabel">
          Patient
          <div>
            <select
              className="editField"
              name="patientId"
              onChange={(e) => setPatientId(e.target.value)}
            >
              <option value="">--- Choose a Patient ---</option>
              {patientArray.length > 0 &&
                patientArray.map((individualPatient) => {
                  return (
                    <option
                      key={individualPatient._id}
                      value={individualPatient._id}
                    >
                      {individualPatient.username}
                    </option>
                  );
                })}
            </select>
          </div>
        </label>

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
