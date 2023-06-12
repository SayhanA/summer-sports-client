import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Rating from "react-rating";
import { AiFillLike } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";


const PopularInstructors = () => {
    const { user } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    // console.log(location.pathname)

    const [classes, setClasses] = useState([])

    useEffect(() => {

        fetch('https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/instructor')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log(classes)

    const handleOnClick = (data) => {
        if (!user) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You can now see classes without login!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'LogIn Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
                else{
                    navigate('/')
                }
            })
        }
        else{
            navigate(`/instructor/${data}`)
        }
    }

    return (
        <div className="grid lg:grid-cols-3 gap-5 mb-20">
            {
                location.pathname === "/" && classes?.splice(0, 6).map(data => <div key={data._id} className="card card-compact bg-base-200 shadow-xl">
                    <figure className="relative group">
                        <img src={data.image} className="md:h-[270px] h-[200px] w-full" alt="Shoes" />
                        <p className="flex flex-row-reverse justify-center items-center gap-2 absolute top-6 right-6 text-white font-extrabold text-xl">{data.likes} <AiFillLike className="text-2xl group-hover:text-yellow-200 transition-all group-hover:animate-bounce hover:text-red-400" /> </p>
                    </figure>
                    <div className="card-body text-[16px]">
                        <h2 className="card-title">{data.instructor}</h2>
                        <p>{data.about.slice(0, 120)}...</p>
                        <p> <span className="font-bold  md:text-[16px]">Instructor:</span> {data.name} </p>
                        <div className="flex gap-3 text-[16px]">
                            <span className="font-bold">Ratings:</span>
                            <Rating className=" text-orange-400 md:text-xl"
                                placeholderRating={data.ratings}
                                readonly
                                emptySymbol={<FaRegStar />}
                                placeholderSymbol={<FaStar />}
                                fullSymbol={<FaStarHalfAlt />}
                            />
                            <span className="">({data.ratings})</span>
                        </div>
                        <div className="card-actions justify-end relative">
                            <button onClick={() => handleOnClick(data.instructor)} className="btn btn-primary normal-case text-[16px]" disabled={isAdmin || isInstructor ? true : false }>See Classes</button>
                        </div>
                    </div>
                </div>)
            }
            {
                location.pathname === "/instructors" && classes?.map(data => <div key={data._id} className="card card-compact bg-base-200 shadow-xl">
                    <figure className="relative group">
                        <img src={data.image} className="h-[280px] w-full" alt="Shoes" />
                        <p className="flex flex-row-reverse justify-center items-center gap-2 absolute top-6 right-6 text-white font-extrabold text-xl">{data.likes} <AiFillLike className="text-2xl group-hover:text-yellow-200 transition-all group-hover:animate-bounce hover:text-red-400" /> </p>
                    </figure>
                    <div className="card-body text-[16px]">
                        <h2 className="card-title">{data.instructor}</h2>
                        <p>{data.about.slice(0, 120)}...</p>
                        <p> <span className="font-bold  text-[16px]">Instructor:</span> {data.name} </p>
                        <div className="flex gap-3 text-[16px]">
                            <span className="font-bold">Ratings:</span>
                            <Rating className=" text-orange-400 text-xl"
                                placeholderRating={data.ratings}
                                readonly
                                emptySymbol={<FaRegStar />}
                                placeholderSymbol={<FaStar />}
                                fullSymbol={<FaStarHalfAlt />}
                            />
                            <span className="">({data.ratings})</span>
                        </div>
                        <div className="card-actions justify-end">
                            <button onClick={() => handleOnClick(data.instructor)} className="btn btn-primary normal-case text-[16px]"  disabled={isAdmin || isInstructor ? true : false}>See Classes</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default PopularInstructors;