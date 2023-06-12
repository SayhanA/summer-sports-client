import { FaTrashAlt } from "react-icons/fa";
import useClasses from "../../../hooks/useClasses";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const [classes, , refetch] = useClasses();
    const [item, setItem] = useState('')


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
            }
        })
    }


    const handleStatus = (data, item) => {

        console.log(data, item)

        if (data === 'deny') {
            setItem(item);
            return window.my_modal_3.showModal();
        }


        fetch(`https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/classes/admin/${item._id}?role=${data}`, {
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
            })
    }

    const handleSubmitFeedback = event => {
        // event.preventDefault();
        console.log("getting form form", event.target.feedback.value)
        const feedback = event.target.feedback.value;

        // const newItem = {...item, feedback}

        fetch(`https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/classes/admin/${item._id}?role=${'deny'}&data=${feedback}`, {
            method: "PATCH",
            body: feedback
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
            })
    }


    // TODO: Display only Approved Classes in All Classes page
    return (
        <div className="mb-20">
            <h3 className="text-2xl font-bold font-serif text-center pt-10 pb-5"> Manage Classes</h3>
            <table className="table rounded-xl mt-2">
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
                    {classes.map((data) => <tr key={data._id}>

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

            {/* You can open the modal using ID.showModal() method */}
            {/* <button className="btn" onClick={() => window.my_modal_3.showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <form onSubmit={handleSubmitFeedback} method="dialog" className="modal-box">
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="text-xl font-bold font-serif text-center py-5 bg-white">Admin FeedBack Panel</h3>
                    <textarea name="feedback" className="w-full h-[200px] rounded-xl border border-gray-300 px-5" placeholder="Write some feedback and reson to deny" ></textarea>
                    <input className="btn" type="submit" name="" id="" />
                </form>
            </dialog>
        </div>
    );
};

export default ManageClasses;