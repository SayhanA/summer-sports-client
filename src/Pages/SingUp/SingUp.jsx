import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import ContinueLogin from '../../components/ContinueLogIn/ContinueLogin';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { SignUp, UpdateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { useImgHook } = useAuth();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {

        const userName = data.firstName + " " + data.lastName;
        // TODO: user photo dynamic
        const userPhoto = data.image[0]




        // const userPhoto = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'

        if (data.password === data.confirmPassword) {
            // TODO: navigate, show error on page.
            SignUp(data.email, data.password)
                .then(userCredential => {
                    const user = userCredential.user;
                    console.log(user)

                    // Update user name and image

                    useImgHook(userPhoto)
                        .then(res => res.json())
                        .then(userImgRes => {
                            console.log(userImgRes)
                            if (userImgRes.success) {
                                const userImage = userImgRes.data.display_url;
                                console.log("user image is geting from:", userImage)


                                UpdateUser(userName, userImage)
                                    .then(() => {

                                        const saveUser = { name: userName, email: data.email }

                                        fetch('http://localhost:5000/users', {
                                            method: "POST",
                                            headers: {
                                                'content-type': 'application/json'
                                            },
                                            body: JSON.stringify(saveUser)
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                console.log(data)
                                                if (data.insertedId) {
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'success',
                                                        title: 'Your work has been saved',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                    reset();
                                                    navigate('/')
                                                }
                                            })


                                    })
                                    .catch(error => {
                                        console.log(error.message)
                                    })
                            }
                        })

                })
                .catch(error => {
                    console.log(error.message)
                })

        }
        else {
            console.log('set password and confirm password are not same.')
        }
    };


    // console.log(errors)

    return (
        <div className="h-[850px]">
            <div className=''></div>
            <div style={{ gridTemplateColumns: "35% 65%" }} className="grid justify-center items-center h-[100vh]">
                <div className="text-center lg:text-left ml-20">
                    <h1 className="text-5xl font-bold text-center">Welcome to <br /> <span className='font-extrabold'>Summer Sports</span></h1>
                    <p className="py-6 text-center">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                    <h3 className='text-xl font-bold text-center py-5'>SignUp by felling this form</h3>

                    <div className="flex items-center mb-4 mx-20">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-4 text-gray-500">OR</span>
                        <hr className="flex-grow border-gray-300" />

                    </div>

                    <ContinueLogin />

                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full lg:w-8/12 mx-auto">

                    <h3 className='text-3xl py-5 font-bold text-center'>Please SignUp</h3>

                    <div className='flex flex-col '>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full group">
                                <input type="text" {...register("firstName", { required: true })} name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                {errors?.firstName?.type === "required" && <span className='text-red-500 font-bold'>This field is required</span>}
                                <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            </div>
                            <div className="relative z-0 w-full group">
                                <input type="text" {...register("lastName", { required: true })} name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                {errors?.lastName?.type === "required" && <span className='text-red-500 font-bold'>This field is required</span>}
                                <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full group">
                            <input type="email" {...register("email", { required: true })} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            {errors.email?.type === "required" && <p className='text-red-500 font-bold'>Email is required</p>}
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>



                        <div className="relative z-0 w-full group">
                            <input type={show ? "text" : "password"} {...register("password", {
                                minLength: 6,
                                maxLength: 20,
                                pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            {errors?.password?.type === 'minLength' && <p className='text-red-500 font-bold'>Minimum 6 character needed</p>}
                            {errors?.password?.type === 'maxLength' && <p className='text-red-500 font-bold'>Maximum 20 character used</p>}
                            {errors?.password?.type === 'pattern' && <p className='text-red-500 font-bold'>Password is not strong enough</p>}

                            <div onClick={() => setShow(!show)} className='absolute right-5 top-3 text-xl text-gray-400 z-10'>
                                {
                                    show ? <FaRegEye /> : <FaRegEyeSlash />
                                }
                            </div>
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>

                        <div className="relative z-0 w-full group">
                            <input type={showConfirm ? "text" : "password"} {...register("confirmPassword", {
                                minLength: 6,
                                maxLength: 20,
                                pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} name="confirmPassword" id="confirmPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            {errors?.confirmPassword?.type === 'minLength' && <p className='text-red-500 font-bold'>Minimum 6 character needed</p>}
                            {errors?.confirmPassword?.type === 'maxLength' && <p className='text-red-500 font-bold'>Maximum 20 character used</p>}
                            {errors?.confirmPassword?.type === 'pattern' && <p className='text-red-500 font-bold'>Password is not strong enough</p>}

                            <div onClick={() => setShowConfirm(!showConfirm)} className='absolute right-5 top-3 text-xl text-gray-400 z-10'>
                                {
                                    showConfirm ? <FaRegEye /> : <FaRegEyeSlash />
                                }
                            </div>
                            <label htmlFor="floating_confirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">

                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="image" {...register("image")} name='image' type="file" className="hidden" />
                                </label>
                            </div>

                            <select {...register("gender")}>
                                <option value="female">female</option>
                                <option value="male">male</option>
                                <option value="other">other</option>
                            </select>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full group">
                                <input type="tel"  {...register("phone")} pattern="[0-9]{5}-[0-9]{6}" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required={false} />
                                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (01720-234234)</label>
                            </div>
                            <div className="relative z-0 w-full group">
                                <input type="text"  {...register("address")} name="address" id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required={false} />
                                <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                            </div>
                        </div>

                        <button type="submit" className="w-full btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-[16px]">Sign Up</button>
                        <p className='pt-0'>Already have an Account?<Link to="/login" className='text-blue-500 font-bold text-lg pt-0'>Login</Link></p>
                    </div>



                </form>

            </div>
        </div>
    );
};

export default SignUp;