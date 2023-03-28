function ShowAppointment(props) {

    return (
      <div className="singlePerson">
          <h2>Appointment</h2>
          <div>
              {/* <div className="Photo">
                  <img src={props.image} className="mediumImage" alt="doctor" />
              </div> */}
              <div className="Info">
                  <div><p><b>Doctor: </b>{props.doctorId}</p></div>
                  <div><p><b>Patient: </b> {props.patientId}</p></div>
                  <div><p><b>Date/Time: </b>{props.dateTime}</p></div>
                  <div><p><b>Department: </b>{props.department}</p></div>
              </div>
          </div>
      </div>
    );
  }
  
  export default ShowAppointment