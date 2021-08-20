import './ProfilePlaceholder.css';

export default function ProfilePlaceholder(props) {
    return(
        <div >
            <img src={props.pic} alt="profile icon" className="profilePlaceholder" />
        </div>
    )
}