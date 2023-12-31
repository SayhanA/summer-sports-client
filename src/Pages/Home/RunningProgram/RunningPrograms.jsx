import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const RunningPrograms = () => {
    const { user } = useAuth();
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch('https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="w-full">
            <h3 className='md:text-4xl text-xl font-bold font-serif pt-20 text-center'>Some Running Program</h3>
            <hr className='my-5 border-2 w-2/12 mx-auto border-yellow-200' />
            <p className='md:w-6/12 px-3 text-center font-bold text-gray-500 mx-auto'>There is some running sports activity and curriculums. If you interested in you con join this sports activity and earn a basic knowledge without any cost.</p>

            <div className="md:hidden">
                <Swiper
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    // slidesPerView={"auto"}
                    spaceBetween={0}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {
                        classes.map(data => <SwiperSlide key={data._id} className="h-[400px]">
                            <div className="flex flex-col justify-center items-center border-x-2 py-10 mt-20">
                                <img className="h-[150px] w-[150px] border-4 border-yellow-300 rounded-full" src={data.userImage} alt="" />
                                <h3 className="text-xl font-bold">{data.userName}</h3>
                                <p className="text-center mx-3 mt-5 text-gray-500">{data.review}</p>
                                <Rating className=" text-yellow-300 text-xl mt-5"
                                    placeholderRating={data.rating}
                                    readonly
                                    emptySymbol={<FaRegStar />}
                                    placeholderSymbol={<FaStar />}
                                    fullSymbol={<FaStarHalfAlt />}
                                />
                                <p>({data.rating})</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className=" w-10/12 mx-auto hidden md:block">
                <Swiper
                    slidesPerView={2}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    // slidesPerView={"auto"}
                    spaceBetween={0}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {
                        classes.map(data => <SwiperSlide key={data._id} className="h-[400px]">
                            <div className="flex flex-col justify-center items-center border-x-2 py-10 mt-20">
                                <img className="h-[150px] w-[150px] border-4 border-yellow-300 rounded-full" src={data.userImage} alt="" />
                                <h3 className="text-xl font-bold">{data.userName}</h3>
                                <p className="text-center w-8/12 mt-5 text-gray-500">{data.review}</p>
                                <Rating className=" text-yellow-300 text-3xl mt-5"
                                    placeholderRating={data.rating}
                                    readonly
                                    emptySymbol={<FaRegStar />}
                                    placeholderSymbol={<FaStar />}
                                    fullSymbol={<FaStarHalfAlt />}
                                />
                                <p>({data.rating})</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
            <h1 className="md:text-5xl text-xl text-center py-10 font-bold ">Add Your Review</h1>
            <div className="">
                <div style={{ width: "100%" }} >
                    <div className=" grid lg:grid-cols-2 gap-10 w-full ">
                        <div className="text-center lg:text-left flex flex-col justify-center w-full">
                            {
                                user ? <div className="flex justify-center items-center flex-col md:ml-20">
                                    <p className="text-xl font-bold font-serif pb-5 hidden md:block">User Details</p>
                                    <img className="h-[150px] w-[150px] border-[5px] border-yellow-300 rounded-full" src={user.photoURL} alt="" />
                                    <Rating className=" text-orange-400 text-3xl pt-5"
                                        placeholderRating=''
                                        readonly
                                        emptySymbol={<FaRegStar />}
                                        placeholderSymbol={<FaStar />}
                                        fullSymbol={<FaStarHalfAlt />}
                                    />
                                    <h3 className="text-2xl font-bold py-5 pb-1">{user.displayName}</h3>
                                    <h3 className=" font-bold ">{user.email}</h3>
                                </div> : <div>
                                    <h2 className="text-center text-2xl font-bold">Please sign up to review us</h2>
                                    <p className="text-center py-5">With out sign up or login you will not able to add a review.</p>
                                </div>

                            }
                        </div>
                        <form className="w-full bg-transparent ">
                            <div className=" md:mr-40 px-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Add Ratings*</span>
                                    </label>
                                    <input type="number" placeholder="add ratings" className="input input-bordered w-full" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Add Review*</span>
                                    </label>
                                    <textarea type="text" placeholder="Add Review" className="input input-bordered w-full h-[150px]" />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary normal-case">Add Review</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default RunningPrograms;