import useTitle from "../../../hooks/useTitle";
import PopularInstructors from "../../Home/PopularInstructors/PopularInstructors";


const Instructors = () => {
    useTitle('Instructors')

    return (
        <div className="w-10/12 mx-auto">
            <div className="h-[75px]"></div>
            <div className="mt-20">
                <PopularInstructors></PopularInstructors>
            </div>
        </div>
    );
};

export default Instructors;