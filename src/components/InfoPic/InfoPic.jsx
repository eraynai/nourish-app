import './InfoPic.css';

export default function InfoPic(props) {
    return(
        <div >
            <img src={props.pic} alt="info icon" className="InfoPic" />
        </div>
    )
}