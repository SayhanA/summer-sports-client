import React from 'react';
import useTitle from '../../../hooks/useTitle';
import useCart from '../../../hooks/useCart';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyCart = () => {
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

    return (
        <div className='w-full'>
            <h3>This is my cart.</h3>
            <div className=' w-10/12 mx-auto rounded-lg p-5 bg-white'>
                <div className='flex justify-between gap-10 w-full'>
                    <h3 className='text-2xl font-bold font-serif'>Total Classes: {cart.length}</h3>
                    <h3 className='text-2xl font-bold font-serif'>Total Price: ${total}</h3>
                    <Link className='btn btn-warning bg-[#cfa059] font-bold normal-case'>Pay</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table rounded-xl overflow-hidden mt-2">
                        {/* head */}
                        <thead className='bg-[#cfa059] text-lg'>
                            <tr>
                                <th>  # </th>
                                <th>Class Image</th>
                                <th> Name </th>
                                <th> Price </th>
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

                                <td>
                                    <button onClick={() => handleDelete(data)} className="btn btn-ghost border-0"> <FaTrashAlt className='text-3xl text-red-500 ' /> </button>
                                </td>
                            </tr>)}


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;