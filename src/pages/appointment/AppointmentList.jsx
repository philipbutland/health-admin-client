import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function AppointmentList() {
  const [appointment, setAppointment] = useState(false);

  const getAppointments = () => {
    const role = localStorage.getItem("role");
    if (role === "patient") {
      const user = localStorage.getItem("user");
      axios
        .get(`${API_URL}/appointments/${user}`)
        .then((response) => {
          console.log("Appointments", response.data);
          setAppointment(response.data);
        })
        .catch((err) => console.log(err));
    }
    if (role === "admin") {
      axios
        .get(`${API_URL}/appointments`)
        .then((response) => {
          console.log("Appointments", response.data);
          setAppointment(response.data);
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
                    {individualAppointment.patientId}
                  </td>
                  <td className="userColumn">
                    {individualAppointment.doctorId}
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
