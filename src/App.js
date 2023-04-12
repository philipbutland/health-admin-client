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
import DoctorInfo from './pages/doctor/DoctorInfo';
import PatientInfo from './pages/patient/PatientInfo';
import AppointmentInfo from "./pages/appointment/AppointmentInfo"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon"; 
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<IsPrivate><DoctorList /></IsPrivate>} />
        <Route path="/doctors/add-doctor" element={<IsPrivate><AddDoctor /></IsPrivate>} />
        <Route path="/doctors/edit/:doctorId" element={<IsPrivate><EditDoctor /></IsPrivate>} />
        <Route path="/doctors/:doctorId" element={<IsPrivate><DoctorInfo /></IsPrivate>} />
        <Route path="/patients" element={<IsPrivate><PatientList /></IsPrivate>} />
        <Route path="/patients/add-patient" element={<IsPrivate><AddPatient /></IsPrivate>} />
        <Route path="/patients/edit/:patientId" element={<IsPrivate><EditPatient /></IsPrivate>} />
        <Route path="/patients/:patientId" element={<IsPrivate><PatientInfo /></IsPrivate>} />
        <Route path="/appointments" element={<IsPrivate><AppointmentList /></IsPrivate>} />
        <Route path="/appointments/add-appointment" element={<IsPrivate><AddAppointment /></IsPrivate>} />
        <Route path="/appointments/edit/:appointmentId" element={<IsPrivate><EditAppointment /></IsPrivate>} />
        <Route path="/appointments/:appointmentId" element={<IsPrivate><AppointmentInfo /></IsPrivate>} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
