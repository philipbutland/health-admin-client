import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AddAppointment from './pages/appointment/AddAppointment';
import AppointmentList from './pages/appointment/AppointmentList';
import EditAppointment from './pages/appointment/EditAppointment';
import AddDoctor from './pages/doctor/AddDoctor';
import DoctorList from './pages/doctor/DoctorList';
import EditDoctor from './pages/doctor/EditDoctor';
import AddPatient from './pages/patient/AddPatient';
import EditPatient from './pages/patient/EditPatient';
import PatientList from './pages/patient/PatientList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/add-doctor" element={<AddDoctor />} />
        <Route path="/doctors/:doctorsId" element={<EditDoctor />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/add-patient" element={<AddPatient />} />
        <Route path="/patients/:patientsId" element={<EditPatient />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/appointments/add-appointments" element={<AddAppointment />} />
        <Route path="/appointments/:appointmentId" element={<EditAppointment />} />
        </Routes>
    </div>
  );
}

export default App;
