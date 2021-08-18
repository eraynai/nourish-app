import './MapPic.css';

export default function MapPic(props) {
    return(
        <div >
            <img src={props.pic} className="mapPic" />
        </div>
    )
}