import useTitle from "../../../hooks/useTitle";
import Banner from "../Banner/Banner";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import RunningPrograms from "../RunningProgram/RunningPrograms";
import TopClasses from "../TopClasses/TopClasses";


const Home = () => {
    useTitle('Home')

    return (
        <div>
            <Banner />
            <div className="w-10/12 mx-auto mb-20">
                <h3 className="md:text-4xl my-10 text-center font-bold font-serif">Popular Classes</h3>
                <TopClasses />
            </div>

            <div>
                <h3 className='text-4xl text-center mx-auto pb-10 font-serif font-bold'>Top Rated Instructors</h3>
                <div className='w-10/12 mx-auto'>
                    <PopularInstructors />
                </div>
            </div>

            <div className=" bg-[url('https://kids-club.bold-themes.com/main-demo/wp-content/uploads/sites/2/2017/01/preschool-06-new.jpg')] bg-center bg-cover">
                <RunningPrograms />
            </div>

        </div>
    );
};

export default Home;