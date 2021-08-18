import './HomePic.css';

export default function HomePic(props) {
    return(
        <div >
            <img src={props.pic} className="homePic" />
        </div>
    )
}