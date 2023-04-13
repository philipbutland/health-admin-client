//EditAppointment
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";


function EditAppointment() {
  const [doctorArray, setDoctorArray] = useState([]);
  const [patientArray, setPatientArray] = useState([]);

  const [doctorId, setDoctorId] = useState(false);
  const [patientId, setPatientId] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const { appointmentId } = useParams();
  const { user } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  let department = "";
  let doctorName = "";
  let selectedName = ""

  const doctorSelected = doctorArray.find((doctor) => doctor._id === doctorId);
  if (doctorSelected) {
     selectedName = doctorSelected.username
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/appointments/${appointmentId}`)
      .then((response) => {
        const oneAppointment = response.data;
        setDoctorId(oneAppointment.doctorId._id);
        setPatientId(oneAppointment.patientId);
        setDateTime(oneAppointment.dateTime);
      })
      .catch((error) => console.log(error));
  }, [appointmentId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (doctorArray.length>0) {
      doctorArray.map(individualDoctor=>{

          if (individualDoctor._id === doctorId) {
            department = individualDoctor.department
            doctorName = individualDoctor.username
          }
      })
    }

    const requestBody = { doctorId, doctorName, patientId, department, dateTime };

    if (role === "patient" ){
      requestBody.patientId = user._id;
      requestBody.doctorId = doctorId;
    }

    else if (role === "doctor" ){
      requestBody.doctorId = user._id;
      requestBody.patientId = patientId;
    }

      axios
      .put(`${API_URL}/appointments/${appointmentId}`, requestBody)
      .then((response) => {
        navigate(`/appointments/${appointmentId}`)
      });
  };



  const deleteAppointment = () => {
    axios
      .delete(`${API_URL}/appointments/${appointmentId}`)
      .then(() => {
        navigate("/appointments/");
      })
      .catch((err) => console.log(err));
  };

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
    <div className="normalPage">
      <p className="pageHeader">Edit the Appointment</p>

      <form onSubmit={handleFormSubmit}>
        {(role === "admin" || role === "patient") && (
          <label htmlFor="" className="editFieldLabel">
            Doctor
            <div>
              <select
                className="editField"
                name="doctorId"
                onChange={(e) => setDoctorId(e.target.value)}
              >
                {doctorSelected && (
                  <option selected value="">
                    {doctorSelected.username} ({doctorSelected.department})
                  </option>
                )}                
                {doctorArray.length > 0 &&
                  doctorArray.map((individualDoctor) => {
                    return (
                      individualDoctor.username !== selectedName && (
                        <option
                          key={individualDoctor._id}
                          value={individualDoctor._id}
                        >
                          {individualDoctor.username} (
                          {individualDoctor.department})
                        </option>
                      )
                    );
                  })}
              </select>
            </div>
          </label>
        )}

        {(role === "admin" || role === "doctor") && (
          <label htmlFor="" className="editFieldLabel">
            Patient
            <div>
              <select
                className="editField"
                name="patientId"
                onChange={(e) => setPatientId(e.target.value)}
              >
                <option value="">{patientId.username}</option>
                {patientArray.length > 0 &&
                  patientArray.map((individualPatient) => {
                    return (
                      individualPatient.username !== patientId.username && (
                        <option
                          key={individualPatient._id}
                          value={individualPatient._id}
                        >
                          {individualPatient.username}
                        </option>
                      )
                    );
                  })}
              </select>
            </div>
          </label>
        )}

        <label className="editFieldLabel">
          Date / Time:
          <input
            className="editField"
            type="datetime-local"
            name="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </label>
        <button className="editButton" type="submit">
          Update Appointment
        </button>
      </form>
      <button className="addButton" onClick={deleteAppointment}>
        Delete Appointment
      </button>
    </div>
  );
}

export default EditAppointment;
