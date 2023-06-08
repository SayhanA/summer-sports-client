import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InstructorClasses = () => {
    const [classes, setClasses] = useState([])
    const { name } = useParams();
    console.log(name)

    // TODO It will be private & only an instructor can access this route.
    useEffect(() => {
        fetch(`http://localhost:5000/instructor/${name}`)
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
    }, [])

    console.log(classes)
    // const { _id, ageGroup, availableSeats, coachImg, duration, instructor, location, name:academyName, price, sport, sportImg } = classes

    return (
        <>

        <div className='grid lg:grid-cols-2 h-[550px] bg-[#2B3440] '>
            <div className='flex justify-center pl-20 text-white flex-col text-2xl gap-4'>
                <h3> <span className='font-bold'>Academy:</span> {classes[0]?.name}</h3>
                <h3> <span className='font-bold'>Name:</span> Coach {classes[0]?.instructor}</h3>
                <h3> <span className='font-bold'>Experience: 5 years</span></h3>
                <h3> <span className='font-bold'>Location: {classes[0]?.location}</span></h3>
            </div>
            <div className='flex justify-center items-center '>
                <img className='rounded-xl' src={classes[0]?.coachImg} alt="" />
            </div>

        </div>
        <h3 className='text-3xl font-bold text-center py-5 font-serif mt-16'>All Classes</h3>
            <div className='grid lg:grid-cols-2 gap-10 w-10/12 mx-auto'>
                {
                    classes.map(data => <div key={data._id} className="card  bg-base-100 shadow-xl">
                        <figure><img className='w-full md:h-[350px]' src={data?.sportImg} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title w-full">{data.sport}</h2>
                            <p>{data.description}</p>
                            <p><span className='font-bold'>Age:</span> {data.ageGroup} years</p>
                            <p><span className='font-bold'>Duration:</span> {data.duration}</p>
                            <p><span className='font-bold'>Total Sets:</span> 50 person</p>
                            <p><span className='font-bold'>Available Sets:</span> {data.availableSeats} person</p>
                            <p><span className='font-bold'>Duration:</span> {data.duration}</p>
                            <p><span className='font-bold text-bold'>Course Fee:</span> {data.price} $</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary normal-case">Add Course</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default InstructorClasses;