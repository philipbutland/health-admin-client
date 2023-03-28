function ShowPatient(props) {

    console.log("props", props)
   
     return (
       <div className="singlePerson">
           <h2>{props.username}</h2>
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
           </div>
       </div>
     );
   }
   
   export default ShowPatient