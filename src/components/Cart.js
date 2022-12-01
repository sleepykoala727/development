
import { useState } from 'react';
import "../App.css";

function Cart(props) {
	
	return (
        <div>
            <h2>Cart</h2>
            {props.cart.map((item) => {
                return props.cartMap.get(item.name) > 0 ? (
                <div className="cartItem">
                    <p>{item.name}, x{props.cartMap.get(item.name)}</p>
                    <button className="removeButton" onClick={() => props.click({ item })}>x</button>
                </div>
                ) : <div></div>
            })}

            <br />
            <h3>Total Cost: ${props.total}</h3>
            <button onClick={props.reset}>Reset</button>
        </div>
		
	)

}

export default Cart;