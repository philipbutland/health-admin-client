import { useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import appointmentPic from '../images/appointment.jpg';


const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function ShowAppointment(props) {

    useEffect(()=>{
        axios.get(`${API_URL}/appointments`)
        .catch(err => console.log(err))
      },[])

    return (
      <div className="singlePerson">
          <p className="pageHeader">Appointment</p>
          <div>
              <div className="Photo"><img src={appointmentPic} className="mediumImage" alt="doctor" /></div>
              <div className="Info">
                  <div><p><b>Doctor: </b>{props.doctorName}</p></div>
                  <div><p><b>Patient: </b> {props.patientName}</p></div>
                  <div><p><b>Date/Time: </b>{props.dateTime}</p></div>
                  <div><p><b>Department: </b>{props.department}</p></div>
              </div>
          </div>
      </div>
    );
  }
  
  export default ShowAppointment