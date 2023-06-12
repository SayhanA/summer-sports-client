import Countdown from "react-countdown";
import useTitle from "../../../hooks/useTitle";
import TopClasses from "../../Home/TopClasses/TopClasses";


const Classes = () => {
    useTitle('classes')

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <div>Not Available at this moment</div>
        } else {
            // Render a countdown
            return <span>{hours}h:{minutes}m:{seconds}s</span>;
        }
    };

    return (
        <div>
            <div className='h-[700px] w-full relative'>
                <img src="https://as1.ftcdn.net/v2/jpg/00/86/94/34/1000_F_86943430_7epaoHzIwk6BbK8C9i7tKZarIxEndVwa.jpg" className='w-full h-[700px]' alt="" />
                <div className='absolute top-0 h-[700px] w-full bg-[#00000052] flex flex-col justify-center items-center pt-24'>
                    <h2 className='lg:text-4xl text-xl text-center font-bold pt-10 text-white '>20% Discount <br /> for Now <br/> On All Summer Vacation Sports Activity </h2>
                    <p className='lg:text-3xl text-center py-5 text-white'>Offer Expires on</p>
                    <div className='bg-[#FE6B34] p-5 text-xl lg:p-14 w-fit rounded-xl lg:text-6xl font-bold text-white lg:tracking-[10px] mx-auto'><Countdown date={Date.now() + 10000 * 100000} renderer={renderer} /></div>
                    <p className='text-center font-bold py-10 text-2xl text-white'>We provide Best Skills and Support for our students.</p>
                </div>
            </div>
            <h3 className="my-10 text-3xl font-serif text-center font-bold">All Classes</h3>
            <TopClasses />
        </div>
    );
};

export default Classes;