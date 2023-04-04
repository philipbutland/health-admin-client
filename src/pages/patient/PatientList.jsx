import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import patientPic from '../../images/patient.png';
import service from "../../api/service";

const API_URL = "http://localhost:5005";

function PatientList() {
  const [patient, setPatient] = useState(false);

  const getPatients = () => {
    service.getPatients();
    const role = localStorage.getItem("role");
    if (role === "patient") {
      const user = localStorage.getItem("user");
      axios
        .get(`http://localhost:5005/patients/${user}`)
        .then((response) => {
          console.log("patients", response.data);
          setPatient(response.data);
        })
        .catch((err) => console.log(err));
    }
    if (role === "admin") {
      axios
        .get("http://localhost:5005/patients")
        .then((response) => {
          console.log(response.data);
          setPatient(response.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5005/patients")
      .then((response) => {
        console.log(response.data, "result");
        setPatient(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePatient = (patientId) => {
    axios
      .delete(`${API_URL}/patients/${patientId}`)
      .then(() => getPatients())
      .then(alert("Patient's Profile deleted"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Patient List</h1>
      {!patient && <h2>Loading...</h2>}
      <table className="Container">
        <thead>
          <tr>
            <th className="tableHeader">Name</th>
            <th className="tableHeader">Photo</th>
            <th className="tableHeader">Blood Type</th>
            <th className="tableHeader">Gender</th>
          </tr>
        </thead>

        <tbody>
          {patient &&
            patient.map((individualPatient) => {
              console.log("individual patient", individualPatient);
              return (
                <tr key={individualPatient._id} className="tableBody">
                  <td className="userColumn">{individualPatient.username}</td>
                  <td className="mediumColumn">
                    <img
                      className="smallImage"
                      src={individualPatient.photo}
                      alt="patient"
                    />
                  </td>
                  <td className="mediumColumn">
                    {individualPatient.bloodType}
                  </td>
                  <td className="mediumColumn">{individualPatient.gender}</td>
                  <td className="buttonColumn">
                    <button className="editButton">
                      <Link to={`/patients/${individualPatient._id}`}>
                        Details
                      </Link>
                    </button>
                  </td>
                  <td className="buttonColumn">
                    <button className="editButton">
                      <Link to={`/patients/edit/${individualPatient._id}`}>
                        Edit Patient
                      </Link>
                    </button>
                  </td>
                  <td className="buttonColumn">
                    <button
                      className="editButton"
                      onClick={() => deletePatient(individualPatient._id)}
                    >
                      Delete Patient
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <button className="addButton">
        <Link to={`/patients/add-patient`}>Add Patient</Link>
      </button>
    </div>
  );
}

export default PatientList;
