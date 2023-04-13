import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import patientPic from '../images/patient.png';

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;


function ShowPatient(props) {

    const navigate = useNavigate();  

    const [appointment,setAppointment]=useState([])      
    useEffect(() => {
        axios.get(`${API_URL}5/patients`)
    }, [])
    
   
    useEffect(() => {
        axios.get(`${API_URL}/patients/${props.id}`)
        .then(response=>{
            setAppointment(response.data.appointment)
        })
    }, [])    
   
     return (

       <div>
           <p className="pageHeader">{props.username}</p>
           <div>           
               <div className="Photo">
                    {props.image    ? <img src={props.image} className="mediumImage" alt="patient" /> 
                                    : <img src={patientPic} className="mediumImage" alt="patient" />}
               </div>
               <div className="Info">

                    <div><p><b>e-mail: </b>{props.email}</p></div>
                    <div><p><b>Date of Birth: </b> {props.dob}</p></div>
                    <div><p><b>Gender: </b>{props.gender}</p></div>
                    <div><p><b>Blood Type: </b>{props.bloodType}</p></div>

                    <button className="addButton"><Link to={`/patients/edit/${props.id}`}>Edit Information</Link></button>

                </div>
                <br></br>
                
                <div  className="appoinmentsList">
                    
                    <p className="appointmentsHeader">My Appointments</p> 

                    <table>
                        <thead>
                            <tr>
                                <th className="tableHeader">Doctor</th>
                                <th className="tableHeader">Date/Time</th>
                                <th className="tableHeader">Department</th>
                            </tr>
                        </thead>

                        {appointment.length>0 && appointment.map(oneApp=>{
                            return(
                                <tbody>
                                    <tr>
                                        <td className="appointmentColumn"><Link to={`/doctors/${oneApp.doctorId}`}><span className="doctorName">{oneApp.doctorName}</span></Link></td>
                                        <td className="appointmentColumn">{oneApp.dateTime}</td>
                                        <td className="appointmentColumn">{oneApp.department}</td>
                                   </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
           </div>
       </div>
     );
   }
   
   export default ShowPatient