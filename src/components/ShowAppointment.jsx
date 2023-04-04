import { useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


function ShowAppointment(props) {

    useEffect(()=>{
        axios.get('http://localhost:5005/appointments')
        .then(response=>{
          console.log(response.data)
        })
        .catch(err => console.log(err))
      },[])

    return (
      <div className="singlePerson">
          <p className="pageHeader">Appointment</p>
          <div>
              {/* <div className="Photo">
                  <img src={props.image} className="mediumImage" alt="doctor" />
              </div> */}
              <div className="Info">

                {/* <div><p><b>Doctor: </b><Link to="/doctors/${props.doctorId}">{props.doctorName}</Link></p></div>
                <div><p><b>Patient: </b><Link to="/doctors/${props.patienId}">{props.patientName}</Link></p></div> */}

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