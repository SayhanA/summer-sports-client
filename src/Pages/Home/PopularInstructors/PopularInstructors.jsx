import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Rating from "react-rating";
import { AiFillLike } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";


const PopularInstructors = () => {
    const location = useLocation();
    console.log(location.pathname)

    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/instructor')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log(classes)

    return (
        <div className="grid lg:grid-cols-3 gap-10">
            {
                location.pathname === "/" && classes?.splice(0, 6).map(data => <div key={data._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="relative group">
                        <img src={data.image} className="h-[250px]" alt="Shoes" />
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
                            <Link to={`/instructor/${data.instructor}`} className="btn btn-primary normal-case text-[16px]">Apply Now</Link>
                        </div>
                    </div>
                </div>)
            }
            {
                location.pathname === "/instructors" && classes?.map(data => <div key={data._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="relative group">
                        <img src={data.image} className="h-[250px]" alt="Shoes" />
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
                            <Link to={`/instructor/${data.instructor}`} className="btn btn-primary normal-case text-[16px]">See Classes</Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default PopularInstructors;