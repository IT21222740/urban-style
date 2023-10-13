import axios from "axios";
import Swal from "sweetalert2";





//Add new items
export const additemsAction = (newitems) => async dispatch => {

    dispatch({ type: 'NEW_FOOD_SENDING' })

    try {
        const response = await axios.post('/api/Items/add/item',newitems )
       
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Item added successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'itemsD_ADDED_SUCCESS' })

    } catch (error) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Item added unsuccessfully!'
        })
        dispatch({ type: 'FOOD_ADDED_FAILED', payload: error })
    }
}

export const getAllItems = () => async dispatch => {

    dispatch({ type: 'GET_PIZZAS_REQUEST' })


    try {

        const response = await axios.get('/api/Items/getallItems')
        console.log(response)
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload : response.data })

    } catch (error) {

        dispatch({ type: 'GET_PIZZAS_FAILED', payload : error })
    }
    

}

//Update items
export const updateitemsAction = (updateitems, id) => async dispatch => {

    dispatch({ type: 'UPDATE_items_REQUEST' })

    try {
    
        const response = await axios.put(`/api/Items/update/item/${id}`, updateitems)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'items updated successfully!'
        })
       
        setTimeout(function () {
            window.location.reload('/admin/additemcatalogue');
        }, 1500);
        console.log(response);
        
        dispatch({ type: 'UPDATE_items_SUCCESS' })


    } catch (error) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'items updated unsuccessfully!'
        })
        dispatch({ type: 'UPDATE_items_FAILED', payload: error })
    }
}

//Delete items
export const deleteitemsAction = (itemId) => async dispatch => {

    dispatch({ type: 'FOOD_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/Items/delete/item/${itemId}`)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Item deleted successfully!'
        })

        setTimeout(function () {
            window.location.reload('/admin/newsfeedmanagement');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_FOOD_SUCCESS' })




    } catch (error) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Unsuccessful Operation'
        })


        dispatch({ type: 'DELETE_OPERATION_FAILED', payload: error })
    }
}
