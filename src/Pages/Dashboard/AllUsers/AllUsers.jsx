import { useQuery } from "@tanstack/react-query";
import useTitle from "../../../hooks/useTitle";
import { FaAngleDown, FaAngleUp, FaTrashAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
    const { user } = useContext(AuthContext);
    // const [role, setRole] = useState('admin')
    const [show, setShow] = useState(false);

    const [ axiosSecure ] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    console.log("users form All user", users)

    useTitle("All Users")

    const handleRole = (data, item) => {
        console.log(data, item);

        if(item.email === user.email){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            return 
        }
        

        fetch(`https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/users/admin/${item._id}?role=${data}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    // setRole(data)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: { data } + "created",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    const handleDelete = (id) => {
        console.log(id);

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
                fetch(`https://b7a12-summer-camp-server-side-sayhan-a.vercel.app /users/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: { data } + "created",
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full lg:px-32 md:px-10">
            <h3 className="text-3xl font-semibold">Total Users: {users.length}</h3>
            <table className="table rounded-xl overflow-hidden mt-2">
                {/* head */}
                <thead className='bg-[#cfa059] text-lg'>
                    <tr>
                        <th>  # </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Role </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((data, index) => <tr key={data._id}>

                        <td>{index + 1}</td>

                        <td> {data.name} </td>

                        <td> <span className='text-[17px]'>{data.email}</span> </td>

                        <td className=" transition-all">
                            <div className={`  font-bold uppercase text-center border-2 w-[150px] relative ${show === false ? "" : ""} h-[50px] overflow-hidden hover:h-full transition-all absolute`}>
                                <div onClick={() => handleRole("admin", data)} className="flex justify-between items-center px-5 py-2 text-blue-600 hover:bg-slate-300"> {data.role || "user"} {show ? <FaAngleDown className="text-2xl left-3" /> : <FaAngleUp className="text-2xl  right-3 " />}</div>
                                <div onClick={() => handleRole("admin", data)} className={`flex justify-between items-center px-5 py-2 text-blue-600 hover:bg-slate-300 ${data.role === "admin" ? "hidden" : ""}`}> admin </div>
                                <div onClick={() => handleRole("instructor", data)} className={`flex justify-between items-center px-5 py-2 text-blue-600 hover:bg-slate-300 ${data.role === "instructor" ? "hidden" : ""}`}>instructor</div>
                                <div onClick={() => handleRole("user", data)} className={`flex justify-between items-center px-5 py-2 text-blue-600 hover:bg-slate-300 ${data.role === "user" || data.role === undefined ? "hidden" : ""}`}>user</div>
                            </div>
                        </td>

                        <td>
                            <button onClick={() => handleDelete(data._id)} className="btn btn-ghost border-0"> <FaTrashAlt className='text-3xl text-red-500 ' /> </button>
                        </td>

                    </tr>)}


                </tbody>


            </table>
        </div>
    );
};

export default AllUsers;