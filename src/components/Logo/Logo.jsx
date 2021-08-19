import './Logo.css';

export default function Logo(props) {
    return(
        <div className="logo" >
            <img src={props.pic} className="Logo" />
        </div>
    )
}