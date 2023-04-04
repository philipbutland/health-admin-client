import { useEffect,useState } from "react";
import axios from 'axios'

function ShowPatient(props) {

    const [appointment,setAppointment]=useState([])      
    useEffect(() => {
        axios.get(`http://localhost:5005/patients`)
        .then(response=>{
            console.log("all patients data",response.data)
        })

    }, [])
    
   
    useEffect(() => {
        axios.get(`http://localhost:5005/patients/${props.id}`)
        .then(response=>{
            setAppointment(response.data.appointment)
        })
    }, [])
    
    console.log("APPOINTMENT", appointment)
   
     return (
       <div>
           <p className="pageHeader">{props.username}</p>
           <div>           
               <div className="Photo">
                   <img src={props.image} className="mediumImage" alt="patient" />
               </div>
               <div className="Info">
                    <div><p><b>e-mail: </b>{props.email}</p></div>
                    <div><p><b>Date of Birth: </b> {props.dob}</p></div>
                    <div><p><b>Gender: </b>{props.gender}</p></div>
                    <div><p><b>Blood Type: </b>{props.bloodType}</p></div>
                </div>
                <br></br>
                <div  className="appoinmentsList">
                    
                    <p className="appointmentsHeader">Appointments for this Patient:</p> 

                    <table>
                        <thead>
                            <tr>
                                <th className="tableHeader">Doctor</th>
                                <th className="tableHeader">Date/Time</th>
                                <th className="tableHeader">Department</th>
                            </tr>
                        </thead>

                        {appointment.length>0 && appointment.map(oneApp=>{
                            console.log("oneApp", oneApp)
                            return(
                                <tbody>
                                    <tr>
                                        <td className="appointmentColumn">{oneApp.doctorName}</td>
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