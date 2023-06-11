import { FaTrashAlt } from "react-icons/fa";
import useClasses from "../../../hooks/useClasses";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const [classes, loading, refetch] = useClasses();


    const handleDelete = (data) => {
        console.log(data);

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

                axiosSecure.delete(`/classes/${data._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: "Deleted Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })

                // fetch(`http://localhost:5000/classes/${id}`, {
                //     method: "DELETE",
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         console.log(data)
                //         if (data.deletedCount > 0) {
                //             refetch();
                //             Swal.fire({
                //                 position: 'top-end',
                //                 icon: 'success',
                //                 title: { data } + "created",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             })
                //         }
                //     })
            }
        })
    }

    // console.log(classes);

    const handleStatus = (data, item) => {

        console.log(data, item)

        fetch(`http://localhost:5000/classes/admin/${item._id}?role=${data}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: { data } + "created",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch()
                }

                // if (data.modifiedCount) {
                //     // refetch();
                //     setIsStatus(data)
                //     Swal.fire({
                //         position: 'top-end',
                //         icon: 'success',
                //         title: { data } + "created",
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                // }
            })
    }

    // TODO: Display only Approved Classes in All Classes page
    return (
        <div>
            <h3>Admin Manage Classes component</h3>
            <table className="table rounded-xl overflow-hidden mt-2">
                {/* head */}
                <thead className='bg-[#cfa059] text-lg'>
                    <tr>
                        <th> Image </th>
                        <th> Name </th>
                        <th> Instructor/Email </th>
                        <th>Seats</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((data, index) => <tr key={data._id}>

                        <td>
                            <div className="avatar">
                                <div className=" w-44 h-28 rounded-lg">
                                    <img src={data.sportImg} alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                        </td>

                        <td className="text-xl font-bold">{data.sport}</td>

                        <td>
                            Coach {data.instructor}
                            <br />
                            <span className="badge badge-ghost badge-sm">Email: {data.email}</span>
                        </td>

                        <td> <span className='text-[17px]'>{data.availableSeats}man</span> </td>
                        <td> <span className='text-[17px]'>{data.price}$</span> </td>

                        <td className=" transition-all">
                            <div className="dropdown">
                                <label tabIndex={0} className={`btn btn-primary w-[100px]  font-bold capitalize ${data.status && "btn-disabled bg-gray-500"}`}>{data.status || "Pending"}</label>
                                <ul tabIndex={0} className="dropdown-content menu m-0 p-0 rounded-md bg-gray-300 w-[100px]">
                                    <li onClick={() => handleStatus("approve", data)} className="btn-success w-[100px] h-[50px] flex justify-center items-center"><a>Approve</a></li>
                                    <li onClick={() => handleStatus("deny", data)} className="btn-error w-[100px] h-[50px] flex justify-center items-center"><a>Deny</a></li>
                                </ul>
                            </div>
                        </td>

                        <td>
                            <button onClick={() => handleDelete(data)} className="btn btn-ghost border-0"> <FaTrashAlt className='text-3xl text-red-500 ' /> </button>
                        </td>

                    </tr>)}


                </tbody>


            </table>
        </div>
    );
};

export default ManageClasses;