//EditDoctor
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../api/service";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;


function EditDoctor() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [buttonisable, setButtondisable] = useState("");

  const { doctorId } = useParams();
  const navigate = useNavigate();


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
      .catch((err) => {
        setButtondisable(false);
        console.log("Error while uploading the file: ", err);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/doctors/${doctorId}`)
      .then((response) => {
        const oneDoctor = response.data;
        console.log(oneDoctor)
        setUserName(oneDoctor.username);
        setEmail(oneDoctor.email);
        setPhoto(oneDoctor.photo);
        setPrice(oneDoctor.price);
        setDepartment(oneDoctor.department);
        setGender(oneDoctor.gender);
      })
      .catch((error) => console.log(error));
  }, [doctorId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, email, photo, price, department, gender };
 
    axios
      .put(`${API_URL}/doctors/${doctorId}`, requestBody)
      .then((response) => {
        navigate(`/doctors/${doctorId}`);
      });
  };

  const deleteDoctor = () => {
    axios
      .delete(`${API_URL}/doctors/${doctorId}`)
      .then(() => {
        navigate("/doctors");
        alert("Doctor's Profile deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="editPage">
      <p className="pageHeader">Edit the Doctor´s Profile</p>

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
          <img className="smallImage" src={photo} alt="doctor" />
        </label>
        <label className="editFieldLabel">
          Price:
          <input
            className="editField"
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label htmlFor="" className="editFieldLabel">
          Department
          <div>
            <select
              className="editField"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">--- Choose a department ---</option>
              <option value="Radiology">Radiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Obstetrics and Gynecology">
                Obstetrics and Gynecology
              </option>
              <option value="Dermatology">Dermatology</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Oncology">Oncology</option>
            </select>
          </div>
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
        <button className="editButton" type="submit" disabled={buttonisable}>
          Update Doctor´s Profile
        </button>
      </form>
      <button className="addButton" onClick={deleteDoctor}>
        Delete Doctor´s Profile
      </button>
    </div>
  );
}

export default EditDoctor;
