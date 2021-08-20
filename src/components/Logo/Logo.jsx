import './Logo.css';

export default function Logo(props) {
    return(
        <div className="logcomp" >
            <img src={props.pic} alt="logo" className="logo" />
        </div>
    )
}