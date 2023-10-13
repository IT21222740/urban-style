import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../components/Item";
import { getAllItems } from '../actions/itemAction'
import Loading from "../components/Loading";
import Error from "../components/Error";
import axios from "axios";




export default function Homescreen() {




    const dispatch = useDispatch()

    const Itemsstate = useSelector(state => state.getAllItemsReducer)
    const [currentFeedbacks, setFeedbacks] = useState([]);
    const { Items, error, loading } = Itemsstate



    useEffect(() => {
        dispatch(getAllItems())
    }, [])


    const [searchQuery, setSearchQuery] = useState('')
    const [selectedOption, setSelectedOption] = useState('footware')




    const filteredItems = Items.filter(item => {
        if (selectedOption === 'pants') {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.isPants;
        } else if (selectedOption === 'top') {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.isPants;
        } else if (selectedOption === 'item') {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.isItem;
        } else if (selectedOption === 'footware') {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.isFootwear;
        } else {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
    })


    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
    }





    return (

        <div>

            <br />
            <br />
            <br />
            <br />
            <br />



            <div className='row justify-content-center'>



                <div >

                    <div class="container p-5">
                        <div class="row justify-content-center">
                            <div class="col-md-6">
                                <div class="search">
                                    <i class="fa fa-search"></i>
                                    <input
                                        type="text"
                                        placeholder="Search Beverages..."
                                        value={searchQuery}
                                        className="form-control"
                                        onChange={handleSearch}

                                    />



                                </div>

                                <div>

                                  
                                </div>
                            </div>


                        </div>

                    </div>




                </div>







                {loading ? (<Loading />) : error ? (<Error error='Something went wrong' />) : (
                    filteredItems.length > 0 ? (
                        filteredItems.map(item => {
                            return <div className='col-md-3 m-3' key={item._id}>
                                <div>
                                    <Item item={item} />
                                </div>
                            </div>
                        })
                    ) : (
                        <p10>No footwares found...</p10>
                    )
                )}



            </div>


        </div>

    )

}