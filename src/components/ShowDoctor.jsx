function ShowDoctor(props) {

  return (
    <div className="singlePerson">
        <h2>{props.username}</h2>
        <div>
            <div className="Photo">
                <img src={props.image} className="mediumImage" alt="doctor" />
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