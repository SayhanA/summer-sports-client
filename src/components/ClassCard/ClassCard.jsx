import moment from 'moment';
import './ClassCard.css'
import { FaUsers, } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';

const ClassCard = ({ data }) => {
    const { user } = useContext(AuthContext);
    const [ cart, refetch ] = useCart();
    
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location.pathname)

    // TODO This button will be disabled if:
    // Available seats are 0
    // Logged in as admin/instructor


    // console.log(data)
    const { _id, sport, description, availableSeats, instructor, sportImg, coachImg, name, price } = data

    var toDay = new Date();

    // Add two days to the current date
    var expirationDate = new Date();
    expirationDate.setDate(toDay.getDate() + 2);

    // Format the expiration date
    var formattedDate = expirationDate.toLocaleDateString();

    // TODO
    // console.log("Expiration Date: " + formattedDate);
    // const time = moment(formattedDate).format("MMM Do YY");
    // console.log(time);

    const img = '"' + sportImg + '"'
    // console.log(img)

    const handleStudent = (item) => {
        console.log(item)
        if (user && user.email) {
            const appliedClass = { classId: _id, sport, description, availableSeats, instructor, sportImg, coachImg, name, price, email:user.email  }
            fetch('http://localhost:5000/carts', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(appliedClass)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your Class is added on the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            // toast("You have to Login first.");
            Swal.fire({
                title: 'Please login to add the class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                    // Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    // )
                }
            })
        }

    }

    return (
        <div className={`card bg-base-100 shadow-sm card-container ${availableSeats === 0 && "bg-red-500"}`}>
            {/* <img src="https://kids-club.bold-themes.com/main-demo/wp-content/uploads/sites/2/2015/07/post-04-640x640.jpg" alt="Shoes" /> */}
            <div className={`w-full h-[400px] bg-cover relative`}>
                <img src={sportImg} className='w-full h-full' alt="" />
                <div className='add-body flex flex-col h-full items-center bg-[#ffffffb9] hover:bg-[#4e98ffe6] w-full gap-4 justify-center absolute  z-0 '>
                    <div className='icon text-7xl text-gray-500 border-2 flex justify-center items-center pb-4 border-gray-500 rounded-full w-[80px] h-[80px]' >+</div>
                    <div className='data flex items-center gap-2 p-2'><p className=''>{"time"}</p> / <p className='ml-2'>{instructor}</p> / <p className='flex items-center gap-2 ml-2'><FaUsers className='text-2xl' /> {availableSeats}</p></div>
                    <div className='Instructor text-3xl font-extrabold font-mono' >{instructor}</div>
                </div>
            </div>
            <div className="card-body z-20">
                <h2 className="card-title">
                    {sport}
                    <div className="badge badge-secondary">{200 - availableSeats}</div>
                </h2>
                <p>{description}</p>
                {
                    location.pathname === "/classes" && <div>
                        <p className='text-[17px]'> <span className='font-bold'>Instructor:</span> Coach {instructor} </p>
                        <p className='text-[17px]'> <span className='font-bold'>Available seats:</span> {availableSeats} person </p>
                        <p className='text-[17px] font-semibold'> <span className='font-bold'>Price:</span> {price} $ </p>
                        <button onClick={() => handleStudent(data)} className='btn btn-warning absolute bottom-5 right-10'>Apply Now</button>
                    </div>

                }

            </div>
            <ToastContainer />
        </div>
    );
};

export default ClassCard;