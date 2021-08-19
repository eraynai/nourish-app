import './ProfilePic.css';

export default function ProfilePic(props) {
    return(
        <div >
            <img src={props.pic} className="profilePic" />
        </div>
    )
}