import './MapFridge.css';

export default function MapFidge(props) {
    return(
        <div >
            <img src={props.pic} alt="fridges icon" className="mapFridge" />
        </div>
    )
}