import React from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../actions/cartAction";
import { updateitemsAction, additemsAction, deleteitemsAction } from '../actions/itemAction';


let itemId;
let x;

export default function Itemcataloguescreen() {

  const [catalogues, setCatalogues] = useState([]);
  const [items, setitems] = useState([]);
  const [filteredCatalogues, setFilteredCatalogues] = useState([]);
  const [searchCatalogues, setSearchCatalogues] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {

    function getCatalogues() {

      //get all catalogues from database
      axios.get("/api/Items/getallItems").then((res) => {
        setCatalogues(res.data);
        setFilteredCatalogues(res.data);

      }).catch((err) => {
        console.log(err.message);
      })
    }

    getCatalogues();

  }, []);



  function getCurrentItem(itemId) {

    axios.get(`/api/Items/getcurrentitem/${itemId}`).then((res) => {

      setitems(res.data);
      const items = res.data


    }).catch((error) => {
      console.log(error)


    })
  }



  useEffect(() => {
    const results = catalogues.filter(catalogue => {
      if (filterType === "pants") {
        return catalogue.isPants;
      } else if (filterType === "top") {
        return catalogue.isTop;
      } else if (filterType === "footware") {
        return catalogue.isFootwear;
      } else {
        return true;
      }
    }).filter(catalogue => catalogue.name.toLowerCase().includes(searchCatalogues.toLowerCase()));
    setFilteredCatalogues(results);
  }, [filterType, catalogues, searchCatalogues]);



  const columnsOrders = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Preview",
      selector: (row) => <img width={75} height={75} src={row.image} />,

    },
    // {
    //   name: "Date",
    //   selector: (row) => row.createdAt.substring(0, 10),
    //   sortable: true
    // },
    {
      name: "Details",
      cell: row => <button onClick={() => { getCurrentItem(itemId = row._id) }} className="btn" data-bs-toggle="modal" href="#staticBackdrop1" role="button">Edit <i class="fas fa-edit" style={{ "color": "white" }}></i></button>
    },
    {
      name: "Delete",
      cell: row => <button onClick={() => { deleteitems(row._id) }} type="button" class="btn ">Delete <i class="fas fa-trash-alt"></i></button>

    }
  ];



  const [quantity, setquantity] = useState(1)
  const [varient, setvarient] = useState('small')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const dispatch = useDispatch()

  function addtocart() {

    dispatch(addToCart(catalogues, quantity, varient))
  }



  //update items

  const [name, updateitemName] = useState(items.name);
  const [image, updateitemImage] = useState(items.image);
  const [description, updateitemDescription] = useState(items.description);
  // const [varients, updateitemVarients] = useState([]);
  const [prices, updateitemPrices] = useState(items.prices ? items.prices[0] : { small: '', medium: '', large: '' });
  const [isFootwear, updateisFootwear] = useState(false);
  const [isPants, updateisPants] = useState(false);
  const [isTop, updateisTop] = useState(false);

  const [nameError, setNameError] = useState("");
const [descriptionError, setDescriptionError] = useState("");
const [imageError, setImageError] = useState("");
const [pricesError, setPricesError] = useState({
  small: "",
  medium: "",
  large: "",
});


  useEffect(() => {
    // Check the value of the respective fields and update the state accordingly
    updateisFootwear(items.isFootwear);
    updateisPants(items.isPants);
    updateisTop(items.isTop);
  }, [items]);



  function updateItemPrices(size, value) {
    value = parseInt(value, 10) || 0; // use 0 if value is falsy
    updateitemPrices(prevPrices => ({
      ...prevPrices,
      [size]: value || items.prices[0][size]
    }));
  }





  // function updateItemVarients(size, value) {
  //   updateitemVarients(prevVarients => {
  //     const newVarients = [...prevVarients];
  //     newVarients[size] = value !== '' ? value : items.varients[size];
  //     return newVarients;
  //   });
  // }



  function updateforitem(itemId) {
    // Reset previous error messages
    setNameError("");
    setDescriptionError("");
    setImageError("");
    setPricesError({
      small: "",
      medium: "",
      large: "",
    });
  
    // Validation checks
    let isValid = true;
    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }
    if (!description) {
      setDescriptionError("Description is required.");
      isValid = false;
    }
    if (!image) {
      setImageError("Image is required.");
      isValid = false;
    }
    if (!prices.small) {
      setPricesError((prevState) => ({
        ...prevState,
        small: "Price for small variant is required.",
      }));
      isValid = false;
    }
    if (!prices.medium) {
      setPricesError((prevState) => ({
        ...prevState,
        medium: "Price for medium variant is required.",
      }));
      isValid = false;
    }
    if (!prices.large) {
      setPricesError((prevState) => ({
        ...prevState,
        large: "Price for large variant is required.",
      }));
      isValid = false;
    }
  
    if (isValid) {
      // Proceed with the update
      const updateitems = {
        name,
        image,
        isFootwear,
        isPants,
        isTop,
        description,
        varients: ["small", "medium", "large"],
        prices,
      };
      dispatch(updateitemsAction(updateitems, itemId));
    }
  }
  



  //add new items

  const [newName, setitemName] = useState('');
  const [newImage, setitemImage] = useState('');
  const [newDescription, setitemDescription] = useState('');
  const [newVarients, setitemVarients] = useState([]);
  const [newPrices, setitemPrices] = useState(items.prices ? items.prices[0] : { small: '', medium: '', large: '' });
  const [newisFootwear, setisFootwear] = useState(false);
  const [newisPants, setisPants] = useState(false);
  const [newisTop, setisTop] = useState(false);




  function setItemPrices(size, value) {
    value = parseInt(value, 10) || 0; // use 0 if value is falsy
    setitemPrices(prevPrices => ({
      ...prevPrices,
      [size]: value || prevPrices[size]
    }));
  }






  function addnewitem() {

     // Reset previous error messages
     setNameError("");
     setDescriptionError("");
     setImageError("");
     setPricesError({
       small: "",
       medium: "",
       large: "",
     });
   
     // Validation checks
     let isValid = true;
     if (!name) {
       setNameError("Name is required.");
       isValid = false;
     }
     if (!description) {
       setDescriptionError("Description is required.");
       isValid = false;
     }
     if (!image) {
       setImageError("Image is required.");
       isValid = false;
     }
     if (!prices.small) {
       setPricesError((prevState) => ({
         ...prevState,
         small: "Price for small variant is required.",
       }));
       isValid = false;
     }
     if (!prices.medium) {
       setPricesError((prevState) => ({
         ...prevState,
         medium: "Price for medium variant is required.",
       }));
       isValid = false;
     }
     if (!prices.large) {
       setPricesError((prevState) => ({
         ...prevState,
         large: "Price for large variant is required.",
       }));
       isValid = false;
     }


     if (isValid) {
    const additems = {
      newName,
      newVarients: [
        "small",
        "medium",
        "large"
      ],
      newPrices,
      newImage,
      newisFootwear,
      newisPants,
      newisTop,
      newDescription


    }
    dispatch(additemsAction(additems));
  }

    
  }

  //delete items
  function deleteitems(itemId) {

    dispatch(deleteitemsAction(itemId));



  }


  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='row justify-content-center'>
        <div className='col-md-9 m-3 p-0'>
          {/* Data table for customer details */}
          <DataTable
            title=<div style={{ paddingTop: '25px' }}><h20>Item Catalogue Management <sup><span class="badge bg-danger">Not Completed</span></sup></h20></div>
            columns={columnsOrders}
            data={filteredCatalogues}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            subHeader
            noDataComponent={<div className="text-center"><p10>No items available...</p10></div>}
            subHeaderComponent={
              <div className="p-3">
                <input
                  type="text"
                  placeholder="Search items..."
                  className='w-100 form-control'
                  value={searchCatalogues}
                  onChange={(e) => setSearchCatalogues(e.target.value)}
                />

                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="allFilter"
                    value=""
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === ""}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>All</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="pantsFilter"
                    value="pants"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "pants"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Pants</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="topFilter"
                    value="top"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "top"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Tops</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="footwareFilter"
                    value="footware"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "footware"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Footware</h9>
                </label>

              </div>

            }
          />

          <br />
          <br />
          <div className='modal-footer'>
            <button class="btn" data-bs-target="#staticBackdrop2" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="fa-solid fa-plus fa-beat" style={{ "color": "white" }}></i> Add New items</button>
            <div className='p-1'><button class="btn" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Item Catalogue Report</button></div>
          </div>





        </div>
      </div>


      {/* Model 1 - Preview & Edit items */}
      <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">



            <div class="modal-header">


              <h5 class="modal-title" id="exampleModalToggleLabel">
                <h20>Edit items</h20>


              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



            </div>





            <div class="modal-body">

              <div class="container p-4">
                <div class="row">
                  <div class="col order-last">


                    <div className="container text-center">
                      {items.prices && (
                        <div className="row">

                          <label style={{ display: 'block', marginBottom: '10px' }}>
                            <h9 style={{ fontSize: "15px", color: 'black' }}>Item Price List</h9>
                          </label>
                          
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-secondary">Small</span>
                              
                              <input
                                type="number"
                                id="small"
                                className="form-control"
                                value={prices.small || items.prices[0].small}
                                onChange={(e) => { updateItemPrices('small', e.target.value) }}
                                style={{ fontFamily: ' sans-serif', color: "black", fontSize: "20px" }}
                                required
                              />
                            </div>
                            <br />
                          </div>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-danger">Medium</span>
                              <input
                                type="number"
                                id="medium"
                                className="form-control"
                                value={prices.medium || items.prices[0].medium}
                                onChange={(e) => { updateItemPrices('medium', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                                required
                              />
                            </div>
                            <br />
                          </div>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-success">Large</span>
                              <input
                                type="number"
                                id="large"
                                className="form-control"
                                value={prices.large || items.prices[0].large}
                                onChange={(e) => { updateItemPrices('large', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                                required
                              />
                            </div>

                          </div>

                        </div>)}

                      {/* {items.varients !== undefined && (
                        <div className="row">
                          <label style={{ display: 'block', marginBottom: '10px' }}>
                            <h9 style={{ fontSize: "15px", color: 'black' }}>Item Varients List</h9>
                          </label>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-secondary">Varient 01</span>
                              <input
                                type="text"
                                id="small"
                                className="form-control"
                                value={(varients && varients[0]) || items.varients[0]}
                                onChange={(e) => { updateItemVarients('0', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>
                            <br />
                          </div>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-danger">Varient 02</span>
                              <input
                                type="text"
                                id="medium"
                                className="form-control"
                                value={(varients && varients[1]) || items.varients[1]}
                                onChange={(e) => { updateItemVarients('1', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>
                            <br />
                          </div>
                          <div className="col">
                            <div style={{ alignItems: 'center' }}>
                              <span className="badge bg-success">Varient 03</span>
                              <input
                                type="text"
                                id="large"
                                className="form-control"
                                value={(varients && varients[2]) || items.varients[2]}
                                onChange={(e) => { updateItemVarients('2', e.target.value) }}
                                style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                              />
                            </div>
                          </div>
                        </div>
                      )} */}

                    </div>



                    <br></br>
                    <br></br>

                  </div>
                  <div class="col">
                    <label><h9 style={{ fontSize: "15px", color: 'black' }}>Item Type</h9></label>
                    <div class="p-1" >

                      <label className="p-2">
                        <input
                          type="radio"
                          name="itemType"
                          value="pants"
                          checked={isPants}
                          onChange={() => {
                            updateisPants(true);
                            updateisTop(false);
                            updateisFootwear(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Tops</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="itemType"
                          value="Tops"
                          checked={isTop}
                          onChange={() => {
                            updateisTop(true);
                            updateisPants(false);
                            updateisFootwear(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Footware</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="itemType"
                          value="footware"
                          checked={isFootwear}
                          onChange={() => {
                            updateisFootwear(true);
                            updateisPants(false);
                            updateisTop(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Footware</h9>
                      </label>
                      <br></br>
                      <br></br>


                      <div className="form-group">
                        <label htmlFor="itemName"><h9 style={{ fontSize: "15px", color: 'black' }}>Item Name</h9></label>

                        {/* Display error message for name */}
                        { nameError && <div className="error-message">{nameError}</div> }

                        <input
                          type="text"
                          id="itemName"
                          className="form-control"
                          value={name || items.name}
                          onChange={(e) => { updateitemName(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label htmlFor="itemDescription" style={{ display: 'block', marginBottom: '10px' }}><h9 style={{ fontSize: "15px", color: 'black' }}>Item Description</h9></label>


                        {/* Display error message for name */}
                        { descriptionError && <div className="error-message">{descriptionError}</div> }
                        <textarea
                          class="form-control"
                          id="itemDescription"
                          rows="15"
                          placeholder='Enter Description'
                          value={description || items.description}
                          onChange={(e) => { updateitemDescription(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                        >

                        </textarea>
                      </div>

                    </div>

                  </div>

                  <div class="col order-first">

                    <div className='row justify-content center'>

                      <div className="shadow p-3 m-1 bg-white" style={{ borderRadius: '10px', border: '1px solid black', width: '350px', textAlign: 'center' }}>



                        <div onClick={handleShow}>

                          <h1>{name || items.name}</h1>
                          <img src={image || items.image} className="img-fluid" style={{ height: '200px', width: '200px' }} />

                        </div>

                        <div className="flex-container">

                          <div className='w-100 m-1'>
                            <p>Varients</p>
                            <select className='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }}>
                              {items.varients && items.varients.map(varient => {
                                return <option value={varient}>{varient}</option>
                              })}
                            </select>
                          </div>

                          <div className='w-100 m-1'>
                            <p>Quantity</p>
                            <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                              {Array(10).keys() && [...Array(10).keys()].map((x, i) => {
                                return <option value={i + 1}>{i + 1}</option>
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="flex-container">

                          <div className='m-1 w-100'>
                            {items.prices && items.prices[0] && <h1 className='m-1'>Price: {items.prices[0][varient] * quantity} LKR</h1>}

                          </div>

                          <div className='m-1 w-100'>
                            <button className="btn"  >ADD TO CART</button>
                          </div>

                        </div>

                        <Modal show={show} onHide={handleClose} style={{ maxHeight: '80vh', overflowY: 'auto' }} centered>

                          <Modal.Header closeButton>
                            <Modal.Title><h9>{items.name || newName}</h9></Modal.Title>
                          </Modal.Header>

                          <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <img src={items.image || newImage} className="img-fluid" style={{ height: '470px', width: '500px', marginBottom: '20px' }} />
                            <p10 style={{ marginTop: '20px' }}>{items.description || newDescription}</p10>
                          </Modal.Body>


                          <Modal.Footer>
                            <button className="btn" onClick={handleClose}>CLOSE</button>
                          </Modal.Footer>
                        </Modal>






                      </div>

                      <label htmlFor="itemImage" style={{ display: 'block', marginBottom: '10px' }}>
                        <br></br>
                        <h9 style={{ fontSize: '15px', color: 'black' }}>Item Image</h9>
                      </label>
                      <textarea
                        class="form-control"
                        id="itemImage"
                        rows="3"
                        placeholder='Enter image src'
                        value={image || items.image}
                        onChange={(e) => { updateitemImage(e.target.value) }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px',
                          fontSize: '16px',
                          fontFamily: 'Mukta, calibri',
                          color: '#6c757d',
                          fontStyle: 'italic'
                        }}
                      ></textarea>




                    </div>
                    <br></br>
                  </div>
                </div>
              </div>




            </div>




            <div class="modal-footer">
              <button onClick={() => updateforitem(itemId, updateforitem)} type="button" class="btn " >Update</button>
            </div>

          </div>
        </div>
      </div >

      {/* Model 1 - Add items */}
      <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">



            <div class="modal-header">


              <h5 class="modal-title" id="exampleModalToggleLabel">
                <h20>Add New items</h20>


              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



            </div>





            <div class="modal-body">

              <div class="container p-4">
                <div class="row">
                  <div class="col order-last">


                    <div className="container text-center">

                      <div className="row">

                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <h9 style={{ fontSize: "15px", color: 'black' }}>Item Price List</h9>
                        </label>
                        <div className="col">
                          <div style={{ alignItems: 'center' }}>
                            <span className="badge bg-secondary">Small</span>
                            <input
                              type="text"
                              id="small"
                              className="form-control"
                              value={newPrices.small}
                              onChange={(e) => { setItemPrices('small', e.target.value) }}
                              style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                          <br />
                        </div>
                        <div className="col">
                          <div style={{ alignItems: 'center' }}>
                            <span className="badge bg-danger">Medium</span>
                            <input
                              type="text"
                              id="medium"
                              className="form-control"
                              value={newPrices.medium}
                              onChange={(e) => { setItemPrices('medium', e.target.value) }}
                              style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                          <br />
                        </div>
                        <div className="col">
                          <div style={{ alignItems: 'center' }}>
                            <span className="badge bg-success">Large</span>
                            <input
                              type="text"
                              id="large"
                              className="form-control"
                              value={newPrices.large}
                              onChange={(e) => { setItemPrices('large', e.target.value) }}
                              style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>

                        </div>

                      </div>


                    </div>



                    <br></br>
                    <br></br>

                  </div>
                  <div class="col">
                    <label><h9 style={{ fontSize: "15px", color: 'black' }}>Item Type</h9></label>
                    <div class="p-1" >

                      <label className="p-2">
                        <input
                          type="radio"
                          name="itemType"
                          value="pants"
                          checked={newisPants}
                          onChange={() => {
                            setisPants(true);
                            setisTop(false);
                            setisFootwear(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Pants</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="itemType"
                          value="Tops"
                          checked={newisTop}
                          onChange={() => {
                            setisTop(true);
                            setisPants(false);
                            setisFootwear(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Tops</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="itemType"
                          value="footware"
                          checked={newisFootwear}
                          onChange={() => {
                            setisFootwear(true);
                            setisPants(false);
                            setisTop(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Footware</h9>
                      </label>
                      <br></br>
                      <br></br>

                      <div className="form-group">
                        <label htmlFor="itemName"><h9 style={{ fontSize: "15px", color: 'black' }}>Item Name</h9></label>
                        <input
                          type="text"
                          id="itemName"
                          placeholder='Enter Item Name'
                          className="form-control"
                          value={newName}
                          onChange={(e) => { setitemName(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label htmlFor="itemDescription" style={{ display: 'block', marginBottom: '10px' }}><h9 style={{ fontSize: "15px", color: 'black' }}>Item Description</h9></label>

                        <textarea
                          class="form-control"
                          id="itemDescription"
                          rows="15"
                          placeholder='Enter Description'
                          value={newDescription}
                          onChange={(e) => { setitemDescription(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                        >

                        </textarea>
                      </div>

                    </div>

                  </div>

                  <div class="col order-first">

                    <div className='row justify-content center'>

                      <div className="shadow p-3 m-1 bg-white" style={{ borderRadius: '15px', border: '1px solid black', width: '350px', textAlign: 'center' }}>



                        <div onClick={handleShow}>

                          <h1>{newName || items.newName}</h1>
                          <img src={newImage || items.newImage} className="img-fluid" style={{ height: '200px', width: '200px' }} />

                        </div>

                        <div className="flex-container">

                          <div className='w-100 m-1'>
                            <p>Varients</p>
                            <select className='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }}>
                              <option value='small'>small</option>
                              <option value='medium'>medium</option>
                              <option value='large'>large</option>
                            </select>
                          </div>

                          <div className='w-100 m-1'>
                            <p>Quantity</p>
                            <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                              {Array(10).keys() && [...Array(10).keys()].map((x, i) => {
                                return <option value={i + 1}>{i + 1}</option>
                              })}
                            </select>
                          </div>




                        </div>

                        <div className="flex-container">

                          <div className='m-1 w-100'>
                            {/* {items.newPrices && items.newPrices[0] &&
                              <h1 className='m-1'>Price: {items.newPrices[0][varient] * quantity} LKR</h1>
                            } */}
                          </div>


                          <div className='m-1 w-100'>
                            <button className="btn"  >ADD TO CART</button>
                          </div>

                        </div>






                      </div>

                      <label htmlFor="itemImage" style={{ display: 'block', marginBottom: '10px' }}>
                        <br></br>
                        <h9 style={{ fontSize: '15px', color: 'black' }}>Item Image</h9>
                      </label>
                      <textarea
                        class="form-control"
                        id="itemImage"
                        rows="3"
                        placeholder='Enter image src'
                        value={newImage || items.newImage}
                        onChange={(e) => { setitemImage(e.target.value) }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px',
                          fontSize: '16px',
                          fontFamily: 'Mukta, calibri',
                          color: '#6c757d',
                          fontStyle: 'italic'
                        }}
                      ></textarea>




                    </div>
                    <br></br>
                  </div>
                </div>
              </div>




            </div>




            <div class="modal-footer">
              <button onClick={() => addnewitem(addnewitem)} type="button" class="btn " >Update</button>
            </div>

          </div>
        </div>
      </div >



    </div >
  )
}
