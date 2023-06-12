import { Label, TextInput } from 'flowbite-react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import Rating from 'react-rating';
import { FaEdit, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import { useForm } from "react-hook-form";

const Profile = () => {
    const [name, setNames] = useState();
    const [rating, setRating] = useState(0)
    const { user, loading, UpdateUser } = useAuth();
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        setNames(name)

        const photo = form.photo.value;
        console.log(name, photo);
        UpdateUser(name, photo);
        form.reset();

    }

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    const handleImage = () => {
        window.my_modal_2.showModal()
    }

    if (loading) {
        return (
            <div>
                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className='md:mx-[10%] mb-[5%]'>
                <div className='h-[100px]'></div>
                <h3 className='text-center text-2xl lg:text-4xl font-bold font-mono my-10'>User Profile</h3>
                {
                    user ? <div>
                        <div className='flex flex-col gap-3'>
                            <div className='w-[250px] h-[250px] rounded-full overflow-hidden border-[5px] border-yellow-300 mx-auto'>
                                <img onClick={handleImage} className='w-full h-full' src={user.photoURL} alt="" />
                                <div className='w-[250px] h-[50px] absolute'> <FaEdit className='text-4xl absolute right-10 bottom-10 text-gray-500' />

                                    {/* Open the modal using ID.showModal() method */}
                                    {/* <button className="btn" onClick={() => window.my_modal_2.showModal()}>open modal</button> */}
                                    <dialog id="my_modal_2" className="modal">
                                        <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box">


                                            <div className="flex items-center justify-center flex-col w-full">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                    </div>
                                                    <input name="image"  {...register("image")} id="dropzone-file" type="file" className="hidden" />
                                                </label>
                                                <input type='submit' className='btn'></input>
                                            </div>


                                        </form>

                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>

                                </div>
                            </div>
                            <h3 className='text-center font-bold font-serif'>{isAdmin && "(Admin)"} {isInstructor && "(Instructor)"}{!isAdmin && !isInstructor && "(user)"}</h3>
                            <p className='text-center text-2xl pt-2 font-bold'>{name ? name : user.displayName}</p>
                            <div className=' mx-auto w-fit flex items-center'>
                                <Rating className=" text-orange-400 text-xl"
                                    placeholderRating={4.9}
                                    readonly
                                    emptySymbol={<FaRegStar />}
                                    placeholderSymbol={<FaStar />}
                                    fullSymbol={<FaStarHalfAlt />}
                                />
                                <span className='text-xl font-bold'>( {rating} )</span></div>
                            <p className='text-center text-xl'>User email: {user.email}</p>
                        </div>
                        <div>
                            <h3 className='text-4xl font-mono text-center mt-10'>Update User Profile</h3>
                            <form onSubmit={handleForm} className='max-w-[400px] mx-auto'>
                                <div className="mb-5 block">
                                    <Label
                                        htmlFor="username"

                                    />
                                </div>
                                <TextInput

                                    id="username3"
                                    placeholder="User name"
                                    required={true}
                                    addon="Required"
                                    name="name"

                                />


                                <div className="mb-5 block">
                                    <Label
                                        htmlFor="photo"

                                    />
                                </div>
                                <TextInput
                                    id="photo"
                                    placeholder="User Photo"
                                    required={true}
                                    addon="Required"
                                    name='photo'
                                // value={photo}
                                />

                                <div className="mb-5 block">
                                    <Label
                                        htmlFor="username"

                                    />
                                </div>



                                <input className='btn btn-outline w-full' type="submit" value="Submit review" />
                            </form>
                        </div>

                    </div>
                        : <Navigate to="/login" />
                }
            </div>
        );
    }

};

export default Profile;

// Demo User Image Link :  https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50