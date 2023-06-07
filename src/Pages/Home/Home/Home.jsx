import useTitle from "../../../hooks/useTitle";
import Banner from "../Banner/Banner";
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

            
        </div>
    );
};

export default Home;