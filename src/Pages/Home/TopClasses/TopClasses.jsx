import { useEffect, useState } from 'react';
import ClassCard from '../../../components/ClassCard/ClassCard';
import { useLocation } from 'react-router-dom';


const TopClasses = () => {
    const [classes, setClasses] = useState([])
    const location = useLocation();
    // console.log(location.pathname)

    useEffect(() => {
        fetch('http://localhost:5000/classes/all')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log("data form classes",classes)

    return (
        <>
            {
                location.pathname !== '/classes' ? <div className='grid lg:grid-cols-3 gap-5'>
                    {
                        classes.splice(0, 6).map(data => <ClassCard data={data} key={data._id} />)
                    }
                </div> :
                    <div className='grid lg:grid-cols-2 gap-10 w-10/12 mx-auto'>
                        {
                            classes.map(data => <ClassCard data={data} key={data._id} />)
                        }
                    </div>
            }


        </>
    );
};

export default TopClasses;