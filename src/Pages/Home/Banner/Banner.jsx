import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";

const Banner = () => {
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                <SwiperSlide className="relative">
                    <div className="w-full h-[100vh] bg-[url('https://kids-club.bold-themes.com/main-demo/wp-content/uploads/sites/2/2017/01/preschool-04-overlaid-640x427.jpg')] bg-no-repeat bg-center bg-cover"></div>
                    <div className="absolute top-0 w-full border grid md:grid-cols-2">
                        <div className="h-[100vh] pl-40  text-white flex flex-col justify-center">
                            <h3 className="text-6xl mb-10 mt-20">Play With Your Passion and be creative</h3>
                            <p className="text-lg text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio veniam placeat officia odio vitae beatae quis inventore perspiciatis, reprehenderit corrupti excepturi impedit magni magnam odit sapiente doloremque esse eligendi omnis cupiditate nam pariatur eaque facilis dolorum! Distinctio?</p>
                            <div className="grid lg:grid-cols-2 gap-10 mt-10">
                                <button className="btn btn-warning normal-case text-xl px-10 h-[60px]">Follow Us</button>
                                <button className="btn btn-warning normal-case text-xl px-10 h-[60px]">Follow Us</button>
                            </div>
                        </div>
                        <div className=" h-[100vh]"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="relative">
                    <div className="w-full h-[100vh] bg-[url('https://kids-club.bold-themes.com/main-demo/wp-content/uploads/sites/2/2017/01/preschool-05-overlaid-new-640x427.jpg')] bg-no-repeat bg-center bg-cover"></div>
                    <div className="absolute top-0 w-full border grid md:grid-cols-2">
                        <div className="h-[100vh] pl-40  text-white flex flex-col justify-center">
                            <h3 className="text-6xl mb-10">Play With Your Passion and be creative</h3>
                            <p className="text-lg text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio veniam placeat officia odio vitae beatae quis inventore perspiciatis, reprehenderit corrupti excepturi impedit magni magnam odit sapiente doloremque esse eligendi omnis cupiditate nam pariatur eaque facilis dolorum! Distinctio, dolorem dolores itaque ut illo repellendus. Animi corporis quos reiciendis quam vero consectetur?</p>
                        </div>
                        <div className=" h-[100vh]"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-full h-[100vh] bg-[url('https://img.freepik.com/free-photo/medium-shot-smiley-kids-posing-together_23-2149351802.jpg?w=1060&t=st=1686101628~exp=1686102228~hmac=2ac27182511050e20cf348ba28b1bc940da0c349f0a38917f0ecb7bb9b8627b0')] bg-no-repeat bg-center bg-cover"></div>
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default Banner;