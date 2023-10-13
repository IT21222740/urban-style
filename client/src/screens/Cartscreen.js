import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../actions/cartAction";
import { deleteFromCart } from "../actions/cartAction";
import Checkout from "../components/Checkout";
import axios from 'axios';
import { placeOrder } from "../actions/orderActions";

export default function Cartscreen() {
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
    const subtotal = cartItems.reduce((x, item) => x + item.price, 0);
    const dispatch = useDispatch();
    const [coordinates, setCoordinates] = useState('');


    function fetchCoordinates()  {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log(coordinates);
            })

            
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }




    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="row justify-content-center">
                <div className="cart">
                    <h1 style={{ fontSize: '40px' }}>My Cart</h1>
                    <div className="row justify-content-center">
                    <div className="col-md-6">
                    {cartItems.map(item => (
                        <div className="flex-container m-5" key={item._id}>
                            <div className='text-start m-1 w-100'>
                                <h1>{item.name} [{item.varient}]</h1>
                                <h1>Price: {item.quantity}*{item.prices[0][item.varient]} = {item.price}</h1>
                                <h1 className="d-inline">Quantity: </h1>
                                <i className="fa fa-plus" type="button" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient)) }} ></i>
                                <b>{item.quantity}</b>
                                <i className="fa fa-minus" type="button" aria-hidden="true" onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient)) }} ></i>
                                <hr />
                            </div>
                            <div className='m-1 w-100'>
                                <img src={item.image} style={{ height: '80px', height: '80px' }} />
                            </div>
                            <div className='m-2 w-100'>
                                <i className="fa fa-trash mt-4" type="button" aria-hidden="true" onClick={() => dispatch(deleteFromCart(item))}></i>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4 text-end">
                    <h2 style={{ fontSize: '45px' }}>SubTotal: {subtotal} /-</h2>
                    <button style={{marginTop: '10px', fontSize:'8px'}} className="btn btn-primary" onClick={fetchCoordinates}>
                        Fetch Location
                    </button>
<br></br>
                    <Checkout subtotal={subtotal} coordinates = {coordinates} />


                </div>
                </div>
                </div>
            </div>
        </div>
    );
}
