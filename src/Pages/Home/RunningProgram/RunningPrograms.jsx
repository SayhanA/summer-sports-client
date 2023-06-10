import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const RunningPrograms = () => {

    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log(classes)
    const user = false

    return (
        <div className="">
            <h3 className='text-4xl font-bold font-serif pt-20 text-center'>Some Running Program</h3>
            <hr className='my-5 border-2 w-2/12 mx-auto border-yellow-200' />
            <p className='w-6/12 text-center font-bold text-gray-500 mx-auto'>There is some running sports activity and curriculums. If you interested in you con join this sports activity and earn a basic knowledge without any cost.</p>

            <div className=" w-10/12 mx-auto">
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
            <h1 className="text-5xl text-center py-10 font-bold ">Add Your Review</h1>
            <form className="bg-transparent w-10/12 mx-auto pb-20">
                <div className=" grid grid-cols-2 ">
                    <div className="text-center lg:text-left flex flex-col justify-center w-full">
                       {
                        user ? <div className="flex justify-center items-center">
                            <img className="h-[150px] w-[150px] border-4 border-yellow-300 rounded-full" src={user.photoURL} alt="" />
                            <h3 className="text-2xl font-bold py-5">{user.displayName}</h3>
                        </div> : <div>
                            <h2 className="text-center text-2xl font-bold">Please sign up to review us</h2>
                            <p className="text-center py-5">With out sign up or login you will not able to add a review.</p>
                        </div>
                       }
                    </div>
                    <div className="w-full bg-transparent px-20">
                        <div className=" ">
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
                    </div>
                </div>

            </form>

        </div>
    );
};

export default RunningPrograms;