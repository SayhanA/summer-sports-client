import  { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';

const InstructorClass = () => {
    const [classes, setClasses] = useState([]);

    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    axiosSecure.get(`/classes/${user.email}`)
        .then(res => {
            setClasses(res.data)
            console.log(res.data)
        })

    const handleDelete = () => {

    }
        

    return (
        <div className='w-full '>
            <h3 className='text-2xl font-serif text-center font-bold py-10'>Instructor Classes</h3>
            <div className='bg-white p-10 rounded-xl'>
                <table className="table rounded-xl overflow-hidden mt-2">
                    {/* head */}
                    <thead className='bg-[#cfa059] text-lg'>
                        <tr>
                            <th>  # </th>
                            <th>Class Image</th>
                            <th> Name </th>
                            <th> Price </th>
                            <th> Status </th>
                            <th> Feedback </th>
                            <th>Post Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((data, index) => <tr key={data._id}>
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
                            <td className=' font-bold'>{data?.status ? data?.status : "Pending"}</td>

                            <td> <div className='text-[14px]'>{data?.feedback}</div> </td>
                            <td>{moment(data.date).format("MMM Do YY")}</td>
                            
                            <td>
                                <button onClick={() => handleDelete(data)} className="btn btn-ghost border-0"> <FaTrashAlt className='text-3xl text-red-500 ' /> </button>
                            </td>
                        </tr>)}


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default InstructorClass;