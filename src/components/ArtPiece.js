
import { useState } from 'react';
import "../App.css";

function ArtPiece(props) {
  const [count, setCount] = useState(0)
	
	return (
		<div className='ArtItem'>
            <h2>{props.name} — {props.price}</h2>
            <h3>{props.desc}</h3>
            <img src={props.image} alt="my image" />
            
            {props.description}
            <button className="button-51" onClick={() => {
                props.click(props)
            }}>  Add To Cart </button>
		</div>
	)

}

export default ArtPiece;