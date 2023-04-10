import doctorPic from '../images/doctor.png';

function ShowDoctor(props) {

  return (
    <div className="singlePerson">
        <p className="pageHeader">{props.username}</p>
        <div>
            <div className="Photo">
              {props.image  ? <img src={props.image} className="mediumImage" alt="doctor" /> 
                            : <img src={doctorPic} className="mediumImage" alt="doctor" />}  
            </div>
            <div className="Info">
                <div><p><b>e-mail: </b>{props.email}</p></div>
                <div><p><b>Price: </b> €{props.price}</p></div>
                <div><p><b>Department: </b>{props.department}</p></div>
                <div><p><b>Gender: </b>{props.gender}</p></div>
            </div>
        </div>
    </div>
  );
}

export default ShowDoctor