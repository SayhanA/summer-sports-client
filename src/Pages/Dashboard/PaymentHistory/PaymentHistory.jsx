import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const [payment, setPayment] = useState([])

    axiosSecure.get(`/payment/history/${user.email}`)
        .then(res => {
            setPayment(res.data)
        })

    return (
        <div className='w-full lg:px-32'>
            <h2 className='text-2xl font-bold font-serif text-center py-10'>Payment History</h2>
            <div className='bg-white p-10 rounded-xl'>
                <table className="table rounded-xl overflow-hidden mt-2 ">
                    {/* head */}
                    <thead className='bg-[#cfa059] text-lg'>
                        <tr>
                            <th>  # </th>
                            <th> Name </th>
                            <th> Price </th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment.map((data, index) => <tr key={data._id}>
                            <td>
                                {index + 1}
                            </td>

                            <td>
                                <span className='text-[17px]'>{data.sport}</span>
                                <br />
                                <span className="badge badge-ghost badge-sm">{data.instructor}</span>
                            </td>

                            <td className='font-bold'> { moment(data.data).format("MMM Do YY")} </td>
                            <td className='font-bold'>{data.price} $</td>
                            <td className=''> Standby </td>

                            <td>
                                <button className="btn btn-ghost border-0"> <FaTrashAlt className='text-3xl text-red-500 ' /> </button>
                            </td>
                        </tr>)}


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;