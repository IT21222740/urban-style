import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "../actions/cartAction";

export default function Item({ item }) {

    const [quantity, setquantity] = useState(1)
    const [varient, setvarient] = useState('small')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const dispatch = useDispatch()

    function addtocart() {

        dispatch(addToCart(item, quantity, varient))
    }


    return (


        <div className="shadow-lg p-3 m-4 bg-white" >


            <div onClick={handleShow}>

                
                <img src={item.image} className="img-fluid" style={{ height: '260px', width: '252px' }} />
                <h1>{item.name}</h1>
            </div>

            <div className="flex-container">

                <div className='w-100 m-1'>
                    <p>Sizes</p>
                    <select className='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }}>
                        {item.varients.map(varient => {
                            return <option value={varient}>{varient}</option>
                        })}
                    </select>
                </div>

                <div className='w-100 m-1'>
                    <p>Quantity</p>
                    <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                        {[...Array(10).keys()].map((x, i) => {
                            return <option value={i + 1}>{i + 1}</option>
                        })}
                    </select>

                </div>


            </div>

            <div className="flex-container">

                <div className='m-1 w-100'>
                    <p className='m-1'>Price: {item.prices[0][varient] * quantity} LKR</p>
                </div>

                <div className='m-1 w-100'>
                    <button className="btn" onClick={addtocart} >ADD TO CART</button>
                </div>

            </div>

            <Modal show={show} style={{ maxHeight: '80vh', overflowY: 'auto' }} onHide={handleClose} centered>

                <Modal.Header closeButton>
                    <Modal.Title><h9>{item.name}</h9></Modal.Title>
                </Modal.Header>

                <Modal.Body  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={item.image} className="img-fluid" style={{ height: '470px', width: '500px', marginBottom: '20px' }} />
                        <p10 style={{ marginTop: '20px', textAlign: 'center' }}>{item.description}</p10>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <button className="btn" onClick={handleClose}>CLOSE</button>
                </Modal.Footer>
            </Modal>





        </div>


    )
}

