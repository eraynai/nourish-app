import './ProfilePlaceholder.css';

export default function ProfilePlaceholder(props) {
    return(
        <div >
            <img src={props.pic} className="profilePlaceholder" />
        </div>
    )
}