import { useEffect, useState } from 'react';
import ClassCard from '../../../components/ClassCard/ClassCard';
import PopularInstructors from '../PopularInstructors/PopularInstructors';


const TopClasses = () => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log("data form classes",classes)

    return (
        <>
            <div className='grid lg:grid-cols-3 gap-10'>
                {
                    classes.splice(0, 6).map(data => <ClassCard data={data} key={data._id} />)
                }
            </div>
            <div className='grid lg:grid-cols-3 gap-10'>
                {
                    classes.splice(0, 6).map(data => <PopularInstructors data={data} key={data._id} />)
                }
            </div>
        </>
    );
};

export default TopClasses;