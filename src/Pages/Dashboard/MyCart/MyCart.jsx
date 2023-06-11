
import useTitle from '../../../hooks/useTitle';
import useCart from '../../../hooks/useCart';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Payment/checkoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const MyCart = () => {
    const [display, setDisplay] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [id, setId] = useState('')
    useTitle("My Cart")

    const [cart, refetch] = useCart();
    console.log(cart)
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    // console.log(total)

    const handleDelete = (item) => {
        console.log(item._id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    const handleModalData = (data) => {
        setDisplay(!display);
        console.log(data)
        setSelectedData(data)
        console.log("data id:",data._id)
        setId(data?._id)
    }

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);


    console.log(selectedData, selectedData.price)

    return (
        <div className='w-full'>
            <div className=' w-10/12 mx-auto rounded-lg p-5 bg-white'>
                <div className='flex justify-between gap-10 w-full'>
                    <h3 className='text-2xl font-bold font-serif'>Total Classes: {cart.length}</h3>
                    <h3 className='text-2xl font-bold font-serif'>Total Price: ${total}</h3>
                    <Link to="/dashboard/payment" className='btn btn-warning bg-[#cfa059] font-bold normal-case'>Pay</Link>
                </div>
                <div className="overflow-x-auto ">
                    <table className="table rounded-xl overflow-hidden mt-2 overflow-auto">
                        {/* head */}
                        <thead className='bg-[#cfa059] text-lg'>
                            <tr>
                                <th>  # </th>
                                <th>Class Image</th>
                                <th> Name </th>
                                <th> Price </th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((data, index) => <tr key={data._id}>
                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    <div className="flex items-center space-x-3 rounded-lg">
                                        <div className="w-40 h-20 my-2">
                                            <img className='rounded-xl' src={data.sportImg} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <span className='text-[17px]'>{data.sport}</span>
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{data.instructor}</span>
                                </td>

                                <td className='text-lg font-bold'>{data.price} $</td>

                                <td className='overflow-auto '>
                                    {/* <button className="btn btn-ghost border-0"> Payment </button> */}
                                    <button className="btn" onClick={() => handleModalData(data)}>Pay</button>

                                </td>
                                <td>
                                    <button onClick={() => handleDelete(data)} className="btn btn-ghost border-0"> <FaTrashAlt className='text-3xl text-red-500 ' /> </button>
                                </td>
                            </tr>)}


                        </tbody>


                    </table>

                    <div className={`absolute w-[500px] h-[300px] shadow-xl bg-white px-10 rounded-xl top-1/2 left-[60%] translate-y-[-50%] translate-x-[-50%] ${display ? "block" : "hidden"} transition-all `}>
                        <div onClick={() => setDisplay(!display)} className='p-5 border flex float-right rounded-full btn h-14 w-14'><FaTimes className='h-5 w-5'/></div>
                        <Elements stripe={stripePromise} >
                            <CheckoutForm id={id} cart={selectedData} price={selectedData?.price || 3}></CheckoutForm>
                        </Elements>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyCart;