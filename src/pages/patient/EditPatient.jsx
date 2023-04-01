/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../api/service";

const API_URL = "http://localhost:5005";

function EditPatient() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [buttonisable, setButtondisable] = useState("");

  const { patientId } = useParams();
  const navigate = useNavigate();

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    setButtondisable(true);
    uploadData.append("photo", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setButtondisable(false);
        setPhoto(response.fileUrl);
        console.log(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/patients/${patientId}`)
      .then((response) => {
        const onePatient = response.data;
        setUserName(onePatient.username);
        setEmail(onePatient.email);
        setPhoto(onePatient.photo);
        setDob(onePatient.dob);
        setGender(onePatient.gender);
        setBloodType(onePatient.bloodType);
      })
      .catch((error) => console.log(error));
  }, [patientId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, email, photo, dob, gender, bloodType };

    axios
      .put(`${API_URL}/patients/${patientId}`, requestBody)
      .then((response) => {
        navigate(`/patients/${patientId}`);
      });
  };

  const deletePatient = () => {
    axios
      .delete(`${API_URL}/patients/${patientId}`)
      .then(() => {
        navigate("/patients");
        alert("Patient's Profile deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="editPage">
      <p className="pageHeader">Edit the Patient´s Profile</p>

      <form onSubmit={handleFormSubmit}>
        <label className="editFieldLabel">
          Username:
          <input
            className="editField"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label className="editFieldLabel">
          Email:
          <input
            className="editField"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="editFieldLabel">
          Photo
          <input type="file" onChange={(e) => handleFileUpload(e)} />
          <img className="smallImage" src={photo} alt="patient" />
        </label>
        <label className="editFieldLabel">
          Date of Birth:
          <input
            className="editField"
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Gender
          <div>
            <select
              className="editField"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">--- Choose a gender ---</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="N/A">I'd rather not say</option>
            </select>
          </div>
        </label>
        <label htmlFor="" className="editFieldLabel">
          Blood Type
          <div>
            <select
              className="editField"
              name="bloodType"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            >
              <option value="">--- Choose a Blood Type ---</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </label>
        <button className="editButton" type="submit" disabled={buttonisable}>
          Update Patient´s Profile
        </button>
      </form>
      <button className="addButton" onClick={deletePatient}>
        Delete Patient´s Profile
      </button>
    </div>
  );
}

export default EditPatient;
