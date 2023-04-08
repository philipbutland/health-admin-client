/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function AppointmentList() {
  const [appointment, setAppointment] = useState(false);

  const getAppointments = () => {
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");
    if (role === "patient") {
      console.log(user);
      axios
        .get(`${API_URL}/appointments/patients/${user}`)
        .then((response) => {
          console.log("*** Appointments", response.data);
          console.log("PatientId", response.data.patientId);
          setAppointment(response.data);
        })
        .catch((err) => console.log(err));
    }
    if (role === "doctor") {
      console.log(user)
      axios
        .get(`${API_URL}/appointments/doctors/${user}`)
        .then((response) => {
          console.log("DoctorId", response.data);
          setAppointment(response.data);
          console.log("APPOINTMENT", appointment);
        })
        .catch((err) => console.log(err));
    }
    if (role === "admin") {
      axios
        .get(`${API_URL}/appointments`)
        .then((response) => {
          console.log("### Appointments", response.data);
          console.log("PatientId", response.data.patientId);
          setAppointment(response.data);
          console.log("APPOINTMENT", appointment);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const deleteAppointment = (AppointmentId) => {
    axios
      .delete(`${API_URL}/appointments/${AppointmentId}`)
      .then(() => getAppointments())
      .then(alert("Appointment deleted"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Appointments</h1>
      {!appointment && <h2>Loading...</h2>}
      <table className="Container">
        <thead>
          <tr>
            <th className="tableHeader">Patient</th>
            <th className="tableHeader">Doctor</th>
            <th className="tableHeader">Date and Time</th>
            <th className="tableHeader">Department</th>
          </tr>
        </thead>

        <tbody>
          {appointment &&
            appointment.map((individualAppointment) => {
              return (
                <tr key={individualAppointment._id} className="tableBody">
                  <td className="userColumn">
                    {individualAppointment.patientId.username}
                  </td>
                  <td className="userColumn">
                    {individualAppointment.doctorId.username}
                  </td>
                  <td className="mediumColumn">
                    {individualAppointment.dateTime}
                  </td>
                  <td className="mediumColumn">
                    {individualAppointment.department}
                  </td>
                  <td className="buttonColumn">
                    <button className="editButton">
                      <Link to={`/appointments/${individualAppointment._id}`}>
                        Details
                      </Link>
                    </button>
                  </td>
                  <td className="buttonColumn">
                    <button className="editButton">
                      <Link
                        to={`/appointments/edit/${individualAppointment._id}`}
                      >
                        Edit Appointment
                      </Link>
                    </button>
                  </td>
                  <td className="buttonColumn">
                    <button
                      className="editButton"
                      onClick={() =>
                        deleteAppointment(individualAppointment._id)
                      }
                    >
                      Delete Appointment
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <button className="addButton">
        <Link to={`/appointments/add-appointment`}>Add Appointment</Link>
      </button>
    </div>
  );
}

export default AppointmentList;
